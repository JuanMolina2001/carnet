import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ActivityIndicator, MD2Colors } from 'react-native-paper'
import { BackHandler } from 'react-native';
import LottieView from 'lottie-react-native';
export const Loading: React.FC<{
    visible: boolean,
    icon?: LoadingIcon | null,
    options?: Partial<LottieView['props']>
}> = ({ visible, icon, options }) => {
    const animationIcons = {
        "Bouncy Mapmaker": require(`../../assets/animations/Bouncy Mapmaker.json`),
        "Failure error icon": require(`../../assets/animations/Failure error icon.json`),
        "Task complete tick": require(`../../assets/animations/Task complete tick.json`),
        "Searching": require(`../../assets/animations/Searching.json`),
        "Scan": require(`../../assets/animations/Scan.json`),
    }
    React.useEffect(() => {
        if (!visible) return;

        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            () => true
        );
        return () => handler.remove();
    }, [visible])
    if (!visible) {
        return null;
    }
    return (
        <View style={{ ...styles.container }}>
            {!icon && <ActivityIndicator animating={true} color={MD2Colors.red800} size={'large'} />}
            {icon && <LottieView
                source={animationIcons[icon]}
                autoPlay
                loop
                style={{ width: 150, height: 150 }}
                {...options}

            />}
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