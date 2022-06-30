# Conclusiones

## Comentarios previos
No dejo el pdf ya que son muchos test y quedaría desordenado. Me pareció mejor ordenar todo en la carpeta Files, dentro de src. Ahí quedó todo separado en carpeta por cada conjunto de pruebas y con los archivos organizados.
En esa carpeta también está el error.log y el warn.log.

Las pruebas las hice en /info y en los puntos 2 y 3 también en /randoms. Saqué la validación de sesión de ambas rutas para que los test corrieran sin problemas.

## 1-Perfilamiento del servidor
En este primer test lo que veo es que el profiling de la prueba sin console.log tiene más ticks que el que si tiene log, siendo que este debería ser el bloqueante.
Según está en las diapositivas debería ser al revés, pero realicé varias pruebas siempre con el mismo resultado. Incluso probé con 3 console.log en la misma ruta, y quedó incluso con menos ticks que cuando tenía solo 1.
Por parte de artillery si que hay más consultas por segundo y la media es menos en el caso del proceso no bloqueante.

## 2-Inspect
Como se ve en el informe de Chrome, el proceso que tuvo más demora obviamente fue la api de randoms, que llevó más de 27 segundos.
El siguiente ya es directamente del ruteo de Node, que llevó poco más de 1 segundo.
Por parte de las imagenes, se ve que ambas rutas tuvieron algunos errores y timeouts, sobre todo en el caso de randoms como es esperable. Entiendo que los errores con /info son principalmente porque también estaba /randoms bloqueando.

## 3.Diagrama de Flama
Todo se ve sobre el mismo stack, que llega a Naranjo nuevamente por la parte de la api de Randoms.