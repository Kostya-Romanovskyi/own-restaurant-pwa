import { IProduct } from '../products/products.interface'

export interface ICart {
	cart_id: number
	users_id: number
	products_item_id: number
	quantity: number
	price: string
	unit_price: number
	cart_status: string
	createdAt?: Date
	updatedAt?: Date
	products_item?: IProduct
}

export type ICartList = ICart[]

export interface ICartInfo {
	result: ICartList | []
	totalPrice: number
}

export interface BackendResponse {
	config: any
	data: ICartInfo
	headers: any
	request: any
	status: number
	statusText: string
}

export interface INewItemInCart {
	users_id: number
	products_item_id: number
	quantity: number
	unit_price: number
}

export interface ICartUpdateItem {
	products_item_id: number
	quantity: number
}
