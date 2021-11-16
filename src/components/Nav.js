import { Link, BrowserRouter as Router } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import CategoryService from "../service/CategoryService";
import { FaRegFolder, FaInbox, FaPlusCircle } from "react-icons/fa";
import Modal from "react-modal";
import NotesService from "../service/NotesService";
import ReactTooltip from "react-tooltip";

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

	const [id, setActive] = useState("allnotes");
	const [menu, setMenu] = useState([]);
	const [newBookName, setNewBookName] = useState("");
	const [modalIsOpen, setIsOpen] = useState(false);
	const [bookSubmitted, setBookSubmitted] = useState(false);
	const [totalNotes, setTotalNotes] = useState(false);

	function openModal() {
		setIsOpen(true);
	}

	function closeModal() {
		setIsOpen(false);
		setBookSubmitted(false);
	}

	useEffect(() => {
		NotesService.count()
			.then((result) => {
				setTotalNotes(result.data[0].count);
			})
			.catch((err) => {
				console.log(err);
			});
		CategoryService.getAll()
			.then((result) => {
				setMenu([
					{
						id: "allnotes",
						text: "All notes",
						icon: (
							<FaInbox className="h-4 w-4 fill-current text-gray-500" />
						),
						link: true,
						submenu: [],
						count: totalNotes,
					},
					{
						id: "noteboks",
						text: "Notebooks",
						icon: (
							<FaRegFolder className="h-4 w-4 fill-current text-gray-500" />
						),
						link: false,
						submenu: result.data,
						count: 0,
						actionIcon: {
							tooltip: "Create notebook", 
							icon: (
								<FaPlusCircle
									onClick={openModal}
									className="cursor-pointer hover:text-gray-500 w-4 h-4"
								/>
							),
						},
					},
				]);
			})
			.catch((err) => {
				console.log(err);
			});
			ReactTooltip.rebuild();

	}, [bookSubmitted, props.noteSubmitted]);

	const onClick = (id) => {
		setActive(id);
	};

	const newBookSubmit = (e) => {
		e.preventDefault();
		CategoryService.create({ name: newBookName })
			.then((result) => {
				CategoryService.getAll()
					.then((result) => {
						setBookSubmitted(true);
						closeModal();
					})
					.catch((err) => {});
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const modalOnChange = (e) => {
		setNewBookName(e.target.value);
	};
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
								key={"note-" + item.id}
								id={"note-" + item.id}
								onClick={(e) => {
									props.clickHandler(e, item.id);
									onClick(item.id);
								}}
								to="/"
								className={
									item.id === id 
									? "mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium bg-gray-200 rounded-lg"
									: "mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-sm font-medium hover:bg-gray-200 rounded-lg"
								}
							>
								<span className="inline-flex align-baseline">
									<span className="leading-normal">
										{item.icon}
									</span>
									<span className="ml-2 text-gray-700">
										{item.text}
									</span>
								</span>
								<span className="w-10 text-center py-1 text-xs font-semibold rounded-full text-gray-700 bg-gray-300">
									{totalNotes}
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
										<button
											to={"/"}
											onClick={item.actionIcon.onClick}
											data-tip={item.actionIcon.tooltip}
										>
											{item.actionIcon &&
												item.actionIcon.icon}
										</button>
									</span>
								</span>
							</div>
						)}
						{item.submenu.map((subitem) => {
							return (
								<Link
								id={"note-" + subitem.id}
								key={"note-" + subitem.id}
								onClick={(e) => {
									props.clickHandler(e, subitem.id);
									onClick(subitem.id);
								}}
								to="/"
								className={
									subitem.id === id 
									? "mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-xs font-medium bg-gray-200 rounded-lg"
									: "mt-2 -mx-3 px-3 py-2 flex items-center justify-between text-xs font-medium hover:bg-gray-200 rounded-lg"
								}
							>
								<span className="inline-flex align-baseline">
									<span className="leading-normal">
										{/* {item.icon} */}
									</span>
									<span className="ml-2 text-gray-700">
										{subitem.title}
									</span>
								</span>
								{subitem.count !== 0 ? (
									<span className="w-10 text-center py-1 text-xs font-semibold rounded-full text-gray-700 bg-gray-300">
										{subitem.count}
									</span>
								):(
									null
								)
						}
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

								<button
									type="submit"
									className="float-right w-20 mt-6 rounded text-sm bg-button-blue font-medium py-2 rounded-md ml-2"
								>
									Create
								</button>
								<button
									onClick={closeModal}
									className="float-right w-20 mt-6 rounded text-sm bg-gray-500 font-medium py-2 rounded-md "
								>
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
