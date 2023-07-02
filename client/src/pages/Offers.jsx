import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent } from '@mui/material';
import http from '../http';
import { AccessTime } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Offers() {
  const [offersList, setOffersList] = useState([]);

  useEffect(() => {
    http.get('/offers').then((res) => {
      console.log(res.data);
      setOffersList(res.data);
    });
  }, []);

  return (
    <Box>
      <Typography variant="h5" sx={{ my: 2 }}>
        Offers
      </Typography>

      <Grid container spacing={2}>
        {
          offersList.map((offers, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={offers.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 1 }}>
                      {offers.brandName}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                      color="text.secondary">
                      <AccessTime sx={{ mr: 1 }} />
                      <Typography>
                        {offers.createdAt}
                      </Typography>
                    </Box>

                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      {offers.offerTitle}
                    </Typography>

                    <Typography sx={{ whiteSpace: 'pre-wrap' }}>
                      {offers.numberOfPoints}
                    </Typography>

                  </CardContent>
                </Card>
              </Grid>
            );
          })
        }
      </Grid>

    </Box>
  )
}

export default Offers