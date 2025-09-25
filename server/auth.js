import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, findUserByUsername } from "./controllers/productsControllers.js";
import dotenv from "dotenv"
dotenv.config();
const SECRET = process.env.SECRET
export const signup = async (req, res) => {
  const { email , name, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const result = await createUser(email , name, hashed);
  if (result.success) res.json(result);
  else res.status(400).json(result);
};
export const signin = async (req, res) => {
  const { email , name, password } = req.body;
  const user = await findUserByUsername(email);
  if (!user) return res.status(400).json({ message: "User not found" });
  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid password" });
  const token = jwt.sign({ id: user.id, email }, SECRET, { expiresIn: "1h" });
  res.json({ message: "Login successful", token, email });
};
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
