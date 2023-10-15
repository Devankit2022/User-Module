import { CardShowProps } from "../../types"
import Card from "../Card/Card"
import "./CardShow.scss"

const CardShow = ({ groupedData, result }: CardShowProps) => {
	enum Priority {
		NO_PRIORITY = "0",
		LOW = "1",
		MEDIUM = "2",
		HIGH = "3",
		URGENT = "4",
	}

	const getKeyFromValue = (enumObj: any, enumValue: string): string | undefined => {
		return Object.keys(enumObj).find((key) => enumObj[key] === enumValue)
	}

	return (
		<div className="cardshow">
			{Object.keys(groupedData).map((key) => (
				<div key={key}>
					<h3>{getKeyFromValue(Priority, key) ?? key}</h3>
					{groupedData[key].map((ticket) => (
						<Card key={ticket.id} ticket={ticket} result={result} />
					))}
				</div>
			))}
		</div>
	)
}
export default CardShow
