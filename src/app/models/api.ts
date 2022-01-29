export class API {
    private url: string;

    constructor() {
        this.url = 'http://localhost:3000';
    }

    toThisPath(path: string): string {
        return this.url + path;
    }
}