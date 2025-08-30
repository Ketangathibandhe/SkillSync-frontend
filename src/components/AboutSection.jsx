import React from 'react';
import aboutImage from '../images/about.png'; // Place your image in src/assets/

const AboutSection = () => {
  return (
    <section className="bg-green-100 py-12 px-6 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10 rounded-xl mb-20">
      {/* Text Content */}
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-4">Welcome to <span className="text-blue-600">SkillSync</span></h2>
        <p className="text-lg text-gray-700 mb-6">
          SkillSync is your AI-powered mentorship platform built to bridge skill gaps with precision. Whether you're switching careers or leveling up, we craft personalized roadmaps tailored to your goals.
        </p>
        <ul className="list-disc list-inside text-gray-600 space-y-2">
          <li>Identify skill gaps with intelligent analysis</li>
          <li>Get curated, role-based learning paths</li>
          <li>Track progress with modular milestones</li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-md">
        <img
          src={aboutImage}
          alt="SkillSync illustration"
          className="w-full h-auto rounded-lg "
        />
      </div>
    </section>
  );
};

export default AboutSection;