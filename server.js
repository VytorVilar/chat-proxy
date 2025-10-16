// server.js
import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_KEY = process.env.OPENAI_KEY;

app.post("/chat", async (req, res) => {
  const pergunta = req.body.pergunta || "";

  try {
    const resposta = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "Você é um assistente técnico de segurança do trabalho." },
          { role: "user", content: pergunta }
        ]
      })
    });

    const dados = await resposta.json();
    res.json({ resposta: dados.choices?.[0]?.message?.content || "Sem resposta" });
  } catch (erro) {
    res.status(500).json({ resposta: "Erro ao conectar ao servidor." });
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log("Servidor rodando na porta " + PORT));
