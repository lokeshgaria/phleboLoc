import Axios from "axios";

import {GET_PHLEBO_REQUEST,GET_PHLEBO_SUCCESS,GET_PACKAGES_FAIL} from  "./constants"

export const getPhleboList =
  () =>
  async (dispatch) => {
    try {
      dispatch({
        type: GET_PHLEBO_REQUEST,
      });
      
        var { data } = await Axios.get(
          `https://apidev.redcliffelabs.com/api/v1/booking/phlebo_loc/`
        );
      console.log(data)
      dispatch({
        type: GET_PHLEBO_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_PACKAGES_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
