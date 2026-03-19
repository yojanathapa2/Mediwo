// Chatbot Integration Guide
// This file shows how to integrate the chatbot into existing pages

import React from 'react';
import Chatbot from '../components/Chatbot';

// Method 1: Add to existing pages as a floating widget
const ExistingPageWithChatbot = () => {
  return (
    <div>
      {/* Your existing page content */}
      <div className="your-page-content">
        <h1>Your Page Content</h1>
        {/* ... other content */}
      </div>
      
      {/* Add chatbot at the end of your component */}
      <Chatbot />
    </div>
  );
};

// Method 2: Conditional chatbot based on user role or page
const ConditionalChatbot = ({ userRole, showChatbot }) => {
  return (
    <div>
      {/* Your page content */}
      <div className="content">
        {/* ... */}
      </div>
      
      {/* Only show chatbot if conditions are met */}
      {showChatbot && userRole === 'PATIENT' && <Chatbot />}
    </div>
  );
};

// Method 3: Full-page chatbot experience
const FullPageChatbot = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Optional header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1>Medical Consultation</h1>
        </div>
      </header>
      
      {/* Chatbot takes over the screen */}
      <div className="relative" style={{ height: 'calc(100vh - 80px)' }}>
        {/* You might want to create a full-screen version of Chatbot */}
        <Chatbot />
      </div>
    </div>
  );
};

// Method 4: Embedded chatbot in specific sections
const EmbeddedChatbot = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
      {/* Left side - your content */}
      <div className="space-y-4">
        <h2>Patient Information</h2>
        {/* Forms, data, etc. */}
      </div>
      
      {/* Right side - embedded chatbot */}
      <div className="h-[600px]">
        {/* You could modify Chatbot component to accept props for different layouts */}
        <Chatbot />
      </div>
    </div>
  );
};

export {
  ExistingPageWithChatbot,
  ConditionalChatbot,
  FullPageChatbot,
  EmbeddedChatbot
};
