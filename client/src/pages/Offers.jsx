import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton } from '@mui/material';
import http from '../http';
import { AccessTime, Search, Clear } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';

function Offers() {
  const [offersList, setOffersList] = useState([]);
  const [search, setSearch] = useState('');

  // onSearchChange sets the state based on the input value
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Function getOffers: call api to get all offers
  const getOffers = () => {
    http.get('/tutorial').then((res) => {
      setTutorialList(res.data);
    });
  };
  // Function searchTutorials: call api to search tutorials
  const searchOffers = () => {
    http.get(`/tutorial?search=${search}`).then((res) => {
      setTutorialList(res.data);
    });
  };

  // Function useEffect: call function getOffers
  useEffect(() => {
    getOffers();
  }, []);

  // Function onSeachKeyDown: when enter key is down, call function searchOffers
  const onSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      searchOffers();
    }
  };

  // Function onClickSearch: call function searchOffers
  const onClickSearch = () => {
    searchOffers();
  }

  // Function onClickClear: clear search state and call function getOffers
  const onClickClear = () => {
    setSearch('');
    getOffers();
  };
    

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

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Input value={search} placeholder="Search" 
         onChange={onSearchChange} onKeyDown={onSearchKeyDown}
        />
        <IconButton color="primary" onClick={onClickSearch}>
          <Search />
        </IconButton>

        <IconButton color="primary" onClick={onClickClear}>
          <Clear />
        </IconButton>
      </Box>

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
                        {dayjs(offers.createdAt).format(global.datetimeFormat)}
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