import React from 'react'
import Restaurant from './Restaurant'
import { Grid, Box } from '@mui/material'
import { Restaurants as RestaurantsModel} from '../models/Restaurants'
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import Requests from "../Requests";

// const RestaurantWrapper = styled(Paper)(({theme}) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

type onSelectRestaurantType = (sideBarState: boolean, openRestaurant: RestaurantModel) => void;

class Restaurants extends React.Component<{ onSelectRestaurant: onSelectRestaurantType }, { restaurantList: RestaurantsModel }> {
    state = { restaurantList: new RestaurantsModel() };

    componentDidMount() {
        Requests.fetchRestaurants().then(response => {
            console.log("IN FETCHING", response);
            this.setState({ restaurantList: response });
        })
    }
    
    render() {
        return (
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                py={2}
            >
                <Grid container spacing={2} direction="column" width="98%">
                    {this.state.restaurantList.list.map((res, index) => (
                        <Grid item key={index} sm={4}>
                            <Restaurant restaurant={res} onSelectRestaurant={this.props.onSelectRestaurant}/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        );
    }
}

export default Restaurants
