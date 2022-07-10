class User {
    constructor(name = "Sin nombre", lastName = "Sin apellido") {
        this.name = name;
        this.lastName = lastName;
        this.books = [];
        this.pets = [];
    }

    //Retorna nombre completo del usuario.
    getFullName() {
        return `El nombre completo es ${this.name} ${this.lastName}`;
    }

    //Agrega nombre de mascota a usuario.
    addPet(petName = "Mascota") {
        this.pets.push(petName);
    }

    //Retorna cantidad de mascotas.
    countPets() {
        return this.pets.length;
    }

    //Agrega un libro a usuario.
    addBook(bookName = "Nombre desconocido", bookAuthor = "Autor desconocido") {
        this.books.push({
            name: bookName,
            author: bookAuthor
        })
    }

    //Retorna arreglo con los nombres de los libros de usuario.
    getBookNames() {
        return (this.books.map((book) => {return book.name}));
    }
}


const usuario = new User("Emiliano", "Rey");

console.log(usuario.getFullName());


usuario.addPet("Vintén");
usuario.addPet("Kira");
usuario.addPet("Neko");

console.log(usuario.countPets());


usuario.addBook("El camino de los reyes", "Brandon Sanderson");
usuario.addBook("El hombre que calculaba", "Malba Tahan");

console.log(usuario.getBookNames());