// ...existing code...
import React from "react";
import { useNavigation } from '@react-navigation/native';
export const DocContext = React.createContext({
    typeDocument: '',
    setTypeDocument: (type: string) => { },
    cuartel: null as Cuartel | null,
    setCuartel: (cuartel: Cuartel) => { }

});

export const DocContextProvider = ({ children }: { children?: React.ReactNode }) => {

    const [typeDocument, setTypeDocument] = React.useState<string>('');
    const [cuartel, setCuartel] = React.useState<Cuartel | null>(null);


    return (
        <DocContext.Provider value={{
            typeDocument,
            setTypeDocument,
            cuartel,
            setCuartel
        }}>
            {children}
        </DocContext.Provider>
    );
}