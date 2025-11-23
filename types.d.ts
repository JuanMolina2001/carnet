declare module '*.json' {
  const value: any;
  export default value;
}
declare module '*.html?raw' {
  const value: string;
  export default value;
}

// env variables
declare namespace NodeJS {
  interface ProcessEnv {
    EXPO_PUBLIC_FIREBASE_API_KEY: string;
    EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN: string;
    EXPO_PUBLIC_FIREBASE_PROJECT_ID: string;
    EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET: string;
    EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: string;
    EXPO_PUBLIC_FIREBASE_APP_ID: string;
    EXPO_PUBLIC_GEMINI_API_KEY: string;
  }
}
interface Cuartel { id: string; region: string; nombre: string; tipo_unidad: string; latitude: number; longitude: number; ano: string; }
interface UserData {
  email?: string,
  password?: string,
  confirmPassword?: string,
  rut?: string,
  name?: string,
  lastName?: string,
}
// Context types
interface RegisterContextType {
  userData: UserData,
  setUserData: (userData: UserData) => void,
  handleLogin: () => void,
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  Document: undefined;
};
type HomeStackParamList = {

}
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
type DocumentStackParamList = {
  TypeDoc: undefined;
  Map: undefined;
  Confirm: undefined;
};
type MyDocsStackParamList = {
  ListDocs: undefined;
  Location: { cuartel_id: string}
};
type RegisterStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Biometrics: undefined;
};
interface TneData {
  apellidoMaternoAlumno: string
  apellidoPaternoAlumno: string
  carrera: string
  comuna: string
  curso: string
  dv: string
  establecimientoEducacional: string
  estadoTne: string
  nivelEducacional: string
  nombreAlumno: string
  region: string
  ultimaTarjeta: {
        activa: boolean,
        estado: string,
        fechaSello: string,
        folio: string,

    }
}

interface DocData{
  id: string;
  comisaria: string;
  tipo: string;
  id_user: string;
  owner_id: string;
  data: any;
  created_at: Date;
  status: string;
}