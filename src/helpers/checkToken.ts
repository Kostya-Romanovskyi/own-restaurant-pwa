export const getTokenConfig = () => {
	const token = localStorage.getItem('token-shop')

	if (!token) {
		throw new Error('Authentication token is missing')
	}

	return {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	}
}
