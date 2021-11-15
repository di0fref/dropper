import { BsCloudDownloadFill, BsTagFill } from "react-icons/bs";

function Mainheader() {
  return (
    <div className="">
      <div className="flex items-center px-5 py-4 justify-between bg-gray-100 border-b">
        <div className="flex items-center">
          <button>
            <span className="leading-normal text-gray-600">
              <BsCloudDownloadFill />
            </span>
          </button>
          <button className="ml-6">
            <span className="leading-normal text-gray-600">
              <BsTagFill/>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Mainheader;
