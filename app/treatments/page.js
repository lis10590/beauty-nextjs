import Card from "../_components/card";
import Pagination from "../_components/pagination";
import DeleteButton from "../_components/deleteButton";
import { getTreatments } from "../actions";

const Treatments = async (context) => {
  const page = context.searchParams.page ? context.searchParams.page : "1";

  const { treatments, totalPages } = await getTreatments(page);

  const tableHeadings = ["Treatment Name", "Price (ILS)"];

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Card heading="Treatments" modal="treatment">
            <table className="m-4 w-full text-center">
              <thead>
                <tr>
                  {tableHeadings.map((heading, index) => {
                    return <th key={index}>{heading}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {treatments.map((treatment) => {
                  return (
                    <tr key={treatment._id}>
                      <td>{treatment.treatmentId.treatmentName}</td>
                      <td>{treatment.treatmentId.price}</td>

                      <td>
                        <DeleteButton
                          id={treatment.treatmentId._id.toString()}
                          modal="treatment"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Pagination
            type="treatments"
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default Treatments;
