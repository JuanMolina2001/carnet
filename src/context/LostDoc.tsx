// ...existing code...
import React from "react";
export const LostDocContext = React.createContext({
    typeDocument: '',
    setTypeDocument: (type: string) => { },
    cuartel: null as Cuartel | null,
    setCuartel: (cuartel: Cuartel | null) => { }

});
