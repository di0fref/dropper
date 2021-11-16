import { BsPencilSquare, BsSortUp } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { FaEdit, FaNotesMedical, FaSort, FaTrash } from "react-icons/fa";
import NotesService from "../service/NotesService";
import moment from "moment";
import ReactTooltip from "react-tooltip";

function Notes(props) {
	const [id, setActive] = useState();
	const [notes, setNotes] = useState(props.notes);
	const [categoryId, setCategoryId] = useState(props.notes);

	useEffect(() => {
		setNotes(props.notes);
		setCategoryId(props.categoryId);
		ReactTooltip.rebuild();
	}, [props.notes]);

	const onClick = (id) => {
		setActive(id);
	};
	const newNoteClicked = () => {
		const newid = moment().valueOf();
		const note = {
			date_modified: moment().format("YYYY-MM-DD HH:mm:ss"),
			title: "",
			text: "",
			id: newid,
			category_id: categoryId,
		};
		NotesService.create(note)
			.then((result) => {
				// console.log(result);
			})
			.catch((err) => {
				console.log(err);
			});
		setNotes((notes) => [...[note], ...notes]);
		props.onNoteCreated(newid);
	};
	const getIngress = (text) => {
		const splitted = text.split(/\r?\n/);

		if (typeof splitted[2] === "string") {
			return splitted[2].trunc(95);
		} else {
			return "...";
		}
	};
	return (
		<div id="notes" className="border-l border-r bg-gray-200">
			<div className="flex-shrink-0 px-4 py-3 border-b flex items-center justify-between">
				<button className="flex items-center text-xs font-semibold text-gray-600">
					Sorted by Date <FaSort />
					<span className="leading-loose h-6 w-6 stroke-current text-gray-500">
						<i className="fas fa-chevron-down ml-1"></i>
					</span>
				</button>
				<button onClick={newNoteClicked} data-tip="Create note">
					<span className=" h-6 w-6 stroke-current text-gray-600 font-medium">
						<BsPencilSquare className="text-gray-400 hover:text-gray-500" />
					</span>
				</button>
			</div>
			<div className="overflow-y-auto">
				{notes.length !== 0 ? (
					notes.map((note) => (
						<Link
							key={note.id}
							id={note.id}
							onClick={(e) => {
								props.noteClicked(e, note.id);
								onClick(note.id);
							}}
							to={"/"}
							className={
								note.id === id
									? "block px-6 pt-3 pb-4 bg-white border-t active"
									: "block px-6 pt-3 pb-4 bg-white border-t"
							}
						>
							<div className="flex justify-between">
								<span className="text-sm font-semibold ">
									{note.title}
								</span>
								<span
									className={
										note.id === id
											? "text-sm text-gray-500 active"
											: "text-sm text-gray-500"
									}
								>
									<Moment fromNow>
										{note.date_modified}
									</Moment>
								</span>
							</div>
							<p className="text-sm text-gray-900"></p>
							<p className="text-sm mt-2">
								{getIngress(note.text)}
							</p>
							<p className="mb-2">
								<button
									className="ml-6 float-right text-gray-300 hover:text-gray-500"
									data-tip="Move to trash"
								>
									<span className="leading-normal">
										<FaTrash className="w-2.5 text-gray-400 hover:text-gray-500" />
									</span>
								</button>
							</p>
						</Link>
					))
				) : (
					<>
						<div className="p-3 w-full text-center text-gray-500 my-20 font-thin">
							{/* <div className="mb-3">
								<BsPencilSquare className="block w-8 h-10 mx-auto text-gray-400"/>
							</div> */}
							<p className="text-lg font-thin">No notes</p>
							<span className="text-sm">
								Create new by clicking
							</span>
							<span>
								<BsPencilSquare className="inline ml-2" />
							</span>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
export default Notes;
