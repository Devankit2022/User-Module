import { useState, useEffect, useRef, ChangeEvent } from "react"
import { useDispatch } from "react-redux"

import { ModalProps } from "../../types"
import { setSelectedGroupingValue, setSelectedOrderingValue } from "../../utils/store"
import "./Modal.scss"

const Modal = ({ isOpen, onClose }: ModalProps) => {
	const [selectedGroupingValue, setSelectedGroupingValueLocal] = useState("status")
	const [selectedOrderingValue, setSelectedOrderingValueLocal] = useState("priority")

	const dispatch = useDispatch()

	const modalRef = useRef<HTMLDivElement>(null)

	const handleOutsideClick = (e: MouseEvent) => {
		if (
			modalRef.current &&
			!modalRef.current.contains(e.target as Node) &&
			(e.target as HTMLElement).classList &&
			!(e.target as HTMLElement).classList.contains("excluded-element-class")
		) {
			onClose()
		}
	}

	const handleGroupingSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setSelectedGroupingValueLocal(value)
		dispatch(setSelectedGroupingValue(value))
	}

	const handleOrderingSelectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
		const value = e.target.value
		setSelectedOrderingValueLocal(value)
		dispatch(setSelectedOrderingValue(value))
	}

	useEffect(() => {
		if (isOpen) {
			document.addEventListener("mousedown", handleOutsideClick)
		} else {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
		return () => {
			document.removeEventListener("mousedown", handleOutsideClick)
		}
	}, [isOpen])

	return isOpen ? (
		<div ref={modalRef} className="modal">
			<div className="modal_grouping">
				Grouping
				<select
					name="grouping"
					id="grouping"
					onChange={handleGroupingSelectionChange}
				>
					<option value="status" style={{ color: "black" }}>
						Status
					</option>
					<option value="user">User</option>
					<option value="priority">Priority</option>
				</select>
			</div>
			<div className="modal_ordering">
				Ordering
				<select
					name="ordering"
					id="ordering"
					onChange={handleOrderingSelectionChange}
				>
					<option value="priority">Priority</option>
					<option value="title">Title</option>
				</select>
			</div>
		</div>
	) : null
}
export default Modal
