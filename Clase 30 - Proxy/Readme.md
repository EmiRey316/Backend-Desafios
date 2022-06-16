**Comandos ejecutados desde la carpeta NodeApp**

# NODEMON
1. nodemon src/app.js -p 8080 -m fork       ----> Se abren 2 procesos
2. nodemon src/app.js -p 8080 -m cluster    ----> Se abren 6 procesos

# FOREVER
1. forever start src/app.js --watch -p 8080 -m fork       ----> Se abren 2 procesos
2. forever start src/app.js --watch -p 8080 -m cluster    ----> Se abren 6 procesos

# PM2
No sé si PM2 tuvo alguna actualización posterior a que se hiciera la ppt de la clase, pero ya no funciona pasar argumentos luego de --, es más, no se puede pasar argumentos de ninguna forma como vimos con el profesor.
Lo que hice fue crear un archivo ecosystem.config.js, que pasa las opciones como env y ahí las capturo. Por lo tanto solo hago 1 ejecución que corre todos los servidores necesarios:
1. pm2 start src/Config/ecosystem.config.js


En los 3 casos hice prueba para finalizar procesos, y en modo Cluster se vuelven a levantar correctamente.


***


# NGINX
* Parte 1
1. Primero inicio los servidores como se describe arriba con Forever o PM2, no se puede usar Nodemon porque bloquea la terminal.
2. Luego inicio nginx.exe.

* Parte 2
1. Nuevamente se pueden iniciar los servidores con Forever o PM2. En caso de este último habría que comentar el cluster de 8081 y descomentar el resto.
2. Nuevamente iniciar nginx.exe.