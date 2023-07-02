import React from 'react';
import { Box, Typography, TextField, Field, Button } from '@mui/material';

function AddOffers() {
    return (
        <Box>
            <Typography variant="h5" sx={{ my: 2 }}>
                Add an Offer
            </Typography>
            <Box component="form">
                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Brand Name"
                    name="brandName"
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Offer Title"
                    name="offerTitle"
                />

                <TextField
                    fullWidth margin="normal" autoComplete="off"
                    label="Offer Title"
                    name="offerTitle"
                />


                <Box sx={{ mt: 2 }}>
                    <Button variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </Box>
        </Box>)
}

export default AddOffers