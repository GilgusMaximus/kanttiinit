import React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import { Grid, Button, Card, CardContent, Typography, IconButton}  from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

class Restaurant extends React.Component<{ restaurant: RestaurantModel }> {
    render() {    
        return (
            <Card elevation={4} sx={{ bgcolor: '#DFDFDF', borderRadius: 4}}>
                <CardContent>
                    <Grid container spacing={2} direction="row">
                        <Grid item>
                            <Typography variant="h4" component="div"> 
                                {this.props.restaurant.name}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <IconButton href={this.props.restaurant.url!}>
                                <HomeIcon/>                                
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Typography variant="h4" component="div"> 
                                {this.props.restaurant.pricing}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
}

export default Restaurant
