import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';

function EditOffers() {
    // useParams hook returns an object of the dynamic params from the current URL
    const { id } = useParams();
    

    const [offers, setOffers] = useState({
        brandName: "",
        offerTitle: "",
        numberOfPoints: ""
    });

    useEffect(() => {
        http.get(`/offers/${id}`).then((res) => {
            console.log(res.data);
            setOffers(res.data);
        });
    }, []);

    const formik = useFormik({
        initialValues: offers,

        // formik parameter enableReinitialize is set to true, 
        // because the value of offers state will be changed 
        // after getting api response for the offers object

        // formik object will be used in the form
        enableReinitialize: true,

        validationSchema: yup.object({
            brandName: yup.string().trim()
                .min(1, 'Brand Name must be at least 1 character')
                .max(25, 'Brand Name must be at most 25 characters')
                .required('Brand Name is required'),

            offerTitle: yup.string().trim()
                .min(5, 'Offer Title must be at least 5 characters')
                .max(25, 'Offer Title must be at most 25 characters')
                .required('Offer Title is required'),

            numberOfPoints: yup.string().trim()
                .min(0, 'Number of Points must be at least 0 points')
                .max(1000000, 'Number of Points must be at most 1,000,000 points')
                .required('Number of Points is required')
        }),

        onSubmit: (data) => {
            data.brandName = data.brandName.trim();
            data.offerTitle = data.offerTitle.trim();
            http.put(`/offers/offers/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/offers");
                }).catch(function (err) {
                    // toast.error(`${err.response.data.message}`);
                    console.log(err);
                });
        }
    });

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Offer
            </Typography>

            <Box component="form" onSubmit={ formik.handleSubmit }>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Brand Name"
                    name="brandName"
                    value={formik.values.brandName}
                    onChange={formik.handleChange}
                    error={formik.touched.brandName && Boolean(formik.errors.brandName)}
                    helperText={formik.touched.brandName && formik.errors.brandName}
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Offer Title"
                    name="offerTitle"
                    value={formik.values.offerTitle}
                    onChange={formik.handleChange}
                    error={formik.touched.offerTitle && Boolean(formik.errors.offerTitle)}
                    helperText={formik.touched.offerTitle && formik.errors.offerTitle}
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Number of Points"
                    name="numberOfPoints"
                    value={formik.values.numberOfPoints}
                    onChange={formik.handleChange}
                    error={formik.touched.numberOfPoints && Boolean(formik.errors.numberOfPoints)}
                    helperText={formik.touched.numberOfPoints && formik.errors.numberOfPoints}
                />

                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update Offer
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditOffers