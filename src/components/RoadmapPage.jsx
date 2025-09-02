import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserRoadmaps,
  fetchLatestRoadmap,
  fetchRoadmapById,
} from "../utils/skillSlice";

const RoadmapPage = () => {
  const dispatch = useDispatch();
  const {
    userRoadmaps,
    selectedRoadmap,
    loading,
    error,
  } = useSelector((state) => state.skill);

  // Load sidebar list + latest roadmap on mount
  useEffect(() => {
    dispatch(fetchUserRoadmaps());
    dispatch(fetchLatestRoadmap());
  }, [dispatch]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mb-14">
      {/* Sidebar */}
      <div
        className="
          w-full md:w-64 
          bg-gray-100 p-4 border-b md:border-b-0 md:border-r 
          md:h-screen md:sticky md:top-0 
          overflow-y-auto
        "
        style={{ maxHeight: "100vh" }}
      >
        <h3 className="font-bold mb-4 text-black">My Roadmaps</h3>
        {userRoadmaps.length === 0 && (
          <p className="text-sm text-gray-500">No roadmaps yet</p>
        )}
        {userRoadmaps.map((r) => (
          <button
            key={r._id}
            onClick={() => dispatch(fetchRoadmapById(r._id))}
            className={`block w-full text-left p-2 mb-2 rounded ${
              selectedRoadmap?._id === r._id
                ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                : "bg-gray-200 text-black shadow-md hover:bg-gray-300"
            }`}
          >
            {r.targetRole}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto">
        {loading && <p className="text-center">Loading roadmap...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !selectedRoadmap && (
          <p className="text-center">No roadmap selected</p>
        )}

        {selectedRoadmap && (
          <>
            <h2 className="text-xl font-bold mb-4">
              {selectedRoadmap.targetRole}
            </h2>
            {selectedRoadmap.steps.map((step, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded bg-gray-100 text-black"
              >
                <h3 className="font-semibold">{step.title}</h3>
                <p className="text-sm mb-2">Duration: {step.duration}</p>
                <ul className="list-disc ml-5 text-sm">
                  {step.topics.map((topic, j) => (
                    <li key={j}>{topic}</li>
                  ))}
                </ul>
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;