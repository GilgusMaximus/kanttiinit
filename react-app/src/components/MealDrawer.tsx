import React from "react";
import { Grid } from "@mui/material";
import { Meal as MealModel} from '../models/Meal'

class MealDrawer extends React.Component<{ meal: MealModel }> {
    render() {
        return (
            <Grid container item spacing={1} direction="column">
                <Grid item>
                    Lunch 1:
                </Grid>
                <Grid item ml={4}>
                    {this.props.meal.name}
                </Grid>
            </Grid>
        );
    }
}

export default MealDrawer