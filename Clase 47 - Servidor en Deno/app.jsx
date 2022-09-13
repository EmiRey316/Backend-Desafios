import { createApp } from "https://deno.land/x/servest@v1.3.1/mod.ts";
// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import React from "https://jspm.dev/react@17.0.2";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import ReactDOMServer from "https://jspm.dev/react-dom@17.0.2/server";

import * as mod from "https://deno.land/std@0.155.0/fmt/colors.ts";



const app = createApp();
let arrColors = []


app.handle("/", async (req) => {
  await req.respond({
    status: 200,
    headers: new Headers({
      "content-type": "text/html; charset=UTF-8",
    }),
    body: ReactDOMServer.renderToString(
        <html>
            <head>
              <meta charSet="utf-8"/>
              <title>Inicio</title>
            </head>
            <body>
              <h1>Formulario de color</h1>
              <form action="/" method="post">
                <label htmlFor="color">Ingrese el nombre de un color en inglés</label>
                <input id="color" type="text" name="color"></input>

                <button type="submit">Enviar</button>
              </form>

              <div style={{backgroundColor: "black"}}>
                <ul>
                  {arrColors.forEach(color => {
                    <li style={{color: mod.color}}>{color}</li>
                  })}
                </ul>      
              </div>
            </body>
        </html>                    
    ),
  });
});


app.post("/", (req) => {
  const newColor = req.body;
  if(!arrColors.includes(newColor)) {
    arrColors.push(newColor)
  }
})


app.listen({port: 8080});
