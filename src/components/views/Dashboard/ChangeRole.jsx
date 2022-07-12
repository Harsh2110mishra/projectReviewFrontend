import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import "./AddProject.css";



export default function ChangeRole() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  let history = useHistory();
const token = window.localStorage.getItem("token");
  const handleSubmit = async (e) => {
    e.preventDefault();
    const fileData = new FormData();
    fileData.append("email", email);
    fileData.append("role", role);
    try {
      const result = await Axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/admin/users`,
        fileData,
        {
          headers: {
            "Content-Type": "application/json, text/plain, */*",
            token: `${token}`,
          },
        }
      );
      console.log("result:", result);
      alert(" Role Changed");
      window.location.reload();
    } catch (err) {
      alert(err);
    }
  };

  return (
    <div className="contact-us">
      <form
        method="POST"
        encType="multipart/form-data"
        class="contact-us"
        onSubmit={handleSubmit}
      >
        <label>
          Email:
          <input
            type="text"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <select
          value={role}
          name="role"
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="user">Student</option>
          <option value="admin">Mentor</option>
        </select>
        <input type="submit" />
      </form>
    </div>
  );
}
