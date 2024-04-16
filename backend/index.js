require("dotenv").config();
const cors = require("cors");
const { Sequelize, Model, DataTypes } = require("sequelize");
const express = require("express");
const app = express();
const pgp = require("pg-promise")(/* options */);
const db = pgp(
  `postgres://${process.env.USERNAME}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`
);
const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    port: process.env.PORT,
    dialect: process.env.DIALECT || "postgres",
  }
);

//middelware json y cors
app.use(express.json());
app.use(cors());

//Declaracion del Modelo (tablas de la DB)
class Note extends Model {}
Note.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    important: {
      type: DataTypes.BOOLEAN,
    },
    date: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "note",
  }
);
// Inicializar tabla si no existe en la DB
Note.sync();

//endpoint all notes
app.get("/api/notes", async (req, res) => {
  const notes = await Note.findAll();
  //console.log(notes.map(n=>n.toJSON()))
  res.json(notes);
});

//endpoint create note
app.post("/api/notes", async (req, res) => {
  console.log(req.body);
  const note = await Note.create(req.body);
  res.json(note);
});

// obtener una nota
app.get("/api/notes/:id", async (req, res) => {
  const note = await Note.findByPk(req.params.id);
  if (note) {
    console.log(note.toJSON());
    res.json(note);
  } else {
    res.status(404).end();
  }
});

const start = async () => {
  app.listen(3001, () => {
    console.log(`Server running on port ${3001}`);
  });
};

start();
