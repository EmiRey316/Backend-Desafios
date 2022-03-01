const operation = async (num1: number, num2: number, operationType: string) => {
    let importedOperation = await import(`./OperationsClasses/${operationType}.js`);
    
    return new Promise((resolve) => {
        const eso = new operationType.default(num1, num2);
        resolve(eso.result(num1, num2));
    })
}


const operations = async () => {
    console.log(await operation(1, 2, "Sum"));
    // console.log(await operation(10, 5, "Substraction"));
    // console.log(await operation(10, 10, "Multiply"));
    // console.log(await operation(6, 2, "Divide"));
}

operations();