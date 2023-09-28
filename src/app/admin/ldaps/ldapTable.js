import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export const LdatTable = ({ ldap }) => {
  const router = useRouter();
  const handleDelete = async (org) => {
    try {
      const res = confirm("Delete " + org);
      if (res) {
        await axios.delete(`/api/ldap/getAdmins/${org}`);
        router.refresh();
      }
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="px-16 mx-auto mt-4">
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
              Admin DN
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Admin Password
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Base Dn
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
                {entry.admin_dn}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                ****
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.base_dn}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => {
                    router.push(`/admin/ldapAdmin/${entry.org}?edit=true`);
                  }}
                >
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
