import axios from "axios";
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Protected = () => {
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  useEffect(() => {
    const check = async () => {
      if (!token) navigate("/login");
      try {
        await axios.post(
          "http://127.0.0.1:8000/api/user",
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("Token")}`,
            },
          }
        );
      } catch (e) {
        if (e.response.status === 401) navigate("/login");
      }
      //const reCode = res.status
    };

    check();
  }, []);
  return (
    <div>
      <section>
        <Outlet />
      </section>
    </div>
  );
};

export default Protected;
