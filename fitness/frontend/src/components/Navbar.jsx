import { NavLink } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav className={`w-screen ${open ? "" : "h-10"} overflow-hidden bg-blue-600 md:w-50 md:h-screen`}>
            <button className="p-2 hover:bg-blue-700 md:hidden" onClick={() => setOpen(!open)}>
                {open ? (
                    <X color="oklch(96% 0.002 17.2)" scale={24} />
                ) : (
                    <Menu color="oklch(96% 0.002 17.2)" scale={24} />
                )}
            </button>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/"
            >
                <p>Otthon</p>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/lekerdezesek"
            >
                <p>Bérletek</p>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/elerhetoek"
            >
                <p>Elérhető</p>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/kereses"
            >
                <p>Keresés</p>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/statisztika"
            >
                <p>Statisztika</p>
            </NavLink>
            <NavLink
                className={({ isActive }) =>
                    `text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ""}`
                }
                to="/dragak"
            >
                <p>Drágák</p>
            </NavLink>
        </nav>
    );
}

export default Navbar;
