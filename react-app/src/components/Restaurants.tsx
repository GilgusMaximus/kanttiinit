import React from 'react'
import Restaurant from './Restaurant'
import { Grid, Box } from '@mui/material'

type Props = {
    restaurants: any[]
}

// const RestaurantWrapper = styled(Paper)(({theme}) => ({
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
// }));

const Restaurants: React.FC<Props> = ({restaurants}) => {
    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            py={2}
        >
            <Grid container spacing={2} direction="column" width="98%">
                {restaurants.map((res, index) => (
                    <Grid item key={index} sm={4}>
                        <Restaurant restaurant={res}/>
                    </Grid>
                ))}
            </Grid>
        </Box>
    )
}

export default Restaurants
