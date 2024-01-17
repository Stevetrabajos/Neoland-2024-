
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
    let nombres=[]
    let almacenador =[]
    let contador = 1
  array.sort()
    for (let i=0; i<array.length; i++){
      if (array [i+1] === array[i])
      contador++;
    
    else {
    nombres.push(array[i]);
      almacenador.push(contador);
      contador=1;
    }
  } 
  return ('los nombres: '+ nombres + ' se repiten '+ almacenador+ ' veces.')
  }
  console.log(repeatCounter(counterWords));