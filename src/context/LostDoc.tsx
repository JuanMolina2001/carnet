// ...existing code...
import { User } from "@/adapters/baas";
import React from "react";
export const LostDocContext = React.createContext({
    typeDocument: '',
    setTypeDocument: (type: LostDocument['tipo']) => { },
    setProg: (prog: number) => { },

});
