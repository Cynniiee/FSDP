import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import http from '../http';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Box, Typography, TextField, Button } from '@mui/material';



function EditEvent() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [events, setEvent] = useState({
        title: "",
        description: "",
        constraints: "",
        status: "0",
        evdate: " "
    });
    useEffect(() => {
        http.get(`/events/${id}`).then((res) => {
            console.log(res.data);
            setEvent(res.data);
        });
    }, []);
    const formik = useFormik({
        initialValues: events,
        enableReinitialize: true,
        validationSchema: yup.object({
            title: yup.string().trim()
                .min(3, 'Title must be at least 3 characters')
                .max(100, 'Title must be at most 100 characters')
                .required('Title is required'),
            description: yup.string().trim()
                .min(3, 'Description must be at least 3 characters')
                .max(500, 'Description must be at most 500 characters')
                .required('Description is required'),
            constraints: yup.string().trim()
                .min(3, 'Constraints must be at least 3 characters')
                .max(500, 'Constraints must be at most 500 characters')
                .required('Constraints are required'),
            status: yup.boolean()
                .required('Status is required.'),
            evdate: yup.date()
                .required('A date is required.')
        }),
        onSubmit: (data) => {
            data.title = data.title.trim();
            data.description = data.description.trim();
            data.constraints = data.constraints.trim();
            http.put(`/events/${id}`, data)
                .then((res) => {
                    console.log(res.data);
                    navigate('/events')
                })
        }
    });
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Edit Event
            </Typography>
            <Box component="form" onSubmit={formik.handleSubmit}>
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Title"
                    name="title"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                    error={formik.touched.title && Boolean(formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Description"
                    name="description"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={formik.touched.description && Boolean(formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    multiline minRows={2}
                    label="Constraints"
                    name="constraints"
                    value={formik.values.constraints}
                    onChange={formik.handleChange}
                    error={formik.touched.constraints && Boolean(formik.errors.constraints)}
                    helperText={formik.touched.constraints && formik.errors.constraints}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Status"
                    name="status"
                    value={formik.values.status}
                    onChange={formik.handleChange}
                    error={formik.touched.status && Boolean(formik.errors.status)}
                    helperText={formik.touched.status && formik.errors.status}
                />
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Event Date"
                    name="evdate"
                    value={formik.values.evdate}
                    onChange={formik.handleChange}
                    error={formik.touched.evdate && Boolean(formik.errors.evdate)}
                    helperText={formik.touched.evdate && formik.errors.evdate}
                />
                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Edit
                    </Button>
                    <Button variant="contained" sx={{ ml: 2 }} color="error"
                        onClick={handleOpen}>
                        Delete
                    </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default EditEvent