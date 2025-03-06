export enum UserRole {
	USER = 'user',
	ADMIN = 'admin',
}

export interface IRegister {
	id?: number;
	name: string;
	last_name: string;
	email: string;
	password: string;
	password_check: string;
	phone: string;
	additional_information: string;
	role: UserRole;
	image: File | FileList;
	createdAt?: string;
	updatedAt?: string;
	token?: string;
}


export interface ILogin {
	email: string;
	password: string;
}

export interface IUserProfileInfo {
	id: number;
	name: string;
	last_name: string;
	email: string;
	phone: string;
	additional_information: string;
	role: UserRole;
	image: string;
	createdAt?: string;
}

export interface IGetUsers {
	id: number;
	name: string;
	last_name: string;
	email: string;
	password: string;
	phone: string;
	additional_information: string;
	role: string;
	token: string;
	createdAt: string;
	updatedAt: string;
	image: string;
	orders?: {};
}
