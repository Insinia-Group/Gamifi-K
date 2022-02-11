export class API {
    private url: string;
    private route: string;

    constructor() {
        this.empty();
        this.url = 'http://localhost:3000';
    }

    toThisPath(path: string): string {
        this.empty();
        this.route = this.url + path;
        return this.route;
    }

    addParameter(parameter: string, value: string): string {
        this.route = this.route + this.checkChars(this.route) + parameter + '=' + value;
        return this.route
    }

    addMultipleParameters(parameters: string[], values: string[]): string {
        parameters.forEach((parameter, index) => {
            this.route = this.route + this.checkChars(this.route) + parameter + '=' + values[index];
        });
        return this.route;
    }

    checkChars(path: string): string {
        if (path.includes('?')) return '&';
        else return '?';
    }
    
    empty(): void {
        this.route = '';
    }
}