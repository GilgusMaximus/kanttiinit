import React from 'react'
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";

type Props = {
    restaurant: any
}

const CustomizedRestaurant = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Restaurant: React.FC<Props> = ({ restaurant }) => {
    return (
        <div
            className={`restaurant: ${restaurant}`}
            onClick={() => console.log(restaurant)}
        >
            <h3>
                Restaurant: {restaurant.name}
            </h3>
        </div>
    )
}

export default Restaurant
