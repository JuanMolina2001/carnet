interface Cuartel  {
  region : string ,
  unidad_nombre : string ,
  tipo_unidad : string ,
  nombre_de : string ,
  numero : string ,
  longitude : number ,
  latitude : number ,
  an : string,
geohash : string
}
type RootStackParamList =  {
  Home: undefined;
  Auth: undefined;
  Document: undefined;
};
type AuthStackParamList =  {
  Login: undefined;
  Register: undefined;
};
type DocumentStackParamList =  {
  TypeDoc: undefined;
  Map: undefined;
};
type RegisterStackParamList =  {
  Step1: undefined;
  Step2: undefined;
  Biometrics: undefined;
};