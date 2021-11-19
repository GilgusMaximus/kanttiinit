import React from "react";
import { Grid, Typography } from "@mui/material";
import { Meal as MealModel} from '../models/Meal'

class MealDrawer extends React.Component<{ meal: MealModel }> {
    render() {
        return (
            <Grid container item spacing={1} direction="column">
                <Grid item>
                    <Typography>
                        {this.props.meal.category}
                    </Typography>
                </Grid>
                
                {this.props.meal.dishes.map((dish, index) =>
                    <Grid item  ml={4}>
                        <Typography>
                            {dish.name}
                        </Typography>
                    </Grid>
                )}
            </Grid>
        );
    }
}

export default MealDrawer