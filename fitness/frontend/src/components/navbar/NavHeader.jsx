import fitnesslogo from '../../assets/fitnesslogo.jfif';

function NavHeader() {
    return (
        <div className="hidden md:flex border-b-2 border-taupe-100 justify-start items-center text-taupe-100 p-4 gap-4">
            <img
                src={fitnesslogo}
                alt="Fitness logo"
                className="aspect-square w-22 rounded-md"
            />
            <p>Fittness API</p>
        </div>
    );
}

export default NavHeader;
