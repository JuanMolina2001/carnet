import React from 'react'
import { StyleSheet, ToastAndroid, View, Alert } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { formatRut, validateRut } from 'rutlib'
import { LostDocContext } from '@/context/LostDoc';
import * as Crypto from 'expo-crypto';
import { documentExist } from '@/utils/LostItemForm'
import { useNavigation } from '@react-navigation/native';



export const Tne = () => {
    const { addDocument } = React.useContext(LostDocContext);
    const [rut, setRut] = React.useState('');
    const [folio, setFolio] = React.useState('');
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <TextInput label="" style={styles.input} value={rut} onChangeText={(e) => {
                setRut(formatRut(e))
            }} />
            <TextInput label=""  style={styles.input} value={folio} onChangeText={(e) => {
                setFolio(e)
            }} />
            <Button mode="contained" onPress={() => {
                if (!rut || !validateRut(rut) || !folio) {
                    ToastAndroid.show("Debe ingresar un RUT valido y un folio", ToastAndroid.LONG);
                    return;
                }
                const [number, _] = rut.replaceAll('.', '').split('-');
                fetch(`https://estadotne.cl/api-junaebqa/gateway/v1/busqueda-estado-tne/publico?run=${number}`)
                    .then(r => r.json())
                    .then((data: TneData) => new Promise<{
                        data: TneData;
                        owner_id: string;
                    }>(async (resolve, reject) => {
                        const owner_id = await Crypto.digestStringAsync(
                            Crypto.CryptoDigestAlgorithm.SHA256,
                            formatRut(rut)
                        );
                        const exists = await documentExist('TNE', owner_id);
                        if (exists) {
                            ToastAndroid.show("Ya existe una TNE registrada con este RUT", ToastAndroid.LONG);
                            reject();
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
                            ToastAndroid.show("El folio de la TNE no coincide con el ingresado", ToastAndroid.LONG);
                            reject();
                            return;
                        }
                        resolve({ data, owner_id, })
                    })

                    ).then(({ data, owner_id }) => {
                        addDocument({
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
                            }
                        });
                        ToastAndroid.show("TNE guardada correctamente", ToastAndroid.LONG);
                        navigation.navigate('TypeDoc' as never);
                    }).catch(error => {
                        ToastAndroid.show("Error al buscar la TNE", ToastAndroid.LONG);
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
