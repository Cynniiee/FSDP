// Admin's side car management (Product & Order Management) - Jiayee

import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button } from '@mui/material';
import http from '../http';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Cars() {
    const [carList, setCarList] = useState([]);
    const [search, setSearch] = useState('');

    const onSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const getCars = () => {
        http.get('/cars').then((res) => {
            setCarList(res.data);
        });
    };

    const searchCars = () => {
        http.get('/cars?search=${search}').then((res) => {
            setCarList(res.data);
        });
    };

    useEffect(() => {
        getCars();
    }, []);

    const onSearchKeyDown = (e) => {
        if (e.key === "Enter") {
            searchCars();
        }
    };

    const onClickSearch = () => {
        searchCars();
    }

    const onClickClear = () => {
        setSearch('');
        getCars();
    };


    useEffect(() => {
        http.get('/cars').then((res) => {
            console.log(res.data);
            setCarList(res.data);
        });
    }, []);

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Cars
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
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/addcar" style={{ textDecoration: 'none' }}>
                    <Button variant='contained'>
                        Add
                    </Button>
                </Link>
            </Box>


            <Grid container spacing={2}>
                {
                    carList.map((car, i) => {
                        return (
                            <Grid item xs={12} md={6} lg={4} key={car.id}>
                                <Card>
                                    <CardContent>
                                        <Box sx={{ display: 'flex', mb: 1 }}>
                                            <Typography variant="h6" sx={{ flexGrow: 1 }}>
                                                {car.carPlateNumber}
                                            </Typography>
                                            <Link to={`/editcar/${car.id}`}>
                                                <IconButton color="primary" sx={{ padding: '4px' }}>
                                                    <Edit />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                            color="text.secondary">
                                            <AccessTime sx={{ mr: 1 }} />
                                            <Typography>
                                                {dayjs(car.createdAt).format(global.datetimeFormat)}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {car.carLastMaintained}
                                        </Typography>
                                        <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                                            {car.carLease}
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

export default Cars;