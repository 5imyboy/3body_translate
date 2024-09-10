import express from "express"
import mysql from "mysql2"
import dotenv from "dotenv"
import cors from "cors"

const sqlapp = express()
sqlapp.use(cors())
sqlapp.use(express.json())

sqlapp.listen(8080, () => {
  console.log("listening...")
})

dotenv.config()
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "translate"
})

sqlapp.get("/", (req, res) => {
  const q = "SELECT * FROM threeBody";
  con.query(q, (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data });
  })
})

sqlapp.get("/:page_number", (req, res) => {
  const id = req.params.page_number;
  const q = "SELECT * FROM threeBody WHERE page_number=?"
  con.query(q, [id], (err, data) => {
    if (err) return res.json({ error: err.sqlMessage });
    else return res.json({ data })
  })
})
