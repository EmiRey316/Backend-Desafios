//Función que hará de callback en la función principal.
const processFinisher = (error, result) => {
    if(error) {return console.log(error)}

    return console.log(`Proceso completo, ${result} palabras impresas
                        ------------`)
}


const printPhrase = async(phrase, cb, milliseconds = 1000) => {
    //Se divide la frase en palabras en un array, separando por espacio.
    let phraseArray = phrase.split(" ");
    let counter = 0;

    return new Promise((resolve) => {
        const timer = setInterval(() => {
            console.log(phraseArray[counter]);
            counter++;

            if(!(counter < phraseArray.length)) {
                clearInterval(timer);
                resolve(phraseArray.length);
                cb(null, phraseArray.length)
            }

        },milliseconds)

    })
}


const runTests = async() => {
    //Contador para el total final de palabras.
    let totalWords = 0;

    totalWords += await printPhrase("Primer frase de prueba", processFinisher);
    totalWords += await printPhrase("Sigue con esta frase un poco más larga", processFinisher, 500);
    totalWords += await printPhrase("Y terminamos con la última", processFinisher, 1500);

    console.log(`El total de palabras es: ${totalWords}`);
}


runTests()