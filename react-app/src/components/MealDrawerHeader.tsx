import { Grid, IconButton, Typography } from '@mui/material';
import * as React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

type onDrawerCloseType = () => void;


class MealDrawerHeader extends React.Component<{
    restaurant: RestaurantModel,
    onDrawerClose: onDrawerCloseType,
    },
    {}> {
   render() {
        return(
            <Grid container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
            >
                <Grid item>
                    <IconButton onClick={this.props.onDrawerClose}>
                        <ChevronLeftIcon fontSize="inherit"/>
                    </IconButton>
                </Grid>
                <Grid item>
                    <Typography variant='h5'>
                        {this.props.restaurant.name}
                    </Typography>
                </Grid>
            </Grid>                   
        );
   }
}

export default MealDrawerHeader
