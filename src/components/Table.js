import React from "react";
import { useSelector } from "react-redux";
import { removeUser, editUser } from "../redux/userSlice";
import { useDispatch } from "react-redux";
const Table = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);

  return (
    <div className="container ">
      <h2>Users Data</h2>
      {users.length !== 0 ? (
        <table>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Date of birth</th>
            <th>Phone number</th>
            <th>Address</th>
            <th>Action</th>
          </tr>
          {users?.map((user, index) => {
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.age}</td>
                <td>{user.dateOfBirth}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.address.join(', ')}</td>
                <td style={{ display: "flex" }}>
                  <button
                    onClick={() => dispatch(editUser(user, index))}

                    className="buttons"
                  >
                    Edit
                  </button>{" "}
                  <button
                    onClick={() => dispatch(removeUser(user.id))}
                    className="buttons"
                    style={{ background: "red" }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </table>
      ) : (
        <div className="notfound"><h2>Users Not Found!</h2></div>
      )}
    </div>
  );
};
export default Table;
