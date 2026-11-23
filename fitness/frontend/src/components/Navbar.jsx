import { NavLink } from 'react-router';
import { Menu, X, Home } from 'lucide-react';
import { useState } from 'react';
import Get from './methodIcons/Get';
import NavHeader from './navbar/NavHeader';
import NavItem from './navbar/NavItem';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav
            className={`w-screen ${open ? '' : 'h-14'} overflow-hidden bg-blue-600 md:w-60 md:h-screen`}
        >
            <button
                className="p-2 m-2 rounded-md hover:bg-blue-700 md:hidden"
                onClick={() => setOpen(!open)}
            >
                {open ? (
                    <X color="oklch(96% 0.002 17.2)" scale={24} />
                ) : (
                    <Menu color="oklch(96% 0.002 17.2)" scale={24} />
                )}
            </button>
            <NavHeader />
            <NavItem icon={<Home scale={24} color="oklch(96% 0.002 17.2)" />} page='Otthon' route="/" />
            <NavItem icon={<Get />} page='Bérletek' route='/lekerdezesek' />
            <NavItem icon={<Get />} page='Elérhető' route='/lekerdezesek/elerhetoek' />
            <NavItem icon={<Get />} page='Keresés' route='/lekerdezesek/kereses' />
            <NavItem icon={<Get />} page='Statisztika' route='/lekerdezesek/statisztika' />
            <NavItem icon={<Get />} page='Drágák' route='/lekerdezesek/dragak' />
        </nav>
    );
}

export default Navbar;
