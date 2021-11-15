import Mainheader from "./Mainheader";
import { useEffect, useState } from "react";
import InlineEdit from "./InlineEdit";
import ReactMarkdown from "react-markdown";
import NotesService from "../service/NotesService";
import { useLocation, useParams } from "react-router";
import remarkGfm from 'remark-gfm'

String.prototype.trunc = 
      function(n){
          return this.substr(0,n-1)+(this.length>n?'...':'');
      };

function Main(props) {
	const [value, setValue] = useState();
	const [edit, setEdit] = useState(false);
	useEffect(() => {

		if (props.id) {
			NotesService.get(props.id)
				.then((result) => {
					setValue(result.data[0].text);
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
		const ks = value.split(/\r?\n/);
		NotesService.update(props.id, { text: value, title: ks[0].trunc(24)})
			.then((result) => {
				setValue(value);
				props.onDone()
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<main className="border-l border-r bg-white">
			<Mainheader />
			<div className="overflow-y-auto_ p-5">
				{edit ? (
					<InlineEdit
						value={value}
						setValue={setValue}
						onBlur={onFocusOut}
					/>
				) : (
					<div onClick={clickHandler} className="w-full h-full">
						<ReactMarkdown
							children={value}
							className="h-full_ markdown"
							remarkPlugins={[remarkGfm]}
						/>
					</div>
				)}
			</div>
		</main>
	);
}
export default Main;
