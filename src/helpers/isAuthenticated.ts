import { useQuery } from '@tanstack/react-query'

export const isAuthenticated = () => {
	const { data } = useQuery({ queryKey: ['current'] })

	return data
}
