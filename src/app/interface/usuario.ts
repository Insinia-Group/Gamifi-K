export interface Usuario {
    name: string;
    lastName: string;
    nick: string;
    mail: string;
    password: string;
    description: string;
    birthDate: Date;
}

export interface UsuarioRanking {
    name: string;
    lastName: string;
    position: number;
}