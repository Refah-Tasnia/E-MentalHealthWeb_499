import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const HomeRedirect = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3001/check-auth",
          {},
          {
            withCredentials: true,
          }
        );

        setAuthenticated(response.data.authenticated);
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuthentication();
  }, []);

  useEffect(() => {
    // If authenticated, navigate to "/homepage"
    if (authenticated) {
      navigate("/homepage");
    } else {
      // If not authenticated, navigate to "/home"
      navigate("/home");
    }
  }, [authenticated, navigate]);



  return <div>Checking authentication...</div>;
};

export default HomeRedirect;
