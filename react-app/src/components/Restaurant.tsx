import * as React from 'react';
import { useEffect } from "react";
import Requests from "../Requests";
import Meals from "./Meals";
import { Grid, Paper, Card, CardContent, Typography}  from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

type Props = {
    restaurant: any
}

const Restaurant: React.FC<Props> = ({restaurant}) => {
    const [state, setState] = React.useState({
        meals: []
    });

    useEffect(() => {
        Requests.fetchMeals(restaurant.name).then(response => {
            setState({meals: response})
        });
    }, [restaurant.name])

    return (
        <Paper elevation={3}>
            <Card>
                <CardContent>
                    <Grid container spacing={2} direction="row">
                        <Grid item>
                            <Typography variant="h4" component="div"> 
                                {restaurant.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div"> 
                                <HomeIcon onClick={event =>  window.location.href=restaurant.url} />                                
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div"> 
                                {restaurant.pricing}
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
    )
}

export default Restaurant
