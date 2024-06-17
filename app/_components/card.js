// import plusIcon from "@/public/plusIcon.svg";
// import Image from "next/image";
import AddButton from "./addButton";
const Card = ({ heading, children, className = "", modal }) => {
  return (
    <div
      className={`flex flex-col items-center card w-1/3 rounded-md shadow-black shadow-md overflow-hidden ${className}`}
    >
      <div className="flex flex-col items-center card-header w-full px-4 py-3 bg-gray-200 border-b border-gray-300">
        <AddButton modal={modal} />

        <h2 className="text-center text-xl font-medium text-gray-800">
          {heading}
        </h2>
      </div>
      <div className="card-content w-full">{children}</div>
    </div>
  );
};

export default Card;
