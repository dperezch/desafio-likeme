const { Pool } = require('pg');

const config = {
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBDATABASE,   
};

const pool = new Pool(config);

const ingresarPost = async(payload)=>{
    try {
        const text = 'INSERT INTO posts(usuario,url,descripcion,likes) VALUES($1,$2,$3,$4) RETURNING *';
        const values = [payload.usuario,payload.url,payload.descripcion,payload.likes];
        const queryObject = {
            text,
            values
        }
        const result = await pool.query(queryObject);
        return result;

    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
}

const sumarLikes = async(id)=>{
    try {
        const text = 'UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *';
        const values = [id];
        const queryObject = {
            text,
            values
        }
        const result = await pool.query(queryObject);
        return result;
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
};

const obtenerPosts = async()=>{
    try {
        const text = 'SELECT * FROM posts';
        const result = await pool.query(text);
        return result;
    } catch ({code}) {
        console.error(`Error: ${code}`);
    }
};


module.exports = {ingresarPost, obtenerPosts, sumarLikes};