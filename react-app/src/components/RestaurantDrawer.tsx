import * as React from 'react';
import { Drawer, Typography } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import RestaurantDrawerHeader from './RestaurantDrawerHeader'
import RestaurantDrawerBody from './RestaurantDrawerBody'
import ImageUpload from './ImageUpload';
import { styled, useTheme } from "@mui/material/styles";

type onDrawerCloseType = () => void;


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
}));

class RestaurantDrawer extends React.Component<{
    open: boolean,
    restaurant: RestaurantModel,
    drawerWidth: number,
    onDrawerClose: onDrawerCloseType,
    },
    {}> {
   render() {
        return(
            <Drawer
                PaperProps={{ elevation: 5 }}
                sx={{
                    width: this.props.drawerWidth+'vw',
                    flexShrink: 0,
                    "& .MuiDrawer-paper": {
                        width: this.props.drawerWidth+'vw',
                        bgcolor: "#859398",
                    }
                }}
                variant="persistent"
                anchor="right"
                open={this.props.open}
            >
                <DrawerHeader>
                    <RestaurantDrawerHeader
                        restaurant={this.props.restaurant}
                        onDrawerClose={this.props.onDrawerClose} />
                </DrawerHeader>

                <br />
                
                <RestaurantDrawerBody
                    restaurant={this.props.restaurant} 
                />

                <ImageUpload foodId={'Vegaani'} restaurant={this.props.restaurant}></ImageUpload>

            </Drawer>
        );
   }
}

export default RestaurantDrawer
