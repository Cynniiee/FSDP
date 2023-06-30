import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import http from '../http';
import { AccessTime } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function CarRentals() {
    const [carRentalList, setCarRentalList] = useState([]);

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