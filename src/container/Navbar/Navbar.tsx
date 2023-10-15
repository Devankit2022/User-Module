import { useState } from "react"
import { IoMdOptions } from "react-icons/io"
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai"

import { Modal } from "../../components"
import "./Navbar.scss"

const Navbar = () => {
	const [modalIsOpen, setModalIsOpen] = useState(false)

	const closeModal = () => {
		setModalIsOpen(false)
	}

	return (
		<nav className="navbar">
			<button
				type="button"
				onClick={() => setModalIsOpen(!modalIsOpen)}
				className="excluded-element-class"
			>
				<IoMdOptions className="excluded-element-class" />
				Display
				{modalIsOpen ? <AiOutlineUp /> : <AiOutlineDown />}
			</button>
			<Modal isOpen={modalIsOpen} onClose={closeModal} />
		</nav>
	)
}
export default Navbar
