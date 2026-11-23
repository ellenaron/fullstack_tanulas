import { BrowserRouter, Routes, Route } from 'react-router';
import Navbar from './components/Navbar';
import Queries from './pages/Queries';
import Berletek from './pages/Berletek';
import Elerhetoek from './pages/Elerhetoek';
import Kereses from './pages/Kereses';
import Statisztika from './pages/Statisztika';
import Dragak from './pages/Dragak';
import Home from './pages/Home'

function App() {
    return (
        <BrowserRouter>
            <div className='h-screen w-screen flex flex-col md:flex-row'>
                <Navbar />
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/lekerdezesek" element={<Queries />}>
                        <Route index element={<Berletek />} />
                        <Route path="elerhetoek" element={<Elerhetoek />} />
                        <Route path="kereses" element={<Kereses />} />
                        <Route path="statisztika" element={<Statisztika />} />
                        <Route path="dragak" element={<Dragak />} />
                    </Route>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
