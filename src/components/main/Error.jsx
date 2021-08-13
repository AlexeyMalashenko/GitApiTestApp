import React from 'react';

const Error = (props) => {
    return (
        <div style={{textAlign: "center"}}>
            <button onClick={() => props.history.push(`/`)}>Go to main page</button>
            ERROR
        </div>
    );
};

export default Error;