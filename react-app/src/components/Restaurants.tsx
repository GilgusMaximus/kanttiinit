import React from 'react'
import Restaurant from './Restaurant'

type Props = {
    restaurants: any[]
}

const Restaurants: React.FC<Props> = ({ restaurants }) => {

    return (
        <div>
            {restaurants.map((restaurant, index) => (
                <Restaurant key={index} restaurant={restaurant} />
            ))}
        </div>
    )
}

export default Restaurants