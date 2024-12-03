/** TEST Y MOCKS **/

//TDD: "Desarrollo Orientado a Pruebas". 
//Es una metodologia de desarrollo de software que consiste en pensar y escribir las pruebas que debe cumplir determinada función incluso antes de escribirla. 

//Si tengo que escribir una función que sume dos numeros- ¿Que pruebas deberia pasar para ganarantizar su correcto funcionamiento en la etapa de produccion?

//PASOS DEL TDD: 

//1) Escribir una prueba fallida: 

// const suma = (a, b) => {
//     return a + b; 
// }

//2) Hacer que pasen todos los test: 

// const suma = (a, b) => {

//     //TEST 2
//     if(!a || !b) {
//         return 0;
//     }

//     //TEST 1
//     if(typeof a !== "number" || typeof b !== "number") {
//         return null;
//     }


//     //TEST 3
//     return a + b; 

//     //TEST 4.. y ahora?
// }

//PARA RESOLVER EL TEST 4 VAMOS A TENER QUE MODIFICAR TODA LA FUNCIÓN PARA RECIBIR N PARAMETROS: 


// const suma = (...numeros) => {
//     //Debo retornar 0 si no recibo ningun elemento. 
//     if (numeros.length === 0) {
//         return 0;
//     }

//     //Retornal null si algun dato no es numerico:
//     let banderita = true;

//     for (let i = 0; i < numeros.length && banderita; i++) {
//         if (typeof numeros[i] !== "number") {
//             banderita = false;
//         }
//     }

//     if (banderita !== true) {
//         return null;
//     }

//     //TEST 3 Y 4: 
//     let resultado = 0;
//     for (let i = 0; i < numeros.length; i++) {
//         resultado += numeros[i]
//     }
//     return resultado;
// }


//3) Refactorizar. 
//Buscamos sintetizar y hacer más legible nuestro código. 

const suma = (...numeros) => {
    if(numeros.length === 0 ) return 0; 
    if(!numeros.every(num => typeof num === "number")) return null; 
    return numeros.reduce((acumulador, elemento) => acumulador + elemento, 0); 
}



//Ahora tenemos que pensar en multiples escenarios para poner a prueba nuestra función: 

//1. La función debe retornar null si algun parametro no es numerico. 
//2. La función debe retornar 0 si no se pasa ningun parametro. 
//3. La función debe poder realizar la suma correctamente. 
//4. La función debe poder hacer la suma con cualquier cantidad de números. 


let testPasados = 0;
let testTotales = 4;

//TEST 1: 
console.log("1. La función debe retornar null si algun parametro no es numerico.");
let resultado1 = suma("2", 3);
if (resultado1 === null) {
    console.log("Test 1 Pasado!");
    testPasados++;
} else {
    console.log("El test 1 no se pasó, se esperaba null pero se recibió: " + resultado1);
}

console.log("-----------------------------------------------------------");

//TEST 2: 
console.log("2. La función debe retornar 0 si no se pasa ningun parametro.");
let resultado2 = suma();
if (resultado2 === 0) {
    console.log("Test 2 pasado!");
    testPasados++;
} else {
    console.log("El test 2 no se pasó, se esperaba 0 pero se recibio: " + resultado2);
}

console.log("-----------------------------------------------------------");


//TEST 3: 
console.log("3. La función debe poder realizar la suma correctamente.");
let resultado3 = suma(2, 3);
if (resultado3 === 5) {
    console.log("Test 3 pasado!");
    testPasados++;
} else {
    console.log("El test 3 no paso, se esperaba un 5 pero se recibio: " + resultado3);
}

console.log("-----------------------------------------------------------");

//TEST 4: 

console.log("4. La función debe poder hacer la suma con cualquier cantidad de números.")
let resultado4 = suma(1, 2, 3, 4, 5);
if (resultado4 === 15) {
    console.log("Test 4 pasado!");
    testPasados++;
} else {
    console.log("El test 4 no paso, se esperaba 15 pero se recibio :" + resultado4);
}

if (testPasados === testTotales) {
    console.log("Felicitaciones, todos los test pasaron con exito, esto es lo tuyo, dale Peter por esos 20 años de convivencia!");
} else {
    console.log("Se pasaron " + testPasados + " de un total de: " + testTotales);
}