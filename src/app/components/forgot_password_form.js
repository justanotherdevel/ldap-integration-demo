import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPasswordForm = ({ org }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    oldPassword: "",
    newPassword: "",
    reEnteredPassword: "",
  });

  const [showOtp, setShowOtp] = useState(false);

  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    reEnteredPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTogglePasswordVisibility = (fieldName) => {
    setPasswordVisibility({
      ...passwordVisibility,
      [fieldName]: !passwordVisibility[fieldName],
    });
  };

  const handleSendOTP = async () => {
    try {
      const res = await axios.get(
        `/api/ldap/getConnections/${org}/nonAdmin/changePassword?email=${formData.email}`
      );
      setShowOtp(true);
      alert(res.data.msg);
    } catch (error) {
      console.log(error);
      alert(error.response.data);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Implement your password validation logic here
    const { email, otp, newPassword, reEnteredPassword } = formData;

    if (newPassword !== reEnteredPassword) {
      alert("New Password and Re-entered Password must match.");
      return;
    }

    // Handle password change request here
    const form = {
      otp: otp,
      password: newPassword,
      email: email,
    };

    try {
      await axios.post(
        `/api/ldap/getConnections/${org}/nonAdmin/changePassword`,
        form
      );
      alert("Password Changed Successfully");
      router.push("/thankyou");
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid email or old password");
      }
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {org} - Forgot Password
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            {showOtp && (
              <div>
                <label htmlFor="otp" className="sr-only">
                  OTP
                </label>
                <div className="relative">
                  <input
                    id="otp"
                    name="otp"
                    type="text"
                    required
                    value={formData.otp}
                    onChange={handleChange}
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    placeholder="OTP"
                  />
                </div>
              </div>
            )}
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleSendOTP}
                className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Send OTP
              </button>
            </div>
            <div>
              <label htmlFor="new-password" className="sr-only">
                New Password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  name="newPassword"
                  type={passwordVisibility.newPassword ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="New Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  onClick={() => handleTogglePasswordVisibility("newPassword")}
                >
                  {passwordVisibility.newPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="re-enter-password" className="sr-only">
                Re-enter Password
              </label>
              <div className="relative">
                <input
                  id="re-enter-password"
                  name="reEnteredPassword"
                  type={
                    passwordVisibility.reEnteredPassword ? "text" : "password"
                  }
                  required
                  value={formData.reEnteredPassword}
                  onChange={handleChange}
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Re-enter Password"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
                  onClick={() =>
                    handleTogglePasswordVisibility("reEnteredPassword")
                  }
                >
                  {passwordVisibility.reEnteredPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 2a8 8 0 1000 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 100 12z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // return (
  //   <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
  //     <div className="max-w-md w-full space-y-8">
  //       <div>
  //         <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
  //           {org} - Forgot Password
  //         </h2>
  //       </div>
  //       <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
  //         <div className="rounded-md shadow-sm -space-y-px">
  //           <div>
  //             <label htmlFor="email-address" className="sr-only">
  //               Email address
  //             </label>
  //             <input
  //               id="email-address"
  //               name="email"
  //               type="email"
  //               autoComplete="email"
  //               required
  //               value={formData.email}
  //               onChange={handleChange}
  //               className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //               placeholder="Email address"
  //             />
  //           </div>
  //           <div>
  //             <label htmlFor="old-password" className="sr-only">
  //               Old Password
  //             </label>
  //             <div className="relative">
  //               <input
  //                 id="old-password"
  //                 name="oldPassword"
  //                 type={passwordVisibility.oldPassword ? "text" : "password"}
  //                 required
  //                 value={formData.oldPassword}
  //                 onChange={handleChange}
  //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                 placeholder="Old Password"
  //               />
  //               <button
  //                 type="button"
  //                 className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
  //                 onClick={() => handleTogglePasswordVisibility("oldPassword")}
  //               >
  //                 {passwordVisibility.oldPassword ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //           <div>
  //             <label htmlFor="new-password" className="sr-only">
  //               New Password
  //             </label>
  //             <div className="relative">
  //               <input
  //                 id="new-password"
  //                 name="newPassword"
  //                 type={passwordVisibility.newPassword ? "text" : "password"}
  //                 required
  //                 value={formData.newPassword}
  //                 onChange={handleChange}
  //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                 placeholder="New Password"
  //               />
  //               <button
  //                 type="button"
  //                 className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
  //                 onClick={() => handleTogglePasswordVisibility("newPassword")}
  //               >
  //                 {passwordVisibility.newPassword ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //           <div>
  //             <label htmlFor="re-enter-password" className="sr-only">
  //               Re-enter Password
  //             </label>
  //             <div className="relative">
  //               <input
  //                 id="re-enter-password"
  //                 name="reEnteredPassword"
  //                 type={
  //                   passwordVisibility.reEnteredPassword ? "text" : "password"
  //                 }
  //                 required
  //                 value={formData.reEnteredPassword}
  //                 onChange={handleChange}
  //                 className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
  //                 placeholder="Re-enter Password"
  //               />
  //               <button
  //                 type="button"
  //                 className="absolute inset-y-0 right-0 pr-3 flex items-center focus:outline-none"
  //                 onClick={() =>
  //                   handleTogglePasswordVisibility("reEnteredPassword")
  //                 }
  //               >
  //                 {passwordVisibility.reEnteredPassword ? (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M5.293 6.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 ) : (
  //                   <svg
  //                     xmlns="http://www.w3.org/2000/svg"
  //                     className="h-5 w-5 text-gray-400"
  //                     viewBox="0 0 20 20"
  //                     fill="currentColor"
  //                   >
  //                     <path
  //                       fillRule="evenodd"
  //                       d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 100-12 6 6 0 000 12z"
  //                       clipRule="evenodd"
  //                     />
  //                   </svg>
  //                 )}
  //               </button>
  //             </div>
  //           </div>
  //         </div>

  //         <div>
  //           <button
  //             type="submit"
  //             className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
  //           >
  //             Change Password
  //           </button>
  //         </div>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default ForgotPasswordForm;
