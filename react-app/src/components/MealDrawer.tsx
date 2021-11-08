import * as React from 'react';
import { Drawer, Typography } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import MealDrawerHeader from './MealDrawerHeader'

import { styled, useTheme } from "@mui/material/styles";

type onDrawerCloseType = () => void;


const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-start"
}));

class MealDrawer extends React.Component<{
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
                    <MealDrawerHeader
                        restaurant={this.props.restaurant}
                        onDrawerClose={this.props.onDrawerClose} />
                </DrawerHeader>
                <br />
                <div style={{ color: "#FFFFFF" }}>
                    <p>Lunch 1:</p>
                    <ul>
                        <li>Coffee</li>
                        <li>Tea</li>
                        <li>Milk</li>
                    </ul>  
                </div>
            </Drawer>
        );
   }
}

export default MealDrawer
