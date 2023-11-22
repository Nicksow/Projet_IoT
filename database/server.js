const express = require('express');
const sqlite3 = require('sqlite3');
const cors = require('cors');
const app = express();

const db = new sqlite3.Database('./database/database.db',sqlite3.OPEN_READWRITE,(err) => {
    if (err) {
        console.error(`Error: ${err.message}`);
    }
    console.log('Connected to the database.');
});
app.use(express.json())
app.use(express.static("public"));
app.use(cors());

app.get("/tableNumber",(req, res) => {
    db.all('SELECT * FROM TableNumber', (err, row) => {
        res.json(row);
    })
})
app.get("/plats",(req, res) => {
    db.all('SELECT * FROM Dishes', (err, row) => {
        res.json(row);
    })
})
app.post("/restaurantCommand/soup/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('INSERT INTO RestaurantCommand (tableId, dishId, dishType) VALUES (?, ?, ?)', [tableId, dishId, "Soup"])
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "Soup" GROUP BY dishId', (err, row) => {
        res.json(row);
    })
})
app.get("/restaurantCommand/soup", (req, res)=>{
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "Soup" GROUP BY dishId', (err, row) => {
        res.json(row);
    })
})
app.listen(3001, () => {
    console.log('App listening on port 3001!');
});