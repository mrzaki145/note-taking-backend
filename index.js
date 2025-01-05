import dotenv from "dotenv";
import { app } from "./src/config/app.js";
import { requireAuth } from "./src/middleware/auth.js";
import { errorHandler } from "./src/middleware/errorHandler.js";
import { notFoundHandler } from "./src/middleware/notFoundHandler.js";
import { authRouter } from "./src/routes/auth.js";
import { notesRouter } from "./src/routes/notes.js";

dotenv.config();

const port = process.env.PORT || 3000;

// Auth routes (public)
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/notes", requireAuth, notesRouter);

app.get("/hello", (req, res) => {
  res.json({ message: "Hello, world!" });
});

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
