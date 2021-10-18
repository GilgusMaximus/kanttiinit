import React from 'react'

type Props = {
    restaurant: any
}

const Restaurant: React.FC<Props> = ({ restaurant }) => {
    return (
        <div
            className={`restaurant: ${restaurant}`}            
            onClick={()=> console.log(restaurant)}
        >
            <h3>
                Restaurant: {restaurant}
            </h3>
        </div>
    )
}

export default Restaurant
