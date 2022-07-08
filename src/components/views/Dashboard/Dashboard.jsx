import React, {useState ,useCallback, useEffect } from "react";
import Axios from "axios";
import { Link, useHistory } from "react-router-dom";

import DashboardCard from "./DashboardCard";



// material-ui imports

export default function Dashboard() {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [role, setRole] = useState();
    const [user, setUser] = useState();
    const [Error, setError] = useState();
    const [review, setReview] = useState([]);
     const [studentName, setStudentName] = useState();

    let history = useHistory();
  const token = window.localStorage.getItem("token");
  const handleLogout = useCallback(async () => {
    try {
           const result = await Axios.get(
             `${process.env.REACT_APP_BASE_URL}/api/logout`,
             {
               headers: {
                 "Content-Type": "application/json, text/plain, */*",
                 token: `${token}`,
               },
             }
           );
              setData([]);
             localStorage.removeItem("token");
             window.location.href = "/login";
             window.location.reload();
         } catch (err) {
           alert(err);
         }
    });

    useEffect(async () => {
      try {
        setLoading(true);
        const result = await Axios.get(
          `${process.env.REACT_APP_BASE_URL}/api/student/AllProjects`,
          {
            headers: {
              "Content-Type": "application/json, text/plain, */*",
              token: `${token}`,
            },
          }
        );
        console.log("result", result);
        setData(result?.data?.Projects);
        setRole(result?.data?.user?.role);
        setUser(result?.data?.user);
        setReview(result?.data?.Projects?.reviews);

        setLoading(false);
      } catch (err) {
        console.log("error in Dashboard:", err);
        setError(err);
      }
    }, [setError]);
    // material-ui
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    const handleChangeRole = () => {
        history.push("/ChangeRole");
    }
    const handleAddProject = () => {
      history.push("/AddProject");
    };

    if (loading === true) {
        return (
            <h2>Loading.... or Please hit reload</h2>
        )
    }
    else {
        return (
          <div>
            <div>
              <h2>Dashboard  :  {role === "user" ? "student" : "Mentor"}</h2>
              <button onClick={handleLogout}>Logout</button>
              {role === "user" ? (
                <button
                  style={{ marginTop: "10px" }}
                  onClick={handleAddProject}
                >
                  Add Projects
                </button>
              ) : (
                <button
                  style={{ marginTop: "10px" }}
                  onClick={handleChangeRole}
                >
                  Change Role
                </button>
              )}
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                {data.map((project) => {
                  return (
                    <DashboardCard
                      avatarName={project.name[0]}
                      title={project.name}
                      createdAtDate={project.createdAt}
                      category={project.category}
                      description={project.description}
                      role={role}
                      projectId={project._id}
                      name={user.name}
                      review={project.reviews[0]}
                      downloadLink={project.files[0].secure_url}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        );
    }
}
