import { useContext } from 'react';
import { ThemeContext } from './contexts';
import { ThemeContextInterface } from './types';
import RechargeForm from './components/RechargeForm';

function App() {
  const { darkTheme, toggleTheme } = useContext(
    ThemeContext
  ) as ThemeContextInterface;

  return (
    <div className='flex h-screen w-screen items-center justify-center bg-bgColor text-textColor transition-colors'>
      <div className='w-full max-w-md rounded-md bg-textColor p-8 text-bgColor shadow-md'>
        <div className='mb-6 flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Recargas</h1>
          <button
            onClick={toggleTheme}
            className='rounded border border-textColor bg-bgColor px-3 py-1 text-sm text-textColor transition hover:bg-opacity-80'
          >
            {darkTheme ? 'Modo Light' : 'Modo Dark'}
          </button>
        </div>
        <RechargeForm />
      </div>
    </div>
  );
}

export default App;
