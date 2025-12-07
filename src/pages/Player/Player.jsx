import React, { useEffect, useState } from "react";
import "./Player.css";
import back_arrow_icon from "../../assets/back_arrow_icon.png";
import { useNavigate, useParams } from "react-router-dom";

const Player = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "",
  });

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmY2E4MjBlZjM2ZmMyZDU3N2ZlMGM2OTEzYWVhZGVjOCIsIm5iZiI6MTc2NDcwNjM5OS4yOTksInN1YiI6IjY5MmY0ODVmOTZmZWZkNTZhNDI2ZjRiNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EnKv_2L4AP5X-DumPcOKQByR83yp_pWDcgWGsNGLN3Y",
    },
  };

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
      options
    )
      .then((res) => res.json())
      .then((res) => setApiData(res.results[0]))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="player">
      <img
        src={back_arrow_icon}
        alt="back"
        className="back-arrow"
        onClick={() => {
          navigate(-2);
        }}
      />
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${apiData?.key}`}
          title="trailer"
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>

      <div className="player-info">
        <p>{apiData.published_at.slice(0, 10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
};

export default Player;
