import { useState, useEffect } from "react";
import { BsCloudDownloadFill, BsTagFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";

function Mainheader(props) {
	const onClickDeleteNote = () => {
		console.log(noteId);
	};

	const [noteId, setNoteId] = useState(props.noteId)

	useEffect(() => {
		setNoteId(props.noteId)		
	}, [props.noteId]);

	return (
		<div className="">
			<div className="flex items-center px-5 py-4 justify-between bg-gray-100 border-b">
				<div className="flex items-center">
					<button>
						<span className="leading-normal text-gray-600">
							<BsCloudDownloadFill className="text-gray-400 hover:text-gray-500"/>
						</span>
					</button>
					<button className="ml-6">
						<span className="leading-normal text-gray-600">
							<BsTagFill className="text-gray-400 hover:text-gray-500"/>
						</span>
					</button>
					<button className="ml-6" data-tip="Move to trash">
						<span className="leading-normal text-gray-600">
							<FaTrash onClick={onClickDeleteNote} className="text-gray-400 hover:text-gray-500"/>
						</span>
					</button>
				</div>
			</div>
		</div>
	);
}

export default Mainheader;
