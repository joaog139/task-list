import express from "express";
import cors from "cors";
import pg from "pg";
import "dotenv/config";
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.REACT_APP_CONECTION_STRING,
  ssl: {
    rejectUnauthorized: false,
  },
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Erro ao conectar ao banco:", err);
  } else {
    console.log(
      "Banco de dados conectado com sucesso! Hora no banco:",
      res.rows[0].now,
    );
  }
});

const app = express();

app.use(cors());

app.use(express.json());

app.get("/tasks", async (req, res) => {
  try {
    const resultado = await pool.query("SELECT * FROM tasks ORDER BY id ASC");
    res.json(resultado.rows);
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro no servidor");
  }
});

app.post("/tasks", async (req, res) => {
  try {
    const { title, description } = req.body;
    const resultado = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description],
    );
    res.status(201).json(resultado.rows[0]);
  } catch (erro) {
    console.error(erro);
    res.status(500).send("Erro ao salvar tarefa");
  }
});

app.listen(3000, () => {});
