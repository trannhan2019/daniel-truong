import {
  getUsersStart,
  getUsersSuccess,
  getUsersFailed,
  deleteUserStart,
  deleteUsersSuccess,
  deleteUserFailed,
} from './userSlice';

export const getAllUsers = async (
  accessToken,
  dispatch,
  axiosJWT
) => {
  dispatch(getUsersStart());
  try {
    const res = await axiosJWT.get('http://localhost:8000/v1/user', {
      headers: { token: `Bearer ${accessToken}` },
    });
    dispatch(getUsersSuccess(res.data));
  } catch (error) {
    dispatch(getUsersFailed());
  }
};

export const deleteUser = async (
  accessToken,
  dispatch,
  id,
  axiosJWT
) => {
  dispatch(deleteUserStart());
  try {
    const res = await axiosJWT.delete(
      `http://localhost:8000/v1/user/${id}`,
      {
        headers: { token: `Bearer ${accessToken}` },
      }
    );
    dispatch(deleteUsersSuccess(res.data));
  } catch (error) {
    dispatch(deleteUserFailed(error.response.data));
  }
};
