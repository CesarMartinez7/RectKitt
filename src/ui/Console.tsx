import { AnimatePresence, motion } from 'motion/react';
import type React from 'react';
import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { JsonNode } from './formatter-JSON/Formatter';

export default function Console() {
  const [consoleText, setConsoleText] = useState(
    'https://jsonplaceholder.typicode.com/posts POST',
  );

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [history, setHistory] = useState<
    {
      command: string;
      output: object | string;
      dataResponse: Response | null | undefined;
      headers: unknown[];
    }[]
  >([]);
  const consoleRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consoleText.trim()) {
      toast.error('Por favor introduzca texto');
      return;
    }
    if (consoleText.split(' ').length > 4) {
      toast.error('Tal vez este mandando mas parametros de lo permitidos.');
      return;
    }

    setIsLoading((prev) => !prev);
    const [endpoint, method = 'GET', ...body] = consoleText.split(' ');
    const bodyString = body.join(' ');

    try {
      if (method.toUpperCase() !== 'GET') {
        const response = await fetch(endpoint, {
          method: method,
          body: bodyString,
        });
        const data = await response.json();
        const dataResponse = response;

        const headers: any[] = [];

        setHistory((prev) => [
          ...prev,
          {
            command: consoleText,
            output: data,
            dataResponse,
            headers: response.headers.forEach((e) => [...headers, e]),
          },
        ]);
        setIsLoading((prev) => !prev);
      } else {
        const response = await fetch(endpoint);
        const data = await response.json();
        const dataResponse = response;
        setHistory((prev) => [
          ...prev,
          { command: consoleText, output: data, dataResponse },
        ]);
      }
    } catch (error) {
      setIsLoading((prev) => !prev);
      setHistory((prev) => [
        ...prev,
        { command: consoleText, output: '❌ Error al hacer la petición' },
      ]);
    }
  };

  return (
    <div className="w-screen h-screen  backdrop-blur-3xl flex flex-col">
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            className="h-screen w-screen justify-center items-center flex absolute backdrop-blur-3xl z-[999] flex-col "
          >
            <span className="svg-spinners--gooey-balls-2"></span>
            Cargando ...
          </motion.div>
        )}
      </AnimatePresence>
      <div
        ref={consoleRef}
        className="flex-1 p-12 flex-col relative overflow-y-auto mask-b-from-90% mask-b-to-100% font-mono text-xs"
      >
        <span className="block my-4 gradient-text text-sm">
          Si quieres mas potencia puedes utilizar el cliente API de Kitten
        </span>
        <span>
          {`<ENPOINT - URL> `} <b className="text-amber-300">{`<METHOD>`}</b>{' '}
          <b className="text-indigo-500">{`<HEADERS>`}</b>{' '}
          <b className="text-rose-500">{`<BODY>`}</b>{' '}
        </span>
        {history.map((entry, index) => (
          <div key={index} className="mb-4">
            <div className="text-green-500 my-2 flex justify-between">
              $ {entry.dataResponse?.url}{' '}
              <span>{entry.dataResponse?.status}</span>{' '}
            </div>

            <div className="bg-zinc-900/80 p-4 shadow rounded-lg  ">
              <JsonNode data={entry.output} INDENT={12} />
            </div>
          </div>
        ))}
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full p-4 flex items-center gap-2 border-t border-zinc-900 "
      >
        <span className="text-green-500"> $ request ~</span>
        <input
          type="text"
          value={consoleText}
          autoFocus={true}
          onChange={(e) => setConsoleText(e.target.value)}
          className="flex-1 bg-zinc-900/50 p-2 rounded text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder='Ej: "https://jsonplaceholder.typicode.com/posts <METHOD> <BODY>"'
        />
      </form>
    </div>
  );
}
