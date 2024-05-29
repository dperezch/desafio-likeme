const express = require('express');
const {ingresarPost, sumarLikes, obtenerPosts} = require('./db');
const app = express();

app.listen(3000, () => {
    console.log("Escuchando puerto 3000");
});

app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/post', async (req, res) => {
    const {usuario,URL,descripcion} = req.body;
    const payload = {
        usuario,
        url: URL,
        descripcion,
        likes: 0,
    }
    try {
        const result = await ingresarPost(payload);
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});

app.put('/post', async (req, res) => {
    const {id} = req.query;
    try {
        const result = await sumarLikes(id);
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});

app.get('/posts', async (req, res) => {
    try {
        const result = await obtenerPosts();
        res.json(result.rows);
    } catch (error) {
        res.statusCode = 500;
        res.json({error:'Algo salió mal, inténtalo más tarde'})
    }
});
