## GAMIFI-K
En este repositorio encontraremos:
* Programadores
* Despliegue.
* Estructura proyecto completo.
* Diseño.
* Guía técnica.

### Programadores
* **Marc Gavin Grau**
* **Klaudijus Miskinis**

### Estructura proyecto completo
* [Frontend](https://github.com/Insinia-Group/Gamifi-K)
* [Backend](https://github.com/Insinia-Group/Gamifi-K-Backend)

### Despliegue
Para desplegar este proyecto:
1. Clonar el repositorio.
```
git clone https://github.com/Insinia-Group/Gamifi-K.git
```
2. Instalar las dependencias.
```
npm i
```
3. Desplegar el proyecto para desarrollo.
```
ng serve
```
*Opcional* Desplegar el proyecto para producción.
```
ng build
```

### Diseño

Para el diseño hemos utilizado la herramienta [Figma](https://www.figma.com/)
El diseño se ha exportado para podernos permitir un rápido avance en el estilo final del proyecto.

 El estilo se ha basado en utilizar los siguientes colores:
 ```
  --corp-color-one: #6d30f3;
  --corp-color-one-ligth: #6e30f3cd;
  --corp-color-one-hover: #6e30f365;
  --corp-color-two: #4434ac;
  --corp-color-three: #a27af3;
  --corp-color-hover-light: #d4c2f8;
  --corp-color-hover-background-light: #d4c2f840;
 ```
 
 La fuente utilizada es *Roboto*:
 ```
 font-family: "Roboto", sans-serif;
 ```

* Página - Home
<div align="center">
   <img src="https://i.imgur.com/VrsIUtA.png" alt="insinia page" width="630" height="400">
</div>

* Página - Login
<div align="center">
   <img src="https://i.imgur.com/eY0MPQb.png" alt="insinia page" width="630" height="400">
</div>

* Página - Profile
<div align="center">
   <img src="https://i.imgur.com/l7j7WzS.png" alt="insinia page" width="630" height="400">
</div>

* Página - Rankings
<div align="center">
   <img src="https://i.imgur.com/NiRPQS8.png" alt="insinia page" width="630" height="400">
</div>

### Guía técnica

La estructura del proyecto es la siguiente:
```
|   .browserslistrc
|   .editorconfig
|   .gitignore
|   angular.json
|   karma.conf.js
|   output.txt
|   package-lock.json
|   package.json
|   README.md
|   tsconfig.app.json
|   tsconfig.json
|   tsconfig.spec.json
|   
\---src
    |   custom-ng-material.css
    |   favicon.ico
    |   index.html
    |   main.ts
    |   polyfills.ts
    |   styles.css
    |   stylesAg.css
    |   test.ts
    |   
    +---app
    |   |   app-routing.module.ts
    |   |   app.component.html
    |   |   app.component.spec.ts
    |   |   app.component.ts
    |   |   app.module.ts
    |   |   
    |   +---about
    |   |       about.component.css
    |   |       about.component.html
    |   |       about.component.spec.ts
    |   |       about.component.ts
    |   |       
    |   +---add-ranking
    |   |       add-ranking.component.css
    |   |       add-ranking.component.html
    |   |       add-ranking.component.spec.ts
    |   |       add-ranking.component.ts
    |   |       
    |   +---ag-grid
    |   |   +---gender-renderer
    |   |   |       gender-renderer.component.css
    |   |   |       gender-renderer.component.html
    |   |   |       gender-renderer.component.spec.ts
    |   |   |       gender-renderer.component.ts
    |   |   |       
    |   |   \---mood-renderer
    |   |           mood-renderer.component.css
    |   |           mood-renderer.component.html
    |   |           mood-renderer.component.spec.ts
    |   |           mood-renderer.component.ts
    |   |           
    |   +---chips
    |   |       chips.component.css
    |   |       chips.component.html
    |   |       chips.component.spec.ts
    |   |       chips.component.ts
    |   |       
    |   +---components
    |   |   +---loading
    |   |   |       loading.component.css
    |   |   |       loading.component.html
    |   |   |       loading.component.spec.ts
    |   |   |       loading.component.ts
    |   |   |       
    |   |   +---logo
    |   |   |       logo.component.css
    |   |   |       logo.component.html
    |   |   |       logo.component.spec.ts
    |   |   |       logo.component.ts
    |   |   |       
    |   |   +---modal
    |   |   |       modal.component.css
    |   |   |       modal.component.html
    |   |   |       modal.component.spec.ts
    |   |   |       modal.component.ts
    |   |   |       
    |   |   +---navbar
    |   |   |       navbar.component.css
    |   |   |       navbar.component.html
    |   |   |       navbar.component.spec.ts
    |   |   |       navbar.component.ts
    |   |   |       
    |   |   \---validator-error
    |   |           validator-error.component.css
    |   |           validator-error.component.html
    |   |           validator-error.component.spec.ts
    |   |           validator-error.component.ts
    |   |           
    |   +---config
    |   |       animations.config.ts
    |   |       notifier.config.ts
    |   |       
    |   +---helpers
    |   |       custom-validators.ts
    |   |       helpers.ts
    |   |       
    |   +---historial
    |   |       historial.component.css
    |   |       historial.component.html
    |   |       historial.component.spec.ts
    |   |       historial.component.ts
    |   |       
    |   +---home
    |   |       home.component.css
    |   |       home.component.html
    |   |       home.component.spec.ts
    |   |       home.component.ts
    |   |       
    |   +---interceptors
    |   |       token-interceptor.interceptor.spec.ts
    |   |       token-interceptor.interceptor.ts
    |   |       
    |   +---interface
    |   |       image.ts
    |   |       usuario.ts
    |   |       
    |   +---login
    |   |       login.component.css
    |   |       login.component.html
    |   |       login.component.spec.ts
    |   |       login.component.ts
    |   |       
    |   +---models
    |   |       api.ts
    |   |       confirmed.validator.ts
    |   |       form.directive.ts
    |   |       profile.ts
    |   |       rankings.ts
    |   |       registerValidation.ts
    |   |       user.ts
    |   |       
    |   +---not-found
    |   |       not-found.component.css
    |   |       not-found.component.html
    |   |       not-found.component.spec.ts
    |   |       not-found.component.ts
    |   |       
    |   +---profile
    |   |       profile.component.css
    |   |       profile.component.html
    |   |       profile.component.spec.ts
    |   |       profile.component.ts
    |   |       
    |   +---register
    |   |       register.component.css
    |   |       register.component.html
    |   |       register.component.spec.ts
    |   |       register.component.ts
    |   |       
    |   +---services
    |   |       http.service.spec.ts
    |   |       http.service.ts
    |   |       jwt.service.spec.ts
    |   |       jwt.service.ts
    |   |       
    |   \---user-ranking-dev
    |           user-ranking-dev.component.css
    |           user-ranking-dev.component.html
    |           user-ranking-dev.component.spec.ts
    |           user-ranking-dev.component.ts
    |           
    +---assets
    |   |   .gitkeep
    |   |   autonomia_1.svg
    |   |   autonomia_2.svg
    |   |   autonomia_3.svg
    |   |   autonomia_4.svg
    |   |   autonomia_5.svg
    |   |   cooperacion_1.svg
    |   |   cooperacion_2.svg
    |   |   cooperacion_3.svg
    |   |   cooperacion_4.svg
    |   |   cooperacion_5.svg
    |   |   emocional_1.svg
    |   |   emocional_2.svg
    |   |   emocional_3.svg
    |   |   emocional_4.svg
    |   |   emocional_5.svg
    |   |   insinia-shadow.png
    |   |   insinia.ico
    |   |   insinia.png
    |   |   keyframes.css
    |   |   pensamiento_1.svg
    |   |   pensamiento_2.svg
    |   |   pensamiento_3.svg
    |   |   pensamiento_4.svg
    |   |   pensamiento_5.svg
    |   |   responsabilidad_1.svg
    |   |   responsabilidad_2.svg
    |   |   responsabilidad_3.svg
    |   |   responsabilidad_4.svg
    |   |   responsabilidad_5.svg
    |   |   roboto.css
    |   |   
    |   +---icons
    |   |       brave.png
    |   |       chrome.png
    |   |       edge.png
    |   |       firefox.png
    |   |       obj_triangle.png
    |   |       opera.png
    |   |       
    |   \---svg
    |           colaboration.svg
    |           easy.svg
    |           group.svg
    |           Insinia.svg
    |           manage.svg
    |           working-insinia.svg
    |           working.svg
    |           world-outline-badged.svg
    |           
    \---environments
            environment.prod.ts
            environment.ts
  ```
