// ...existing code...
import React from "react";

import { User } from 'firebase/auth';

export const UserContext = React.createContext({
    user: null as User | null,
    setUser: (user: User | null) => { },
    rut: '' as string,
    setRut: (rut: string) => { },
    docs : [] as DocData[],
    setDocs: (docs: DocData[]) => {}
});

