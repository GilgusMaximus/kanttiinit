import { Dish } from "./Dish";

export class Meal {
    name: string = 'REMOVE';
    category: string | null = null;
    dishes: Dish[] = [];

    constructor(jsonObj?: Meal) {
        if (jsonObj) {
            this.category = jsonObj.category;
            this.dishes = jsonObj.dishes.map(
                (dish: Dish) => new Dish(dish)
              );
        }
    }
}
