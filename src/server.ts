import "dotenv/config";
import app from "./app";
import { connectToDatabase } from "./db";

const port = Number(process.env.PORT) || 3000;

const startServer = async (): Promise<void> => {
  try {
    await connectToDatabase();

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

void startServer();
