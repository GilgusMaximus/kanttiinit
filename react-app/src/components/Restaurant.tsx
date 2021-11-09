import React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Meals from './Meals';
import { Grid, CardActionArea, Card, CardContent, Divider}  from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Price from './Price';


type onSelectRestaurantType = (sideBarState: boolean, openRestaurant: RestaurantModel) => void;

class Restaurant extends React.Component<
    { restaurant: RestaurantModel, onSelectRestaurant: onSelectRestaurantType },
    {}> {
    
    handleRestaurantSelection = () => {
        this.props.onSelectRestaurant(true, this.props.restaurant);
    }

    render() {    
        return (
            <Card elevation={4} sx={{ bgcolor: '#DFDFDF', borderRadius: 4, color: '#143642', minHeight: 200}}>
                <CardActionArea onClick={this.handleRestaurantSelection}>
                    <CardContent>
                        <Grid container spacing={2} direction="column">
                            {/* Header */}
                            <Grid container item spacing={2} direction="row" alignItems="center" justifyContent="centflex-starter">
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
                                    <Divider 
                                        sx={{
                                            background: '#143642',
                                            border: `1px solid #143642`,
                                            borderRadius: 1,
                                            height: '20px',
                                        }}
                                        orientation="vertical" 
                                        variant="middle"
                                        flexItem
                                    />
                                </Grid>
                                <Grid item>
                                    <Price restaurant={this.props.restaurant} />
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
