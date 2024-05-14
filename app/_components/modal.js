const Modal = ({ heading, children, isOpen, onClose }) => {
  const handleClose = (e) => {
    if (e.target.id == "wrapper") {
      onClose();
    }
  };
  return (
    <div
      id="wrapper"
      className={`fixed inset-0 bg-opacity-25 bg-gray-900 backdrop-blur-sm flex flex-col justify-center items-center  ${
        isOpen ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div className="flex flex-col w-96 bg-white rounded-md">
        <div className="flex flex-col items-center card-header w-full px-4 py-3 bg-gray-200 border-b border-gray-300 rounded-t-md">
          <button className="text-xl place-self-end" onClick={onClose}>
            X
          </button>
          <h2 className="text-center text-xl font-medium text-gray-800">
            {heading}
          </h2>
        </div>
        <div className="card-content w-full h-full ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
