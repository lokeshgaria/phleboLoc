import {GET_PHLEBO_REQUEST,GET_PHLEBO_SUCCESS,GET_PACKAGES_FAIL} from "./constants"


export const getPhleboReducer = (state = { packages: {} }, action) => {
    switch (action.type) {
      case GET_PHLEBO_REQUEST:
        return {
          loading: true,
          packages: {},
        };
      case GET_PHLEBO_SUCCESS:
        return {
          loading: false,
          packages: action.payload,
        };
      case GET_PACKAGES_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
      default:
        return {
          ...state,
        };
    }
  };