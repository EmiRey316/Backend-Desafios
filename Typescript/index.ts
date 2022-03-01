//Función que transforma el tipo de operación ingresado en el formato correcto. 
const transformOperationType = (operationType: string) => {
    return (operationType[0].toUpperCase() + operationType.slice(1).toLowerCase());
}


const operation = async (num1: number, num2: number, operationType: string) => {
    //Tranformo el parámetro operationType ingresado en el formato correcto.
    let operationTypeTransformed = transformOperationType(operationType);

    //Verifico si el tipo de operación ingresado se corresponde con uno de los habilitados.
    const possibleOperations:Array<string> = ["Sum", "Substraction", "Multiply", "Divide"];
    if(!possibleOperations.includes(operationTypeTransformed)) {
        return "La operación solicitada no es válida";
    }
    
    //Importación dinámica del módulo requerido.
    let importedOperation = await import(`./OperationsClasses/${operationTypeTransformed}.js`);
    
    return new Promise((resolve) => {
        let newOperation = new importedOperation.default(num1, num2);
        resolve(newOperation.result(num1, num2));
    })
}


const operations = async () => {
    console.log(await operation(1, 2, "invalid"))
    console.log(`Suma: ${await operation(1, 2, "sum")}`);
    console.log(`Resta: ${await operation(10, 5, "Substraction")}`);
    console.log(`Multiplicación: ${await operation(10, 10, "multiply")}`);
    console.log(`División: ${await operation(6, 2, "Divide")}`);
}

operations();