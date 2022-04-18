import { Router } from "@angular/router";
import { HttpService } from "../services/http.service";


export function isBase64(string: string) {
    if (string === '' || string.trim() === '') { return false; }
    try {
        return btoa(atob(string)) == string;
    } catch (err) {
        return false;
    }
}

export async function rejectByToken(http: HttpService, router: Router): Promise<boolean> {
    const statusToken = await http.tokenValidation();
    if (statusToken == false) {
        localStorage.removeItem('token');
        router.navigate(['/login']);
        return true;
    } else if (statusToken) {
        console.log("Token valid");
        return false;
    }
    else {
        return false;
    }
}

export function getExtension(string: string): string {
    if (!string) return '.unknown';
    return string.split('.')[string.split('.').length - 1];
}

export function calculateSize(size: number): string {
    if (!size) return ' N/A';
    let counterLoop = 0;
    do {
        size /= 1024;
        size.toFixed(2);
        counterLoop++;
    } while (size > 1024);
    return size.toFixed(2) + ' ' + getUnitOfInformation(counterLoop);
}

export function getUnitOfInformation(counter: number): string {
    switch (counter) {
        case 0:
            return ' B';
        case 1:
            return ' KB';
        case 2:
            return ' MB';
        case 3:
            return ' GB';
        case 4:
            return ' TB';
        default:
            return ' KB'
    }
}