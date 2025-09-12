import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Text from "./Text";
import {
  setTargetRole,
  setCurrentSkills,
  analyzeSkillGap,
  generateRoadmap,
} from "../utils/skillSlice";

const SkillGapForm = () => {
  const dispatch = useDispatch();
  const { targetRole, currentSkills, gapAnalysis, loading, error } =
    useSelector((state) => state.skill);

  const [skillInput, setSkillInput] = useState("");
  const [validationError, setValidationError] = useState("");

  const handleSkillAdd = () => {
    if (skillInput.trim() !== "") {
      dispatch(setCurrentSkills([...currentSkills, skillInput.trim()]));
      setSkillInput("");
    }
  };

  const handleSkillRemove = (indexToRemove) => {
    const updatedSkills = currentSkills.filter((_, i) => i !== indexToRemove);
    dispatch(setCurrentSkills(updatedSkills));
  };

  const validateFields = () => {
    if (!targetRole.trim() && currentSkills.length === 0) {
      setValidationError(
        "Please enter a target role and add at least one skill."
      );
      return false;
    }
    if (!targetRole.trim()) {
      setValidationError("Please enter a target role.");
      return false;
    }
    if (currentSkills.length === 0) {
      setValidationError("Please add at least one skill.");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSkillGap = () => {
    if (!validateFields()) return;
    dispatch(analyzeSkillGap({ targetRole, currentSkills }));
  };

  const navigate = useNavigate();

  const handleRoadmap = async () => {
    if (!validateFields()) return;
    await dispatch(generateRoadmap({ targetRole, currentSkills }));
    navigate("/roadmap");
  };

  return (
    <div
      className="mb-20 mt-4 w-full max-w-[95%] sm:max-w-full 
                 lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl 
                 mx-auto p-4 sm:p-6 lg:p-8 
                 bg-green-100 rounded-xl shadow-lg text-black"
    >
        
      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold mb-5 text-center">
        Skill Gap Analysis
      </h2>

      {/* Target Role */}
      <input
        type="text"
        placeholder="Enter target role (e.g., Full Stack Developer)"
        value={targetRole}
        onChange={(e) => dispatch(setTargetRole(e.target.value))}
        className="border p-2 sm:p-2.5 w-full rounded mb-3 text-sm bg-gray-200 text-black"
      />

      {/* Skill Input */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Add Current skills (e.g., React ,Nodejs)"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          className="border p-2 flex-grow rounded text-sm bg-gray-200 text-black"
        />
        <button
          onClick={handleSkillAdd}
          className="bg-green-500 hover:bg-green-600 text-black px-3 py-1.5 rounded text-sm"
        >
          Add Skill
        </button>
      </div>

      {/* Current Skills Display */}
      <div className="mb-4 flex flex-wrap gap-2">
        {currentSkills.map((skill, i) => (
          <span
            key={i}
            className="bg-gray-200 px-2.5 py-1 rounded-full text-xs flex items-center gap-1.5"
          >
            {skill}
            <button
              type="button"
              onClick={() => handleSkillRemove(i)}
              className="text-red-500 hover:text-red-700 font-bold cursor-pointer text-xs"
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Validation Error */}
      {validationError && (
        <p className="text-red-500 text-sm mb-3">{validationError}</p>
      )}

      {/* Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6">
        <button
          onClick={handleSkillGap}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-black px-3 py-1.5 rounded text-sm shadow-sm"
        >
          Analyze Skill Gap
        </button>
        <button
          onClick={handleRoadmap}
          disabled={loading}
          className="bg-green-800 hover:bg-green-700 text-white px-3 py-1.5 rounded text-sm shadow-sm"
        >
          Generate Roadmap
        </button>
      </div>

      {/* Output */}
      {loading && <p className="text-center text-sm">Processing...</p>}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {gapAnalysis && (
        <div className="bg-gray-100 p-3 rounded mb-4 max-h-[300px] overflow-auto text-sm">
          <h3 className="font-semibold mb-1">Skill Gap:</h3>
          <pre className="whitespace-pre-wrap break-words">{gapAnalysis}</pre>
        </div>
      )}
    </div>
  );
};

export default SkillGapForm;