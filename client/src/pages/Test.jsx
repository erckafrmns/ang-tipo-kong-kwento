import React, { useEffect } from 'react';
import axios from 'axios';

const Test = () => {
    useEffect(() => {
        axios.get('http://localhost:5000/ping') 
            .then(response => {
                console.log("Server Response:", response.data);
            })
            .catch(error => {
                console.error("Error communicating with the server:", error);
            });
    }, []);

    return <div>Check the console for server communication test!</div>;
};

export default Test;
