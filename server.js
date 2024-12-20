import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import postRoutes from './routes/posts.js';
dotenv.config();
const port=process.env.PORT;
const app=express();
app.use(express.json());
app.use((req,res,next)=>{
  console.log(req.path,req.method);
  next();
});

app.use('/api/posts',postRoutes);

async function connectDB() {
  try {
    mongoose.set('strictQuery', true);
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.messsage);
    process.exit(1);
  }
}
connectDB().then(()=>{app.listen(port, ()=>console.log('listening on port ${port}'));
}).catch(err=>console.log(err));
