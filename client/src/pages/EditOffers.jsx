import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';

function EditOffers() {
    // useParams hook returns an object of the dynamic params from the current URL
    const { id } = useParams();

    useEffect(() => {
        http.get(`/tutorial/${id}`).then((res) => {
            console.log(res.data);
        });
    }, []);

    return (
        <div>EditOffers</div>
    )
}

export default EditOffers