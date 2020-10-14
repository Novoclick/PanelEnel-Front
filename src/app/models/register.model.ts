import { SingleDataSet } from 'ng2-charts';

export interface registro {
    id?: number;
    aprobado: number;
    agente: string;
    categoria: string;
    fechaEntrega?: Date;
    tipoDocumento: string;
    nit: string;
    digitoVerificacion: string;
    empresa: string;
    producto: string;
    nombresContacto: string;
    apellidosContacto: string;
    cel1: string;
    tel1: string;
    email: string;
    cargo: string;
    habeasData: string;
    ciiu: string;
    sector1: string;
    sector2: string;
    tipoCuenta: string;
    pais: string;
    departamento: string;
    ciudad: string;
    municipio: string;
    direccion: string;
    numeroDireccion: string;
    codigoPostal: string;
    categoriaProducto: string;
    canalVentas?: any;
    canalGestion?: any;
    canalOrigen?: any;
    etapa: string;
    id_registro?: number;
    secomunicoPersona: string;
    lapersonaEncargada: string;
    seaceptoPolitica: string;
    solicitaInformacion: string;
    nombrecampana: string;
    observaciones: string;
    tiempoAproximado: string;
    horaPreferida: string;
}

export interface campanas {
    nombrecampana: string;
    count: SingleDataSet;
}


export interface responseModal<T> {
    OK: boolean;
    PUT: string;
    q: T[];
}

export interface camposNoMostrar {
    id: number;
    campo: string;
}


