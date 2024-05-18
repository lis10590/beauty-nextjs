import Link from "next/link";
import { getClients } from "../_utils/requests/clients";
import Card from "../_components/card";
import Pagination from "../_components/pagination";
import DeleteButton from "../_components/deleteButton";

const Clients = async (context) => {
  const page = context.searchParams.page ? context.searchParams.page : "1";

  const { clients, totalPages } = await getClients(page);

  return (
    <>
      <div>
        <div className="flex flex-col items-center justify-center mt-10">
          <Card heading="Clients">
            {clients.map((client) => {
              return (
                <div key={client._id} className="flex justify-between">
                  <Link className="m-auto" href={`/clients/${client._id}`}>
                    {client.fullName}
                  </Link>
                  <DeleteButton clientId={client._id} />
                </div>
              );
            })}
          </Card>
          <Pagination totalPages={totalPages} currentPage={page} />
        </div>
      </div>
    </>
  );
};

export default Clients;
