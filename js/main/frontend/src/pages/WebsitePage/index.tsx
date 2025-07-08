import React from "react";
import { useNavigate } from "react-router-dom";

const WebsitePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Welcome to My Landing Page</h1>
      <p>This is the starting point of the app.</p>
      <button onClick={() => navigate("/signin ")}>Login</button>
    </div>
  );
};

export default WebsitePage;
