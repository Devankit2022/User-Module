import { Ticket } from "../../types"

enum OrderingOption {
	PRIORITY = "priority",
	TITLE = "title",
}

export const orderTickets = (tickets: Ticket[], option: OrderingOption): Ticket[] => {
	if (option === OrderingOption.PRIORITY) {
		return tickets.sort((a, b) => b.priority - a.priority)
	} else if (option === OrderingOption.TITLE) {
		return tickets.sort((a, b) => a.title.localeCompare(b.title))
	}
	return tickets
}
