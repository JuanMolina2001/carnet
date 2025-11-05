import React from 'react'
import { View } from 'react-native'
import { Button, List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
export const DocumentNotice = () => {
    const [typeDocument, setTypeDocument] = React.useState('');
    const [steps, setSteps] = React.useState(0);
    const navigation = useNavigation();
    const [expanded, setExpanded] = React.useState(false);
    return (
        <View>
            <List.Section title="Seleccione el tipo de documento">
                <List.Accordion title={typeDocument || "Tipo de Documento"} expanded={expanded} onPress={() => setExpanded(!expanded)}>
                    <List.Item title="Carnet" onPress={() =>{
                         setTypeDocument('Carnet')
                         setExpanded(false);
                         } }/>
                    <List.Item title="TNE" onPress={() => {
                         setTypeDocument('TNE')
                         setExpanded(false);
                         } } />
                </List.Accordion>
            </List.Section>
            <Button mode="contained" onPress={() => {
                if (typeDocument) {
                    // setSteps(1);
                    navigation.navigate('Map' as never);
                }
            }}>Continuar</Button>
        </View>
    )
}


