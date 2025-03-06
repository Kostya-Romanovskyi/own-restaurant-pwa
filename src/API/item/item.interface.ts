export interface IItem {
	id: number;
	name: string;
	description: string;
	price: string;
	products_id: number;
	image: string;
	type: string;
	createdAt: Date;
	updatedAt: Date;
	ingredients: Ingredient[];
}

export interface Ingredient {
	id: number;
	name: string;
	description: string;
	allergen_info: string;
	calories: number;
	products_item_ingredients: ProductsItemIngredients;
}

export interface ProductsItemIngredients {
	products_item_id: number;
	ingredient_id: number;
	createdAt: string;
	updatedAt: string;
}

export interface IAddNewItem {
	name: string;
	description: string;
	image: File;
	price: string;
	type: string;
	products_id: string;
}
