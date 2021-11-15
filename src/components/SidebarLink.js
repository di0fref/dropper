import { Link } from "react-router-dom";
import  * as Icons from "react-icons/fa" 
import { useState } from "react";

function SidebarLink(props) {

    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
      setActive(!isActive);
    };

	return (
		<Link
			to={"/"}
			className="mt-2 -mx-3 px-3 py-1 flex items-center justify-between text-sm font-medium _bg-gray-200 rounded-lg"
            onClick={toggleClass}
		>
			<span className="flex items-center">
				<span className="leading-normal">
					{/* <Iconsprops.icon className="h-5 w-5 text-gray-700" /> */}
                    {/* <Icons.{...icon}/> */}
				</span>
				<span className="ml-2 text-gray-900">{props.text}</span>
			</span>
			<span className="w-10 t py-1 text-xs font-medium rounded-full text-gray-700 bg-gray-300_">
				<span className="float-right">{props.counter}</span>
			</span>
		</Link>
	);
}

export default SidebarLink;
