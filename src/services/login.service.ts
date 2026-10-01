import * as LoginRepository from "../repositories/login.repository.ts";

export async function Login(email:string, password:string) {
    const user:User = users.find((u) => u.email === email);
    if (!user) return res.status(400).json({ message: "Credenciales inválidas" });
    const passwordOk = await bcrypt.compare(password, user.passwordHash);
    if (!passwordOk) return res.status(400).json({ message: "Credenciales inválidas" });
    const token = jwt.sign({ email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1h",
    });
    res.json({ token });
    
}