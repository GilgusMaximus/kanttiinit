import { Grid, Box, IconButton, Typography, Divider } from '@mui/material';
import * as React from 'react';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import HomeIcon from "@mui/icons-material/Home";
import PlaceIcon from '@mui/icons-material/Place';

type onDrawerCloseType = () => void;

class MealDrawerHeader extends React.Component<{
    restaurant: RestaurantModel,
    onDrawerClose: onDrawerCloseType,
    },
    {}> {
   render() {
        return(
            <Grid container
                direction="column"
                alignItems="center"
                display="flex"
                color="#FFFFFF"
            >
                {/* First Row */}
                <Grid container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <Grid item xs>
                        <IconButton onClick={this.props.onDrawerClose}>
                            <ChevronLeftIcon fontSize="inherit" style={{fill:'#FFFFFF'}} />
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <Typography sx={{
                            display: 'flex',
                            textAlign: 'center',
                        }}>
                            {this.props.restaurant.name}
                        </Typography>
                    </Grid>
                    <Grid item xs>{/* Padding */}</Grid>
                </Grid>

                {/* Second Row */}
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={1}
                >
                    <Grid item>
                        <Typography>rating</Typography>
                    </Grid>
                    <Grid item>
                        <Divider 
                            sx={{ 
                                background: "#FFFFFF",
                                border: `1px solid #FFFFFF`,
                                borderRadius: 1,
                                height: '2vw',
                            }}
                            orientation="vertical" 
                            variant="middle"
                            flexItem
                        />
                    </Grid>
                    <Grid item>
                        <Typography>price</Typography>
                    </Grid>
                </Grid>

                {/* Third Row */}
                <Grid container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Grid item>
                        <IconButton href={this.props.restaurant.url!}>
                            <HomeIcon fontSize="inherit" style={{fill:'#FFFFFF'}}/>                                
                        </IconButton>
                    </Grid>
                    <Grid item>
                        <IconButton href={"https://maps.google.com/?q="+this.props.restaurant.location.latitude+","+this.props.restaurant.location.longitude}>
                            <PlaceIcon fontSize="inherit" style={{fill:'#FFFFFF'}}/>                                
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        );
   }
}

export default MealDrawerHeader
