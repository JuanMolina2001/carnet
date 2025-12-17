import React from 'react'
import { StyleSheet, ToastAndroid, View, Alert } from 'react-native';
import { TextInput, Button, ProgressBar } from 'react-native-paper';
import { formatRut, validateRut } from 'rutlib'
import { LostDocContext } from '@/context/LostDoc';
import * as Crypto from 'expo-crypto';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { baasAdapter } from '@/adapters/baas';
import { AppContext } from '@/context/app';
type Props = NativeStackScreenProps<DocumentStackParamList, 'Confirm'>;

export const Tne = ({ navigation }: Props) => {
    const { typeDocument,setProg } = React.useContext(LostDocContext);
    const [OwnerRut, setOwnerRut] = React.useState('');
    const [folio, setFolio] = React.useState('');
    const { user, rut } = React.useContext(AppContext);
    React.useEffect(() => {
        setProg(0.9);
        return () => {
            setProg(0.3);
        }
    }, []);
    return (
        <View style={styles.container}>
            <TextInput label="Rut" style={styles.input} value={OwnerRut} onChangeText={(e) => {
                setOwnerRut(formatRut(e))
            }} />
            <TextInput label="Folio" style={styles.input} value={folio} onChangeText={(e) => {
                setFolio(e)
            }} />
            <Button mode="contained" onPress={() => {
                if (!rut) return
                if (!OwnerRut || !validateRut(OwnerRut) || !folio) {
                    ToastAndroid.show("Debe ingresar un RUT valido y un folio", ToastAndroid.LONG);
                    return;
                }
                const [number, _] = OwnerRut.replaceAll('.', '').split('-');
                fetch(`https://estadotne.cl/api-junaebqa/gateway/v1/busqueda-estado-tne/publico?run=${number}`)
                    .then(r => r.json())
                    .then((data: TneData) => new Promise<{
                        data: TneData;
                        owner_id: string;
                    }>(async (resolve, reject) => {
                        const owner_id = await Crypto.digestStringAsync(
                            Crypto.CryptoDigestAlgorithm.SHA256,
                            formatRut(OwnerRut)
                        );

                        const exists = await baasAdapter.documentExist('TNE', owner_id);
                        if (data.errors) {
                            reject("No se encontró una TNE con el RUT ingresado");
                            return;
                        }
                        if (exists) {
                            reject("Ya existe una TNE registrada con este RUT");
                            return;
                        }
                        if (!data.ultimaTarjeta.folio) {
                            Alert.alert(
                                'El folio de la TNE no se puede verificar',
                                'Desea continiuar de todas formas?',
                                [{
                                    text: 'Cancel',
                                    onPress: () => reject(),
                                    style: 'cancel',
                                },
                                {
                                    text: 'OK',
                                    onPress: () => resolve({ data, owner_id, }),
                                }]);
                            return;
                        }
                        if (data.ultimaTarjeta.folio !== folio) {
                            reject("El folio de la TNE no coincide con el ingresado");
                            return;
                        }
                        resolve({ data, owner_id, })
                    })

                    ).then(({ data, owner_id }) => {
                        baasAdapter.addDocument({
                            owner_id,
                            data: {
                                apellidoMaternoAlumno: data.apellidoMaternoAlumno,
                                apellidoPaternoAlumno: data.apellidoPaternoAlumno,
                                carrera: data.carrera,
                                comuna: data.comuna,
                                curso: data.curso,
                                dv: data.dv,
                                establecimientoEducacional: data.establecimientoEducacional,
                                estadoTne: data.estadoTne,
                                nivelEducacional: data.nivelEducacional,
                                nombreAlumno: data.nombreAlumno,
                                region: data.region,
                                ultimaTarjeta: {
                                    activa: data.ultimaTarjeta.activa,
                                    estado: data.ultimaTarjeta.estado,
                                    fechaSello: data.ultimaTarjeta.fechaSello,
                                    folio: data.ultimaTarjeta.folio,
                                }
                            },
                            typeDocument,
                            user,
                            rut
                        });
                        ToastAndroid.show("TNE guardada correctamente", ToastAndroid.LONG);
                        navigation.navigate('ListDocs' as never);
                    }).catch(error => {
                        ToastAndroid.show(error, ToastAndroid.LONG);
                    })
            }}>Continuar</Button>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
    },
    input: {
        margin: 16,
    },
});
