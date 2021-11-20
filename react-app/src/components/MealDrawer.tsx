import React from "react";

import {Grid, Typography} from "@mui/material";
import {Meal as MealModel} from '../models/Meal'

class MealDrawer extends React.Component<{ meal: MealModel }> {
    render() {
        return (
            <Grid container item spacing={1} direction="column">
                <Grid item>
                    <Typography>
                        {this.props.meal.category}
                    </Typography>
                </Grid>
                <Grid item ml={4}>
                    {this.props.meal.name}
                </Grid>
                {this.props.meal.dishes.map((dish, index) =>
                    <Grid item ml={4}>
                        <Typography>
                            {dish.name} <em>{dish.getAllergies()}</em>
                        </Typography>
                        <Grid item>
                            {dish.url[0] ? (<img src={dish.url[0]} style={{width: 200, margin: 10}}/>) : null}
                            {dish.url[1] ? (<img src={dish.url[1]} style={{width: 200, margin: 10}}/>) : null}
                            {dish.url[2] ? (<img src={dish.url[2]} style={{width: 200, margin: 10}}/>) : null}
                        </Grid>

                    </Grid>
                )}
            </Grid>
        );
    }
}

export default MealDrawer
