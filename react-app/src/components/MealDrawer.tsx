import * as React from 'react';
import { Drawer, Typography } from '@mui/material';
import { Restaurant as RestaurantModel} from '../models/Restaurant'
import MealDrawerHeader from './MealDrawerHeader'

import { styled, useTheme } from "@mui/material/styles";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";

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
