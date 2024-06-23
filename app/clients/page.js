import Link from "next/link";
import Card from "../_components/card";
import Pagination from "../_components/pagination";
import DeleteButton from "../_components/deleteButton";
import { getCustomers } from "../actions";

const Clients = async (context) => {
  const page = context.searchParams.page ? context.searchParams.page : "1";
  console.log(page);

  const { customers, totalPages } = await getCustomers(page);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Card heading="Clients" modal="client">
            {customers.map((customer) => {
              return (
                <div key={customer._id} className="flex justify-between">
                  <Link
                    className="m-auto"
                    href={`/clients/${customer.customerId._id}`}
                  >
                    {customer.customerId.fullName}
                  </Link>
                  <DeleteButton
                    id={customer.customerId._id.toString()}
                    modal="client"
                  />
                </div>
              );
            })}
          </Card>
          <Pagination
            type="clients"
            totalPages={totalPages}
            currentPage={page}
          />
        </div>
      </div>
    </>
  );
};

export default Clients;
