import { useEffect, useState } from "react";
import { api } from "../api";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Updated route to match backend
        const res = await api.get("/users");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <ul>
      {users.map((u) => (
        <li key={u._id}>
          {u.name} - {u.email}
        </li>
      ))}
    </ul>
  );
}
