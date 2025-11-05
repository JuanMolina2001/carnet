import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef<any>();

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // "as never" para evitar errores de typing simples
        navigationRef.navigate(name as never, params as never);
    }
}

export function goBack() {
    if (navigationRef.isReady() && navigationRef.canGoBack()) {
        navigationRef.goBack();
    }
}

export function resetRoot(routes: any[], index = 0) {
    if (navigationRef.isReady()) {
        navigationRef.resetRoot({ index, routes });
    }
}