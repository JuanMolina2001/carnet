



import React from 'react'
import { Image, ScrollView, View } from 'react-native'
import { AppContext } from '@/context/app';
import { IconButton, List, Text, Icon, DataTable, Searchbar, Drawer, Portal, Modal, Button } from 'react-native-paper';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LottieView from 'lottie-react-native';
import { formatRut } from 'rutlib';
import * as Crypto from 'expo-crypto';

type Props = NativeStackScreenProps<any, any>;

export const ListDocs: React.FC<{
    navigation: Props['navigation'];
    isMyDocs?: boolean;
}> = ({ navigation, isMyDocs }) => {
    const { docs, publishedDocs, rut, isPolice } = React.useContext(AppContext);
    const [page, setPage] = React.useState<number>(0);
    const itemsPerPage = 7;

    const [searchQuery, setSearchQuery] = React.useState<string>('');
    const [documentsToShow, setDocumentsToShow] = React.useState<LostDocument[] | PublishedDoc[]>([]);
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, documentsToShow.length);
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    // filtros
    const [status, setStatus] = React.useState<'Todos' | LostDocument['status']>('Todos');
    const [tipo, setTipo] = React.useState<'Todos' | LostDocument['tipo']>('Todos');
    const filters = [[status, setStatus], [tipo, setTipo]];
    React.useEffect(() => {
        navigation.setOptions({
            title: isMyDocs ? 'Mis Documentos' : 'Documentos Publicados',
            headerSearchBarOptions: isPolice ? {
                placeholder: 'Buscar documentos',
                onSearchButtonPress: async (e) => {
                    let documentsToShow = isMyDocs ? (docs || []) : (publishedDocs || []);
                    console.log(searchQuery);
                    const hashRut = await Crypto.digestStringAsync(
                        Crypto.CryptoDigestAlgorithm.SHA256,
                        searchQuery
                    );
                    documentsToShow = documentsToShow.filter((doc) => doc.path && doc.path.split('/')[1] === hashRut);
                    setDocumentsToShow(documentsToShow);
                    
                    setPage(0);
                },
                onChangeText: (e) => {
                    setSearchQuery(formatRut(e.nativeEvent.text));
                },
            } : undefined,
            
        });
        setPage(0);
    }, [itemsPerPage]);
    React.useEffect(() => {
        let documentsToShow = isMyDocs ? (docs || []) : (publishedDocs || []);
        if (status !== 'Todos') {
            documentsToShow = documentsToShow.filter((doc) => doc.status.toLocaleLowerCase() === status.toLocaleLowerCase())
        }
        if (tipo !== 'Todos') {
            documentsToShow = documentsToShow.filter((doc) => doc.tipo.toLocaleLowerCase() === tipo.toLocaleLowerCase())
        }
        setDocumentsToShow(documentsToShow);



    }, [status, tipo, searchQuery, docs, publishedDocs]);

    if (!documentsToShow) {
        return (
            <LottieView
                source={require('../../assets/animations/Searching.json')}
                autoPlay
                loop
                style={{ flex: 1, backgroundColor: 'white' }}
            />
        )
    }
    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>Tipo</DataTable.Title>
                        <DataTable.Title numeric>Estado</DataTable.Title>
                        <IconButton
                            icon="filter"
                            size={20}
                            onPress={showModal}
                            mode='contained'
                        />
                    </DataTable.Header>

                    {documentsToShow.slice(from, to).map((doc) => {
                        if (!isMyDocs && doc.status !== 'En tramite') {
                            return null
                        }
                        return (
                            <DataTable.Row key={doc.id}
                                style={{
                                    backgroundColor: 'white',
                                    margin: 8,
                                    elevation: 2,
                                    borderRadius: 8

                                }}
                                onPress={() => {
                                    if ('owner' in doc && isMyDocs === false) {
                                        navigation.getParent()?.navigate('Qr', { docRef: `users/${doc.owner}/documents/${doc.id}`, expectedStatus: 'En comisaria', id_user: rut });
                                        return;
                                    }
                                    navigation.navigate('Doc', { LostDocument: doc });

                                }}
                            >
                                <DataTable.Cell >{doc.tipo}</DataTable.Cell>
                                <DataTable.Cell numeric>{doc.status}</DataTable.Cell>
                            </DataTable.Row>)
                    })}
                    <DataTable.Pagination
                        page={page}
                        numberOfPages={Math.ceil(documentsToShow.length / itemsPerPage)}
                        onPageChange={(page) => setPage(page)}
                        label={`${from + 1}-${to} of ${documentsToShow.length}`}
                        numberOfItemsPerPage={itemsPerPage}
                        showFastPaginationControls
                    />

                </DataTable>
            </ScrollView>
            {
                !isMyDocs &&

                <IconButton
                    style={{ position: 'absolute', bottom: 16, right: 16, }}
                    size={40}
                    mode='contained'
                    icon="plus" onPress={() => navigation.navigate('TypeDoc')} />
            }
            <Portal>
                <Modal visible={visible}
                    style={{ margin: 0 }}
                    onDismiss={hideModal} contentContainerStyle={{
                        backgroundColor: 'white',
                        padding: 20,
                        borderRadius: 8,
                    }}>
                    {filters.map(([filter, setFilter], index) => {
                        const options = index === 0 ? (['Todos', 'En comisaria', 'En tramite', 'Reclamado'] as LostDocument['status'][]) : (['Todos', 'Carnet', 'TNE'] as LostDocument['tipo'][]);
                        return (
                            <View key={index} style={{ marginBottom: 16 }}>
                                <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 8 }}>{index === 0 ? 'Estado' : 'Tipo'}</Text>
                                <Drawer.Section>
                                    {options.map((option) => (
                                        <Drawer.Item
                                            key={option}
                                            label={option}
                                            active={filter === option}
                                            onPress={() => {
                                                //@ ts-ignore
                                                setFilter(option as any);
                                                setPage(0);
                                            }}
                                        />
                                    ))}
                                </Drawer.Section>
                            </View>
                        )
                    })}
                    <Button mode="contained" onPress={hideModal} >Ok</Button>
                </Modal>
            </Portal>

        </View >
    )
}