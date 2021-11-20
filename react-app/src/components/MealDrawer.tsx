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
                <Grid item ml={4}>
                    {this.props.meal.name} <em>{this.props.meal.getAllergies()}</em>
                </Grid>
                <Grid item>
                    {this.props.meal.url[0] ? (<img src={this.props.meal.url[0]} style={{ width: 200, margin: 10 }} />) : null}
                    {this.props.meal.url[1] ? (<img src={this.props.meal.url[0]} style={{ width: 200, margin: 10 }}/>) : null}
                    {this.props.meal.url[2] ? (<img src={this.props.meal.url[0]} style={{ width: 200, margin: 10 }}/>) : null}
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
