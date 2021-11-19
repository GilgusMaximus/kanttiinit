export class Dish {
    name: string | null = null;
    allergies: string[] | null = null;

    constructor(jsonObj?: Dish) {
        if (jsonObj) {
            this.name = jsonObj.name;
            this.allergies = jsonObj.allergies;
        }
    }
}