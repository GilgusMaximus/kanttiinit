import React, {Component} from 'react'

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

    static fetchRestaurants = async () => {
        return await this.fetchUrl('http://localhost:4000/restaurants/')
    }

    static fetchMeals = async (restaurant: string) => {
        return await this.fetchUrl(`http://localhost:4000/restaurants/${restaurant}/meals`)
    }
}

export default Requests
