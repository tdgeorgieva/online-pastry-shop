export class Recipe {
    _id: string;
    recipeName: string;
    description: string;
    directions: string;
    ingredients: string;
    difficulty: number;
    numberServings: number;
    prepTime: string;
    cookTime: string;
    imageUrl: string;
    user_id: string;
    constructor(
        recipeName: string,
        description: string,
        directions: string,
        ingredients: string,
        difficulty: number,
        numberServings: number,
        prepTime: string,
        cookTime: string,
        imageUrl: string) {

        this.recipeName = recipeName;
        this.description = description;
        this.directions = directions;
        this.ingredients = ingredients;
        this.difficulty = difficulty;
        this.numberServings = numberServings;
        this.prepTime = prepTime;
        this.cookTime = cookTime;
        this.imageUrl = imageUrl;
    }
}