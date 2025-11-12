import React from 'react'
import { StyleSheet, View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { formatRut } from 'rutlib'
import { DocContext } from '../Context';
export const Tne = () => {
    const {  } = React.useContext(DocContext);
    const [rut, setRut] = React.useState('');
    return (
        <View style={styles.container}>
            <TextInput label="" style={styles.input} value={rut} onChangeText={(e) => {
                setRut(formatRut(e))
            }} />
            <Button mode="contained" onPress={() => {
                const [number, _] = rut.replaceAll('.', '').split('-');
                fetch(`https://estadotne.cl/api-junaebqa/gateway/v1/busqueda-estado-tne/publico?run=${number}`)
                .then(r => r.json())
                .then(data => {
                    console.log(data);
                }).catch(error => {
                    console.error(error);
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
