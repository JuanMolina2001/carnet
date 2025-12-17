import { createUserWithEmailAndPassword, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signOut, updateProfile, User } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from 'expo-crypto';
import { doc, getDoc, collection, setDoc, getDocs, onSnapshot, query, where, updateDoc, deleteDoc, collectionGroup, } from "firebase/firestore";
import * as Notifications from "expo-notifications";
import { formatRut } from 'rutlib';
// Import the functions you need from the SDKs you need
import { initializeFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";
// @ts-ignore
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { Alert } from 'react-native';
const firebaseConfig = {
    apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID
};



const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage)
});
const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,

});
export { User }
export const baasAdapter = {
    async resetPassword(rut: string) {
        const hashRut = await Crypto.digestStringAsync(
            Crypto.CryptoDigestAlgorithm.SHA256,
            rut
        );
        const snap = await getDoc(doc(db, "users", hashRut));
        if (!snap.exists()) {
            throw new Error("Usuario no encontrado");
        }
        await sendPasswordResetEmail(auth, snap.data().email)
    },
    async verify(parsedData: {
        docRef: string;
        expectedStatus: string;
        id_user?: string;
    }, cuartel: string | null) {
        const ref = doc(db, parsedData.docRef);
        const snap = await getDoc(ref);
        const d = snap.data() as LostDocument
        console.log(d.comisaria)
        if (snap.exists() &&( !d.comisaria || d.comisaria === cuartel)) {

            await updateDoc(doc(db, parsedData.docRef), {
                status: parsedData.expectedStatus,
                comisaria: cuartel
            });

            if (parsedData.id_user) {
                await deleteDoc(doc(db, `users/${parsedData.id_user}/published_documents`, parsedData.docRef.split('/').pop() || ''));
                console.log("Published document removed for user:", parsedData.id_user);
            }
            return
        }
        throw new Error('El documento no existe')

    },
    async register(userData: {
        email: string
        password: string,
        rut: string,
        name: string,
        lastName: string
    }) {
        try {
            const rut = await Crypto.digestStringAsync(
                Crypto.CryptoDigestAlgorithm.SHA256,
                formatRut(userData.rut!)
            );
            const snap = await getDoc(doc(db, "users", rut));
            console.log(snap)
            if (snap.exists()) {
                throw new Error("Ya existe una cuenta con este RUT");
            }
            const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);

            await setDoc(doc(db, "users", rut), {
                email: userData.email,
                uid: userCredential.user.uid,
                created_at: new Date(),
            },);
            // ingresar numero y nombre al usercredentials
            await updateProfile(userCredential.user, {
                displayName: `${userData.name} ${userData.lastName}`
            });
            await sendEmailVerification(userCredential.user);



        } catch (error: any) {
            throw new Error(this.fbErrorToText(error));
        }
    },
    async login(rut: string, password: string) {
        return new Promise<{
            user: User, hashRut: string
        }>(async (resolve, reject) => {
            try {
                const hashRut = await Crypto.digestStringAsync(
                    Crypto.CryptoDigestAlgorithm.SHA256,
                    rut
                );
                console.log("Hashed RUT:", hashRut);
                const snap = await getDoc(doc(db, "users", hashRut));
                if (!snap.exists()) {
                    reject("Usuario no encontrado");
                    return;
                }


                const email = snap.data()?.email;
                console.log("Retrieved email:", email);
                const userCredential = await signInWithEmailAndPassword(auth, email, password)
                const user = userCredential.user;
                resolve({
                    user, hashRut
                })
            } catch (error) {
                reject(this.fbErrorToText(error as { code: string; message: string }));
            }
        })
    },
    qrListener(docRef: string, expectedStatus: string, callback: () => void) {
        const ref = doc(db, docRef);
        const unsubscribe = onSnapshot(ref, (snapshot) => {
            const data = snapshot.data();
            if (data?.status === expectedStatus) {
                callback();
            }
        });
        return unsubscribe;
    },
    async documentExist(type: string, owner_id: string): Promise<boolean> {
        const ref = collection(db, `users/${owner_id}/documents`);

        const q = query(
            ref,
            where("tipo", "==", type),
            where("status", "!=", "Reclamado"),
        );

        const snapshot = await getDocs(q);

        return !snapshot.empty;
    },

    async signOut() {
        try {
            await signOut(auth);
        } catch (e) {
            console.log("Error signing out:", e);
            throw e;
        }
    },
    rutConfig(setUser: (
        user: User | null) => void,
        rut: string | null,
        setRut: (rut: string | null) => void,
        setCuartel?: (cuartel: string | null) => void

    ) {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (user) {
                if (!user?.emailVerified) {
                    Alert.alert(
                        'Verifica tu correo electrónico',
                        'Por favor, revisa tu correo electrónico para verificar tu cuenta.',
                        [{ text: 'OK' }]
                    );
                    setUser(null);
                    AsyncStorage.removeItem('rut');
                    this.signOut();
                    return
                }

                setUser(user);
                (async () => {
                    if (!rut) {
                        const storedRut = await AsyncStorage.getItem('rut');
                        storedRut && setRut(storedRut);

                    } else {
                        AsyncStorage.setItem('rut', rut);
                        if (setCuartel) {
                            getDoc(doc(db, 'users', rut)).then((snap) => {
                                if (snap.exists()) {
                                    const data = snap.data();
                                    if (data.cuartel) {
                                        setCuartel(data.cuartel);
                                    }
                                }
                            })

                        }
                    }
                })();

            } else {
                setUser(null);
                AsyncStorage.removeItem('rut');
                this.signOut();
            }
        });
        return () => unsub();
    },
    async addDocument(data: {
        owner_id: string;
        data: any;
        typeDocument: string;
        user: User | null;
        rut: string;
    }) {
        try {
            // guardar documento en coleccion de documentos del usuario propietario
            const id = Crypto.randomUUID();

            await setDoc(doc(db, `users/${data.owner_id}/documents`, id), {
                tipo: data.typeDocument,
                id_user: data.user?.uid,
                data: data.data || null,
                created_at: new Date(),
                status: 'En tramite',
            } as Partial<LostDocument>);
            // registro documentos publicados en usuario actual
            console.log(data.rut)
            await setDoc(doc(db, `users/${data.rut}/published_documents`, id), {
                owner: data.owner_id,
            });
            // const snap = await getDoc(doc(db, "users", data.owner_id));
            // if (snap.exists()) {
                // await fetch('http://localhost:3000/send-email', {
                //     method: 'POST',
                //     headers: {
                //         'Content-Type': 'application/json'
                //     },
                //     body: JSON.stringify({
                //         to: snap.data().email,
                //         Type: data.typeDocument,
                //         date: new Date().toISOString().split('T')[0]
                //     })
                // })
            // }

        } catch (error) {
            throw error;
        }
    },


    listenerPublished(rut: string, callback: (documents: PublishedDoc[]) => void) {
        const ref = collection(db, `users/${rut}/published_documents`);

        const unsubscribe = onSnapshot(ref, async (snapshot) => {

            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                owner: doc.data().owner
            }));
            const results: PublishedDoc[] = [];
            for (const publishedDoc of docs) {
                const ref = doc(db, `users/${publishedDoc.owner}/documents`, publishedDoc.id);
                const snapshot = await getDoc(ref);
                if (snapshot.exists()) {
                    results.push({
                        id: snapshot.id,
                        owner: publishedDoc.owner,
                        ...snapshot.data()
                    } as PublishedDoc);
                }
            }
            callback(results);

        });

        return unsubscribe;
    },

    listenerDocuments(rut: string, callback: (documents: LostDocument[]) => void) {
        let firstSnapshot = true;

        const ref = collection(db, `users/${rut}/documents`);

        const unsubscribe = onSnapshot(ref, (snapshot) => {

            const docs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as LostDocument));

            // Llamas al callback una sola vez por snapshot
            callback(docs);

            if (!firstSnapshot) {
                snapshot.docChanges().forEach(change => {
                    if (change.type === "added") {
                        console.log("Nuevo documento agregado");
                        Notifications.scheduleNotificationAsync({
                            content: {
                                title: "Nuevo documento encontrado",
                                body: "Se ha agregado un nuevo documento a tu cuenta.",
                                sound: true,
                                data: {
                                    id: change.doc.id,
                                    ...change.doc.data()
                                }
                            },
                            trigger: null,
                        });
                    }
                });
            }

            // Ya recibimos el primer snapshot
            firstSnapshot = false;
        });

        return unsubscribe;
    },
    listenerAllDocuments(callback: (documents: LostDocument[]) => void) {
        const unsubscribe = onSnapshot(
            collectionGroup(db, "documents"),
            (snapshot) => {
                console.log(snapshot)
                const documentos = snapshot.docs.map(doc => (
                    {
                        id: doc.id,
                        ...doc.data(),
                        path: doc.ref.path

                    } as LostDocument
                ));
                callback(documentos);
            },
            (error) => {
                console.error("Error escuchando documentos:", error);
            }
        );
        return unsubscribe;
    },
    domain: firebaseConfig.authDomain,


    fbErrorToText(error: { code: string; message: string }): string {
        const errorList = {
            'auth/app-deleted': 'No se encontró la base de datos',
            'auth/expired-action-code': 'El código de acción o el enlace ha caducado',
            'auth/invalid-action-code':
                'El código de acción no es válido. Esto puede suceder si el código está mal formado o ya se ha utilizado',
            'auth/user-disabled':
                'El usuario correspondiente a la credencial proporcionada ha sido deshabilitado',
            'auth/user-not-found': 'Usuario no existente',
            'auth/weak-password': 'La contraseña es demasiado débil',
            'auth/email-already-in-use':
                'Ya tenía una cuenta con la dirección de correo electrónico proporcionada',
            'auth/invalid-email': 'La dirección de correo electrónico no es válida',
            'auth/operation-not-allowed':
                'El tipo de cuenta correspondiente a esta credencial aún no está activado',
            'auth/account-exists-with-different-credential': 'Correo electrónico ya asociado con otra cuenta',
            'auth/auth-domain-config-required':
                'No se ha proporcionado la configuración para la autenticación',
            'auth/credential-already-in-use': 'Ya existe una cuenta para esta credencial',
            'auth/operation-not-supported-in-this-environment':
                'Esta operación no se admite en el entorno que se realiza. Asegúrese de que debe ser http o https',
            'auth/timeout':
                'Tiempo de respuesta excedido. Es posible que el dominio no esté autorizado para realizar operaciones',
            'auth/missing-android-pkg-name':
                'Se debe proporcionar un nombre de paquete para instalar la aplicación de Android',
            'auth/missing-continue-uri': 'La siguiente URL debe proporcionarse en la solicitud',
            'auth/missing-ios-bundle-id':
                'Se debe proporcionar un nombre de paquete para instalar la aplicación iOS',
            'auth/invalid-continue-uri': 'La siguiente URL proporcionada en la solicitud no es válida',
            'auth/unauthorized-continue-uri': 'El dominio de la siguiente URL no está en la lista blanca',
            'auth/invalid-dynamic-link-domain':
                'El dominio de enlace dinámico proporcionado, no está autorizado o configurado en el proyecto actual',
            'auth/argument-error': 'Verifique la configuración del enlace para la aplicación',
            'auth/invalid-persistence-type':
                'El tipo especificado para la persistencia de datos no es válido',
            'auth/unsupported-persistence-type':
                'El entorno actual no admite el tipo especificado para la persistencia de datos',
            'auth/invalid-credential': 'La credencial ha caducado o está mal formada',
            'auth/wrong-password': 'Contraseña incorrecta',
            'auth/invalid-verification-code': 'El código de verificación de credencial no es válido',
            'auth/invalid-verification-id': 'El ID de verificación de credencial no es válido',
            'auth/custom-token-mismatch': 'El token es diferente del estándar solicitado',
            'auth/invalid-custom-token': 'El token proporcionado no es válido',
            'auth/captcha-check-failed':
                'El token de respuesta reCAPTCHA no es válido, ha caducado o el dominio no está permitido',
            'auth/invalid-phone-number':
                'El número de teléfono está en un formato no válido (estándar E.164)',
            'auth/missing-phone-number': 'El número de teléfono es obligatorio',
            'auth/quota-exceeded': 'Se ha excedido la cuota de SMS',
            'auth/cancelled-popup-request': 'Solo se permite una solicitud de ventana emergente a la vez',
            'auth/popup-blocked': 'El navegador ha bloqueado la ventana emergente',
            'auth/popup-closed-by-user':
                'El usuario cerró la ventana emergente sin completar el inicio de sesión en el proveedor',
            'auth/unauthorized-domain':
                'El dominio de la aplicación no está autorizado para realizar operaciones',
            'auth/invalid-user-token': 'El usuario actual no fue identificado',
            'auth/user-token-expired': 'El token del usuario actual ha caducado',
            'auth/null-user': 'El usuario actual es nulo',
            'auth/app-not-authorized': 'Aplicación no autorizada para autenticarse con la clave dada',
            'auth/invalid-api-key': 'La clave API proporcionada no es válida',
            'auth/network-request-failed': 'Error al conectarse a la red',
            'auth/requires-recent-login':
                'El último tiempo de acceso del usuario no cumple con el límite de seguridad',
            'auth/too-many-requests':
                'Las solicitudes se bloquearon debido a una actividad inusual. Vuelva a intentarlo después de un tiempo',
            'auth/web-storage-unsupported':
                'El navegador no es compatible con el almacenamiento o si el usuario ha deshabilitado esta función',
            'auth/invalid-claims': 'Los atributos de registro personalizados no son válidos',
            'auth/claims-too-large':
                'El tamaño de la solicitud excede el tamaño máximo permitido de 1 Megabyte',
            'auth/id-token-expired': 'El token informado ha caducado',
            'auth/id-token-revoked': 'El token informado ha caducado',
            'auth/invalid-argument': 'Se proporcionó un argumento no válido a un método',
            'auth/invalid-creation-time': 'La hora de creación debe ser una fecha UTC válida',
            'auth/invalid-disabled-field': 'La propiedad para el usuario deshabilitado no es válida',
            'auth/invalid-display-name': 'El nombre de usuario no es válido',
            'auth/invalid-email-verified': 'El correo electrónico no es válido',
            'auth/invalid-hash-algorithm': 'El algoritmo HASH no es compatible con la criptografía',
            'auth/invalid-hash-block-size': ' El tamaño del bloque HASH no es válido ',
            'auth/invalid-hash-derived-key-length': 'El tamaño de la clave derivada de HASH no es válido',
            'auth/invalid-hash-key': 'La clave HASH debe tener un búfer de bytes válido',
            'auth/invalid-hash-memory-cost': 'El costo de la memoria HASH no es válido',
            'auth/invalid-hash-parallelization': 'La carga paralela HASH no es válida',
            'auth/invalid-hash-rounds': 'El redondeo HASH no es válido',
            'auth/invalid-hash-salt-separator':
                'El campo separador SALT del algoritmo de generación HASH debe ser un búfer de bytes válido',
            'auth/invalid-id-token': 'El código de token ingresado no es válido',
            'auth/invalid-last-sign-in-time':
                'La última hora de inicio de sesión debe ser una fecha UTC válida',
            'auth/invalid-page-token': 'La siguiente URL proporcionada en la solicitud no es válida',
            'auth/invalid-password':
                'La contraseña no es válida, debe tener al menos 6 caracteres de longitud',
            'auth/invalid-password-hash': 'La contraseña HASH no es válida',
            'auth/invalid-password-salt': 'La contraseña SALT no es válida',
            'auth/invalid-photo-url': 'La URL de la foto del usuario no es válida',
            'auth/invalid-provider-id': 'El identificador del proveedor no es compatible',
            'auth/invalid-session-cookie-duration':
                'La duración de la COOKIE de la sesión debe ser un número válido en milisegundos, entre 5 minutos y 2 semanas',
            'auth/invalid-uid': 'El identificador proporcionado debe tener un máximo de 128 caracteres',
            'auth/invalid-user-import': 'El registro de usuario a importar no es válido',
            'auth/invalid-provider-data': 'El proveedor de datos no es válido',
            'auth/maximum-user-count-exceeded':
                'Se ha excedido el número máximo permitido de usuarios a importar',
            'auth/missing-hash-algorithm':
                'Es necesario proporcionar el algoritmo de generación HASH y sus parámetros para importar usuarios',
            'auth/missing-uid': 'Se requiere un identificador para la operación actual',
            'auth/reserved-claims':
                'Una o más propiedades personalizadas proporcionaron palabras reservadas usadas',
            'auth/session-cookie-revoked': 'La sesión COOKIE ha expirado',
            'auth/uid-alread-exists': 'El identificador proporcionado ya está en uso',
            'auth/email-already-exists': 'El correo electrónico proporcionado ya está en uso',
            'auth/phone-number-already-exists': 'El teléfono proporcionado ya está en uso',
            'auth/project-not-found': 'No se encontraron proyectos',
            'auth/insufficient-permission': 'La credencial utilizada no tiene acceso al recurso solicitado',
            'auth/internal-error':
                'El servidor de autenticación encontró un error inesperado al intentar procesar la solicitud',
        }
        return !!errorList[error.code as keyof typeof errorList]
            ? errorList[error.code as keyof typeof errorList]
            : !!error.message
                ? error.message
                : 'Ocurrió un error inesperado';
    },
    updateProfile: updateProfile
}

