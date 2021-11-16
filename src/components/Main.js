import Mainheader from "./Mainheader";
import { useEffect, useState } from "react";
import InlineEdit from "./InlineEdit";
import ReactMarkdown from "react-markdown";
import NotesService from "../service/NotesService";
import remarkGfm from 'remark-gfm'
import ReactTooltip from "react-tooltip";

function Main(props) {
	const [markdown, setMarkdown] = useState();
	const [edit, setEdit] = useState(false);
	useEffect(() => {

		if (props.id) {
			NotesService.get(props.id)
				.then((result) => {
					if(result.data[0].text){
						setMarkdown(result.data[0].text)
					}
				})
				.catch((err) => {
					console.log(err);
				});
		}
		
	}, [props.id]);

	const clickHandler = () => {
		setEdit(true);
	};

	const onFocusOut = () => {
		setEdit(false);
		const match = markdown.split(/\r?\n/);
		NotesService.update(props.id, { text: markdown, title: match[0].trunc(24)})
			.then((result) => {
				setMarkdown(markdown);
				props.onDone()
			})
			.catch((err) => {
				console.log(err);
			});
	};

	
	return (
		<main className="border-l border-r bg-white">
			<Mainheader noteId={props.id}/>
			<div className="overflow-y-auto_ p-5">
				{edit ? (
					<InlineEdit
						value={markdown}
						setValue={setMarkdown}
						onBlur={onFocusOut}
					/>
				) : (
					<div onClick={clickHandler} className="w-full h-full">
						 { <ReactMarkdown
						 	children={markdown}
						 	className="h-full_ markdown prose prose-sm"
						 	remarkPlugins={[remarkGfm]}
						 />}
					
					</div>
				)}
			</div>
			<ReactTooltip type="dark" effect="solid"/>
		</main>
	);
}
export default Main;
