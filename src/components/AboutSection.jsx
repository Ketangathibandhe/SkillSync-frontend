import React from 'react';
import aboutImage from '../images/about.png';

const AboutSection = () => {
  return (
    <section
      className="bg-green-100 py-12 px-4 sm:px-6 md:px-12 lg:px-20
                 flex flex-col-reverse md:flex-row items-center justify-between gap-10
                 rounded-xl mb-20 shadow-lg
                 max-w-[95%] sm:max-w-[90%] lg:max-w-[1450px] mx-auto"
    >
      {/* Text Content */}
      <div className="max-w-xl">
        <h2 className="text-4xl font-bold text-gray-800 mb-4 leading-snug">
          Empower Your Career with <span className="text-blue-600">SkillSync</span>
        </h2>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          SkillSync is an <span className="font-semibold">AI-powered mentorship and learning platform </span>
          designed to close your skill gaps with precision. Whether you’re preparing for your dream role,
          switching careers, or aiming to level up, we deliver <span className="font-semibold">personalized,
          data-driven roadmaps</span> that keep you on track and motivated.
        </p>

        <ul className="list-disc list-inside text-gray-700 space-y-3">
          <li>
            <span className="font-semibold">Smart Skill Gap Analysis:</span> Instantly identify missing skills
            for your target role using intelligent AI analysis.
          </li>
          <li>
            <span className="font-semibold">Tailored Learning Roadmaps:</span> Get curated, role-specific
            learning paths with resources, projects, and timelines.
          </li>
          <li>
            <span className="font-semibold">Progress Tracking:</span> Monitor your journey with interactive
            milestones, completion stats, and visual progress bars.
          </li>
          <li>
            <span className="font-semibold">Multi-Device Access:</span> Learn and track progress anytime,
            anywhere — on desktop or mobile.
          </li>
          <li>
            <span className="font-semibold">Mentorship-Ready:</span> Designed for future integration with
            expert mentors to guide you at every step.
          </li>
        </ul>
      </div>

      {/* Image Section */}
      <div className="w-full max-w-md md:max-w-lg lg:max-w-xl">
        <img
          src={aboutImage}
          alt="SkillSync platform illustration"
          className="w-full h-auto rounded-lg"
        />
      </div>
    </section>
  );
};

export default AboutSection;