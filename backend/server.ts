import express, { Express, NextFunction, Request, Response } from "express"
import { config } from "dotenv";
import "express-async-errors"

config();
const app: Express = express()
const port = process.env.PORT || 8000

app.get('/', (req: Request, res: Response) => {
  res.send("Rodando Comanda Fácil")
})

app.use(express.json())


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => {
  console.log(`Aplicação Rodando na porta: ${port}`)
})