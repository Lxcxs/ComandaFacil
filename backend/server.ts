import express, { Express, NextFunction, Request, Response } from "express"
import "express-async-errors"
import { routes } from "./src/routes"

const app: Express = express()
const port = 5000

app.get('/', (req: Request, res: Response) => {
  res.send("Rodando Comanda Fácil")
})

app.use(express.json())

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