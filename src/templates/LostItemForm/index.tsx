import { TypeDoc } from './type';
import { Map } from './map';
import { Confirm } from './confirm';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LostDocContext } from '@/context/LostDoc';
import * as Crypto from 'expo-crypto';
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from '@/context/user';
import { ToastAndroid } from 'react-native';
const Stack = createNativeStackNavigator<DocumentStackParamList>();

export const LostItemForm = () => {
    const [typeDocument, setTypeDocument] = React.useState<string>('');
    const [cuartel, setCuartel] = React.useState<Cuartel | null>(null);
    const { user } = React.useContext(UserContext);
    const addDocument = async (data: {
        owner_id: string;
        data: any;
    }) => {
        try {
            await setDoc(doc(db, "documents", Crypto.randomUUID()), {
                comisaria: cuartel?.id,
                tipo: typeDocument,
                id_user: user?.uid,
                owner_id: data.owner_id,
                data: data.data || null,
                created_at: new Date(),
                status: 'publicado',
            });
        } catch (error) {
            ToastAndroid.show("Error al guardar el documento", ToastAndroid.LONG);
            console.error( error);
        }
    }
    return (
        <LostDocContext.Provider value={{
            typeDocument,
            setTypeDocument,
            cuartel,
            setCuartel,
            addDocument,
        }}>
            <Stack.Navigator initialRouteName="TypeDoc">
                <Stack.Screen name="TypeDoc" component={TypeDoc} options={{
                    title: 'Tipo de documento'
                }} />
                <Stack.Screen name="Map" component={Map} options={{
                    title: 'Selecciona la comisaría',
                }} />
                <Stack.Screen name="Confirm" component={Confirm} options={{
                    title: 'Confirma Los datos Del documento',
                }} />

            </Stack.Navigator>
        </LostDocContext.Provider>
    );
}
