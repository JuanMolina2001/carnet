import React from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'
import { auth } from '@/config/firebase'
const Account = () => {
    return (
        <View>
            <List.Section>
                <List.Item
                    title="Perfil"
                    description="Ver y editar perfil"
                    left={props => <List.Icon {...props} icon="account" />}
                />
                <List.Item
                    title="Configuración"
                    description="Ajustes de la cuenta"
                    left={props => <List.Icon {...props} icon="cog" />}
                />
                <List.Item
                    title="Cerrar sesión"
                    left={props => <List.Icon {...props} icon="cog" />}
                    onPress={async () => {
                        try {
                            await auth.signOut();
                        } catch (error) {
                            console.error("Error signing out: ", error);
                        }
                    }}
                />
            </List.Section>
        </View>
    )
}

export default Account