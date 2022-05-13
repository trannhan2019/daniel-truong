import "./home.css";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../redux/userRequest";

const HomePage = () => {
  //DUMMY DATA
  const userData = [
    {
      username: "anhduy1202",
    },
    {
      username: "kelly1234",
    },
    {
      username: "danny5678",
    },
    {
      username: "kenny1122",
    },
    {
      username: "jack1234",
    },
    {
      username: "loi1202",
    },
    {
      username: "nhinhi2009",
    },
    {
      username: "kellynguyen1122",
    },
  ];
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  useEffect(() => {
    getAllUsers(user?.accessToken, dispatch);
  }, []);
  return (
    <main className="home-container">
      <div className="home-title">User List</div>
      <div className="home-userlist">
        {userData.map((user, idx) => {
          return (
            <div className="user-container" key={idx}>
              <div className="home-user">{user.username}</div>
              <div className="delete-user"> Delete </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default HomePage;
