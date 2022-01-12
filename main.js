function random(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}




function generar(){
    let o = {
              
    }
    for (let i = 0; i < 1000; i++){
        let n = random(1,20)    
        if (n in o)
        o[n]++;
        else
        o[n]=1;
    }  
    return o;
}

let productos = [
    {id:1,nombre:'yerba',precio:123},
    {id:2,nombre:'azucar',precio:223}
    ,
    {id:3,nombre:'fideos',precio:323}
]

const nombres = productos.map(e => e.nombre).join(',');

const precioTotal = productos.map( e => e.precio).reduce((a,b) => a+b,0)
const promedio = precioTotal / productos.length
const ord = productos.sort((a,b)=> a.precio > b.precio ? -1:1)
const max = ord[0];
const min = ord[productos.length-1];

console.log("minimo=", min);
console.log("maximo=", max);
console.log("promedio=", promedio);
console.log(precioTotal);

const moment = require('moment');
let a = moment()
let b = moment([2001,04,27])
console.log(
    a.diff(b,'years')
);
console.log(
    a.diff(b,'days')
);