import { useState } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";

import './AddProject.css';



export default function AddProject() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
     const [selectedFile, setSelectedFile] = useState([]);
    const [category, setCategory] = useState("");
    let history = useHistory();
const token = window.localStorage.getItem("token");
    const handleSubmit = async(event) => {
        event.preventDefault();
        const fileData = new FormData();
        fileData.append("name", name);
        fileData.append("description", description);
        fileData.append("file", selectedFile);
        fileData.append("category", category);
       try {
            const result = await Axios.post(
              `${process.env.REACT_APP_BASE_URL}/api/student/AddProject`,
              fileData,
              {
                headers: {
                  "Content-Type": "application/json, text/plain, */*",
                  token: `${token}`,
                },
              }
            );
           console.log("result:", result);
           alert(' Added project');
        history.push("/Dashboard");
        } catch (err) {
           alert(err);
        }
    }

    return (
      <div className="contact-us">
        <form
          method="POST"
          encType="multipart/form-data"
          class="contact-us"
          onSubmit={handleSubmit}
        >
          <label>
            Enter Project name:
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Enter description:
            <input
              type="text"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <input
            class="file"
            type="file"
            name="file"
            id="file"
            onChange={(e) => setSelectedFile(e.target.files[0])}
          />

          <select
            value={category}
            name="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="MERN">MERN</option>
            <option value="Python">Python</option>
            <option value="MobileApp">MobileApp</option>
            <option value="Other">Other</option>
          </select>
          {console.log("data:", selectedFile)}
          <input type="submit" />
        </form>
      </div>
    );
}

