import axios from "axios";
import { dataFetched } from "./slice";

const API_URL = `http://localhost:4000`;

export const fetchSpaceData = () => async (dispatch, getState) => {
  try {
    const response = await axios.get(`${API_URL}/space`);
    //console.log("response", response);
    const data = response.data;
    dispatch(dataFetched(data));
  } catch (e) {
    console.log(e.message);
  }
};
