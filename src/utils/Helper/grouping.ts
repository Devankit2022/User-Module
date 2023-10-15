import { ApiResponse, Ticket } from "../../types"

enum GroupingOption {
	STATUS = "status",
	USER = "user",
	PRIORITY = "priority",
}

export const groupTickets = (
	data: ApiResponse,
	option: GroupingOption,
): Record<string, Ticket[]> => {
	const groupedData: Record<string, Ticket[]> = {}

	if (option === GroupingOption.USER) {
		data.tickets.forEach((ticket) => {
			const user = data.users.find((u) => u.id === ticket.userId)
			const userName = user ? user.name : "Unassigned"
			if (groupedData[userName]) {
				groupedData[userName].push(ticket)
			} else {
				groupedData[userName] = [ticket]
			}
		})
	} else if (option === GroupingOption.STATUS) {
		data.tickets.forEach((ticket) => {
			const status = ticket.status
			if (groupedData[status]) {
				groupedData[status].push(ticket)
			} else {
				groupedData[status] = [ticket]
			}
		})
	} else if (option === GroupingOption.PRIORITY) {
		const sortedByPriority = data.tickets.sort((a, b) => b.priority - a.priority)
		sortedByPriority.forEach((ticket) => {
			const priority = ticket.priority.toString()
			if (groupedData[priority]) {
				groupedData[priority].push(ticket)
			} else {
				groupedData[priority] = [ticket]
			}
		})
	}

	return groupedData
}
