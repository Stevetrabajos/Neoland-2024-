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