import React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Meals from './Meals';
import { Grid, CardActionArea, Card, CardContent, Typography, IconButton}  from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


type onSelectRestaurantType = (sideBarState: boolean, openRestaurant: RestaurantModel) => void;

class Restaurant extends React.Component<
    { restaurant: RestaurantModel, onSelectRestaurant: onSelectRestaurantType },
    {}> {
    
    handleRestaurantSelection = () => {
        this.props.onSelectRestaurant(true, this.props.restaurant);
    }

    render() {    
        return (
            <Card elevation={4} sx={{ bgcolor: '#DFDFDF', borderRadius: 4}}>
                <CardActionArea onClick={this.handleRestaurantSelection}>
                    <CardContent>
                        <Grid container spacing={2} direction="column">
                            {/* Header */}
                            <Grid container item spacing={2} direction="row" alignItems="flex-start">
                                <Grid item>
                                    <div style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        flexWrap: 'wrap',
                                    }}>
                                        <ChevronRightIcon fontSize="inherit" />
                                        {this.props.restaurant.name}
                                    </div>
                                </Grid>
                                <Grid item>
                                    rating
                                </Grid>
                                <Grid item>
                                    price
                                </Grid>
                            </Grid>
                            {/* Meals */}
                            <Grid item>
                                <Meals restaurant={this.props.restaurant} />
                            </Grid>
                        </Grid>
                    </CardContent>
                </CardActionArea>
            </Card>
        );
    }
}

export default Restaurant
