export type IdType = string;
export interface Identifiable {
    _id: IdType;
}
export class Comment {
    _id: IdType;
    name: string;
    text: string;
    rating: number;
    recipe_id: string;
    user_id: string;
    constructor(
        name: string,
        text: string,
        recipe_id: string,
        user_id: string,
        rating?: number
        ) {

        this.name = name;
        this.text = text;
        this.recipe_id = recipe_id;
        this.user_id = user_id;
        this.rating = rating;
        console.log(recipe_id, user_id, "constr", this.recipe_id, this.user_id);
    }
}
