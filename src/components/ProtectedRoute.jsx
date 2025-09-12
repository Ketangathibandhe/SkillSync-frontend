import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = useSelector((state) => state.user); // tumhare store ka user slice
  const isLoading = user === undefined; // ya tum apna loading flag use kar sakte ho

  if (isLoading) {
    return (
      <div className="w-full h-screen flex justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  if (!user || !user.emailId) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;