const express = require('express');
const session = require('express-session');
const MongoStore = require('connet-mongo')('session');

const MONGO_URL = 'mon'


_________________
usuarioSchema.pre('save', function (next) {
    const infoUsuario = this;
    if (!usuarioSchema.isModified('password')) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
            next(err);
        }
        bcrypt.hash(usuario.password, salt, null, (err, hash) => {
            if (err) { next(err) }
            usuario.password = hash;
            next();
        })
    })
})
bcrypt.compare("alguna-contraseña", hash).then(function(res) {   
    res == true }); 
bcrypt.compare("otra-contraseña", hash).then(function(res) {   
    res == false }); 



//


/////Encriptar la contraseña del usuario



//Para Registrar usuario
app.post('/register', (req, res) => {
    var parametros = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    Formulario.create(parametros, function (err) {
        if (err) return console.error(err);
        res.redirect('/')
    });
});
app.get('/register', (req, res) => {
    var formulario = '<form action="/register" method="post" style="width:100px">' +
        '<label for="nombre"> Nombre </label> <input type="text" id="nombre" name="name">' +
        '<label for="email"> Email </label><input type="email" id="email" name="email">' +
        '<label for="password"> Contraseña </label> <input type="password" id="password" name="password"">' +
        '<button type="submit">Registrar</button>' +
        '</form>'
    res.send(formulario);
});


/////////////////////

function publicar(res) {
    Formulario.find(function (err, lista) {
        if (err) return console.error(err);
        console.log(lista);
        let result = "<table><thead><th>Name</th><th>Email</th></thead>"
        lista.forEach(lista => {
            result += "<tr><td>" + lista.name + "</td><td>" + lista.email + "</td></tr>";
        })
        result += '</table>';
        res.send('<p><a href="http://localhost:3000/register"> Registrarse </a></p>' + result);
    });
}

app.get('/', (req, res) => {
    publicar(res);
});






