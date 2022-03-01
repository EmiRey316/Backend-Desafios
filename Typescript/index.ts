const operation = async (num1: number, num2: number, operationType: string) => {
    let importedOperation = await import(`./OperationsClasses/${operationType}.js`);
    
    return new Promise((resolve) => {
        const newOperation = new importedOperation.default(num1, num2);
        resolve(newOperation.result(num1, num2));
    })
}


const operations = async () => {
    console.log(`Suma: ${await operation(1, 2, "Sum")}`);
    console.log(`Resta: ${await operation(10, 5, "Substraction")}`);
    console.log(`Multiplicación: ${await operation(10, 10, "Multiply")}`);
    console.log(`División: ${await operation(6, 2, "Divide")}`);
}

operations();