import { NavLink } from 'react-router';

function NavItem(props) {
    return (
        <NavLink
            className={({ isActive }) =>
                `m-2 rounded-md text-taupe-100 flex py-2 px-4 gap-2 hover:bg-blue-700 justify-start items-center ${isActive ? 'bg-blue-700' : ''}`
            }
            to={props.route}
            end
        >
            {props.icon}
            <p>{props.page}</p>
        </NavLink>
    );
}

export default NavItem;
