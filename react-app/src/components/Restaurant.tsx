import React from 'react'

type Props = {
    restaurant: any
}

const Restaurant: React.FC<Props> = ({restaurant}) => {
    return (
        <div
            className={`restaurant-div`}
            id={`restaurant-${restaurant}`}
            onClick={() => console.log(restaurant)}
        >
            <h3>
                Restaurant: <a href={restaurant.url}>{restaurant.name}</a> - {restaurant.pricing}/3
            </h3>
        </div>
    )
}

export default Restaurant
