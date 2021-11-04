export class Meal {
    name: string | null = null;
    dishes: string[] | null = null;
  
    constructor(name: string, dishes: string[]) {
        this.name = name;
        this.dishes = dishes;
        console.log(this);
    }
}
  