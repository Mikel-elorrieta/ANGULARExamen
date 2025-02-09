const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL datu-baserako konexioa sortu
const db = mysql.createConnection({
  // host: '127.0.0.1', // MySQL zerbitzariaren helbidea

  host: "localhost", // MySQL zerbitzariaren helbidea
  port: "3308", // Portua
  user: "admin", // MySQL erabiltzailea
  password: "", // MySQL pasahitza
  database: "gestion_eventos", // Datu-basearen izena
});

db.connect((err) => {
  if (err) {
    console.error("Errorea datu-basera konektatzean:", err);
    return;
  }
  console.log("Datu-basera konektatuta");
});

// Endpoints CRUD
app.get("/users", (req, res) => {
  const query = "SELECT * FROM usuarios";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/usersDelete/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/insertUser", (req, res) => {
  const newItem = req.body;
  const query = "INSERT INTO usuarios SET ?";
  db.query(query, newItem, (err, results) => {
    if (err) {
      console.error("Errorea erabiltzailea txertatzean:", err);
      res.status(500).send("Errorea erabiltzailea txertatzean");
      return;
    }
    console.log("Erabiltzailea txertatua:", results.insertId);
    res.send({ id: results.insertId, ...newItem });
  });
});




app.post("/updateUser", (req, res) => {

    console.log(req.body);
 
  const { id,  password, email, nombre, rol_castellano, rol_euskera } = req.body;
  const query = "UPDATE usuarios SET nombre = ?, email = ?, password = ?, rol_castellano = ?, rol_euskera = ? WHERE id = ?";

  const values = [nombre, email, password,rol_castellano,rol_euskera, id];
    db.query(query, values, (err, result) => {
        if (err) {
            console.error('Error al editar usuario:', err);
            return res.status(500).json({ success: false, message: 'Error al editar el usuario' });
        }
        res.status(201).json({ success: true, message: 'Usuario editado correctamente', id: result.insertId });
    });
});

app.get("/users/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results[0]);
  });
});

// Endpoints CRUD
app.get("/categorias", (req, res) => {
  const query = "SELECT * FROM categorias";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Endpoints CRUD
app.get("/eventos", (req, res) => {
  const query = "SELECT * FROM eventos";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Endpoints CRUD
app.get("/inscripciones", (req, res) => {
  const query = "SELECT * FROM inscripciones";
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const query = "SELECT * FROM usuarios WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) throw err;
    if (results.length > 0) {
      console.log(results[0]);
      res.send({ success: true, user: results[0] });
    } else {
      console.log("Invalid credentials");
      res.send({ success: false, message: "Invalid credentials" });
    }
  });
});

app.post("/lagunak", (req, res) => {
  const newItem = req.body;
  const query = "INSERT INTO lagunak SET ?";
  db.query(query, newItem, (err, results) => {
    if (err) throw err;
    res.send({ id: results.insertId, ...newItem });
  });
});

app.put("/lagunak/:id", (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  const query = "UPDATE lagunak SET ? WHERE id = ?";
  db.query(query, [updatedItem, id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

app.delete("/lagunak/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM lagunak WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Zerbitzaria hasieratu
const PORT = 3300;
app.listen(PORT, () => {
  console.log(`Zerbitzaria http://localhost:${PORT} -n martxan dago`);
});
