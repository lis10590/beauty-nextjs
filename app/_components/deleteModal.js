const DeleteModal = ({ isOpen, onClose, onYesClick }) => {
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
      <div className="flex flex-col w-96 bg-white rounded-md px-4 py-4">
        <button className="text-xl place-self-end" onClick={onClose}>
          X
        </button>
        <p className="text-center">
          Are you sure you want to delete this item?
        </p>

        <div className="mt-4 flex justify-around">
          <button
            className="bg-gray-300 rounded-md px-3 py-2 mx-2"
            onClick={onClose}
          >
            No
          </button>
          <button
            className="bg-red-300 rounded-md px-3 py-2"
            onClick={onYesClick}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );

  // return (
  //   <Modal show={props.isOpen} onHide={props.onClose}>
  //     <Modal.Header closeButton />
  //     <Modal.Body>
  //       <p className="text-center">Are you sure you want to delete?</p>
  //       <div className="d-flex justify-content-evenly">
  //         <Button className={styles.saveButton} onClick={props.onYesClick}>
  //           Yes
  //         </Button>
  //         <Button variant="secondary" onClick={props.onNoClick}>
  //           No
  //         </Button>
  //       </div>
  //     </Modal.Body>
  //   </Modal>
  // );
};

export default DeleteModal;
