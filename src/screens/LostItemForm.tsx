import { AppContext } from '@/context/app';
import { LostDocContext } from '@/context/LostDoc';
import { Carnet } from '@/templates/LostItemForm/carnet';
import { Tne } from '@/templates/LostItemForm/tne';
import { TypeDoc } from '@/templates/LostItemForm/type';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { ListDocs } from "@/templates/listDocs";
import { ProgressBar, Text } from 'react-native-paper';
const Stack = createNativeStackNavigator<DocumentStackParamList>();

export const LostItemForm = () => {
    const [typeDocument, setTypeDocument] = React.useState<string>('');
    const [prog, setProg] = React.useState(0);
    return (
        <LostDocContext.Provider value={{
            typeDocument,
            setTypeDocument,
            setProg,
        }}>
            <Stack.Navigator
                initialRouteName="ListDocs"
            >
                <Stack.Screen name="ListDocs" options={{
                    headerBackVisible: false,
                }}>
                    {({ navigation }) => (
                        <ListDocs isMyDocs={false} navigation={navigation} />
                    )}
                </Stack.Screen>
                <Stack.Screen name="TypeDoc" component={TypeDoc} options={{
                    title: 'Tipo de documento'
                }} />
                <Stack.Screen name="Confirm" component={typeDocument === 'TNE' ? Tne : Carnet} options={{
                    title: 'Datos Del documento',
                }} />

            </Stack.Navigator>
                <ProgressBar
                    progress={prog}
                />
        </LostDocContext.Provider>
    );
}
