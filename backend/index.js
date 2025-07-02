import express from 'express';
import { PubSub } from '@google-cloud/pubsub';
import cors from 'cors';

const app = express();
const pubsub = new PubSub();

const TOPIC_NAME = 'recarga-topic';

app.use(cors());
app.use(express.json());

app.post('/api/recarga', async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Parámetros faltantes' });
  }

  const dataBuffer = Buffer.from(JSON.stringify({ phone, amount }));

  try {
    await pubsub.topic(TOPIC_NAME).publishMessage({ data: dataBuffer });
    res.status(200).json({ message: 'Mensaje publicado en Pub/Sub' });
  } catch (err) {
    console.error('Error publicando en Pub/Sub:', err);
    res.status(500).json({ error: 'Fallo al publicar mensaje' });
  }
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Servidor corriendo en puerto ${port}`));
