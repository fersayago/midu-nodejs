// .js -> por defecto utiliza CommonJS
// .mjs -> por defecto utiliza ES Modules
// .cjs -> para utilizar CommonJS

import { sub, sum, mult, div } from './operations.mjs';

const firstValue = 2;
const secondValue = 3;

console.log(`SUMA: ${firstValue} + ${secondValue} = ${sum(firstValue, secondValue)}`);
console.log(`RESTA: ${firstValue} - ${secondValue} = ${sub(firstValue, secondValue)}`);
console.log(`MULTIPLICACIÓN: ${firstValue} * ${secondValue} = ${mult(firstValue, secondValue)}`);
console.log(`DIVISIÓN: ${firstValue} / ${secondValue} = ${div(firstValue, secondValue)}`);
