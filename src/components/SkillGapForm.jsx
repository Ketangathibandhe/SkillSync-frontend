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
  const navigate = useNavigate();

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

  const handleRoadmap = async () => {
    if (!validateFields()) return;
    await dispatch(generateRoadmap({ targetRole, currentSkills }));
    navigate("/roadmap");
  };

  return (
    <>
      <Text />

      <div className="w-full flex justify-center items-center my-10">
        <div
          className="
            card bg-green-100 shadow-sm 
            w-full max-w-[95%] sm:max-w-[550px] md:max-w-[700px] lg:max-w-[850px] xl:max-w-[950px] 
            mx-auto
            min-h-[500px] sm:min-h-[550px] md:min-h-[600px] lg:min-h-[650px]
          "
        >
          <div className="card-body">
            <h2 className="card-title justify-center text-black font-bold text-2xl">
              Skill Gap Analysis
            </h2>

            <div className="text-black font-bold w-full">
              {/* Target Role */}
              <div className="my-5 w-full">
                <label className="form-control w-full py-4">
                  <div className="label">
                    <span className="label-text px-1">Target Role</span>
                  </div>
                  <input
                    type="text"
                    placeholder="Enter target role (e.g., Full Stack Developer)"
                    value={targetRole}
                    onChange={(e) => dispatch(setTargetRole(e.target.value))}
                    className="input input-bordered w-full bg-gray-200 text-black"
                  />
                </label>
              </div>

              {/* Skill Input */}
              <div className="my-5 w-full">
                <label className="form-control w-full py-4">
                  <div className="label">
                    <span className="label-text px-1">Add Current Skills</span>
                  </div>
                  <div className="flex gap-2 flex-col sm:flex-row">
                    <input
                      type="text"
                      placeholder="e.g., React, Node.js"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      className="input input-bordered flex-grow bg-gray-200 text-black"
                    />
                    <button
                      type="button"
                      onClick={handleSkillAdd}
                      className="btn bg-green-400 text-black font-bold rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                </label>
              </div>

              {/* Current Skills */}
              {currentSkills.length > 0 && (
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
              )}
            </div>

            {/* Validation Error */}
            {validationError && (
              <p className="text-red-400 text-center">{validationError}</p>
            )}
            {error && <p className="text-red-400 text-center">{error}</p>}

            {/* Action Buttons */}
            <div className="card-actions justify-center flex-wrap gap-3 mt-4">
              <button
                className="btn bg-green-400 text-black px-4 py-2 font-bold rounded-xl"
                onClick={handleSkillGap}
                disabled={loading}
              >
                Analyze Skill Gap
              </button>
              <button
                className="btn bg-green-800 text-white px-4 py-2 font-bold rounded-xl"
                onClick={handleRoadmap}
                disabled={loading}
              >
                Generate Roadmap
              </button>
            </div>

            {/* Output */}
            {loading && (
              <p className="text-center text-sm mt-3">Processing...</p>
            )}

            {gapAnalysis && (
              <div className="bg-gray-100 p-3 rounded mt-4 max-h-[300px] overflow-auto text-sm">
                <h3 className="font-semibold mb-1">Skill Gap:</h3>
                <pre className="whitespace-pre-wrap break-words">
                  {gapAnalysis}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default SkillGapForm;