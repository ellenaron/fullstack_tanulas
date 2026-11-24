import { Menu, X, Home } from 'lucide-react';
import { useState } from 'react';
import Get from './methodIcons/Get';
import NavHeader from './navbar/NavHeader';
import NavItem from './navbar/NavItem';

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <nav
            className={`w-screen overflow-hidden min-h-14 bg-blue-600 md:max-w-65 md:w-full md:h-screen`}
        >
            <div className='w-screen border-b-2 box-border border-taupe-100 md:hidden'>
                <button
                    className="p-2 m-2 rounded-md hover:bg-blue-700"
                    onClick={() => setOpen(!open)}
                >
                    {open ? (
                        <X color="oklch(96% 0.002 17.2)" scale={24} />
                    ) : (
                        <Menu color="oklch(96% 0.002 17.2)" scale={24} />
                    )}
                </button>
            </div>
            <NavHeader />
            <div className={`${open ? 'flex' : 'hidden'} flex-col fixed bg-blue-600 w-full md:static`}>
                <NavItem icon={<Home scale={24} color="oklch(96% 0.002 17.2)" />} page='Otthon' route="/" />
                <NavItem icon={<Get />} page='Bérletek' route='/lekerdezesek' />
                <NavItem icon={<Get />} page='Elérhető' route='/lekerdezesek/elerhetoek' />
                <NavItem icon={<Get />} page='Keresés' route='/lekerdezesek/kereses' />
                <NavItem icon={<Get />} page='Statisztika' route='/lekerdezesek/statisztika' />
                <NavItem icon={<Get />} page='Drágák' route='/lekerdezesek/dragak' />
            </div>
        </nav>
    );
}

export default Navbar;
