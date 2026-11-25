import QueryHeader from '../components/QueryHeader';
import { useState, useEffect } from 'react';
import Get from '../components/methodIcons/Get';

function Elerhetoek() {
    const [data, setData] = useState([]);
    const [pretty, setPretty] = useState(false);
    useEffect(() => {
        fetch('http://localhost:8080/berletek/elerheto')
            .then((res) => res.json())
            .then((data) => setData(data.result))
            .catch((err) => console.error('Error: ', err));
    }, []);
    return (
        <div className="p-4">
            <QueryHeader icon={<Get />} path="/berletek/elerheto" />
            <p>Lekérdezi az adatbázisból az összes elérhető bérletet.</p>
            <h3 className="text-zinc-800 font-bold my-2">Viszzatért body:</h3>
            <div className="w-full p-4 box-border border-2 border-zinc-500 rounded-md overflow-auto h-96 scrollbar-thumb-blue-600">
                <button className='font-mono font-bold bg-blue-600 hover:bg-blue-700 text-taupe-200 py-2 px-4 rounded-md' onClick={() => setPretty(!pretty)}>{pretty ? "Compact" : "Pretty"}</button>
                <p>{pretty ? JSON.stringify(data) : JSON.stringify(data, null, 2)}</p>
            </div>
            <table className="w-full my-4 border-spacing-2 border-zinc-400 border-separate rounded-md">
                <thead>
                    <tr className="bg-zinc-300">
                        <th className="font-mono text-zinc-800 rounded-md">
                            Paraméter
                        </th>
                        <th className="font-mono text-zinc-800 rounded-md">
                            Magyarázat
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            id
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            A bérlet egyedi azonosítója.
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            tipus_id
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            A típus azonosítója.
                        </td>
                    </tr>
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
                            Az érvényesség napjainak a száma.
                        </td>
                    </tr>
                    <tr className="hover:bg-zinc-300">
                        <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                            elerheto
                        </td>
                        <td className="border border-zinc-300 rounded-md p-2">
                            Az, hogy jelenleg elérhető-e a bérlet.
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
                        key={item.id}
                        className="w-full mb-4 border-spacing-2 border border-zinc-400 border-separate rounded-md"
                    >
                        <thead>
                            <tr className="bg-zinc-300">
                                <th className="font-mono text-zinc-800 rounded-md">
                                    Paraméter
                                </th>
                                <th className="font-mono text-zinc-800 rounded-md">
                                    Érték
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    id
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.id}
                                </td>
                            </tr>
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    tipus_id
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.tipus_id}
                                </td>
                            </tr>
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
                            <tr className="hover:bg-zinc-300">
                                <td className="font-mono font-semibold text-zinc-800 border border-zinc-300 rounded-md p-2">
                                    elerheto
                                </td>
                                <td className="border border-zinc-300 rounded-md p-2">
                                    {item.elerheto}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                ))}
            </div>
        </div>
    );
}

export default Elerhetoek;
