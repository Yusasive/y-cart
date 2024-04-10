import axios from "axios";
import { server } from "../../server";

// create product
export const createCategory =
  (
    name,
    parentCategory,
    image
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: "categoryCreateRequest",
      });

      const { data } = await axios.post(
        `${server}/category/create-category`,
        name,
        parentCategory,
        image
      );
      dispatch({
        type: "categoryCreateSuccess",
        payload: data.category,
      });
    } catch (error) {
      dispatch({
        type: "categoryCreateFail",
        payload: error.response.data.message,
      });
    }
  };