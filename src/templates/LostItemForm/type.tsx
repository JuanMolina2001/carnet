import React from 'react'
import { View } from 'react-native'
import { Button, Drawer, List, ProgressBar, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LostDocContext } from '@/context/LostDoc';


type Props = NativeStackScreenProps<DocumentStackParamList, 'TypeDoc'>;
export const TypeDoc = ({ navigation }: Props) => {
    const { typeDocument, setTypeDocument,setProg } = React.useContext(LostDocContext);
    const [expanded, setExpanded] = React.useState(false);
    React.useEffect(() => {
        setProg(0.3);
        return () => {
            setProg(0);
        }
    }, []);
    return (
        <View>
            <List.Section
                title='Selecciona el tipo de documento'
                titleStyle={{
                     fontSize: 18 ,
                     marginBottom: 10,
                }}
                style={{ margin: 10 }}
            >
                <View style={{
                    backgroundColor: 'white',
                    borderRadius: 8,
                    elevation: 2,
                }}>
                    <List.Accordion
                        title={typeDocument || "Tipo de Documento"}
                        expanded={expanded}
                        onPress={() => setExpanded(!expanded)}>
                        <View style={{ margin: 10 }}>
                            <Drawer.Item
                                icon="school"
                                label="TNE"

                                active={typeDocument === 'TNE'}
                                onPress={() => setTypeDocument('TNE')}
                            />
                            <Drawer.Item
                                icon="card-account-details"
                                label="Carnet de identidad"
                                active={typeDocument === 'Carnet'}
                                onPress={() => setTypeDocument('Carnet')}
                            />
                        </View>
                    </List.Accordion>
                </View>
            </List.Section>
            <Button mode="contained" onPress={() => {
                if (typeDocument) {
                    // setSteps(1);
                    navigation.navigate('Confirm');
                }
            }}>Continuar</Button>
        </View>
    )
}


