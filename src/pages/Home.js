import { useState } from "react";
import { useLocation, useParams } from "react-router";
import { useEffect } from "react/cjs/react.development";
import Header from "../components/Header";
import Main from "../components/Main";
import Notes from "../components/Notes";
import Sidebar from "../components/Sidebar";
import CategoryService from "../service/CategoryService";
import NotesService from "../service/NotesService";

function Home(props) {
	const [noteId, setNoteId] = useState();
	const [notes, setNotes] = useState([]);
	const [categoryId, setCategoryId] = useState("allnotes");

	useEffect(() => {
		getAllNotes();
	}, []);

	const noteClicked = (e, key) => {
		e.preventDefault();
		setNoteId(key);
	};
	const noteCreated = (key) => {
		setNoteId(key);
	};
	const getAllNotes = () => {
		NotesService.getAll()
			.then((result) => {
				setNotes(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};
	const getNotesByCategory = (id) => {
		NotesService.getNotesByCategory(id)
			.then((result) => {
				setNotes(result.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const onFocusOut = () => {
		categoryId === "allnotes"
			? getAllNotes()
			: getNotesByCategory(categoryId);
	};

	const sidebarClicked = (e, id) => {
		setCategoryId(id);
		id === "allnotes" 
			? getAllNotes() 
			: getNotesByCategory(id);
	};
	return (
		<div className="wrapper">
			{/* <Header /> */}
			<Sidebar clickHandler={sidebarClicked} noteSubmitted={noteId}/>
			<Notes noteClicked={noteClicked} notes={notes} onNoteCreated={noteCreated} categoryId={categoryId} />
			<Main id={noteId} onDone={onFocusOut} />
		</div>
	);
}
export default Home;
