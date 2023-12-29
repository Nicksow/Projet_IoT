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

app.post("/restaurantCommand/deleteAll/:tableId", (req, res)=>{
    const tableId = req.params.tableId
    db.run('DELETE FROM RestaurantCommand WHERE tableId = ? ', [tableId],(err, row) => {
        res.json(row);
    })
    db.run('UPDATE TableNumber SET show = 0, time = null WHERE name = ?', [tableId], (err, row) => {
        res.json(row);
    })
})
app.post("/takeAwayCommand/deleteAll/:id", (req, res)=>{
    const TAid = req.params.id
    db.run('DELETE FROM TakeAwayCommand WHERE TAid = ? ', [TAid],(err, row) => {
        res.json(row);
    })
    db.run('DELETE FROM TakeAway WHERE id = ? ', [TAid],(err, row) => {
        res.json(row);
    })
})

app.post("/restaurantCommand/showKitchen/:tableId", (req, res)=> {
    const tableId = req.params.tableId
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const formattedTime = formatter.format(now);
    db.run('UPDATE TableNumber SET show = 1, time = ? WHERE name = ?', [formattedTime, tableId], (err, row) => {
        res.json(row);
    })
})
app.post("/takeAwayCommand/showKitchen/:id", (req, res)=> {
    const TAid = req.params.id
    db.run('UPDATE TakeAway SET show = 1 WHERE id = ?', [TAid], (err, row) => {
        res.json(row);
    })
})
app.get("/takeAway",(req, res) => {
    db.all('SELECT * FROM TakeAway', (err, row) => {
        res.json(row);
    })
})
app.post("/takeAway/add", (req, res)=>{
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('fr-FR', { hour: '2-digit', minute: '2-digit' });
    const formattedTime = formatter.format(now);
    db.run('INSERT INTO TakeAway (time) VALUES (?)', [formattedTime], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAway/setTime/:id", (req, res)=>{
    const id = req.params.id
    const time = req.body.time
    db.run('UPDATE TakeAway SET wantedTime = ? WHERE id = ?', [time, id], (err, row) => {
        res.json(row);
    })
})
app.get("/takeAway/getTime/:id", (req, res)=>{
    const id = req.params.id
    db.all('SELECT wantedTime FROM TakeAway WHERE id = ?', [id], (err, row) => {
        res.json(row);
    })
})

app.get("/takeAway/getTotal/:id", (req, res)=>{
    const TAid = req.params.id

    db.all('SELECT SUM(Dishes.price) AS total FROM TakeAwayCommand JOIN Dishes on TakeAwayCommand.dishId = Dishes.id WHERE TakeAwayCommand.TAid = ?', [TAid], (err, row) => {
        res.json(row);
    })
})
//-------------------
//Gestion des soupes
//-------------------

app.post("/restaurantCommand/soup/add/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('INSERT INTO RestaurantCommand (tableId, dishId, dishType) VALUES (?, ?, ?)', [tableId, dishId, "soup"], (err, row) => {
        res.json(row);
    })
})
app.get("/restaurantCommand/soup/:tableId", (req, res)=>{
    const tableId = req.params.tableId
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "soup" AND tableId = ?  GROUP BY dishId', [tableId], (err, row) => {
        res.json(row);
    })
})

app.post("/restaurantCommand/soup/delete/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('DELETE FROM RestaurantCommand WHERE ROWID IN (SELECT ROWID FROM RestaurantCommand WHERE tableId = ? AND dishId = ? LIMIT 1)', [tableId,dishId], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAwayCommand/soup/add/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('INSERT INTO TakeAwayCommand (TAid, dishId, dishType) VALUES (?, ?, ?)', [TAid, dishId, "soup"], (err, row) => {
        res.json(row);
    })
})
app.get("/takeAwayCommand/soup/:id", (req, res)=>{
    const TAid = req.params.id
    db.all('SELECT TakeAwayCommand.dishId,Dishes.name,Dishes.price, COUNT(*) as count FROM TakeAwayCommand JOIN Dishes on TakeAwayCommand.dishId = Dishes.id WHERE TakeAwayCommand.dishType = "soup" AND TakeAwayCommand.TAid = ? GROUP BY TakeAwayCommand.dishId;', [TAid], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAwayCommand/soup/delete/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('DELETE FROM TakeAwayCommand  WHERE ROWID IN (SELECT ROWID FROM TakeAwayCommand  WHERE TAid = ? AND dishId = ? LIMIT 1)', [TAid,dishId], (err, row) => {
        res.json(row);
    })
})

//--------------------
//Gestion des entrées
//--------------------

app.post("/restaurantCommand/starter/add/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('INSERT INTO RestaurantCommand (tableId, dishId, dishType) VALUES (?, ?, ?)', [tableId, dishId, "starter"], (err, row) => {
        res.json(row);
    })
})
app.get("/restaurantCommand/starter/:tableId", (req, res)=>{
    const tableId = req.params.tableId
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "starter" AND tableId = ?  GROUP BY dishId', [tableId], (err, row) => {
        res.json(row);
    })
})

