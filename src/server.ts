import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./db/connection.js";
import docsRouter from "./docs.js";
import routerBooks from './routes/books.routes.ts';
import routerAuthors from './routes/authors.routes.ts';
import routerLogin from "./routes/login.routes.ts";
import jwt from "jsonwebtoken";
import "dotenv/config";

const app = express();
const PORT = 3000;

app.use(express.json()); // permite leer JSON del body en POST / PUT / PATCH

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Ruta de prueba: si esto responde, el servidor está levantado.
app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Library API running", docs: `http://localhost:${PORT}/docs` });
});  

// Documentación interactiva del contrato (docs/openapi.yaml). Ya hecho.
app.use("/docs", docsRouter);

// 👇 Acá vas a montar tus routers:
app.use("/authors", routerAuthors);
app.use("/books", routerBooks);
app.use ("/login", routerLogin);
// app.use("/loans", loansRoutes);

// Ya hecho. Si un pedido falla con un error que nadie atrapó (por ejemplo, un error
// de la base), lo mostramos en la terminal en vez de apagar el servidor.
process.on("unhandledRejection", (error) => {
  console.error("❌ Unhandled error:", error);
});

app.use((err:Error, req: Request, res:Response, next:NextFunction) => {
  console.error(err);
  res.status(500).json({ error: 'Algo salió mal, intenta más tarde' });
});
async function start() {
  await sequelize.authenticate(); // falla si Postgres no está prendido, si la base `library` no existe o si la contraseña de src/db/connection.ts está mal
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
    console.log(`Docs available at    http://localhost:${PORT}/docs`);
  });
}

start();


