import express, {Request, Response, NextFunction} from 'express';
import { router } from './routes';

const app = express();
app.use(express.json());
app.use(router);
app.use((err:Error, req:Request, res: Response, nex: NextFunction) => {
  if(err instanceof Error){
    res.status(400).json({
      error: err.message
  })
  }
  res.status(500).json({
    status: "Error",
    message: "Internal server error"
})
})

app.listen(3333, () => {
  console.log("Server running...")
})