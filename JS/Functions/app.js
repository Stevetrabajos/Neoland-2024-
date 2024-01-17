//------------------------------------------------- #ITERATION 1

function sum(numberOne , numberTwo) {
    console.log (Math.max(numberOne, numberTwo))
  }
  sum (8,19)

//---------------------------------------------- #ITERATION 2 (for each)

const findLongestWord=(strings)=>{
  let mayor="";
  for (let i= 0 ; i<strings.length; i++ ){
    if (strings[i].length > mayor.length){
      mayor=strings[i];

    }
  }
  return mayor
}
let strings = ['Hulk', 'Thor', 'IronMan', 'Captain A.', 'Spiderman', 'Captain M.'];
console.log (findLongestWord(strings))


//----------------------------------------------- #ITERATION 3 


const sumAll=(numbers)=>{
  let suma = 0;
  for (let i= 0 ; i<numbers.length; i++){
  suma += numbers[i]
} 
return suma
}
let numbers = [1, 2, 3, 5, 45, 37, 58];
console.log (sumAll(numbers))


//--------------------------------------------- #ITERATION 4

let numbers2 = [12, 21, 38, 5, 45, 37, 6];
const average=(numbers2)=>{
  let suma = 0;
  for (i=0 ; i<numbers.length; i++){
  suma += numbers2[i]  
  }
  return suma/numbers2.length
}
console.log(average(numbers2))

//-------------------------------------------- #ITERATION 5

let mixedElements = [6, 1, "Rayo", 1, "vallecano", "10", "upgrade", 8, "hub"];

const averageWord=(mixedElements)=>{
  let strings = 0
  let numbers = 0
for (i=0; i<mixedElements.length; i++){
  if (typeof mixedElements[i]==="string"){
    strings = strings + mixedElements[i].length;
  }
  else if (typeof mixedElements[i]==="number"){
    numbers = numbers + mixedElements[i];
  }
}
return strings+numbers;
}

console.log (averageWord(mixedElements));


//------------------------------------------------------------------- ITERATION 6

const duplicates = [
  'sushi',
  'pizza',
  'burger',
  'potatoe',
  'pasta',
  'ice-cream',
  'pizza',
  'chicken',
  'onion rings',
  'pasta',
  'soda'
];

const sinduplicados= (array) =>{ //abrimos la función  para que recorra el array deseado, en este caso será duplicates
let arraysinduplicados= []// declaramos una nueva array que será la que muestre el resultado

for (let i =0; i<array.length; i++){ //realizamos el bucle "for" para que recorra la función progresivamente de la posición 0... hasta el final
if (!arraysinduplicados.includes(array[i])){ // declaramos la condición de que si el nuevo array "arraysindupliacados" no contiene la plabra del array que se esta iterando 
  arraysinduplicados.push(array[i])// se le haga un push de la misma, es decir, la añade a el array nuevo
}
}
return arraysinduplicados
}
console.log(sinduplicados(duplicates))
  //var sinduplicados= [...new Set(duplicates)]

//--------------------------------------------------------------Iteration #7
//**Iteración #7: Buscador de nombres**

/*Crea una función que reciba por parámetro un array y el valor que desea comprobar que existe dentro de dicho array - 
comprueba si existe el elemento, en caso que existan nos devuelve un true y la posición de dicho elemento y por la contra un false. 
Puedes usar este array para probar tu función:*/

  const nameFinder = [
    'Peter',
    'Steve',
    'Tony',
    'Natasha',
    'Clint',
    'Logan',
    'Xabier',
    'Bruce',
    'Peggy',
    'Jessica',
    'Marc'
  ];
  const finderNames = (arr, nombre) => {     
    if (arr.find(i => nombre === i)){ // declaramos a la función una condición en la que se encuentre, en el array deseado, el elemento que sea igual al que estamos buscando(nombre)
      console.log(true, arr.indexOf(nombre))// si es así la consola imprime true y, con el arr.indexOf, también la posición del array en la que se encuentra
      return
    } else {
      console.log(false)// si no lo encuentra imprime false
    }
  };

  const resultado = finderNames (nameFinder, 'Tony')


  //----------------------------------------------------------------Iteration #8

/*Iteration #8: Contador de repeticiones
Crea una función que nos devuelva el número de veces que se repite cada una de las palabras que lo conforma.  Puedes usar este array para probar tu función:*/

const counterWords = [
  'code',
  'repeat',
  'eat',
  'sleep',
  'code',
  'enjoy',
  'sleep',
  'code',
  'enjoy',
  'upgrade',
  'code'
];
const repeatCounter =(array)=>{
  let nombres=[]// array vacio donde se almacena cada nombre del array adjunto
  let almacenador =[]// array donde se almacena la cantidad de nombres repetidos en orden
  let contador = 1 //aquí guardaremos las cantidades que se suma si estan repetidos
array.sort()// ordenamos el array para que la funcion pueda ser iterada de forma correcta para el codigo establecido
  for (let i=0; i<array.length; i++){// iteramos el array
    if (array [i+1] === array[i]) // si el elemento es igual al elemento siguiente sumaremos al contador
    contador++;
  
  else {
  nombres.push(array[i]);// si no es igual se almacena en la lista de nombres y el contador será = 1 "solo existe un elemento no duplicado"
    almacenador.push(contador);
    contador=1;
  }
} 
return ('los nombres: '+ nombres + ' se repiten '+ almacenador+ ' veces.')
}
console.log(repeatCounter(counterWords));

