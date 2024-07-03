import express from 'express'
import cors from 'cors'
import  connectToDatabase from './config/db.js'
import categoryroutes from './routes/categoryroutes.js';
import subcategoryroutes from './routes/subcategoryroutes.js'
import packingroutes from './routes/packingroutes.js'
import productroutes from './routes/productroutes.js'
import stateroutes from './routes/stateroutes.js'
import cityroutes from './routes/cityroutes.js'
import arearoutes from './routes/arearoutes.js'
import loginroutes from './routes/loginroutes.js';
import branchesroutes from './routes/branchesroute.js'
import leadserveyroutes from './routes/leadserveyroutes.js'
import leadprocessingroutes from './routes/leadprocessingroutes.js';
import dotenv from 'dotenv'

dotenv.config()

const server = express();
const port = process.env.PORT || 8000;

server.use(cors({origin:"*"}));
server.use(express.json({limit:'50mb'}));
server.use('/uploads', express.static('uploads'));


connectToDatabase()

server.use('/category', categoryroutes)
server.use('/subcategory', subcategoryroutes)
server.use('/packing', packingroutes)
server.use('/products', productroutes)
server.use('/state', stateroutes)
server.use('/city', cityroutes)
server.use('/area', arearoutes)
server.use('/user', loginroutes )
server.use('/branches', branchesroutes)
server.use('/leadservey', leadserveyroutes)
server.use('/leadprocessing', leadprocessingroutes)



server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});