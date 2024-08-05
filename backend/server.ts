import express, { Express, NextFunction, Request, Response } from "express"
import "express-async-errors"
import { routes } from "./src/routes"

const cors = require('cors')
const app: Express = express()
const port = 5000
const corsOptions = {
  origin: 'http://localhost:5173', // Substitua pelo URL do seu frontend
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true, // Se você estiver usando cookies ou autenticação
};
app.get('/', (req: Request, res: Response) => {
  res.send("Rodando Comanda Fácil")
})

app.use(express.json())
app.use(cors(corsOptions))
app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => {
  console.log(`Aplicação Rodando na porta: ${port}`)
})