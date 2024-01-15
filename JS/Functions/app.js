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