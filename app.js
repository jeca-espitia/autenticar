var express = require('express');
var mongoose = require("mongoose");
var app = express();
var bcrypt = require('bcrypt');
var cookieSession = require('cookie-session')

app.use(cookieSession({
    secret: "session",
    maxAge: 24 * 60 * 60 * 1000
}))

app.use(express.urlencoded());
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, lowercase: true, required: true },
    password: { type: String, required: true },
}, {
    timestamps: true
});
var FormularioSi = mongoose.model("FormularioSi", usuarioSchema);

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });
mongoose.connection.on("error", function (e) { console.error(e); });

app.post('/register', async (req, res) => {
    var parametros = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    }
    const hash = await bcrypt.hash(parametros.password, 10);
    parametros.password = hash;
    FormularioSi.create(parametros, function (err) {
        if (err) return console.error(err);
        res.redirect('/login');
    });
});

app.get('/register', (req, res) => {
    var formulario = '<form action="/register" method="post" style="width:100px">' +
        '<label for="name"> Nombre </label> <input type="text" id="name" name="name">' +
        '<label for="email"> Email </label><input type="email" id="email" name="email">' +
        '<label for="password"> Contraseña </label> <input type="password" id="password" name="password"">' +
        '<button type="submit">Registrar</button>' +
        '</form>'
    res.send(formulario);
});

///////////////Login

app.post('/login', async (req, res) => {
    var parametroslog = {
        email: req.body.email,
        password: req.body.password,
    }
    FormularioSi.findOne({ "email": parametroslog.email }, function (err, usuario) {
        console.log(usuario);
        bcrypt.compare(parametroslog.password, usuario.password).then(function (compare) {
            if (compare === true) {
                req.session.userId = usuario._id;
                res.redirect("/");
            } else {
                res.redirect('/login');
            }
        });
    });
});

app.get('/logout', (req, res) => {
    req.session.userId = null
    res.redirect('/login');
});

app.get('/login', (req, res) => {
    var formulario = '<form action="/login" method="post" style="width:100px">' +
        '<label for="email"> Email </label><input type="email" id="email" name="email">' +
        '<label for="password"> Contraseña </label> <input type="password" id="password" name="password"">' +
        '<button type="submit">Login</button>' +
        '</form>'
    res.send('<p><a href="http://localhost:3000/register"> Registrarse </a></p>' + formulario);
});

///////////////////7
function publicar(res) {
    FormularioSi.find(function (err, lista) {
        if (err) return console.error(err);
        console.log(lista);
        let result = "<table><thead><th>Name</th><th>Email</th></thead>"
        lista.forEach(lista => {
            result += "<tr><td>" + lista.name + "</td><td>" + lista.email + "</td></tr>";
        })
        result += '</table>';
        res.send('<p><a href="/logout"> Salir </a></p>' + result);
    });
}


    app.get('/', (req, res) => {  
        if (req.session.userId != null){
            publicar(res);
        } else{
            res.redirect('/login');   
        }
    
   })


app.listen(3000, () => console.log('Listening on port 3000!'));
