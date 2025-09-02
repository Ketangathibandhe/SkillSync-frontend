import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserRoadmaps,
  fetchLatestRoadmap,
  fetchRoadmapById,
  deleteRoadmapById, 
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
          <div key={r._id} className="flex items-center mb-2">
            <button
              onClick={() => dispatch(fetchRoadmapById(r._id))}
              className={`flex-1 text-left p-2 rounded ${
                selectedRoadmap?._id === r._id
                  ? "bg-green-500 text-white shadow-md hover:bg-green-600"
                  : "bg-gray-200 text-black shadow-md hover:bg-gray-300"
              }`}
            >
              {r.targetRole}
            </button>
            <button
              onClick={() => dispatch(deleteRoadmapById(r._id))}
              className="ml-2 border rounded-full text-red-500 hover:text-red-700 font-bold px-1"
              title="Delete Roadmap"
            >
              ×
            </button>
          </div>
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

                {/* Topics */}
                {step.topics?.length > 0 && (
                  <div>
                    <h4 className="font-semibold text-sm">Topics:</h4>
                    <ul className="list-disc ml-5 text-sm">
                      {step.topics.map((topic, j) => (
                        <li key={j}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Resources */}
                {step.resources?.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-sm">Resources:</h4>
                    <ul className="list-disc ml-5 text-sm">
                      {step.resources.map((res, idx) => (
                        <li key={idx}>{res}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Projects */}
                {step.projects?.length > 0 && (
                  <div className="mt-2">
                    <h4 className="font-semibold text-sm">Projects:</h4>
                    <ul className="list-disc ml-5 text-sm">
                      {step.projects.map((proj, idx) => (
                        <li key={idx}>{proj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default RoadmapPage;