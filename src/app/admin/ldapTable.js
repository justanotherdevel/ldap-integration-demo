import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const LdatTable = ({ ldap }) => {
  const handleDelete = async (org) => {
    try {
      const res = confirm("Delete " + org);
      if (res) {
        const response = await axios.delete(`/api/ldap/getConnections/${org}`);
        console.log(response);
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="container mx-auto mt-4">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Organization
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              LDAP Host
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              LDAP Port
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              User DN
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              CBIC Orgn
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Para with UID
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Password
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Edit</th>
            <th className="px-6 py-3 border-b-2 border-gray-300">Delete</th>
          </tr>
        </thead>
        <tbody>
          {ldap.map((entry, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.org}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.ldap_host}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.ldap_port}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.user_dn}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.cbic_orgn}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.para_with_uid}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.phone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.user_password}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button className="text-blue-600 hover:text-blue-800">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(entry.org)}
                >
                  <FontAwesomeIcon icon={faTrash} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
