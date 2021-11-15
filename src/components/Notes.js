import { BsSortUp } from "react-icons/bs";
import { useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";

function Notes(props) {
	const [id, setActive] = useState();

	const onClick = (id) => {
		setActive(id);
	};

	return (
		<div id="notes" className="border-l border-r bg-gray-200">
			<div className="flex-shrink-0 px-4 py-3 border-b flex items-center justify-between">
				<button className="flex items-center text-xs font-semibold text-gray-600">
					Sorted by Date
					<span className="leading-loose h-6 w-6 stroke-current text-gray-500">
						<i className="fas fa-chevron-down ml-1"></i>
					</span>
				</button>
				<button>
					<span className=" h-6 w-6 stroke-current text-gray-600 font-medium">
						<BsSortUp />
					</span>
				</button>
			</div>
			<div className="overflow-y-auto">
				{props.data.map((note) => (
					<Link
						key={note.id}
						id={note.id}
						onClick={(e) => {
							props.noteClicked(e, note.id)
							onClick(note.id)
						}}
						to={"/"}
						className={
							note.id === id
								? "block px-6 pt-3 pb-4 border-t active "
								: "block px-6 pt-3 pb-4 bg-white border-t"
						}
					>
						<div className="flex justify-between">
							<span className="text-sm font-semibold _text-gray-900">
								{note.title}
							</span>
						</div>
						<p className="text-sm text-gray-500_">
							<Moment format="D MMM YYYY">{note.modified}</Moment>
						</p>
					</Link>

				))}
			</div>
		</div>
	);
}
export default Notes;
