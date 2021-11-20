import React from 'react'
import Meal from './Meal';
import { Grid, Avatar } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant';

class Meals extends React.Component<{ restaurant: RestaurantModel }> {
    render() {
        return (
            <Grid container item spacing={2} 
                direction="row"
                alignItems="flex-start"
                wrap="nowrap"
            >
                {(this.props.restaurant.meals.length > 0)
                 ? this.props.restaurant.meals.map((m, index) => {
                    return (<Grid item zeroMinWidth> 
                        <Meal key={index} meal={m}/>
                    </Grid>)
                    })
                 :
                    <span>No meals available today</span>
                }
            </Grid>
        );
    }
}

export default Meals
