require('dotenv').config()
const express = require('express')
//const mysql2 = require('mysql2')
const pg = require ('pg')
const { Client } = pg
const app = express()
app.use(express.json())

const {
  PORT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_SCHEMA,
  DB_PORT,
  SSL
} = process.env


//postgresql
app.get('/lembretes', async (req, res) => {
  let client = null
  try{
    client = new Client({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_SCHEMA,
      port: DB_PORT,
    });
    client.connect()
    const { rows } = await client.query('SELECT * FROM tb_lembrete')
    res.json(rows)
  }
  catch(e){
    console.log(e)
    res.status(500).json({mensagem: "Deu erro"})
  }
  finally{
    await client.end()
  }

})
//mysql
// app.get('/lembretes', (req, res) => {
//   const connection = mysql2.createConnection({
//     host: DB_HOST,
//     user: DB_USER,
//     database: DB_SCHEMA,
//     password: DB_PASSWORD
//   })
//   connection.query(
//     'SELECT * FROM tb_lembrete',
//     (err, results, fields) => {
//       console.log(results)
//       res.json(results)
//     }
//   )
// })

app.listen(
  PORT,
  () => console.log(`Back executando na porta ${PORT}`)
)
