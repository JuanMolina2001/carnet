import { TypeDoc } from './type';
import { Map } from './map';
import { Confirm } from './confirm';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LostDocContext } from '@/context/LostDoc';
const Stack = createNativeStackNavigator<DocumentStackParamList>();

export const LostItemForm = () => {
    const [typeDocument, setTypeDocument] = React.useState<string>('');
    const [cuartel, setCuartel] = React.useState<Cuartel | null>(null);

    return (
        <LostDocContext.Provider value={{
            typeDocument,
            setTypeDocument,
            cuartel,
            setCuartel
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
