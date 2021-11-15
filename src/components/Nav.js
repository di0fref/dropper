import { Link, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import CategoryService from "../service/CategoryService";
import { FaRegFolder, FaInbox, FaPlusCircle } from "react-icons/fa";
import Modal from "react-modal";

// Modal.setAppElement("#sidebar")

function Nav(props) {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			width: "30em",
			height: "12em",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.75)",
		},
	};

	const [data, setData] = useState();
	const [id, setActive] = useState("allnotes");
	const [menu, setMenu] = useState([]);
	const [newBookName, setNewBookName] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [bookSubmitted, setBookSubmitted] = useState(false);


	
	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		setBookSubmitted(false)
	}

	useEffect(() => {
		CategoryService.getAll()
			.then((result) => {

				setMenu([
					{
						id: "allnotes",
						text: "All notes",
						icon: <FaInbox className="h-4 w-4" />,
						link: true,
						submenu: [],
					},
					{
						id: "noteboks",
						text: "Notebooks",
						icon: <FaRegFolder className="h-4 w-4" />,
						link: false,
						submenu: result.data,
						actionIcon: {
							icon: (
								<FaPlusCircle
									onClick={openModal}
									className="cursor-pointer hover:text-green-500"
								/>
							),
						},
					},
				]);
			})
			.catch((err) => {
				console.log(err);
			});
	}, [bookSubmitted]);

	const onClick = (id) => {
		setActive(id);
	};

	const newBookSubmit = (e) => {
		e.preventDefault();
		CategoryService.create({name: newBookName}).then((result) => {
			console.log(result);
			CategoryService.getAll().then((result) => {
				setBookSubmitted(true)
				// closeModal()
			}).catch((err) => {
				
			});
		}).catch((err) => {
			console.log(err);
		});
	}

	const modalOnChange = (e) => {
		setNewBookName(e.target.value);
	}
	return (
		<nav className="text-sm">
			<h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
				Notebooks
			</h2>

			{menu.map((item) => {
				return (
					<div key={item.id}>
						{item.link ? (
							<Link
								to={"/"}
								id={"note-" + item.id}
								onClick={(e) => {
									props.clickHandler(e, item.id);
									onClick(item.id);
								}}
								className={
									item.id === id
										? "mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium rounded-lg bg-gray-800"
										: "mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium rounded-lg text-gray-50"
								}
							>
								<span className="flex items-center">
									<span className="leading-normal">
										{item.icon}
									</span>
									<span className="ml-2 text-gray-500">
										{item.text}
									</span>
								</span>
								<span className="w-10 t py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-300_">
									<span className="float-right text-gray-300">
										{item.actionIcon &&
											item.actionIcon.icon}
									</span>
								</span>
							</Link>
						) : (
							<div className="mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium ">
								<span className="flex items-center">
									<span className="leading-normal">
										{item.icon}
									</span>
									<span className="ml-2 text-gray-500">
										{item.text}
									</span>
								</span>
								<span className="w-10 t py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-300_">
									<span className="float-right text-gray-300">
										<Link
											to={"/"}
											onClick={item.actionIcon.onClick}
										>
											{item.actionIcon &&
												item.actionIcon.icon}
										</Link>
									</span>
								</span>
							</div>
						)}
						{item.submenu.map((subitem) => {
							return (
								<Link
									id={"cat-" + subitem.id}
									className={
										subitem.id === id
											? "px-8 mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium rounded-lg bg-gray-800"
											: "px-8 mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium"
									}
									to={"/"} //block mt-2 py-2 px-5
									key={subitem.id}
									onClick={(e) => {
										onClick(subitem.id);
										props.clickHandler(e, subitem.id);
									}}
								>
									{subitem.title}
								</Link>
							);
						})}
					</div>
				);
			})}
			<Modal
				isOpen={modalIsOpen}
				// onAfterOpen={afterOpenModal}
				onRequestClose={closeModal}
				style={customStyles}
				contentLabel="Add notebook"
				ariaHideApp={false}
			>
				<h2 className="mb-3 text-l font-semibold">Add notebook</h2>
				{/* <button onClick={closeModal}>close</button> */}
				<form className="" onSubmit={newBookSubmit} autoComplete="off">
					<div className="min-h-screen_ bg-gray-100 flex items-center">
						<div className="container mx-auto max-w-md ">
							<div className=" p-4_ bg-white rounded-xl">
								<div className="">
									<input
										requied="true"
										type="text"
										name="name"
										className="w-full border bg-gray-100 py-2 px-4 w-96 outline-none focus:ring-2 focus:ring-indigo-400 rounded"
										placeholder="New notebook name"
										onChange={modalOnChange}
									/>
								</div>

								<button type="submit" className="float-right w-20 mt-6 rounded text-sm bg-button-blue font-medium py-2 rounded-md ml-2">
									Create
								</button>
								<button onClick={closeModal} className="float-right w-20 mt-6 rounded text-sm bg-gray-500 font-medium py-2 rounded-md ">
									Cancel
								</button>
							</div>
						</div>
					</div>
				</form>
			</Modal>
		</nav>
	);
}
export default Nav;
