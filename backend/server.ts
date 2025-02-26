import express, { Express, NextFunction, Request, Response } from "express";
import "express-async-errors";
import { routes } from "./src/routes";
import http from "http"; // Importando http
import { Server } from "socket.io"; // Importando Socket.IO

const cors = require("cors");
const app: Express = express();
const port = 5000;

const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
    credentials: true,
  },
});

const clients: { [key: string]: any } = {};

io.on("connection", (socket) => {
  console.log("Novo cliente conectado: ", socket.id);
  
  // Armazena o socket para o cliente específico
  clients[socket.id] = socket;

  socket.on("newOrder", async (createdOrderData) => {
    console.log("Novo pedido recebido:", createdOrderData);

    io.emit("newOrderCreated", (createdOrderData));
  });

  socket.on("orderUpdated", async (updatedOrderData) => {
    console.log("Pedido atualizado:", updatedOrderData);

    io.emit("orderUpdated", updatedOrderData);
  });

  socket.on("newCustomerCreated", async (costumerData) => {
    console.log("Cliente criado:", costumerData);

    io.emit("costumerCreated", costumerData)
  })
  socket.on("CustomerTabClosed", async (tabData) => {
    console.log("Conta fechada:", tabData)
  })

  socket.on("disconnect", () => {
    console.log("Cliente desconectado: ", socket.id);
    delete clients[socket.id];
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Rodando Comanda Fácil");
});

app.use(express.json());
app.use(cors(corsOptions));
app.use(routes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

server.listen(port, () => {
  console.log(`Aplicação Rodando na porta: ${port}`);
});
