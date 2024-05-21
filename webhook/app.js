import express from "express";
import fs from "fs";

const filePath = "../webhooks.txt";
const app = express();
const PORT = 8000;

app.use(express.json());

app.post("/register", async (req, res) => {
  console.log("Received webhook:", req.body);
  const timestamp = new Date().toISOString();
  const { eventType, callbackUrl, amount } = req.body;
  const data = `Event type: ${eventType}\nCallback URL: ${callbackUrl}\nAmount: ${amount}\nTimestamp: ${timestamp}\n\n`;
  console.log("Webhook registered");
  try {
    await appendToFile(filePath, data);
    console.log("File created and data written successfully.");
    res.sendStatus(201);
  } catch (error) {
    console.error("Error writing to file:", error);
    res.sendStatus(500);
  }
});

app.delete("/unregister/:callbackUrl", async (req, res) => {
  const { callbackUrl } = req.params;
  try {
    await deleteCallbackUrlFromFile(filePath, callbackUrl);
    console.log("Callback URL deleted successfully.");
    res.sendStatus(200);
  } catch (error) {
    console.error("Error deleting callback URL:", error);
    res.sendStatus(500);
  }
});

app.get("/ping", async (req, res) => {
    try {
      const webhooks = await readWebhooksFromFile(filePath);
      console.log("Webhooks:", webhooks);
      res.json(webhooks);
    } catch (error) {
      console.error("Error reading webhooks from file:", error);
      res.sendStatus(500);
    }
  });

async function appendToFile(filePath, data) {
  return new Promise((resolve, reject) => {
    fs.appendFile(filePath, data, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

async function deleteCallbackUrlFromFile(filePath, callbackUrl) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      const lines = content.split("\n\n").map((line) => line.trim());
      const modifiedLines = lines.filter((line) => !line.includes(callbackUrl));
      const modifiedContent = modifiedLines.join("\n\n");
      fs.writeFile(filePath, modifiedContent, "utf-8", (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}

async function readWebhooksFromFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, content) => {
      if (err) {
        reject(err);
        return;
      }
      const webhooks = content.split("\n\n").map((line) => line.trim());
      resolve(webhooks);
    });
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
