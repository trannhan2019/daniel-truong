import axios from "axios";

import { getUsersStart, getUsersSuccess, getUsersFailed } from "./userSlice";

export const getAllUsers = async (accessToken, dispatch) => {
  dispatch(getUsersStart());
  try {
    const res = await axios.get("http://localhost:8000/v1/user", {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};
