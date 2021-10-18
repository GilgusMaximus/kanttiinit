import React from 'react'
import Restaurant from './Restaurant'
import Stack from '@mui/material/Stack';

type Props = {
    restaurants: any[]
}

const Restaurants: React.FC<Props> = ({ restaurants }) => {

    return (
        <div>
            <Stack spacing={2}>
            {restaurants.map((res) => (
                <Restaurant restaurant={ res } />
            ))}
            </Stack>
        </div>
    )
}

export default Restaurants
