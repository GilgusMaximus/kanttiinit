import * as React from 'react';
import { useEffect } from "react";
import Requests from "../Requests";
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Meals from "./Meals";
import { Grid, Paper, Card, CardContent, Typography}  from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

class Restaurant extends React.Component<{ restaurant: RestaurantModel }> {
    render() {    
        return (
            <Paper elevation={3}>
                <Card>
                    <CardContent>
                        <Grid container spacing={2} direction="row">
                            <Grid item>
                                <Typography variant="h4" component="div"> 
                                    {this.props.restaurant.name}
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" component="div"> 
                                    <HomeIcon onClick={event =>  window.location.href=this.props.restaurant.url!} />                                
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography variant="h4" component="div"> 
                                    {this.props.restaurant.pricing}
                                </Typography>
                            </Grid>
                        </Grid>
                        {/* {restaurants.map((res, index) => (
                            <Grid item key={index} sm={4}>
                                Restaurant: <a href={restaurant.url}>{restaurant.name}</a> - {restaurant.pricing}/3
                            </Grid>
                        ))}
                        </Grid>
                        <Typography variant="h4" component="div"> 
                            Restaurant: <a href={restaurant.url}>{restaurant.name}</a> - {restaurant.pricing}/3
                        </Typography> */}
                        {/* <Meals meals={state.meals}/> */}
                    </CardContent>
                </Card>
            </Paper>
        );
    }
}

export default Restaurant