app.post("/restaurantCommand/starter/delete/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('DELETE FROM RestaurantCommand WHERE ROWID IN (SELECT ROWID FROM RestaurantCommand WHERE tableId = ? AND dishId = ? LIMIT 1)', [tableId,dishId], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAwayCommand/starter/add/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('INSERT INTO TakeAwayCommand (TAid, dishId, dishType) VALUES (?, ?, ?)', [TAid, dishId, "starter"], (err, row) => {
        res.json(row);
    })
})
app.get("/takeAwayCommand/starter/:id", (req, res)=>{
    const TAid = req.params.id
    db.all('SELECT TakeAwayCommand.dishId,Dishes.name,Dishes.price, COUNT(*) as count FROM TakeAwayCommand JOIN Dishes on TakeAwayCommand.dishId = Dishes.id WHERE TakeAwayCommand.dishType = "starter" AND TakeAwayCommand.TAid = ? GROUP BY TakeAwayCommand.dishId;', [TAid], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAwayCommand/starter/delete/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('DELETE FROM TakeAwayCommand WHERE ROWID IN (SELECT ROWID FROM TakeAwayCommand WHERE TAid = ? AND dishId = ? LIMIT 1)', [TAid,dishId], (err, row) => {
        res.json(row);
    })
})

//--------------------
//Gestion des plats
//--------------------

app.post("/restaurantCommand/main/add/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('INSERT INTO RestaurantCommand (tableId, dishId, dishType) VALUES (?, ?, ?)', [tableId, dishId, "main"], (err, row) => {
        res.json(row);
    })
})
app.get("/restaurantCommand/main/:tableId", (req, res)=>{
    const tableId = req.params.tableId
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "main" AND tableId = ?  GROUP BY dishId', [tableId], (err, row) => {
        res.json(row);
    })
})

app.post("/restaurantCommand/main/delete/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('DELETE FROM RestaurantCommand WHERE ROWID IN (SELECT ROWID FROM RestaurantCommand WHERE tableId = ? AND dishId = ? LIMIT 1)', [tableId,dishId], (err, row) => {
        res.json(row);
    })
})
app.post("/takeAwayCommand/main/add/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('INSERT INTO TakeAwayCommand (TAid, dishId, dishType) VALUES (?, ?, ?)', [TAid, dishId, "main"], (err, row) => {
        res.json(row);
    })
})
app.get("/takeAwayCommand/main/:id", (req, res)=>{
    const TAid = req.params.id
    db.all('SELECT TakeAwayCommand.dishId,Dishes.name,Dishes.price, COUNT(*) as count FROM TakeAwayCommand JOIN Dishes on TakeAwayCommand.dishId = Dishes.id WHERE TakeAwayCommand.dishType = "main" AND TakeAwayCommand.TAid = ? GROUP BY TakeAwayCommand.dishId;', [TAid], (err, row) => {
        res.json(row);
    })
})

app.post("/takeAwayCommand/main/delete/:id/:dishId", (req, res)=>{
    const TAid = req.params.id
    const dishId = req.params.dishId
    db.run('DELETE FROM TakeAwayCommand WHERE ROWID IN (SELECT ROWID FROM TakeAwayCommand WHERE TAid = ? AND dishId = ? LIMIT 1)', [TAid,dishId], (err, row) => {
        res.json(row);
    })
})

//--------------------
//Gestion des menu
//--------------------

app.post("/restaurantCommand/menu/add/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('INSERT INTO RestaurantCommand (tableId, dishId, dishType) VALUES (?, ?, ?)', [tableId, dishId +" m", "menu"], (err, row) => {
        res.json(row);
    })
})
app.get("/restaurantCommand/menu/:tableId", (req, res)=>{
    const tableId = req.params.tableId
    db.all('SELECT dishId, COUNT(*) as count FROM RestaurantCommand WHERE dishType = "menu" AND tableId = ?  GROUP BY dishId', [tableId], (err, row) => {
        res.json(row);
    })
})

app.post("/restaurantCommand/menu/delete/:tableId/:dishId", (req, res)=>{
    const tableId = req.params.tableId
    const dishId = req.params.dishId
    db.run('DELETE FROM RestaurantCommand WHERE ROWID IN (SELECT ROWID FROM RestaurantCommand WHERE tableId = ? AND dishId = ? LIMIT 1)', [tableId,dishId], (err, row) => {
        res.json(row);
    })
})
app.listen(3001, () => {
    console.log('App listening on port 3001!');
});