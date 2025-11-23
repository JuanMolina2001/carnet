import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'

export const Loading: React.FC<{
    visible: boolean
}> = ({ visible }) => {
    return (
        <View style={{ ...styles.container, display: visible ? 'flex' : 'none' }}>
            <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 1)',
        zIndex: 1000,
    }
});