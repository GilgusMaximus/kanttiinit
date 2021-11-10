import React from 'react'
import Meal from './Meal';
import { Grid } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'

class Meals extends React.Component<{ restaurant: RestaurantModel }> {
    render() {
        return (
            <Grid container item spacing={2} 
                direction="row"
                alignItems="flex-start"
            >
                <Grid item xs={1}> 
                    {/* Just padding */}
                </Grid>

                {this.props.restaurant.meals.map((m, index) => (
                    <Grid item> 
                        <Meal key={index} meal={m}/>
                    </Grid>
                ))}
            </Grid>
        );
    }
}

export default Meals
