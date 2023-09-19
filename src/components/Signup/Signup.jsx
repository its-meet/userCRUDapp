import axios from "axios";
import React, { useEffect, useState } from "react";
const Signup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [mobile, setMobile] = useState("");

  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      let res = await axios.post("/api/auth/signup", {
        firstName,
        lastName,
        email,
        address1,
        address2,
        country,
        city,
        zipcode,
        state,
        mobile,
      });
      console.log(res.data);
      res.data && window.location.replace("/login");
    } catch (error) {
      console.log(error);
      setError(true);
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
    <>
      <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
        <div className="container max-w-screen-lg mx-auto">
          <div>
            <h2 className="font-semibold text-xl text-gray-600 text-center mb-2">
              User Form
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
                        required
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
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-5 invalid:">
                      <label htmlFor="email">Email Address</label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email@domain.com"
                      />
                    </div>

                    <div className="md:col-span-full">
                      <label htmlFor="address1">Address 1</label>
                      <input
                        type="text"
                        name="address1"
                        id="address1"
                        required
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-full">
                      <label htmlFor="address2">Address 2</label>
                      <input
                        type="text"
                        name="address2"
                        id="address2"
                        className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                    </div>

                    <div className="md:col-span-3">
                      <label>Select a Country:</label>
                      <select
                        value={country}
                        onChange={handleCountryChange}
                        className="text-sm mt-2 rounded-md" 
                      >
                        <option value="">Select a country</option>
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
                        required
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
                        required
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
                        required
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
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-6 rounded">
                          SignUp
                        </button>
                        <span className="mt-3 text-black font-semibold mb-2">
                          Already have an account ?{" "}
                          <a
                            className="underline text-blue-400 hover:text-red-500"
                            href="/login"
                          >
                            Login
                          </a>
                        </span>
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

                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
