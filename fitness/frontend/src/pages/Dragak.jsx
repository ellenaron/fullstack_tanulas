import { useEffect, useState } from 'react';
import Get from '../components/methodIcons/Get';
import QueryHeader from '../components/QueryHeader';

function Dragak() {
    const [data, setData] = useState([]);
    const [pretty, setPretty] = useState(false);
    useEffect(() => {
        fetch('http://localhost:8080/berletek/dragak')
            .then((res) => res.json())
            .then((data) => setData(data.result))
            .catch((err) => console.error('Error: ', err));
    }, []);
    return (
        <div className="p-4">
            <QueryHeader icon={<Get />} path="/berletek" />
            <p>
                Az atabázisban található adatokból összeállít egy statisztikai
                összegzést. A típusokat nézni, hogy mi a nevük, hány bérlet
                hivatkozik rájuk, és mennyi az átlagos áruk.
            </p>
            <h3 className="text-zinc-800 font-bold my-2">Viszzatért body:</h3>
            <div className="w-full p-4 box-border border-2 border-zinc-500 rounded-md overflow-auto h-96 scrollbar-thumb-blue-600">
                <button
                    className="font-mono font-bold bg-blue-600 hover:bg-blue-700 text-taupe-200 py-2 px-4 rounded-md"
                    onClick={() => setPretty(!pretty)}
                >
                    {pretty ? 'Compact' : 'Pretty'}
                </button>
                <p>
                    {pretty
                        ? JSON.stringify(data)
                        : JSON.stringify(data, null, 2)}
                </p>
            </div>
            <table className="w-full my-4 border-spacing-2 border-zinc-400 border-separate rounded-md">
                <thead>
                    <tr className="bg-zinc-300">
                        <th className="font-mono text-zinc-800 rounded-md w-1/2">
                            Paraméter
                        </th>
                        <th className="font-mono text-zinc-800 rounded-md w-1/2">
                            Magyarázat
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            megnevezes
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            A bérlet megnevezése.
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            ar
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            A bérlet ára.
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            ervenyesseg_nap
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            Az érvényesség napjainak száma.
                        </td>
                    </tr>
                </tbody>
            </table>
            <h3 className="text-zinc-800 font-bold mt-4 mb-2">
                A body táblázatokba rendezve:
            </h3>
            <div className="h-96 overflow-y-auto rounded-md border-2 border-zinc-500 p-4 scrollbar-thumb-blue-600">
                {data.map((item) => (
                    <table
                        key={item.tipus_nev}
                        className="w-full mb-4 border-spacing-2 border border-zinc-400 border-separate rounded-md"
                    >
                        <thead>
                            <tr className="bg-zinc-300">
                                <th className="font-mono text-zinc-800 rounded-md w-1/2">
                                    Paraméter
                                </th>
                                <th className="font-mono text-zinc-800 rounded-md w-1/2">
                                    Érték
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    megnevezes
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.megnevezes}
                                </td>
                            </tr>
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    ar
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.ar}
                                </td>
                            </tr>
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    ervenyesseg_nap
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.ervenyesseg_nap}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}

export default Dragak;
