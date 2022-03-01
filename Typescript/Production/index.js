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
const operation = (num1, num2, operationType) => __awaiter(void 0, void 0, void 0, function* () {
    let importedOperation = yield import(`./OperationsClasses/${operationType}.js`);
    return new Promise((resolve) => {
        const newOperation = new importedOperation.default(num1, num2);
        resolve(newOperation.result(num1, num2));
    });
});
const operations = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`Suma: ${yield operation(1, 2, "Sum")}`);
    console.log(`Resta: ${yield operation(10, 5, "Substraction")}`);
    console.log(`Multiplicación: ${yield operation(10, 10, "Multiply")}`);
    console.log(`División: ${yield operation(6, 2, "Divide")}`);
});
operations();
