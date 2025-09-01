import React from "react";
import { useSelector } from "react-redux";

const RoadmapPage = () => {
  const { roadmap, loading, error } = useSelector((state) => state.skill);

  if (loading) return <p className="text-center">Loading roadmap...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!roadmap) return <p className="text-center">No roadmap available.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto mb-16">
      <h2 className="text-xl font-bold mb-4">Your Roadmap</h2>
      {roadmap.steps.map((step, i) => (
        <div key={i} className="mb-4 p-4 border rounded bg-gray-100 text-black">
          <h3 className="font-semibold">{step.title}</h3>
          <p className="text-sm mb-2">Duration: {step.duration}</p>
          <ul className="list-disc ml-5 text-sm">
            {step.topics.map((topic, j) => (
              <li key={j}>{topic}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadmapPage;