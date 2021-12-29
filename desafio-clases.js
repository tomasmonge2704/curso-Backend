class Usuario {
    constructor (nombre, apellido, libros, mascotas)
    {this.nombre = nombre;
    this.apellido = apellido;
    this.libros = [libros]
    this.mascotas = [mascotas]
    }

    getFullName(){
        console.log(`nombre completo del usuario: ${this.nombre} ${this.apellido}`)
    }
    addMascota(mascota){
    this.mascotas.push(mascota)
    console.log(`mascotas: ${this.mascotas}`)
    }
    countMascotas(){
        console.log(this.mascotas.length)
        
    }
    addBook(nombre, autor){
        const libro = {nombre:nombre, autor:autor};
        this.libros.push(libro)
        console.log(this.libros)
    }    
    getBookNames(){
        const nombreLibros = []
        this.libros.forEach(libro => {
            var cont = 0;
            cont = cont + cont;
            nombreLibros.push(libro.nombre);
        });
        console.log(nombreLibros);
    }
}

const Eduardo = new Usuario("eduardo", "montero",{nombre:"patolusito",autor: "el principito"},["gatos", "el principito",]);
console.log(Eduardo.getFullName());
console.log(Eduardo.addMascota("perro"));
console.log(Eduardo.countMascotas());
console.log(Eduardo.addBook("pepe","pablo"));
console.log(Eduardo.getBookNames());