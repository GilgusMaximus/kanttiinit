import React from 'react'
import Meal from './Meal';
<<<<<<< HEAD
import { Grid, Avatar } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import logo from '../images/restaurant-stock500.jpg';
=======
import { Grid } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'

>>>>>>> main
class Meals extends React.Component<{ restaurant: RestaurantModel }> {
    render() {
        return (
            <Grid container item spacing={2} 
                direction="row"
                alignItems="flex-start"
            >
                <Grid item xs={1}> 
<<<<<<< HEAD
                    {/* Just padding */
                    <Avatar src={logo} sx={{ width: 0.9, height: 0.9}}></Avatar>
                    }
=======
                    {/* Just padding */}
>>>>>>> main
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
