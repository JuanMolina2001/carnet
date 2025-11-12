import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Carnet } from './carnet';
import { Tne } from './tne'
import { LostDocContext} from '@/context/LostDoc';
import { v4 as uuid } from 'uuid';
import { db } from "@/config/firebase";
import { doc, setDoc } from "firebase/firestore";
import { UserContext } from '@/context/user';


export const Confirm = () => {
    
    const { cuartel, typeDocument, } = React.useContext(LostDocContext);
    const {user, setUser} = React.useContext(UserContext);
    const addDocument = async (data: any) => {
        await setDoc(doc(db, "documents", uuid()), {
            comisaria: cuartel?.id,
            tipo: typeDocument,

        });
    }
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
