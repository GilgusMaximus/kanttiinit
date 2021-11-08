import React from "react";
import { Grid } from "@mui/material";
import { Meal as MealModel} from '../models/Meal'

class Meal extends React.Component<{ meal: MealModel }> {
    render() {
        return (
            <Grid container item spacing={2} direction="column">
                <Grid item>
                    Lunch 1:
                </Grid>
                <Grid item>
                    &ensp;{this.props.meal.name}
                </Grid>
            </Grid>
        );
    }
}

export default Meal
