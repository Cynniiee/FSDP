import React, { useEffect, useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, Input, IconButton, Button }
  from '@mui/material';
import http from '../http';
import { AccessTime, Search, Clear, Edit } from '@mui/icons-material';
import dayjs from 'dayjs';
import global from '../global';
import { Link } from 'react-router-dom';

function Offers() {
  const [offersList, setOffersList] = useState([]);
  const [search, setSearch] = useState('');

  // onSearchChange sets the state based on the input value
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  // Function getOffers: call api to get all offers
  const getOffers = () => {
    http.get('/offers').then((res) => {
      setOffersList(res.data);
    });
  };
  // Function searchOffers: call api to search offers
  const searchOffers = () => {
    http.get(`/offers?search=${search}`).then((res) => {
      setOffersList(res.data);
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

        <Box sx={{ flexGrow: 1 }} />
        <Link to="/addOffers" style={{ textDecoration: 'none' }}>
          <Button variant='contained'>
            Add an offer
          </Button>
        </Link>

      </Box>

      <Grid container spacing={2}>
        {
          offersList.map((offers, i) => {
            return (
              <Grid item xs={12} md={6} lg={4} key={offers.id}>
                <Card>
                  <CardContent>



                    <Box sx={{ display: 'flex', mb: 1 }}>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {offers.brandName}
                      </Typography>

                      <Link to={`/editOffers/${offers.id}`}>

                        <IconButton color="primary" sx={{ padding: '4px' }}>
                          <Edit />
                        </IconButton>
                      </Link>
                    </Box>

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