import * as React from 'react';
import { useEffect } from "react";
import Requests from "../Requests";
import Meals from "./Meals";

type Props = {
    restaurant: any
}


const Restaurant: React.FC<Props> = ({restaurant}) => {
    const [state, setState] = React.useState({
        meals: []
    });

    useEffect(() => {
        Requests.fetchMeals(restaurant.name).then(response => {
            setState({meals: response})
        });
    }, [restaurant.name])

    return (
        <div
            className={`restaurant-div`}
            id={`restaurant-${restaurant}`}
            onClick={() => console.log(restaurant)}
        >
            <h3>
                Restaurant: <a href={restaurant.url}>{restaurant.name}</a> - {restaurant.pricing}/3
                <Meals meals={state.meals}/>

            </h3>
        </div>
    )
}

export default Restaurant
