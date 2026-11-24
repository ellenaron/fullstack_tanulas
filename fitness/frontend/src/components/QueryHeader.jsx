import React from 'react';

function QueryHeader(props) {
    return (
        <header className="flex gap-2 justify-start items-center">
            {props.icon}
            <h2 className="text-zinc-800 font-bold font-mono">{props.path}</h2>
        </header>
    );
}

export default QueryHeader;
