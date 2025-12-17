import React from 'react'
import { View } from 'react-native'
import { List } from 'react-native-paper'
import { baasAdapter } from '@/adapters/baas'
import { useNavigation } from '@react-navigation/native'
export const Options = () => {
    const navigation = useNavigation();
    return (
        <View>
            <List.Section>
                <List.Item
                    onPress={()=>{
                        navigation.navigate('Account' as never);
                    }}
                    title="Configuración"
                    description="Ajustes de la cuenta"
                    left={props => <List.Icon {...props} icon="cog" />}
                />
                <List.Item
                    title="Cerrar sesión"
                    left={props => <List.Icon {...props} icon="logout" />}
                    onPress={async () => {
                        try {
                            await baasAdapter.signOut();
                        } catch (error) {
                            console.error("Error signing out: ", error);
                        }
                    }}
                />
            </List.Section>
        </View>
    )
}
