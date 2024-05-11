const Modal = ({ heading, children, isOpen }) => {
  return (
    <div
      className={`flex flex-col items-center card w-1/3 rounded-md shadow-black shadow-md overflow-hidden z-50 transition-opacity duration-300 ease-in-out ${
        isOpen ? "opacity-100" : "opacity-0"
      } bg-gray-900 bg-opacity-75 backdrop-blur-sm md:backdrop-blur md:backdrop-filter backdrop-brightness-75`}
    >
      <div className="flex flex-col items-center card-header w-full px-4 py-3 bg-gray-200 border-b border-gray-300">
        <h2 className="text-center text-xl font-medium text-gray-800">
          {heading}
        </h2>
      </div>
      <div className="card-content w-full">{children}</div>
    </div>
  );
};

export default Modal;
