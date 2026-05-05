import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;
  const SECRET = "techbridge-secret-key-2024";

  app.use(express.json());

  // In-memory databases
  const users: any[] = [];
  const jobs: any[] = [
    { id: '1', title: 'Desarrollador Junior Fullstack', company: 'TechFlow Solutions', type: 'Full-time', location: 'Remoto (Colombia)', requirements: ['React', 'Node.js', 'SQL'], createdAt: '2024-05-01' },
    { id: '2', title: 'Pasante QA', company: 'Global Soft', type: 'Internship', location: 'Medellín', requirements: ['Testing', 'Python'], createdAt: '2024-05-02' }
  ];
  const applications: any[] = [];

  // --- API Routes ---

  app.post("/api/register", async (req, res) => {
    const { name, email, password, age } = req.body;
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ message: "El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password: hashedPassword,
      age: parseInt(age),
      role: email.includes('admin') ? 'admin' : 'user',
      createdAt: new Date()
    };

    users.push(newUser);
    res.status(201).json({ message: "Usuario creado" });
  });

  app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, SECRET, { expiresIn: '1h' });
    
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        age: user.age,
        role: user.role
      }
    });
  });

  app.get("/api/jobs", (req, res) => {
    res.json(jobs);
  });

  app.post("/api/jobs", (req, res) => {
    const job = { ...req.body, id: Date.now().toString(), createdAt: new Date().toISOString().split('T')[0] };
    jobs.push(job);
    res.status(201).json({ ok: true, job });
  });

  app.post("/api/applications", (req, res) => {
    applications.push(req.body);
    res.status(201).json({ ok: true });
  });

  // --- Vite Middleware ---
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
