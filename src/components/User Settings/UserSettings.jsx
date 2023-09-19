import { useContext, useState, useEffect } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";

export default function Settings() {
  const { user, dispatch } = useContext(Context);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [email, setEmail] = useState(user.email);
  const [address1, setAddress1] = useState(user.address1);
  const [address2, setAddress2] = useState(user.address2);
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [zipcode, setZipcode] = useState(user.zipcode);
  const [mobile, setMobile] = useState(user.mobile);
  const [state, setState] = useState(user.state);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_START" });
    const updatedUser = {
      userId: user._id,
      firstName,
      lastName,
      email,
      address1,
      address2,
      country,
      city,
      zipcode,
      mobile,
      state,
    };
    try {
      const res = await axios.put("/api/user/" + user._id, updatedUser);
      dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
      setSuccess(true);
      setError(false);
    } catch (err) {
      dispatch({ type: "UPDATE_FAILURE" });
      setError(true);
      setSuccess(false);
    }
  };

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete("/api/user/" + user._id);
      dispatch({ type: "LOGOUT" });
      setSuccess(true);
      console.log(res.data);
      console.log("Account has been deleted successfully");
    } catch (error) {
      setError(true);
      setSuccess(false);
    }
  };
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data) => {
        const countriesData = data.map((country) => ({
          name: country.name.common,
          code: country.cca2,
        }));
        setCountries(countriesData);
      })
      .catch((error) => console.error("Error fetching countries:", error));
  });
  const handleCountryChange = (event) => {
    setCountry(event.target.value);
  };
  return (
    <div className="container max-w-screen-lg mx-auto">
      <div>
        <h2 className="font-semibold text-xl mt-2 text-gray-600 text-center mb-2">
          Set Your Account
        </h2>
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6"
        >
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5">
                <div className="md:col-span-5">
                  <label htmlFor="firstName">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    defaultValue={user.firstName}
                    placeholder={user.firstName}
                    required={firstName.length < 0 ? false : true}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  />
                </div>
                <div className="md:col-span-5">
                  <label htmlFor="lastName">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required={lastName.length < 0 ? false : true}
                    defaultValue={lastName}
                    placeholder={user.lastName}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="md:col-span-5">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    placeholder={user.email}
                    required={email.length < 0 ? false : true}
                    defaultValue={email}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="md:col-span-full">
                  <label htmlFor="address1">Address 1</label>
                  <input
                    type="text"
                    name="address1"
                    id="address1"
                    defaultValue={user.address1}
                    placeholder={user.address1}
                    required={address1.length < 0 ? false : true}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setAddress1(e.target.value)}
                  />
                </div>
                <div className="md:col-span-full">
                  <label htmlFor="address2">Address 2</label>
                  <input
                    type="text"
                    name="address2"
                    placeholder={user.address2}
                    id="address2"
                    defaultValue={user.address2}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setAddress2(e.target.value)}
                  />
                </div>

                <div className="md:col-span-3">
                  <label>Select a Country:</label>
                  <select
                    value={country}
                    onChange={handleCountryChange}
                    className="mt-2 text-sm rounded-md"
                    defaultValue={country}
                  >
                    {countries.map((country) => (
                      <option key={country.code} value={country.code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="city">City</label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required={city.length < 0 ? false : true}
                    defaultValue={user.city}
                    placeholder={user.city}
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="zipcode">Zipcode</label>
                  <input
                    type="number"
                    name="zipcode"
                    id="zipcode"
                    defaultValue={user.zipcode}
                    required={zipcode.length < 0 ? false : true}
                    placeholder={user.zipcode}
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setZipcode(e.target.value)}
                  />
                </div>
                <div className="md:col-span-3">
                  <label htmlFor="state">State</label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    required={state.length < 0 ? false : true}
                    placeholder={user.state}
                    defaultValue={user.state}
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setState(e.target.value)}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="mobile"> Mobile </label>
                  <input
                    type="number"
                    name="mobile"
                    id="mobile"
                    required
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="md:col-span-5 text-left mt-2">
                  <div className="flex justify-between">
                    <button className="bg-green-600 hover:bg-green-800 text-white font-bold mt-2 py-2 px-6 rounded">
                      Update Account
                    </button>
                    <button
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-800 text-white font-bold mt-2 py-2 px-6 rounded"
                    >
                      Delete Account
                    </button>
                  </div>
                  {error && (
                    <div
                      id="alert-border-2"
                      className="flex mt-2 items-center p-4 mb-4 text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800"
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div className="ml-3 text-sm font-medium">
                        Error! 🥺 Something went wrong ...
                      </div>
                      <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-red-500 rounded-lg focus:ring-2 focus:ring-red-400 p-1.5 hover:bg-red-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-red-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                        onClick={() => setError(false)}
                      >
                        <span className="sr-only">Dismiss</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  )}

                  {success && (
                    <div
                      id="alert-border-2"
                      className="flex mt-2 items-center p-4 mb-4 text-lime-800 border-t-4 border-lime-300 bg-lime-50 dark:text-lime-400 dark:bg-gray-800 dark:border-lime-800"
                      role="alert"
                    >
                      <svg
                        className="flex-shrink-0 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                      </svg>
                      <div className="ml-3 text-sm font-medium">
                        Success! 😃 Your account has been Updated ...
                      </div>
                      <button
                        type="button"
                        className="ml-auto -mx-1.5 -my-1.5 bg-red-50 text-lime-500 rounded-lg focus:ring-2 focus:ring-lime-400 p-1.5 hover:bg-lime-200 inline-flex items-center justify-center h-8 w-8 dark:bg-gray-800 dark:text-lime-400 dark:hover:bg-gray-700"
                        data-dismiss-target="#alert-border-2"
                        aria-label="Close"
                        onClick={() => setSuccess(false)}
                      >
                        <span className="sr-only">Dismiss</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
