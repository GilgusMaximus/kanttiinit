import React from 'react'
import Requests from "../Requests";

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
                {/*{Requests.fetchMeals(restaurant.name).then(response => {*/}
                {/*    console.log("Meals", response)*/}
                {/*})}*/}
            </h3>
        </div>
    )
}

export default Restaurant
