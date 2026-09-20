# Request/response-cyclus van de portfoliosite

Deze site bestaat uit statische bestanden (HTML, CSS, afbeelding). Er draait
geen server-side code; de webserver (bv. GitHub Pages) stuurt alleen de
bestanden op zoals ze zijn.

## Schema

```
Browser (client)                          Server (bv. GitHub Pages)
     |                                              |
     |  1. GET /index.html  HTTP/1.1                |
     |  Host: jelmerbs.github.io                     |
     | ---------------------------------------------> |
     |                                              |
     |  2. HTTP/1.1 200 OK                           |
     |     Content-Type: text/html                   |
     |     <html>...</html>                          |
     | <--------------------------------------------- |
     |                                              |
     |  3. Browser leest de HTML en ziet:            |
     |     <link href="style1.css">                  |
     |     <img src="profiel1.webp">                 |
     |                                              |
     |  4. GET /style1.css                           |
     | ---------------------------------------------> |
     |  5. HTTP/1.1 200 OK  (Content-Type: text/css)  |
     | <--------------------------------------------- |
     |                                              |
     |  6. GET /profiel1.webp                        |
     | ---------------------------------------------> |
     |  7. HTTP/1.1 200 OK  (Content-Type: image/webp)|
     | <--------------------------------------------- |
     |                                              |
     |  8. Browser bouwt DOM + CSSOM, rendert pagina |
```

## Stappen kort toegelicht

1. **Request**: de gebruiker klikt op een link of typt een URL. De browser
   stuurt een `GET`-request naar de server voor de HTML van die pagina
   (bv. `index.html`, `pagina2.html` of `pagina3.html`).
2. **Response**: de server vindt het bestand en stuurt het terug met
   statuscode `200 OK` en de HTML als inhoud. Bestaat de pagina niet, dan
   stuurt de server `404 Not Found`.
3. **Aanvullende requests**: tijdens het parsen van de HTML komt de browser
   het `<link>`-element naar `style1.css` en de `<img>` naar `profiel1.webp`
   tegen. Voor elk van die bestanden stuurt de browser weer een eigen
   `GET`-request.
4. **Renderen**: zodra HTML en CSS binnen zijn, bouwt de browser de DOM en
   CSSOM, combineert ze tot een render tree en tekent de pagina op het
   scherm.
5. **Navigatie**: klikt de gebruiker op een nav-link naar een andere pagina,
   dan start de cyclus opnieuw met een nieuwe `GET`-request voor die pagina.

Omdat de site volledig statisch is, is elke response altijd hetzelfde voor
dezelfde request (geen database, geen verwerking op de server).
