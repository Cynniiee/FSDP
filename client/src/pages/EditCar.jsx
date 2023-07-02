import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../http';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditCar() {
    const navigate = useNavigate();
    const { id } = useParams();

    const [car, setCar] = useState({
        carPlateNumber: "",
        carMakeModel: "",
        carLastMaintained: "",
        carLocation: "",
        carBattery: "",
        carRates: "",
        carLease: ""
    });
    useEffect(() => {
        http.get(`/cars/${id}`).then((res) => {
            setCar(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: car,
        enableReinitialize: true,
        validationSchema: yup.object({
            carPlateNumber: yup.string().trim()
                .min(8, 'Car plate number must be at least 8 characters')
                .max(10, 'Car plate number must be at most 10 characters')
                .required('Car plate number is required'),
            carMakeModel: yup.string().trim()
                .min(10, 'Car make and model must be at least 10 characters')
                .max(100, 'Car make and model must be at most 100 characters')
                .required('Car make and model is required'),
            carLastMaintained: yup.string().trim()
                .min(10, 'Car last maintained must be at least 10 characters')
                .max(100, 'Car last maintained must be at most 100 characters')
                .required('Car last maintained is required'),
            carLocation: yup.string().trim()
                .min(10, 'Car location must be at least 10 characters')
                .max(100, 'Car location must be at most 100 characters')
                .required('Car location is required'),
            carBattery: yup.number().min(0, 'Car battery must be at least 0')
                .max(100, 'Car battery must be at most 100')
                .required('Car battery is required'),
            carRates: yup.number().min(0, 'Car rates must be at least 0')
                .max(100, 'Car rates must be at most 100')
                .required('Car rates is required'),
            carLease: yup.string().trim()
                .min(8, 'Car lease must be at least 8 characters')
                .max(10, 'Car lease must be at most 10 characters')
                .required('Car lease is required')
        }),

        onSubmit: (data) => {
            data.carPlateNumber = data.carPlateNumber.trim();
            data.carMakeModel = data.carMakeModel.trim();
            data.carLastMaintained = data.carLastMaintained.trim();
            data.carLocation = data.carLocation.trim();
            data.carBattery = data.carBattery;
            data.carRates = data.carRates;
            data.carLease = data.carLease.trim();
            http.put(`/cars/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate('/cars');
                });
        }


    });
    const deleteCar = () => {
        http.delete(`/cars/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/cars");
            });
    }


    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Update Car
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Car's Plate Number"
                    name="carPlateNumber"
                    value={formik.values.carPlateNumber}
                    onChange={formik.handleChange}
                    error={formik.touched.carPlateNumber && Boolean(formik.errors.carPlateNumber)}
                    helperText={formik.touched.carPlateNumber && formik.errors.carPlateNumber}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Car's Make & Model"
                    name="carMakeModel"
                    value={formik.values.carMakeModel}
                    onChange={formik.handleChange}
                    error={formik.touched.carMakeModel && Boolean(formik.errors.carMakeModel)}
                    helperText={formik.touched.carMakeModel && formik.errors.carMakeModel}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Car's Last Maintain Date"
                    name="carLastMaintained"
                    value={formik.values.carLastMaintained}
                    onChange={formik.handleChange}
                    error={formik.touched.carLastMaintained && Boolean(formik.errors.carLastMaintained)}
                    helperText={formik.touched.carLastMaintained && formik.errors.carLastMaintained}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Car's Location"
                    name="carLocation"
                    value={formik.values.carLocation}
                    onChange={formik.handleChange}
                    error={formik.touched.carLocation && Boolean(formik.errors.carLocation)}
                    helperText={formik.touched.carLocation && formik.errors.carLocation}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    type="number"
                    label="Car's Battery"
                    name="carBattery"
                    value={formik.values.carBattery}
                    onChange={formik.handleChange}
                    error={formik.touched.carBattery && Boolean(formik.errors.carBattery)}
                    helperText={formik.touched.carBattery && formik.errors.carBattery}
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    type="number"
                    label="Car's Rates"
                    name="carRates"
                    value={formik.values.carRates}
                    onChange={formik.handleChange}
                    error={formik.touched.carRates && Boolean(formik.errors.carRates)}
                    helperText={formik.touched.carRates && formik.errors.carRates}
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Car's Lease"
                    name="carLease"
                    value={formik.values.carLease}
                    onChange={formik.handleChange}
                    error={formik.touched.carLease && Boolean(formik.errors.carLease)}
                    helperText={formik.touched.carLease && formik.errors.carLease}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={deleteCar}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditCar;