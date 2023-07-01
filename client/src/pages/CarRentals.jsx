// Client's side car rental (Product & Order Management) - Jiayee
// Stopped at prac 5, just before the adding new page for add rental. 

import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import http from '../http';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function CarRentals() {
    const [carRentalList, setCarRentalList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getCarRentals = () => {
        http.get('/carrentals').then((res) => {
            setCarRentalList(res.data);
        });
    };

    const searchCarRentals = () => {
        http.get('/carrentals?search=${search}').then((res) => {
            setCarRentalList(res.data);
        });
    };

    useEffect(() => {
        getCarRentals();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchCarRentals();
        }
    };

    const onClickSearch = () => {
        searchCarRentals();
    }

    const onClickClear = () => {
        setSearch('');
        getCarRentals();
    };
    


    useEffect(() => {
        http.get('/carrentals').then((res) => {
            console.log(res.data);
            setCarRentalList(res.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Car Rentals?!
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Input value={search} placeholder="Search"
                    onChange={onSearchChange} onKeyDown={onSearchKeyDown} />
                    
                <IconButton color="primary" onClick={onClickSearch}>
                    <Search />
                </IconButton>
                <IconButton color="primary" onClick={onClickClear}>
                    <Clear />
                </IconButton>
            </Box>


            <Grid container spacing={2}>
                {
                    carRentalList.map((carRental, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={carRental.id}>
                                <Card>
                                    <CardContent>
                                        <Typography variant="h6" sx={{ mb: 1 }}>
                                            {carRental.carPlateNumber}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(carRental.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>

                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {carRental.carLocation}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {carRental.carBattery}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })
                }
            </Grid>
        </Box>
    );
}

export default CarRentals;