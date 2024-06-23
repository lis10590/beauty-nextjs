const CustomerCard = ({ heading, children }) => {
  return (
    <div
      className={`flex flex-col items-center card w-1/3 h-4/5 rounded-md shadow-black shadow-md`}
    >
      <div className="flex flex-col items-center card-header w-full px-4 py-3 bg-gray-200 border-b border-gray-300">
        <h2 className="text-center text-xl font-medium text-gray-800">
          {heading}
        </h2>
      </div>
      <div className="card-content w-full flex flex-col items-center">
        {children}
      </div>
    </div>
  );
};

export default CustomerCard;
