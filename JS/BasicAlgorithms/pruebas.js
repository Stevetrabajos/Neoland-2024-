const alumns = [
  { name: "Pepe Viruela", T1: false, T2: false, T3: true },
  { name: "Lucia Aranda", T1: true, T2: false, T3: true },
  { name: "Juan Miranda", T1: false, T2: true, T3: true },
  { name: "Alfredo Blanco", T1: false, T2: false, T3: false },
  { name: "Raquel Benito", T1: true, T2: true, T3: true },
];

const modificarAlums = (array) => {
  const arrayCopy = [...array];
  arrayCopy.forEach((alumn) => {
    let contador = 0;
    for (let clave in alumn) {
      if (alumn[clave] === true) {
        contador++;
      }
    }
    if (contador >= 2) {
      arrayCopy.push({ ...alumn, isApproved: true });
    } else {
      arrayCopy.push({ ...alumn, isApproved: false });
    }
  });
  return arrayCopy;
};
const result = modificarAlums(alumns);
console.log(result);