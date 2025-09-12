import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Text = () => {
  const [text, setText] = useState("Hello");
  const userData = useSelector((store) => store.user);

  useEffect(() => {
    if (userData?.firstName) setText("Hello " + userData.firstName);
  }, [userData?.firstName]);

  return (
    <div className="flex items-center justify-center font-sans relative overflow-hidden mt-6 mb-4">
      <h1
        className="text-4xl sm:text-5xl font-semibold whitespace-nowrap text-transparent bg-clip-text"
        style={{
          backgroundImage:
            "linear-gradient(270deg, #ff6a00, #ee0979, #00c3ff, #ff6a00)",
          backgroundSize: "800% 100%",
          animation: "flow 20s linear infinite",
          backgroundPosition: "0% center",
        }}
      >
        {text}
      </h1>
      <style>
        {`
          @keyframes flow {
            0% { background-position: 0% center; }
            100% { background-position: 100% center; }
          }
        `}
      </style>
    </div>
  );
};

export default Text;