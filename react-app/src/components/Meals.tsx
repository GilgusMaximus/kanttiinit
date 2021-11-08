import React from 'react'
import Meal from './Meal';
import { Grid } from '@mui/material';

class Meals extends React.Component {
    render() {
        return (
            <Grid container item spacing={2} 
                direction="row"
                alignItems="flex-start"
            >
                <Grid item xs={1}> 
                    {/* Just padding */}
                </Grid>
                <Grid item> 
                    <Meal />
                </Grid>
                <Grid item>
                    <Meal />
                </Grid>
            </Grid>
            /* <div>
                <Stack direction="row" spacing={2}
                       divider={<Divider orientation="vertical" flexItem/>}
                >
                    {meals.map((m, index) => (
                        <Meal key={index} meal={m}/>
                    ))}
                </Stack>
            </div> */
        );
    }
}

export default Meals
