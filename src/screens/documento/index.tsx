import { TypeDoc } from './type';
import { Map } from './map';
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DocContext } from './Context';
const Stack = createNativeStackNavigator<DocumentStackParamList>();

export const DocumentNotice = () => {
    const [typeDocument, setTypeDocument] = React.useState<string>('');
    const [cuartel, setCuartel] = React.useState<Cuartel | null>(null);
    return (
        <DocContext.Provider value={{
            typeDocument,
            setTypeDocument,
            cuartel,
            setCuartel
        }}>
            <Stack.Navigator initialRouteName="TypeDoc">
                <Stack.Screen name="TypeDoc" component={TypeDoc} />
                <Stack.Screen name="Map" component={Map} options={{
                    title: 'Selecciona la comisaría',
                }} />
            </Stack.Navigator>
        </DocContext.Provider>
    );
}
