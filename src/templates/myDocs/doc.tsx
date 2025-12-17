import { AppContext } from '@/context/app';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react'
import { View, Linking } from 'react-native'
import { Avatar, Button, Card, Icon, Text } from 'react-native-paper'
type Props = NativeStackScreenProps<MyDocsStackParamList, 'Doc'>;
const LeftContent = (props: { size: number }) => <Avatar.Icon {...props} icon="folder" />
export const Doc = ({
    navigation,
    route,
}: Props) => {
    const { LostDocument } = route.params;
    const { rut, isPolice } = React.useContext(AppContext);
    const tneCards = {
        'superior': require('../../../assets/images/tne/superior.png'),
        'media': require('../../../assets/images/tne/media.png'),
        'basica': require('../../../assets/images/tne/basica.png'),
    }
    const carnet = require('../../../assets/images/carnet.png');
    return (
        <View>
            <Card>
                <Card.Title title={LostDocument.tipo} subtitle={`Estado: ${LostDocument.status}`} left={LeftContent} />

                <Card.Cover
                    style={{ elevation: 4, margin: 16 }}
                    source={
                        LostDocument.tipo.toLocaleLowerCase() === 'carnet' ? carnet :
                            LostDocument.tipo === 'TNE' ? tneCards[LostDocument.data.nivelEducacional.toLowerCase() as keyof typeof tneCards] :
                                undefined
                    } />
                <Card.Content >
                    {
                        (() => {
                            const cuartel_id = LostDocument.comisaria;
                            if (!cuartel_id) return null;
                            return <Button
                                mode="contained"
                                icon="map-marker"
                                style={{ marginBottom: 8, backgroundColor: 'green' }}
                                onPress={() => {
                                    navigation.getParent()?.navigate('Map', { cuartel_id });
                                }}>
                                Ver ubicación en el mapa
                            </Button>
                        })()
                    }
                    {
                        !isPolice && <>
                            <Button
                                mode="outlined"
                                icon="file-document-outline"
                                style={{ marginBottom: 8 }}
                                onPress={() => {
                                    if (LostDocument.tipo.toLocaleLowerCase() === 'carnet') {
                                        Linking.openURL('https://www.chileatiende.gob.cl/fichas/3430-cedula-de-identidad')
                                    }
                                    if (LostDocument.tipo === 'TNE') {
                                        Linking.openURL('https://oficinavirtual.tne.cl/OficinaVirtual/tramites/tramitesDisponibles.do?action=detalleArea&id=TNE')

                                    }
                                }}>
                                Relizar tramites (reposicion, bloqueo, etc.)
                            </Button>
                            <Button
                                mode="outlined"
                                icon="file-document-outline"
                                style={{ marginBottom: 8 }}
                                onPress={() => {

                                    Linking.openURL('https://comisariavirtual.cl/#tramites')

                                }}>
                                Sacar constancia
                            </Button>
                            {
                                LostDocument.status == 'En comisaria' && <Button mode="contained-tonal" onPress={() => {
                                    navigation.getParent()?.navigate('Qr', {
                                        docRef: `users/${rut}/documents/${LostDocument.id}`,
                                        expectedStatus: 'Reclamado'
                                    })
                                }}>
                                    Reclamar
                                </Button>
                            }</>
                    }
                </Card.Content>
                <Card.Actions>
                    <Button onPress={() => navigation.goBack()}>volver</Button>
                </Card.Actions>
            </Card>
        </View>
    )
}
