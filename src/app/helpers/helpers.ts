export function isBase64(string: string) {
    if (string ==='' || string.trim() ===''){ return false; }
    try {
        return btoa(atob(string)) == string;
    } catch (err) {
        return false;
    }
}