declare module "*.json" {
  const value: any;
  export default value;
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
type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
};
type DocumentStackParamList = {
  TypeDoc: undefined;
  Map: undefined;
};
type RegisterStackParamList = {
  Step1: undefined;
  Step2: undefined;
  Biometrics: undefined;
};