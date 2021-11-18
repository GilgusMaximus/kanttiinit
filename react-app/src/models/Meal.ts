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

    getAllergies() {
        let str: string = ""
        if (this.allergies) {
            str = " - "
            this.allergies.forEach((a, i) => {
                str += a
                // @ts-ignore
                if (i != this.allergies.length - 1) {
                    str += ", "
                }
            })
        }
        return str;
    }
}
