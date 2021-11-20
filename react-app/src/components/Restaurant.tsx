import React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Meals from './Meals';
import { Grid, CardActionArea, Card, CardContent, Divider, CardMedia, Avatar, Stack}  from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Price from './Price';
import Rating from './Rating';
import a from '../images/restaurant-stock500.jpg';
import arvo from '../images/arvo.jpg';
import abloc from '../images/abloc.jpg';
import alvari from '../images/alvari.jpg';
import dipoli from '../images/dipoli.jpg';
import kvarkki from '../images/kvarkki.jpg';
import maukas from '../images/maukas.jpg';
import taffa from '../images/taffa.jpg';
import tieto from '../images/tieto.jpg';
import tuas from '../images/tuas.jpg';
import valimo from '../images/valimo.jpg';

type onSelectRestaurantType = (sideBarState: boolean, openRestaurant: RestaurantModel) => void;

const restaurantMapping: {} = {
    "Arvo": arvo,
    "Alvari": alvari,
    "Kvarkki": kvarkki,
    "Mau-Kas": maukas,
    "Computer Science Building": tieto,
    "A Bloc": abloc,
    "Täffä": taffa,
    "Aalto Valimo": valimo,
    "Dipoli Reima": dipoli,
    "TUAS": tuas,
}

class Restaurant extends React.Component<
    { restaurant: RestaurantModel, onSelectRestaurant: onSelectRestaurantType },
    {}> {
    
    handleRestaurantSelection = () => {
        this.props.onSelectRestaurant(true, this.props.restaurant);
    }

    render() {    
        return (
            <Card elevation={4} sx={{ bgcolor: '#DFDFDF', borderRadius: 4, color: '#143642', minHeight: 200}}>
                <CardActionArea onClick={this.handleRestaurantSelection} sx={{minHeight: 200}}>
                    <CardContent sx={{height: 1}}>
                        <Grid container spacing={2} direction="row" sx={{height: 1}}>
                            <Grid item>
                                <Stack direction="column" sx={{height: 1}}>
                                {/* @ts-ignore */}
                                    <Avatar src={(this.props.restaurant.name) ? restaurantMapping[this.props.restaurant.name]  : a} sx={{height: 150, width: 150}}></Avatar>
                                </Stack>
                            </Grid>
                            <Grid item>
                                <Stack direction="column" spacing={2}>
                                    <Grid container direction="row" spacing={3}> 
                                        <Grid item>
                                        <ChevronRightIcon fontSize="inherit" />
                                        <span style={{fontSize: 'large'}}>
                                            {this.props.restaurant.name}
                                        </span>
                                        </Grid>
                                        <Grid item>
                                        <Rating 
                                            restaurant={this.props.restaurant}
                                            allowSubmission={false} 
                                            color='#143642'
                                        />  
                                        </Grid>
                                        <Grid item>
                                        <Divider 
                                        sx={{
                                            background: '#143642',
                                            border: `1px solid #143642`,
                                            borderRadius: 1,
                                            height: '20px',
                                        }}
                                        orientation="vertical"
                                        flexItem
                                        />
                                        </Grid>
                                        <Grid item>
                                            <Price restaurant={this.props.restaurant} />
                                        </Grid>
                                    </Grid>
                                    <Meals restaurant={this.props.restaurant} />
                                </Stack>
                            </Grid>

                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default Restaurant
