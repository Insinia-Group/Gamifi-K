import {Router} from "@angular/router";
import {HttpService} from "../services/http.service";


export function isBase64(string: string) {
    if (string === '' || string.trim() === '') {return false;}
    try {
        return btoa(atob(string)) == string;
    } catch (err) {
        return false;
    }
}

export async function rejectByToken(http: HttpService, router: Router): Promise<boolean> {
    const statusToken = await http.tokenValidation();
    if (statusToken == false) {
        return true;
        localStorage.removeItem('token');
        router.navigate(['/login']);
    } else if (statusToken) {
        return false;
        console.log("Token valid");
    }
    else {
        return false;
    }
}