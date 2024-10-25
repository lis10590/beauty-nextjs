import Calendar from "../_components/calendar";
import { getEvents, getTreatmentsList, getCustomersList } from "../actions";

const Home = async () => {
  const events = await getEvents();
  const treatments = await getTreatmentsList();
  const customers = await getCustomersList();

  const editEvent = (event) => {
    event["title"] =
      event.treatmentId.treatmentName + "-" + event.customerId.fullName;
    event.id = event._id;
    return event;
  };

  const editTreatments = (treatment) => {
    treatment["value"] = treatment.treatmentId._id;
    treatment["label"] = treatment.treatmentId.treatmentName;
  };

  const editCustomers = (customer) => {
    customer["value"] = customer.customerId._id;
    customer["label"] = customer.customerId.fullName;
  };

  events.forEach((event) => editEvent(event));
  treatments.forEach((treatment) => editTreatments(treatment));
  customers.forEach((customer) => editCustomers(customer));

  return (
    <Calendar treatments={treatments} events={events} customers={customers} />
  );
};

export default Home;
