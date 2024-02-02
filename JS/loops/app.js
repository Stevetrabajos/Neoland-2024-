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

//!----------------------------------------------------------------------------------------------------------------
//?-Comprueba en cada uno de los usuarios que tenga al menos dos trimestres aprobados y
//?-añade la propiedad ***isApproved*** a true o false en consecuencia.
//?-Una vez lo tengas compruébalo con un ***console.log***.
//?-( **Mirar abajo en pistas** ).
//?-Puedes usar este array para probar tu función:
//!-----------------------------------------------------------------------------------------------------------------------

const alumns = [
    { name: "Pepe Viruela", T1: false, T2: false, T3: true },
    { name: "Lucia Aranda", T1: true, T2: false, T3: true },
    { name: "Juan Miranda", T1: false, T2: true, T3: true },
    { name: "Alfredo Blanco", T1: false, T2: false, T3: false },
    { name: "Raquel Benito", T1: true, T2: true, T3: true },
]
    const avalua = (alumns)=>{
        
    let newarray = []
newarray.forEach((alumns)=>{
    let contador = 0
    for (let key in alumns){
        if (alumns[key]===true){
             contador++;
        }
    }
    if (contador>=2){
newarray.push(alumns, isapproved : true)
    }
else {
    newarray.push(alumns, isapproved : false)
}
    })
    return newarray
}
console.log(avalua(alumns))
    

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



//-------------------------------Iteration #6


const toys = [
    {id: 5, name: 'Buzz MyYear'}, 
    {id: 11, name: 'Action Woman'}, 
    {id: 23, name: 'Barbie Man'}, 
    {id: 40, name: 'El gato con Guantes'},
    {id: 40, name: 'El gato felix'}
    ]
        let newtoys= [];
for(const word of toys){
if (!word.name.includes("gato")){
newtoys.push(word);
}
}
console.log(newtoys)

//-------------------------------Iteration #7

const popularToys = [];
const toys2 = [
	{id: 5, name: 'Buzz MyYear', sellCount: 10}, 
	{id: 11, name: 'Action Woman', sellCount: 24}, 
	{id: 23, name: 'Barbie Man', sellCount: 15}, 
	{id: 40, name: 'El gato con Guantes', sellCount: 8},
	{id: 40, name: 'El gato felix', sellCount: 35}
]

for (venta of toys2){
 if(venta.sellCount>=15){
 popularToys.push(toys2)

return popularToys   
 }
}