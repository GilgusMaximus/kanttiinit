import React from "react";
import { Grid } from "@mui/material";

class Meal extends React.Component {
    render() {
        return (
            <Grid container item spacing={2} direction="column">
                <Grid item>
                    Lunch 1:
                </Grid>
                <Grid item>
                    &ensp;Lunch 1:
                </Grid>
            </Grid>
            /* <div>
                <Stack direction="row" spacing={2}
                       divider={<Divider orientation="vertical" flexItem/>}
                >
                    {meals.map((m, index) => (
                        <Meal key={index} meal={m}/>
                    ))}
                </Stack>
            </div> */
        );
    }
}

//     return (
//         <div
//             className={`meal-div`}
//             id={`meal-${meal.id}`}
//             onClick={() => console.log(meal)}
//         >
//             <h3>
//                 {/*Meal: {meal.name} <img src={meal.image}  alt={meal.name}/> - {meal.allergies}/3*/}
//                 Meal: {meal.name} <a href={meal.image}>{meal.name}</a>

//             </h3>

//             <p>
//                 {meal.diets.map((m: string, i: number, arr: []) => (
//                     <span key={i}>{m}{i !== (arr.length -1) ?  ', ' : ''}</span>
//                 ))}
//             </p>

//         </div>
//     )
// }


export default Meal
