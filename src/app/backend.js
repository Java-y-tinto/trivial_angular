const Express = require("express")
const MySQL = require("mysql")
const cors = require("cors")


const servidor = Express();

const conexion = MySQL.createConnection({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'esquema_trivial',
    insecureAuth: true
})
conexion.connect((err) =>{
    if (err) {
        console.error("Ha habido un error en la conexión a la base de datos: " + err)
    } else {
        console.log("Conexión con la base de datos exitosa")
    }
})

servidor.use(cors())

servidor.get('/prueba',async (req,res) => {
    await conexion.query('SELECT * FROM PREGUNTA',async (err,results) =>{
        if (err){
            console.error('Ha habido un error en la consulta SQL: ',err)
            res.status(500).send("Error en el servidor")
        } else {
            res.json(results)
        }
    })
})


servidor.get('/preguntas/:categoria',async (req,res) =>{
    const categoria = req.params.categoria
    console.log(categoria)
    await conexion.query('SELECT * FROM PREGUNTA WHERE categoriaPregunta=?',[categoria], async(err,resultado) =>{
        if(err){
            console.error("Ha habido un error al consultar la base de datos: " + err)
        } else {
            res.json(resultado)
        }
    })
})

const puerto = 3000
servidor.listen(puerto,async() => console.log("Escuchando en el puerto " + puerto))