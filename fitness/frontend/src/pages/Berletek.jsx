import { useEffect, useState } from 'react';
import Get from '../components/methodIcons/Get'
import QueryHeader from '../components/QueryHeader';

function Berletek() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch('http://localhost:8080/berletek')
            .then(res => res.json())
            .then(data => setData(data.result))
            .catch(err => console.error('Error: ', err));
    }, []);
    return(
        <div className='p-4'>
            <QueryHeader icon={<Get />} path="/berletek" />
            <h3 className='text-zinc-800 font-bold my-2'>Viszzatért body:</h3>
            <div className='w-full p-4 box-border border-2 border-zinc-800 rounded-md overflow-auto h-96'>{JSON.stringify(data)}</div>
        </div>
    );
}

export default Berletek;
