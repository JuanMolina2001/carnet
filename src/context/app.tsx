// ...existing code...
import React from "react";
import { baasAdapter, User } from "@/adapters/baas";
import data from '@/data/cuarteles.json';
import { Loading } from "@/components/loading";
import LottieView from "lottie-react-native";
const cuarteles = data.features as Cuartel[];
export const AppContext = React.createContext({
    user: null as User | null,
    setUser: (user: User | null) => { },
    rut: '' as string | null,
    setRut: (rut: string) => { },
    docs: [] as LostDocument[] | null,
    setDocs: (docs: LostDocument[] | null) => { },
    cuarteles: cuarteles,
    setLoading: (data: setLoadingParams) => { },
    publishedDocs: [] as PublishedDoc[] | null,
    setPublishedDocs: (docs: PublishedDoc[] | null) => { },
    isPolice: false,
    cuartel: null as string | null,

});

export const AppContextProvider: React.FC<{
    children?: React.ReactNode,
    values: {
        user: User | null,
        setUser: (user: User | null) => void,
        rut: string | null,
        setRut: (rut: string | null) => void,
        docs: LostDocument[] | null,
        setDocs: (docs: LostDocument[] | null) => void,
        publishedDocs: PublishedDoc[] | null,
        setPublishedDocs: (docs: PublishedDoc[] | null) => void,
        isPolice: boolean,
    }
}> = ({ children, values }) => {
    const { user, setUser, rut, setRut, docs, setDocs, publishedDocs, setPublishedDocs, isPolice } = values;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [loadingIcon, setLoadingIcon] = React.useState<LoadingIcon | undefined | null>();
    const [options, setOptions] = React.useState<Partial<LottieView['props']>>({});
    const [cuartel, setCuartel] = React.useState<string | null>(null);
    console.log(baasAdapter.domain);


    const setLoading = (data: setLoadingParams) => {
        if (typeof data === 'boolean') {
            setIsLoading(data);
            if (!data) {
                setLoadingIcon(null);
            }
            return;
        } if (data.loading) {
            setOptions(data.options || {});
            setIsLoading(data.loading);
            setLoadingIcon(data.icon);
            if (!data.loading) {
                setLoadingIcon(null);
            }
            if (data.timeout) {
                setTimeout(() => {
                    setIsLoading(false);
                    setLoadingIcon(null);
                }, data.timeout);
            }
        }
    }
    React.useEffect(() => {
        const unsubscribe = baasAdapter.rutConfig(setUser, rut, setRut, isPolice ? setCuartel : undefined);
        return () => {
            unsubscribe();
        }
    }, [rut]);
    return (
        <AppContext.Provider value={{
            user,
            setUser,
            rut,
            setRut,
            docs,
            setDocs,
            cuarteles,
            setLoading,
            publishedDocs,
            setPublishedDocs,
            isPolice,
            cuartel,
        }}>
            <Loading visible={isLoading} icon={loadingIcon} options={options} />

            {children}
        </AppContext.Provider>
    );
}