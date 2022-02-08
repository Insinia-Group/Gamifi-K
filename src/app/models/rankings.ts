
export class Ranking 
{
    public id: number;
    public name: string;
    public description: string;
    public logo: string;
    

    constructor ( id: number,description:string,logo:string,name:string )
    {
        this.id = id;
        this.name = name;
        this.description = description;
        this.logo = logo;
    }

    // GETTERS \\
  /*   getId (){
        return this.id;
    }

    getDescripcion (){
        return this.description;
    }

    getLogo (){
        return this.logo;
    }
    getName ()
    {
        return this.name;
    }
    // SETTERS \\

    setId (id:number){
         this.id = id;
    }

    setDescripcion (descripcion:string){
        this.description = descripcion;
    }

    setLogo (logo:string){
        this.logo = logo;
    }
    setName (name:string)
    {
       this.name =name;
    } */
}