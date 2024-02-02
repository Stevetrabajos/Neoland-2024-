//2.1 Inserta dinamicamente en un html un div vacio con javascript.
const newDiv =document.createElement("div")
//2.2 Inserta dinamicamente en un html un div que contenga una p con javascript.
document.body.appendChild(newDiv)
//usando template
//const template = `<div></div>`
document.body.innerHTML += `<div></div>`

//2.3 Inserta dinamicamente en un html un div que contenga 6 p utilizando un loop con javascript.
const segundodiv = document.createElement("div")

const newp = document.createElement("p")

newp.textContent = "Este es un parrafo dentro del div"

segundodiv.appendChild(newp)

document.body.appendChild(segundodiv)

const template = () =>
`<div>
<p>fhglkjhl4jglkfmlej</p>
</div>`
document.body.innerHTML += template()
//2.4 Inserta dinamicamente con javascript en un html una p con el texto 'Soy dinámico!'.
const div3 = document.createElement("div") //creamos div

//bucle for
for (let i =0; i<6; i++){
    const nuevoparrafo= document.createElement ("p")
    nuevoparrafo.textContent `Este es el nuevo texto ${i + 1}` 
    div3.appendChild (nuevoparrafo);
}
//!-------------------------------------------------------------

const divtemplate = document.createElement("div")

for (let i=0; i<6; i++)
divtemplate.innerHTML += `<p>este es parrafo número ${i+1}</p>`
//! Inner HTML para insertar template
document.body.appendChild(divtemplate)
//!------------------------------
const newPdinamic = document.createElement ("p")
newPdinamic.textContent("soy dinamico")
document.body.appendChild(newPdinamic)

//2.5 Inserta en el h2 con la clase .fn-insert-here el texto 'Wubba Lubba dub dub'.
const h2inserthere = document.querySelector("h2.fn-insert-here")
console.log(h2inserthere)
h2inserthere.textContent = "Wubba Lubba dub dub"
document.querySelector("h2.fn-insety-here").innerHTML = "Wubba Lubba dub dub"
//2.6 Basandote en el siguiente array crea una lista ul > li con los textos del array.
const apps = ['Facebook', 'Netflix', 'Instagram', 'Snapchat', 'Twitter'];
//**creamos la lista */

const ullist = document.createElement("ul")

apps.forEach((app) => {
const elementli=document.createElement("li")
elementli.textContent = app
ullist.appendChild(elementli)
})
document.body.appendChild(ullist);
//2.7 Elimina todos los nodos que tengan la clase .fn-remove-me
const allremoveme = document.querySelectorAll(".fn-remove-me")
//**recorremos la lista y los eliminamos 1 a 1 */

allremoveme.forEach((element)=>{
    element.remove()
})
//2.8 Inserta una p con el texto 'Voy en medio!' entre los dos div. 
	//Recuerda que no solo puedes insertar elementos con .appendChild.
const pvoyenmedio = document.createElement("p")
pvoyenmedio.textContent= "voy en medio"
const alldivinserthere = document.querySelectorAll("div.fn-insert-here")
console.log(alldivinserthere)
const secondDiv = alldivinserthere[1]
//2.9 Inserta p con el texto 'Voy dentro!', dentro de todos los div con la clase .fn-insert-here
const insertdiv = document.querySelectorAll ("div.fn-insert-here")
