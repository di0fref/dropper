import Nav from "./Nav";

function Sidebar(props){
    return(
        <div id="sidebar" className="p-6  bg-gray-100 text-gray-900">
            <Nav clickHandler={props.clickHandler} onNewBookCreated={props.onNewBookCreated} noteSubmitted={props.noteSubmitted}/>
        </div>
    )
}
export default Sidebar;