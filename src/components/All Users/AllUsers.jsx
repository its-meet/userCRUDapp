import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const showAllUsers = async () => {
    let res = await axios.get("/api/user");
    console.log(res.data);
    setUsers(res.data);
  };

  useEffect(() => {
    showAllUsers();
  }, []);

  const { user, dispatch } = useContext(Context);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="bg-gray-100 p-6">
      <div className="container mx-auto ">
        <button
          onClick={handleLogout}
          className="border-x-white border-2 float-left mb-2 rounded-full bg-blue-600 text-white hover:bg-blue-800 p-2"
        >
          {user && "Logout"}
        </button>
        <button
          onClick={() => {
            window.location.replace("/settings");
          }}
          className="border-x-white border-2 float-right mb-2 rounded-full bg-blue-600 text-white hover:bg-blue-800 p-2"
        >
          My profile
        </button>
        <h1 className="text-2xl font-semibold text-center mb-4">Users List</h1>
        <table className="min-w-full border mt-8 bg-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                User
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Full Name
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Email Address
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                State
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                City
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Country
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-700">
                Zip Code
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((data, index) => {
              return (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.firstName.charAt(0).toUpperCase() +
                      data.firstName.slice(1) +
                      " " +
                      data.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.state.charAt(0).toUpperCase() + data.state.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.city.charAt(0).toUpperCase() + data.city.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.country.charAt(0).toUpperCase() +
                      data.country.slice(1)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {data.zipcode}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUsers;
