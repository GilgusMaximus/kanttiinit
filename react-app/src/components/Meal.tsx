import React from "react";

type Props = {
    meal: any
}

const Meal: React.FC<Props> = ({meal}) => {

    return (
        <div
            className={`meal-div`}
            id={`meal-${meal.id}`}
            onClick={() => console.log(meal)}
        >
            <h3>
                {/*Meal: {meal.name} <img src={meal.image}  alt={meal.name}/> - {meal.allergies}/3*/}
                Meal: {meal.name} <a href={meal.image}>{meal.name}</a>

            </h3>

            <p>
                {meal.diets.map((m: string, i: number, arr: []) => (
                    <span key={i}>{m}{i !== (arr.length -1) ?  ', ' : ''}</span>
                ))}
            </p>

        </div>
    )
}


export default Meal
