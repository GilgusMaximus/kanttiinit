import React from 'react'
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Meal from './Meal';

type Props = {
    meals: any[]
}

const Meals: React.FC<Props> = ({ meals }) => {
    return (
        <div>
            <Stack direction="row" spacing={2}
                   divider={<Divider orientation="vertical" flexItem/>}
            >
                {meals.map((m, index) => (
                    <Meal key={index} meal={m}/>
                ))}
            </Stack>
        </div>
    )
}

export default Meals
