const products = ['Camiseta de Pokemon', 'Pantalón coquinero', 'Gorra de gansta', 'Camiseta de Basket', 'Cinrurón de Orión', 'AC/DC Camiseta']
const incluye = (products) =>{
    let array=[]
    for(i=0; i<products.length; i++){ 
        if(products[i].includes("Camiseta"))
        array.push(products[i])
    }
    return array
    }
    console.log(incluye(products))

    //------------------------------------------Iteration 2



//------------------------------------------------------Iteration 3

const placesToTravel = ['Japon', 'Venecia', 'Murcia', 'Santander', 'Filipinas', 'Madagascar']

for (let places of placesToTravel){
    console.log(places)   
}

//-----------------------------------------------------Iteration 4
const alien = {
    name: 'Wormuck',
    race: 'Cucusumusu',
    planet: 'Eden',
    weight: '259kg'
}
for ( let caracteristicas in alien){
    console.log("el alien tiene la característica " + caracteristicas + ": " + alien[caracteristicas])
}

//-------------------------------------------------- Iteration #4

const placesToTravel2 = [{
    id: 5, name: 'Japan'},
     {id: 11, name: 'Venecia'},
      {id: 23, name: 'Murcia'},
       {id: 40, name: 'Santander'},
        {id: 44, name: 'Filipinas'},
         {id: 59, name: 'Madagascar'}]

const poli = (placesToTravel2)=>{
    let Totravel=[]
for (let i=0; i<placesToTravel2.length; i++){
if(placesToTravel2[i].id!==11&&placesToTravel2[i].id!==40)
Totravel.push(placesToTravel2[i]);
}
return Totravel
}
console.log(poli(placesToTravel2))