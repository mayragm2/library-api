import express, { Request, Response, NextFunction } from "express";
import { sequelize } from "./db/connection.js";
import docsRouter from "./docs.js";
import routerBooks from './routes/books.routes.ts';
import routerAuthors from './routes/authors.routes.ts';
import routerAuth from "./routes/auth.routes.ts";
import "dotenv/config";
import { JwtPayload } from "jsonwebtoken";
import jwt from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload & { role?: string };
    }
  }
}

const app = express();
const PORT = 3000;

app.use(express.json()); // permite leer JSON del body en POST / PUT / PATCH

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware de autenticación
function authenticateToken(req: Request, res: Response, next:NextFunction) {
const authHeader = req.headers.authorization;
const token = authHeader?.split(" ")[1];
if (!token) return res.sendStatus(401);
const secret = process.env.JWT_SECRET;
if (!secret) return res.sendStatus(500);
jwt.verify(token, secret, (err:Error | null, payload:JwtPayload | string | undefined) => {
if (err) return res.sendStatus(403);
if (!payload || typeof payload === "string") return res.sendStatus(403);
req.user = payload;
next();
});
}
// Middleware de autorización por rol
function authorizeRole(role: string) {
return (req:Request, res:Response, next:NextFunction) => {
if (!req.user || req.user.role !== role) return res.sendStatus(403);
next();
};
}
// Ruta protegida: solo admins
app.get("/admin/dashboard", authenticateToken, authorizeRole("admin"), (req, res) => {
res.json({ message: "Bienvenido al panel de admin" });
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
app.use ("/auth", routerAuth);
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


