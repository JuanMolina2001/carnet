import { AppContext } from '@/context/app';
import React from 'react'
import { List } from 'react-native-paper';
import { baasAdapter } from '@/adapters/baas';
export const Account = () => {
    const { user, cuarteles,cuartel, isPolice } = React.useContext(AppContext);

    return (
        <List.Section>
            <List.Item
                title="Nombre de Usuario"
                description={user?.displayName || 'No disponible'}
                left={props => <List.Icon {...props} icon="account" />}
            />
            <List.Item
                title="Correo Electrónico"
                description={user?.email || 'No disponible'}
                left={props => <List.Icon {...props} icon="email" />}
            />
            <List.Item
                title="Número de Teléfono"
                description={user?.phoneNumber || 'No disponible'}
                left={props => <List.Icon {...props} icon="phone" />}
            />  
            {
                isPolice && <List.Item
                    title="Cuartel Asignado"
                    description={cuarteles.find(c => c.properties.id === cuartel)?.properties.nombre || 'No disponible'}
                    left={props => <List.Icon {...props} icon="shield-home" />}
                />
            }

        </List.Section>
    )
}
