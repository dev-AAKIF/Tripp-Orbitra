
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv'; 
import itineraryRoutes from "./Routes/Itenary.routes.js";

dotenv.config({ path: "./.env" });

const app = express()
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: "2mb" }))
app.use(express.static("public"))

app.use(
  cors({
    origin:process.env.ORIGIN || "http://localhost:5173" ,
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"], 

  })
);

app.use("/api/itineraries", itineraryRoutes);

export default app
