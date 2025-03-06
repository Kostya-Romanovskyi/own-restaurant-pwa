export interface IProduct {
	id: number;
	name: string;
	category_id: number;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	products_items: IProductItem[];
}

export interface IProductItem {
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
	createdAt: string;
	updatedAt: string;
	products_item_ingredients: ProductsItemIngredients;
}

export interface ProductsItemIngredients {
	products_item_id: number;
	ingredient_id: number;
	createdAt: string;
	updatedAt: string;
}

export interface IAddNewProduct {
	category_id: string;
	name: string;
	description: string;
	image: File;
}
