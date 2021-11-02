import { Restaurant } from './Restaurant';

export class Restaurants {
  list: Restaurant[] = [];

  constructor(jsonObj?: Array<Restaurant>) {
    if (jsonObj) {
      this.list = jsonObj.map(
        (restaurant: Restaurant) => new Restaurant(restaurant)
      );
    }
  }
}
