import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Carnet } from './carnet';
import { Tne } from './tne'
import { LostDocContext} from '@/context/LostDoc';



export const Confirm = () => {
    
    const {  typeDocument, } = React.useContext(LostDocContext);
   
    return (
        <View style={styles.container}>
            {typeDocument === 'TNE' ? <Tne /> : <Carnet />}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        padding: 16,
    },
    input: {
        marginBottom: 12,
    },
})
