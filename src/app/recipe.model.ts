export type IdType = number;
export interface Identifiable {
    id: IdType;
}
export class Recipe implements Identifiable {
    id: IdType;
    title: string;
    description: string;
    ingredientsList: string;
    directions: string;
    prepTime: string;
    cookTime: string;
    constructor(
                title: string,
                description: string,
                ingredientsList: string,
                directions: string,
                prepTime: string,
                cookTime: string,
               ) {
        this.title = title;
        this.description = description;
        this.ingredientsList = ingredientsList;
        this.directions = directions;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
    }
}
