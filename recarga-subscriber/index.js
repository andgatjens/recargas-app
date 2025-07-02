import fetch from 'node-fetch';

const RECORD_SERVICE_URL = 'http://34.8.133.220/record';
const SALDO_SERVICE_URL = 'http://34.54.62.6/updateSaldo';

export const processRecarga = async (message, context) => {
  try {
    const data = JSON.parse(Buffer.from(message.data, 'base64').toString());
    console.log('Mensaje recibido:', data);

    const response = await fetch(RECORD_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(
        `Error HTTP al llamar a /record: ${response.status} ${response.statusText}`
      );
    }

    console.log('Recarga registrada correctamente');

    await updateSaldo(data.phone, data.amount);
  } catch (error) {
    console.error('Error procesando el mensaje:', error);
    throw error; // Permite reintentos automáticos
  }
};

async function updateSaldo(phone, amount) {
  try {
    const res = await fetch(SALDO_SERVICE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount: +amount }),
    });

    if (!res.ok) {
      console.error('Error actualizando saldo:', await res.text());
    } else {
      console.log('Saldo actualizado correctamente');
    }
  } catch (error) {
    console.error('Error en fetch a saldo-service:', error);
  }
}
