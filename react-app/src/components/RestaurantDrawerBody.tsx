import { Grid, Box, IconButton, Typography, Divider } from '@mui/material';
import * as React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import MealDrawer from './MealDrawer';


class RestaurantDrawerHeader extends React.Component<{ restaurant: RestaurantModel}, {}> {
   render() {
        return(
            <Grid container
                direction="column"
                alignItems="flex-begin"
                display="flex"
                color="#FFFFFF"
                p={4}
                spacing={4}
            >
                {this.props.restaurant.meals.map((m, index) => (
                    <Grid item> 
                        <MealDrawer key={index} meal={m}/>
                    </Grid>
                ))}
            </Grid>
        );
   }
}

export default RestaurantDrawerHeader
