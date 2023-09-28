import axios from "axios";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const LDAPForm = ({ initialValues, edit }) => {
  const [formData, setFormData] = useState(initialValues || {});
  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    setFormData(initialValues || {});
  }, [initialValues]);

  useEffect(() => {
    if (edit === null) {
      setIsEdit(false);
    } else {
      setIsEdit(edit);
    }
  }, [edit]);

  console.log("formData", formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        const res = await axios.put(`/api/ldap/getAdmins/${formData.org}`, {
          data: formData,
        });
        alert(
          `LDAP Connection Updated. Discovered ${res.data.users} new users. ${res.data.duplicate} duplicates found.`
        );
      } else {
        const res = await axios.post(`/api/ldap/getAdmins`, {
          data: formData,
        });
        alert(
          `LDAP Connection Added. Discovered ${res.data.users} new users. ${res.data.duplicate} duplicates found.`
        );
      }
      router.push("/admin/ldaps");
    } catch (error) {
      if (error.response.status === 500) {
        console.log(error);
        alert("Something went wrong");
      } else {
        console.log(error);
        console.error(error.response.data);
        alert(error.response.data.toString());
      }
    }
  };

  return (
    <div className="container mx-auto mt-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Organization
          </label>
          {isEdit ? (
            <div className="border rounded w-full py-2 px-3 bg-gray-200">
              {formData.org}
            </div>
          ) : (
            <input
              type="text"
              name="org"
              value={formData.org || ""}
              onChange={handleChange}
              className="border rounded w-full py-2 px-3"
              required // Make this field required
            />
          )}
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
            required // Make this field required
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
            required // Make this field required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Admin DN
          </label>
          <input
            type="text"
            name="admin_dn"
            value={formData.admin_dn || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required // Make this field required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Admin Password
          </label>
          <input
            type="text"
            name="admin_password"
            value={formData.admin_password || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required // Make this field required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-600 font-semibold mb-2">
            Base DN
          </label>
          <input
            type="text"
            name="base_dn"
            value={formData.base_dn || ""}
            onChange={handleChange}
            className="border rounded w-full py-2 px-3"
            required // Make this field required
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
