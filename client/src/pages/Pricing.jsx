import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Typography from '@mui/material/Typography';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';

const tiers = [
    {
        title: 'Normal Price',
        price: '$13',
        description: [
            '4 Passenger Ride',
            'Regular 4 sitter size vehicle',
        ],
        buttonText: 'Select',
        buttonVariant: 'outlined',
    },
    {
        title: 'Eco-Share',
        subheader: 'Most popular',
        price: '6',
        description: [
            '2-4 Passengers',
            'Share with other',
        ],
        buttonText: 'Select',
        buttonVariant: 'outlined',
    },
    {
        title: '6 Sitter',
        price: '26',
        description: [
            '6 Passenger ride',
            'Larger Size vehicle',
        ],
        buttonText: 'Select',
        buttonVariant: 'outlined',
    },
];

const defaultTheme = createTheme();

export default function Pricing() {
    return (
        <ThemeProvider theme={defaultTheme}>
            <GlobalStyles styles={{ ul: { margin: 0, padding: 0, listStyle: 'none' } }} />
            {/* Hero unit */}
            <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 6, pb: 4 }}>
                <Typography
                    component="h1"
                    variant="h2"
                    align="center"
                    color="text.primary"
                    gutterBottom
                >
                    Type of Car
                </Typography>
                <Typography variant="h6" align="center" color="text.secondary" component="p">
                    Ride using Eco friendly cars that would not bring harm to the environment and help the earth stay green
                </Typography>
            </Container>
            <Container maxWidth="md" component="main" sx={{ pb: 6 }}>
                <Grid container spacing={7} alignItems="flex-end">
                    {tiers.map((tier) => (
                        <Grid
                            item
                            key={tier.title}
                            xs={12}
                            sm={tier.title === '6 Sitter' ? 12 : 6}
                            md={4}
                        >
                            <Card>
                                <CardHeader
                                    title={tier.title}
                                    subheader={tier.subheader}
                                    titleTypographyProps={{ align: 'center' }}
                                    action={tier.title === 'Eco-Share' ? <StarIcon /> : null}
                                    subheaderTypographyProps={{
                                        align: 'center',
                                    }}
                                    sx={{
                                        backgroundColor: (theme) =>
                                            theme.palette.mode === 'light'
                                                ? theme.palette.grey[200]
                                                : theme.palette.grey[700],
                                    }}
                                />
                                <CardContent>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'baseline',
                                            mb: 2,
                                        }}
                                    >
                                        <Typography component="h2" variant="h3" color="text.primary">
                                            ${tier.price}
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary">
                                            SGD
                                        </Typography>
                                    </Box>
                                    <ul>
                                        {tier.description.map((line) => (
                                            <Typography
                                                component="li"
                                                variant="subtitle1"
                                                align="center"
                                                key={line}
                                            >
                                                {line}
                                            </Typography>
                                        ))}
                                    </ul>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/login?price=${tier.price}`} style={{ textDecoration: 'none' }}>
                                        <Button fullWidth variant={tier.buttonVariant}>
                                            {tier.buttonText}
                                        </Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </ThemeProvider>
    );
}
