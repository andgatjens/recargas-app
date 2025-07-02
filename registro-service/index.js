import express from 'express';
import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json()); // parsea application/json

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.post('/record', async (req, res) => {
  try {
    const { phone, amount } = req.body;

    if (!phone || !amount) {
      return res.status(400).send('Datos incompletos');
    }

    await db.collection('recargas').add({
      phone,
      amount,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log(`Recarga guardada para ${phone}`);
    res.status(200).send('OK');
  } catch (error) {
    console.error('Error al guardar recarga:', error);
    res.status(500).send('Error interno');
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
