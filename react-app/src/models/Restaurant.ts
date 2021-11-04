import { Meal } from './Meal';

export class Restaurant {
    id: number | null = null;
    name: string | null = null;
    location: string | null = null;
    pricing: number | null = null;
    url: string | null = null;
    meals: Meal[] = [];
  
    constructor(jsonObj?: Restaurant) {
      if (jsonObj) {
        this.id = jsonObj.id;
        this.name = jsonObj.name;
        this.location = jsonObj.location;
        this.pricing = jsonObj.pricing;
        this.url = jsonObj.url;

        for (let name in jsonObj.meals!) {
          console.log(name, typeof jsonObj.meals[name]);
          // this.meals.push(new Meal(name, jsonObj.meals[name]));
        }
      }
    }
  }
  