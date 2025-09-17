import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import formIng from '../images/form.png';
import Text from "./Text";
import {
  setTargetRole,
  setCurrentSkills,
  analyzeSkillGap,
  generateRoadmap,
} from "../utils/skillSlice";

const SkillGapForm = () => {
  const dispatch = useDispatch();
  const { targetRole, currentSkills, gapAnalysis, rawGap, loading, error } =
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
    await dispatch(
      generateRoadmap({
        targetRole,
        currentSkills,
        skillGap: rawGap || "",
      })
    );
    navigate("/roadmap");
  };

  return (
    <>
      <Text />
      {/* Main Skill Gap Form */}
      <div className="w-full flex justify-center items-center mt-6 sm:mt-10 px-3 mb-[80px]">
        <div
          className="
            card bg-green-100 shadow-sm 
            w-full max-w-[95%] sm:max-w-[520px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[900px]
            mx-auto
            rounded-xl
            sm:min-h-[480px] md:min-h-[480px] lg:min-h-[420px]
          "
        >
          <div className="card-body">
            <h2 className="card-title justify-center text-black font-bold text-2xl mb-4">
              Skill Gap Analysis
            </h2>

            <div className="text-black font-bold w-full space-y-5">
              {/* Target Role */}
              <div>
                <label className="form-control w-full">
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
              <div>
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text px-1">Add Current Skills</span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
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
                      className="btn bg-green-400 text-black font-bold rounded-xl w-full sm:w-auto"
                    >
                      Add
                    </button>
                  </div>
                </label>
              </div>

              {/* Current Skills */}
              {currentSkills.length > 0 && (
                <div className="flex flex-wrap gap-2">
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

            {/* Validation/Error */}
            {validationError && (
              <p className="text-red-400 text-center mt-3">{validationError}</p>
            )}
            {error && <p className="text-red-400 text-center mt-3">{error}</p>}

            {/* Action Buttons */}
            <div className="card-actions justify-center gap-3 mt-6 flex-col sm:flex-row">
              <button
                className="btn bg-green-400 text-black font-bold rounded-xl w-full sm:w-auto"
                onClick={handleSkillGap}
              >
                Analyze Skill Gap
              </button>
              <button
                className="btn bg-green-800 text-white font-bold rounded-xl w-full sm:w-auto"
                onClick={handleRoadmap}
              >
                Generate Roadmap
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <p className="text-center text-xl mt-3 text-black">
                Processing...
              </p>
            )}

            {/* Output */}
            {gapAnalysis && gapAnalysis.missingSkills && (
              <div
                className="bg-gray-200 p-3 rounded mt-4 max-h-[300px] overflow-y-scroll text-sm text-black"
                style={{
                  scrollbarWidth: "thin",
                  scrollbarColor: "#9ca3af #e5e7eb",
                }}
              >
                <h3 className="font-semibold mb-1 text-black">
                  Missing Skills:
                </h3>
                <ol className="list-decimal list-inside mb-3">
                  {gapAnalysis.missingSkills.map((skill, idx) => (
                    <li key={idx}>{skill}</li>
                  ))}
                </ol>

                <h3 className="font-semibold mb-1 text-black">
                  Learning Priorities:
                </h3>
                <ol className="list-decimal list-inside">
                  {gapAnalysis.learningPriorities.map((priority, idx) => (
                    <li key={idx}>{priority}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>


      {!gapAnalysis && (
        <div className="w-full flex justify-center items-center mt-6 sm:mt-10 px-3 mb-[80px]">
          <div
            className="
              card bg-green-100 shadow-sm 
              w-full max-w-[95%] sm:max-w-[520px] md:max-w-[650px] lg:max-w-[800px] xl:max-w-[900px]
              mx-auto
              rounded-xl
              sm:min-h-[400px] md:min-h-[400px] lg:min-h-[400px]
            "
          >
            <div className="card-body flex flex-col lg:flex-row gap-6 items-center lg:items-center">
              
              {/* Instructions Text */}
              <div className="flex-1">
                <h2 className="card-title justify-center lg:justify-start text-black font-extrabold text-3xl mb-4">
                  How to Use SkillSync
                </h2>

                <ol className="list-decimal list-inside space-y-3 text-black text-lg sm:text-xl font-medium">
                  <li>Enter your <b>Target Role</b> (e.g., Frontend Developer).</li>
                  <li>Add your <b>Current Skills</b> one by one using the input field.</li>
                  <li>You can <b>remove skills</b> anytime by clicking the “×” icon.</li>
                  <li>Click on <b>Analyze Skill Gap</b> to see which skills are missing.</li>
                  <li>
                    After analysis, click <b>Generate Roadmap</b> to get your personalized
                    learning path.
                  </li>
                  <li>
                    All your <b>saved roadmaps</b> are available in the <b>Profile dropdown</b> 
                    (top-right corner).
                  </li>
                </ol>
              </div>

              {/* Image */}
              <div className="flex-1 flex justify-center lg:justify-end items-center">
                <img 
                  src={formIng} 
                  alt="Form Instructions" 
                  className="max-w-[250px] sm:max-w-[300px] lg:max-w-[350px] h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom scrollbar */}
      <style>{`
        div::-webkit-scrollbar {
          width: 8px;
        }
        div::-webkit-scrollbar-thumb {
          background-color: #9ca3af;
          border-radius: 4px;
        }
        div::-webkit-scrollbar-track {
          background-color: #e5e7eb;
        }
      `}</style>
    </>
  );
};

export default SkillGapForm;
