import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Queries from './pages/Queries';
import Berletek from './pages/Berletek';
import Elerhetoek from './pages/Elerhetoek';
import Kereses from './pages/Kereses';
import Statisztika from './pages/Statisztika';
import Dragak from './pages/Dragak';

function App() {
    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route path="/lekerdezesek" element={<Queries />}>
                    <Route index element={<Berletek />} />
                    <Route path="elerhetoek" element={<Elerhetoek />} />
                    <Route path="kereses" element={<Kereses />} />
                    <Route path="statisztika" element={<Statisztika />} />
                    <Route path="dragak" element={<Dragak />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
