import { createContext } from "react";
export const RegisterContext = createContext<{
    email: string,
    setEmail: (email: string) => void,
    password: string,
    setPassword: (password: string) => void,
    confirmPassword: string,
    setConfirmPassword: (confirmPassword: string) => void,
    rut: string,
    setRut: (rut: string) => void,
    name: string,
    setName: (name: string) => void,
    lastName: string,
    setLastName: (lastName: string) => void,
}>({
    name: '',
    setName: () => { },
    lastName: '',
    setLastName: () => { },
    email: '',
    setEmail: () => { },
    password: '',
    setPassword: () => { },
    confirmPassword: '',
    setConfirmPassword: () => { },
    rut: '',
    setRut: () => { },
});

