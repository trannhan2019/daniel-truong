import './home.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createAxios } from '../../services/axiosInstance';

import { deleteUser, getAllUsers } from '../../store/userRequest';
import { loginSuccess } from '../../store/authSlice';

//import axios from 'axios';

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const userList = useSelector(
    (state) => state.users.users?.allUsers
  );
  const msg = useSelector((state) => state.users?.msg);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let axiosJWT = createAxios(user, dispatch, loginSuccess);
  // let axiosClient = axios.create();
  //
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    if (user?.accessToken) {
      getAllUsers(user?.accessToken, dispatch, axiosJWT);
    }
  }, []);

  const handleDelete = (id) => {
    deleteUser(user?.accessToken, dispatch, id, axiosJWT);
  };

  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-role">{`Your role: ${
        user?.isAdmin ? `Admin` : `User`
      }`}</div>
      <div className="home-userlist">
        {userList?.map((user, idx) => {
          return (
            <div className="user-container" key={idx}>
              <div className="home-user">{user.username}</div>
              <div
                className="delete-user"
                onClick={() => handleDelete(user._id)}
              >
                Delete
              </div>
            </div>
          );
        })}
      </div>
      <div className="errorMsg">{msg}</div>
    </main>
  );
};

export default HomePage;
