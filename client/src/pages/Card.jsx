import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import http from '../http';
import { Box, Typography, TextField, Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';



function Card() {
    const [value, setValue] = React.useState(dayjs('YY-MM'));
    const navigate = useNavigate();
    const formik = useFormik({
        initialValues: {
            cardname: "",
            cardnumber: "",
            CVV: "",
            //date: ""
        },

        
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
            //data.date = data.date;
            http.post("/Card", data)
                .then((res) => {
                    console.log(res.data);
                    navigate("/");
                })
                .catch(function (err) {
                    toast.error(`${err.response.data.message}`);
                    console.log(err.response);
                });
        }
    });
    
    return (
        <Box sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
        }}>
            <Typography variant="h5" sx={{ my: 2 }}>
                Card Details
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
                
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateField', 'DateField']}>
                        <DateField
                            label="Dash separator"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                            format="MM-YY"
                        />
                    </DemoContainer>
                </LocalizationProvider>
                <Button fullWidth variant="contained" sx={{ mt: 2 }}
                    type="submit">
                    Add Card
                </Button>
            </Box>
            <ToastContainer />
        </Box>
    );
}

export default Card
