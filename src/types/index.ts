// Component State
export interface ModalProps {
	isOpen: boolean
	onClose: () => void
}

type Tag = string

export interface Ticket {
	id: string
	title: string
	tag: Tag[]
	userId: string
	status: string
	priority: number
}

export interface User {
	id: string
	name: string
	available: string
}

export interface ApiResponse {
	tickets: Ticket[]
	users: User[]
}

export interface CardShowProps {
	groupedData: Record<string, Ticket[]>
	result: ApiResponse
}

export interface CardProps {
	ticket: Ticket
	result: ApiResponse
}

// Redux State
export interface GroupingState {
	selectedGroupingValue: string
}

export interface OrderingState {
	selectedOrderingValue: string
}
