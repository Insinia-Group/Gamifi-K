export class API {
    private url: string;
    private route: string;

    /**
     * CONSTRUCTOR
     */
    constructor() {
        this.empty();
        this.url = 'http://localhost:3000';
    }

    /**
     * Devuelve la url + el path que le hayamos pasado.
     * @param path string
     * @returns string
     */
    toThisPath(path: string): string {
        this.empty();
        this.route = this.url + path;
        return this.route;
    }

    /**
     * Añade un parametro a la string y le añadie el valor.
     * @param parameter string
     * @param value string
     * @returns string
     */
    addParameter(parameter: string, value: string): string {
        this.route = this.route + this.checkChars(this.route) + parameter + '=' + value;
        return this.route
    }

    /**
     * Recorre el array parameters y añade el parametro más el valor del mismo indice del segundo array.
     * @param parameters array string
     * @param values array string
     * @returns string
     */
    addMultipleParameters(parameters: string[], values: string[]): string {
        parameters.forEach((parameter, index) => {
            this.route = this.route + this.checkChars(this.route) + parameter + '=' + values[index];
        });
        return this.route;
    }

    /**
     * Hace un check en caso de existir el valor ? y devuelve &, en caso contrario devolvera ?.
     * @param path string
     * @returns string
     */
    checkChars(path: string): string {
        if (path.includes('?')) return '&';
        else return '?';
    }
    
    /**
     * Inicializa a vacio el atributo route.
     */
    empty(): void {
        this.route = '';
    }
}