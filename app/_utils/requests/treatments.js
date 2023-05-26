import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

//add new treatment
export const addNewTreatment = async (treatment) => {
  try {
    const res = await axios.post(
      `${apiUrl}/api/treatments/newTreatment`,
      treatment,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//display all treatments
export const getTreatments = async () => {
  try {
    const res = await axios.get(`${apiUrl}/api/treatments/getTreatments`, {
      headers: { "Cache-Control": "no-store" },
    });

    return res.data;
  } catch (err) {
    console.error(err);
  }
};

//delete treatment
export const deleteTreatment = async (treatmentId) => {
  try {
    const res = await axios.delete(
      `${apiUrl}/api/treatments/deleteTreatment?treatmentId=${treatmentId}`,
      {
        headers: { "Cache-Control": "no-store" },
      }
    );
    return res.data;
  } catch (err) {
    console.error(err);
  }
};
