import { useState } from 'react';

const RechargeForm = () => {
  const [phone, setPhone] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(
        'https://recarga-api-443285121457.us-central1.run.app/api/recarga',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, amount }),
        }
      );

      if (res.ok) {
        alert('Recarga enviada');
        setPhone('');
        setAmount('');
      } else {
        alert('Error al enviar recarga');
      }
    } catch (err) {
      alert('Error de red');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='mb-1 block text-sm'>Número telefónico</label>
        <input
          type='tel'
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className='w-full rounded border border-textColor bg-bgColor px-3 py-2 text-textColor'
          placeholder='+506 8XXXXXXX'
        />
      </div>
      <div>
        <label className='mb-1 block text-sm'>Monto</label>
        <input
          type='number'
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className='w-full rounded border border-textColor bg-bgColor px-3 py-2 text-textColor'
          placeholder='1000'
        />
      </div>
      <button
        type='submit'
        className='w-full rounded bg-red-600 px-4 py-2 text-white transition hover:bg-red-800'
      >
        Recargar
      </button>
    </form>
  );
};

export default RechargeForm;
