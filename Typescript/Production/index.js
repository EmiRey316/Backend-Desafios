"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
//Función que transforma el tipo de operación ingresado en el formato correcto. 
const transformOperationType = (operationType) => {
    return (operationType[0].toUpperCase() + operationType.slice(1).toLowerCase());
};
const operation = (num1, num2, operationType) => __awaiter(void 0, void 0, void 0, function* () {
    //Tranformo el parámetro operationType ingresado en el formato correcto.
    let operationTypeTransformed = transformOperationType(operationType);
    //Verifico si el tipo de operación ingresado se corresponde con uno de los habilitados.
    const possibleOperations = ["Sum", "Substraction", "Multiply", "Divide"];
    if (!possibleOperations.includes(operationTypeTransformed)) {
        return "La operación solicitada no es válida";
    }
    //Importación dinámica del módulo requerido.
    let importedOperation = yield import(`./OperationsClasses/${operationTypeTransformed}.js`);
    return new Promise((resolve) => {
        let newOperation = new importedOperation.default(num1, num2);
        resolve(newOperation.result(num1, num2));
    });
});
const operations = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield operation(1, 2, "invalid"));
    console.log(`Suma: ${yield operation(1, 2, "sum")}`);
    console.log(`Resta: ${yield operation(10, 5, "Substraction")}`);
    console.log(`Multiplicación: ${yield operation(10, 10, "multiply")}`);
    console.log(`División: ${yield operation(6, 2, "Divide")}`);
});
operations();
