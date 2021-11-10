import React from 'react'
import Restaurant from './Restaurant'
import { Grid, Box } from '@mui/material'
import { Restaurants as RestaurantsModel} from '../models/Restaurants'
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Requests from "../Requests";

type onSelectRestaurantType = (sideBarState: boolean, openRestaurant: RestaurantModel) => void;

class Restaurants extends React.Component<
    { restaurants: RestaurantsModel, onSelectRestaurant: onSelectRestaurantType },
    {}
> {

    render() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={2}
            >
                <Grid container spacing={2} direction="column" width="98%">
                    {this.props.restaurants.list.map((res, index) => (
                        <Grid item key={index} sm={4}>
                            <Restaurant key={index} restaurant={res} onSelectRestaurant={this.props.onSelectRestaurant}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
}

export default Restaurants
