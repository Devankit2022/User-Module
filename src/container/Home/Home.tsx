import { useState, useEffect } from "react"
import axios, { AxiosResponse } from "axios"
import { useSelector } from "react-redux"

import { ApiResponse, Ticket } from "../../types"
import { CardShow } from "../../components"
import { groupTickets } from "../../utils/Helper/grouping"
import { orderTickets } from "../../utils/Helper/ordering"
import "./Home.scss"

const Home = () => {
	const [result, setResult] = useState<ApiResponse | null>(null)

	const selectedGroupingValue = useSelector(
		(state: any) => state.grouping.selectedGroupingValue,
	)

	const selectedOrderingValue = useSelector(
		(state: any) => state.ordering.selectedOrderingValue,
	)

	let groupedData: Record<string, Ticket[]> = {}
	let orderedTickets: Ticket[] = []

	const fetchData = async () => {
		try {
			const response: AxiosResponse<ApiResponse> = await axios.get(
				process.env.REACT_APP_API,
			)
			setResult(response.data)
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				console.error("Axios Error:", error.message)
			} else {
				console.error("Error Message:", error.message)
			}
		}
	}

	if (result !== null) {
		groupedData = groupTickets(result, selectedGroupingValue)
		orderedTickets = orderTickets(result.tickets, selectedOrderingValue)
	}

	useEffect(() => {
		fetchData()
	}, [])

	return (
		<div className="home">
			<h2>
				Unable to implement the design part completely but website have complete
				functionality.
			</h2>
			{result ? <CardShow groupedData={groupedData} result={result} /> : null}
			<h2>Made with React, TypeScript, Redux</h2>
		</div>
	)
}
export default Home
