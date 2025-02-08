export interface Ubicaciones {
    id:        string;
    nombre:    Direccion;
    direccion: Direccion;
    lat:       number;
    lng:       number;
}

export interface Direccion {
    es: string;
    eu: string;
}
