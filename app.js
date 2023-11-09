import dotenv from 'dotenv';
// connect configuration
dotenv.config();
import express from 'express';
import cors from 'cors';
import ConnectDb from './config/connectdb.js';
import UserRoutes from './routes/UserRoutes.js';

const app = express();
const port = process.env.PORT;
const DB_URL = process.env.DATABASE_URL;

//database connection
app.use(cors());
ConnectDb(DB_URL);

app.use(express.json());

// configure routes
app.use("/api/users", UserRoutes);

// configure server
app.listen(port, ()=>{
	console.log("server is running");
});