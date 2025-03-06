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
