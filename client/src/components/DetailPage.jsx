import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const DetailPage = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await axios.get(`/details/${id}`);
        setDetail(response.data);
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };

    fetchDetail();
  }, [id]);

  if (!detail) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{detail.name}</h1>
      <p>{detail.description}</p>
      {/* Add more detail fields as needed */}
    </div>
  );
};

export default DetailPage;
