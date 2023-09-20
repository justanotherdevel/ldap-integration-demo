import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const LDAPForm = ({ initialValues }) => {
  const [formData, setFormData] = useState(initialValues || {});
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      await axios.post("/api/ldap/getConnections", { data: formData });
      router.push("/admin");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Organization
          </label>
          <input
            type="text"
            name="org"
            value={formData.org || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            LDAP Host
          </label>
          <input
            type="text"
            name="ldap_host"
            value={formData.ldap_host || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            LDAP Port
          </label>
          <input
            type="number"
            name="ldap_port"
            value={formData.ldap_port || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            User DN
          </label>
          <input
            type="text"
            name="user_dn"
            value={formData.user_dn || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            CBIC Orgn
          </label>
          <input
            type="text"
            name="cbic_orgn"
            value={formData.cbic_orgn || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Para with UID
          </label>
          <input
            type="text"
            name="para_with_uid"
            value={formData.para_with_uid || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Password
          </label>
          <input
            type="text"
            name="user_password"
            value={formData.user_password || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
          />
        </div>
        <div className="mb-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default LDAPForm;
