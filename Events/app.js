//1.1 Añade un botón a tu html con el id btnToClick y en tu javascript añade el evento click que ejecute un console log con la información del evento del click
const btnToClick = document.getElementById('btnToClick')

btnToClick.addEventListener('click', function(event){
    console.log('Evento de clic:', event);
})
//1.2 Añade un evento 'focus' que ejecute un console.log con el valor del input.

//1.3 Añade un evento 'input' que ejecute un console.log con el valor del input.