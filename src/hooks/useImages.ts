import { itemUrl } from '../API/products/products'

export const useImages = (image: string) => {
	const finalImage = image.includes('http://res.cloudinary.com') ? image : `${itemUrl}${image}`

	return finalImage
}
