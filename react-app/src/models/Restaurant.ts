import {Meal} from './Meal';

type Coordinates = { latitude: number, longitude: number };

export class Restaurant {
    id: string | null = null;
    name: string | null = null;
    location: Coordinates = {latitude: 0, longitude: 0};
    pricing: number | null = null;
    url: string | null = null;
    meals: Meal[] = [];
    rating: number | null = null;

    constructor(jsonObj?: Restaurant) {
        if (jsonObj) {
            this.id = jsonObj.id;
            this.name = jsonObj.name;
            if (jsonObj.location!) {
                this.location.latitude = jsonObj.location.latitude;
                this.location.longitude = jsonObj.location.longitude;
            }
            this.pricing = jsonObj.pricing;
            this.url = jsonObj.url;
            this.rating = jsonObj.rating;

            if (jsonObj.meals)
                this.meals = jsonObj.meals.map(
                    (meal: Meal) => new Meal(meal)
                );
        }
    }
}
