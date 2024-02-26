import express, { Express, NextFunction, Request, Response } from "express"
import "express-async-errors"
import { routes } from "./src/routes"
import { AppError } from "./src/errors/AppError"

const app: Express = express()
const port = 7070

app.get('/', (req: Request, res: Response) => {
  res.send("Rodando Comanda Fácil")
})

app.use(express.json())

app.use(routes)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if(err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message
    })
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`
  })
})

app.listen(port, () => {
  console.log(`Aplicação Rodando na porta: ${port}`)
})