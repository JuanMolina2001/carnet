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
interface Cuartel {
  type: string,
  properties: {
    id: string,

    info: string,
    nombre: string,
    categ: string,
    tipo: string,
    emisor: string,
    admin: string,
    ambito: string,
    tema: string,
    lon: number,
    lat: number,
    region: string,
    cut_reg: string,
    provincia: string,
    cut_pro: string,
    comuna: string,
    cut_com: string
  },
  geometry: {
    type: string,
    coordinates: [
      number,
      number
    ]
  }
}
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
  handleLogin: () => Promise<void>,
  setBiometricScreen: (value: boolean) => void,
}

// Navigation types
type RootStackParamList = {
  Home: undefined;
  Auth: undefined;
  MailConfirm: undefined;
  TermsNconditions: undefined;
  Qr: { id_user?: string, expectedStatus: LostDocument['status'], docRef: string };
  Account: undefined;
  Map: { cuartel_id: string  | undefined};
};
type HomeStackParamList = {

}
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  PasswordReset: undefined;
};
type DocumentStackParamList = {
  TypeDoc: undefined;
  Confirm: undefined;
  ListDocs: undefined;
};
type MyDocsStackParamList = {
  ListDocs: undefined;
  Doc: { LostDocument: LostDocument };
};
type RegisterStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Biometric: undefined;
};
interface TneData {
  errors?: [string],
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

interface LostDocument {
  id: string;
  comisaria?: string;
  tipo: 'Carnet' | 'TNE' ;
  id_user: string;
  data: any;
  created_at: Date;
  status: 'En comisaria' | 'Reclamado' | 'En tramite';
  path?: string;
}
type LoadingIcon = 'Bouncy Mapmaker' | 'Failure error icon' | 'Task complete tick' | 'Searching' | 'Scan'
type setLoadingParams = {
  loading: boolean,
  icon?: LoadingIcon | null,
  options?: Partial<LottieView['props']>,
  timeout?: number,
} | boolean
interface PublishedDoc extends LostDocument {
  owner: string;
}