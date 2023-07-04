import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, TextField, Button } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';


function EditCard() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [card, setCard] = useState({
        cardname: "",
        cardnumber: "",
        CVV: ""
    });
    useEffect(() => {
        http.get(`/Card/${id}`).then((res) => {
            setCard(res.data);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const formik = useFormik({
        initialValues: card,
        enableReinitialize: true,

        validationSchema: yup.object().shape({
            cardname: yup.string().trim()
                .matches(/^[a-z ,.'-]+$/i, 'Invalid name')
                .min(3, 'Name must be at least 3 characters')
                .max(50, 'Name must be at most 50 characters')
                .required('Name is required'),

            cardnumber: yup.string()
            .matches(/^\d{16}$/, 'Card number must be a 16-digit number')
            .required('Card number is required'),

            CVV: yup.string()
            .label('CVC')
            .min(3)
            .max(4)
            .required(),
        }),

        onSubmit: (data) => {
            data.cardname = data.cardname.trim();
            data.cardnumber = data.cardnumber;
            data.CVV = data.CVV;
            // data.date = data.date;
            http.put(`/Card/${id}`, data)
                .then((res) => {
                    navigate("/display_card");
                });
        }
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const deleteCard = () => {
        http.delete(`/Card/${id}`)
            .then((res) => {
                console.log(res.data);
                navigate("/Card");
            });
    }

    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Card
            </Typography>
            <Box component="form" sx={{ maxWidth: '500px' }} onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Name"
                    name="cardname"
                    value={formik.values.cardname}
                    onChange={formik.handleChange}
                    error={formik.touched.cardname && Boolean(formik.errors.cardname)}
                    helperText={formik.touched.cardname && formik.errors.cardname}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Card Number"
                    name="cardnumber"
                    value={formik.values.cardnumber}
                    onChange={formik.handleChange}
                error={formik.touched.cardnumber && Boolean(formik.errors.cardnumber)}
                helperText={formik.touched.cardnumber && formik.errors.cardnumber}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="CVV"
                    name="CVV"
                    value={formik.values.CVV}
                    onChange={formik.handleChange}
                error={formik.touched.CVV && Boolean(formik.errors.CVV)}
                helperText={formik.touched.CVV && formik.errors.CVV}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Update
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen}>
                        Delete
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Delete Card
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this card?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="contained" color="inherit"
                                onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="contained" color="error"
                                onClick={deleteCard}>
                                Delete
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Box>
            </Box>
        </Box>
    );
}


export default EditCard
