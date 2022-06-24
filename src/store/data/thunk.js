import axios from "axios";
import { dataFetched, getStoriesOfSpace } from "./slice";

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

export const fetchStoriesData = (id) => async (dispatch, getState) => {
  //  console.log("id", id.id);
  try {
    const response = await axios.get(`${API_URL}/story/${id.id}`);
    //console.log("response", response.data);
    const story = response.data;
    dispatch(getStoriesOfSpace(story));
  } catch (e) {
    console.log(e.message);
  }
};

export const deleteStory = (storyId, spaceId) => async (dispatch, getState) => {
  try {
    await axios.delete(`${API_URL}/story/${storyId}`);
    //console.log("response", response.data);

    //dispatch the fetch data Stories que esta no banco--- requisita o GET
    dispatch(fetchStoriesData(spaceId));
  } catch (e) {
    console.log(e.message);
  }
};
