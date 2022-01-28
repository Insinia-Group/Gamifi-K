function tokenGetter() {
    return localStorage.getItem('access_token');
}

export const jwtConfig = {
    tokenGetter: tokenGetter,
    allowedDomains: ["example.com"],
    disallowedRoutes: ["http://example.com/examplebadroute/"],
}