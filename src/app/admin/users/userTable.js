import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";

export const UsersTable = ({ ldap }) => {
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
              Email
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              User DN
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
              Phone
            </th>
          </tr>
        </thead>
        <tbody>
          {ldap.map((entry, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.admin.org}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.email}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.user_dn}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.phone}
              </td>
              <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-300">
                {entry.admin_password}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
