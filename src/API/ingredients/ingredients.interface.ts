export interface IIngredient {
	id: number;
	name: string;
	description: string;
	allergen_info: string;
	calories: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ISendIngredients {
	ingredientIds: number[];
}

export interface IUpdateIngredientsParams {
	ingredientIds: ISendIngredients;
	itemId: string;
}
