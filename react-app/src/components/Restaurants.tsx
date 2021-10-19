import React from 'react'
import Restaurant from './Restaurant'
import Stack from '@mui/material/Stack';
import {styled} from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Divider from '@mui/material/Divider';

type Props = {
    restaurants: any[]
}

const RestaurantWrapper = styled(Paper)(({theme}) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Restaurants: React.FC<Props> = ({restaurants}) => {
    return (
        <div>
            <Stack spacing={2}
               divider={<Divider orientation="vertical" flexItem />}
            >
                {restaurants.map((res) => (
                    <RestaurantWrapper>
                        <Restaurant restaurant={res}/>
                    </RestaurantWrapper>
                ))}
            </Stack>
        </div>
    )
}

export default Restaurants
