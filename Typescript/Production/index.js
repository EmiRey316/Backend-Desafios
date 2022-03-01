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
    let importedOperations = yield import("./basicOperations.js");
    console.log(Object.keys(importedOperations));
    return new Promise((resolve) => {
        switch (operationType) {
            case "sum":
                resolve(importedOperations.sum(num1, num2));
                break;
        }
    });
});
// class OperationsTestCase {
//     private num1: number;
//     private num2: number;
//     private operationType: string;
//     constructor(num1: number, num2: number, operationType: string) {
//         this.num1 = num1;
//         this.num2 = num2;
//         this.operationType = operationType;
//     }
// }
// let operationTestCase1 = new OperationsTestCase(1, 2, "sum");
const operations = () => __awaiter(void 0, void 0, void 0, function* () {
    console.log(yield operation(1, 2, "sum"));
    console.log(yield operation(10, 5, "substraction"));
    console.log(yield operation(10, 10, "multiply"));
    console.log(yield operation(6, 2, "divide"));
    console.log(yield operation(10, 3, "module"));
});
operations();
