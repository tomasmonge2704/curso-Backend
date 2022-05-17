const { faker } = require('@faker-js/faker');

faker.locale = "es"

function generarProducto(id){
    return{
        id,
        name: faker.name.findName(),
        precio:faker.datatype.number({
            'min': 10,
            'max': 50
        }),
        imageURL:faker.image.avatar(),
    }
}

const productosFaker = []
for(let i = 0; i < 5; i++){
  productosFaker.push(generarProducto(i))  
}
module.exports = {
    productosFaker
}