import { createContext } from "react";
export const RegisterContext = createContext<RegisterContextType>({
    userData: {
        email: "",
        password: "",
        confirmPassword: "",
        rut: "",
        name: "",
        lastName: "",
    },
    setUserData: () => { },
    handleLogin: async () => { },
    setBiometricScreen: (value: boolean) => { }

});

