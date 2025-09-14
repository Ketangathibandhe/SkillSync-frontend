import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUserRoadmaps,
  fetchRoadmapById,
  deleteRoadmapById,
  updateStepStatus,
} from "../utils/skillSlice";

const RoadmapPage = () => {
  const dispatch = useDispatch();
  const { userRoadmaps, selectedRoadmap, loading, error } = useSelector(
    (state) => state.skill
  );

  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    dispatch(fetchUserRoadmaps());
  }, [dispatch]);

  useEffect(() => {
    if (
      Array.isArray(userRoadmaps) &&
      userRoadmaps.length > 0 &&
      !selectedRoadmap?._id
    ) {
      dispatch(fetchRoadmapById(userRoadmaps[0]._id));
    }
  }, [dispatch, userRoadmaps, selectedRoadmap?._id]);

  useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkTheme(match.matches);
    match.addEventListener("change", (e) => setIsDarkTheme(e.matches));
    return () => match.removeEventListener("change", () => {});
  }, []);

  const handleStatusChange = (stepIndex, checked) => {
    if (!selectedRoadmap?._id) return;
    dispatch(
      updateStepStatus({
        roadmapId: selectedRoadmap._id,
        stepIndex,
        status: checked ? "completed" : "pending",
      })
    );
  };

  const hasSteps =
    selectedRoadmap?.steps && Array.isArray(selectedRoadmap.steps);

  return (
    <div className="flex flex-col md:flex-row min-h-screen mb-14">
      {/* Sidebar */}
      <div
        className="w-full md:w-64 bg-green-100 p-4 border-b md:border-b-0 md:border-r md:h-screen md:sticky md:top-0 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        <h3 className="font-bold mb-4 text-black">My Roadmaps</h3>

        {Array.isArray(userRoadmaps) && userRoadmaps.length === 0 && (
          <p className="text-sm text-gray-500">No roadmaps yet</p>
        )}

        {Array.isArray(userRoadmaps) &&
          userRoadmaps.map((r) => (
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

        {!loading && userRoadmaps.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-gray-600">
            <p className="text-lg font-semibold">No roadmap generated yet</p>
            <p className="text-sm">
              Go to Skill Gap Analysis to create your first roadmap
            </p>
          </div>
        )}

        {!loading &&
          userRoadmaps.length > 0 &&
          !hasSteps && (
            <p className="text-center">No roadmap selected</p>
          )}

        {hasSteps && (
          <>
            {/* Progress Bar */}
            <div className="mb-6">
              {(() => {
                const totalSteps = selectedRoadmap.steps.length;
                const completedSteps = selectedRoadmap.steps.filter(
                  (s) => s.status === "completed"
                ).length;
                const progress = Number(selectedRoadmap.progress) || 0;
                const progressTextColor = isDarkTheme ? "text-white" : "text-black";

                return (
                  <div className="border pt-2 pb-3.5 px-2 rounded-2xl">
                    <div className={`flex items-center mb-1 text-2xl pl-4 ${progressTextColor}`}>
                      <h4 className="font-semibold">Total Progress</h4>
                      <span className="font-medium pl-4 text-2xl">
                        {completedSteps} / {totalSteps} ({progress}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-300 rounded-full h-4">
                      <div
                        className="bg-green-500 h-4 rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })()}
            </div>

            <h2 className="text-xl font-bold mb-4">
              {selectedRoadmap.targetRole}
            </h2>

            {selectedRoadmap.steps.map((step, i) => (
              <div
                key={i}
                className="mb-4 p-4 border rounded bg-green-100 text-black"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{step.title}</h3>
                  <input
                    type="checkbox"
                    className="w-5 h-5 cursor-pointer accent-green-500"
                    checked={step.status === "completed"}
                    onChange={(e) => handleStatusChange(i, e.target.checked)}
                  />
                </div>

                <p className="text-sm mb-2">Duration: {step.duration}</p>

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

