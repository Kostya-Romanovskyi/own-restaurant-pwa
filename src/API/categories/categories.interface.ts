
export interface IAllCategories {
	id: number;
	name: string;
	description: string;
	image: string;
	createdAt: string;
	updatedAt: string;
}
export interface ICategoryByName {
	id: number;
	name: string;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
	products: IProductIncludedInCategory[];
}

export interface IProductIncludedInCategory {
	id: number;
	name: string;
	category_id: number;
	description: string;
	image: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface IAddNewCategory {
	name: string;
	description: string;
	image: File;
}
