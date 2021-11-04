import { Restaurants } from './models/Restaurants'

class Requests {
    static fetchUrl = async (url: string) => {
        const response: Response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return response.json();
    }

    static fetchUrlParam = async (url: string, param: string) => {
        const response: Response = await fetch(`${url}${param}/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
        return response.json();
    }

    static async fetchRestaurants(): Promise<Restaurants> {
        return this.fetchUrl('/restaurants/')
            .then((response) => {
                return new Restaurants(response);
            });
    }

    static fetchMeals = async (restaurant: string) => {
        return await this.fetchUrl(`/restaurants/${restaurant}/meals`)
    }
}

export default Requests
