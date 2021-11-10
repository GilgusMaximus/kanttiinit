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

    static fetchUrlParam = async (url: string, key: string, value: string) => {
        const response: Response = await fetch(`${url}?${key}=${value}/`, {
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

    static async fetchRestaurantsByDate(date: Date): Promise<Restaurants> {
        return this.fetchUrl('/restaurants?date='+[date.getUTCDate(), date.getUTCMonth() + 1, date.getUTCFullYear()].join('-'))
            .then((response) => {
                return new Restaurants(response);
            });
    }

    static fetchMeals = async (restaurant: string) => {
        return await Requests.fetchUrl(`/restaurants/${restaurant}/meals`)
    }

    static fetchMealsDate = async(date: Date) => {
        let dateString = `${date.getUTCFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate}`
        return Requests.fetchUrlParam('/restaurants', "day", dateString)
            .then((response) => {
                return response
            })
    }
}

export default Requests
