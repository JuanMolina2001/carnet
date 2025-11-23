import React from 'react'
import { View } from 'react-native'
import { UserContext } from '@/context/user';
import { List, Text } from 'react-native-paper';
import cuarteles from '@/data/cuarteles.min.json';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type Props = NativeStackScreenProps<MyDocsStackParamList, 'ListDocs'>;

export const ListDocs: React.FC<Props> = ({ navigation }) => {
    const { docs } = React.useContext(UserContext);
    return (
        <View>
            <List.Section>
                {docs.length === 0 ? (
                    <Text style={{ padding: 16 }}>No se encontraron documentos.</Text>
                ) : (
                    docs.map((doc) => (
                        <List.Item
                            key={doc.id}
                            title={doc.tipo}
                            description={`Estado: ${doc.status} \n Comisaría: ${(cuarteles as Cuartel[]).find((c) => c.id === doc.comisaria)?.nombre || 'Desconocida'}`}
                            left={props => <List.Icon {...props} icon="file-document" />}
                            onPress={() => { 
                                navigation.navigate('Location', { cuartel_id: doc.comisaria });
                            }}
                        />
                    ))
                )}
            </List.Section>
        </View>
    )
}

