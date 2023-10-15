import { CardProps } from "../../types"
import "./Card.scss"

const Card = ({ ticket, result }: CardProps) => {
	enum Priority {
		NO_PRIORITY = 0,
		LOW = 1,
		MEDIUM = 2,
		HIGH = 3,
		URGENT = 4,
	}

	const getKeyFromValue = (enumObj: any, enumValue: number): string | undefined => {
		return Object.keys(enumObj).find((key) => enumObj[key] === enumValue)
	}

	function findUserName(customid: string) {
		const user = result.users.find((user) => user.id === customid)
		return user ? user.name : null
	}

	return (
		<div className="card">
			<div>
				<span>{ticket.id}</span>
				<div className="card_name">{findUserName(ticket.userId)}</div>
			</div>
			<h4>{ticket.title}</h4>
			<div>
				<span>{getKeyFromValue(Priority, ticket.priority)}</span>
				{ticket.tag.map((item) => (
					<div className="card_tag" key={item}>
						{item}
					</div>
				))}
			</div>
		</div>
	)
}
export default Card
