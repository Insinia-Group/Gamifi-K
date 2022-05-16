export class Ranking {
    public id: number;
    public name: string;
    public description: string;
    public tipo: string;
    public logo: string;

    constructor(id: number, description: string, logo: string, name: string, tipo: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
        this.tipo = tipo;
    }
}