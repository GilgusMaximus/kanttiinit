export class Meal {
    name: string | null = null;
    allergies: string[] | null = null;
    url: string[] = []

    constructor(jsonObj?: Meal) {
        if (jsonObj) {
            this.name = jsonObj.name;
            this.allergies = jsonObj.allergies;
            this.url = jsonObj.url;
        }
    }
}
