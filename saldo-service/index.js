import express from 'express';
import admin from 'firebase-admin';

admin.initializeApp();
const db = admin.firestore();

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('OK');
});

app.post('/updateSaldo', async (req, res) => {
  const { phone, amount } = req.body;

  if (!phone || !amount) {
    return res.status(400).json({ error: 'Parámetros inválidos' });
  }

  try {
    const saldoRef = db.collection('saldos').doc(phone);
    const doc = await saldoRef.get();

    if (!doc.exists) {
      await saldoRef.set({
        saldo: +amount,
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    } else {
      await saldoRef.update({
        saldo: admin.firestore.FieldValue.increment(+amount),
        updatedAt: admin.firestore.FieldValue.serverTimestamp(),
      });
    }

    res.status(200).json({ message: 'Saldo actualizado' });
  } catch (error) {
    console.error('Error actualizando saldo:', error);
    res.status(500).json({ error: 'Error interno' });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>
  console.log(`Saldo-service escuchando en puerto ${PORT}`)
);
