import Nav from "./Nav";

function Sidebar(props){
    return(
        <div id="sidebar" className="p-6 bg-lighter text-gray-400">
            {/* bg-gray-700 text-white */}
            <Nav clickHandler={props.clickHandler} onNewBookCreated={props.onNewBookCreated}/>
        </div>
    )
}
export default Sidebar;