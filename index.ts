import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();

const PORT = process.env.PORT;

const app = express();

app.use(cors({ origin: '*'}));

app.get('/', (req, res) => {
    res.send('Addictive Media Assignment By Ankit Singh !');
});

app.listen(PORT, ()=>{
    console.log(`Server is running on PORT ${PORT}`)
});




