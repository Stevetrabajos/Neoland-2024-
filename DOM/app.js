1.1 Usa querySelector para mostrar por consola el botón con la clase .showme
const buttonshowme = document.querySelector (".showme")
console.log(buttonshowme)
1.2 Usa querySelector para mostrar por consola el h1 con el id #pillado
const h1pillado = document.querySelector ("#pillado")
console.log(h1pillado)
1.3 Usa querySelector para mostrar por consola todos los p
const allp = document.querySelectorAll("p")
console.log(allp)
1.4 Usa querySelector para mostrar por consola todos los elementos con la clase.pokemon
const allpokemonclass = document.querySelectorAll (".pokemon")
1.5 Usa querySelector para mostrar por consola todos los elementos con el atributo 
data-function="testMe".
const alldatafunction = document.querySelectorAll("[data-function='testme']")
1.6 Usa querySelector para mostrar por consola el 3 personaje con el atributo 
data-function="testMe".
const tercerelemento = alldatafunction[2]
console.log("3º elemento data function")
