import { Outlet } from 'react-router';

function Queries() {
    return (
        <div className="w-full overflow-y-auto scrollbar-thumb-blue-600">
            <h1 className="text-2xl p-4 text-zinc-800 font-bold">
                Lekérdezések
            </h1>
            <p className="px-4">
                Itt találhatóak a REST API-ban elérhető útvonalak, és válaszaik.
            </p>
            <Outlet />
        </div>
    );
}

export default Queries;
