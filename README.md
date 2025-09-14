# AI Education Platform

A React-based web application designed to teach AI concepts to users with zero prior knowledge through interactive, structured learning paths and gamified experiences.

## Project Design

### Overview

The application is a single-page application (SPA) built with React, utilizing React Router for navigation and Context API for state management (e.g., user authentication, progress tracking). The design prioritizes modularity, scalability, and beginner-friendly UX, with a clean, responsive interface styled using Tailwind CSS.

### Component Hierarchy

The app is structured with a modular component architecture:

- **App (Root)**: Entry point, wrapping the app in providers and routing.
  - **AuthProvider**: Context for managing user session state.
  - **Router**: Handles navigation with React Router.
    - **Public Routes**:
      - **LoginPage**: Authentication form for email/password or OAuth (e.g., Google).
    - **Protected Routes** (require authentication):
      - **LandingPage**: Displays learning paths overview and user progress.
      - **ProfilePage**: Shows user details, achievements, and progress summaries.
      - **LearningPathPage**: Renders dynamic learning paths with modules.
        - **ModuleComponent**: Hosts interactive activities (e.g., quizzes, coding tasks).
        - **RewardComponent**: Displays points, badges, and milestone animations.
  - **Shared Components**:
    - **Navbar**: Navigation bar with links to Home and Profile.
    - **ProgressBar**: Visual tracker for path/module completion.
    - **ActivityEditor**: Interface for quizzes, AI prompts, or code editors.

### UI/UX Principles

- **Theme**: Clean, modern aesthetic with a color scheme of blues (#007BFF) and greens (#28A745) to evoke trust and growth.
- **Layout**: Responsive grid system using Tailwind CSS, mobile-first design with vertical stacking on smaller screens.
- **Accessibility**: WCAG-compliant with ARIA labels, high-contrast text, and keyboard-navigable menus.
- **Simplicity**: Intuitive navigation and minimalistic design to reduce cognitive load for beginners.

### Wireframes


Below are markdown table mockups for key pages:

#### Login Page

| Element            | Description                |
|--------------------|---------------------------|
| App Logo           | Branding/logo at the top   |
| Email              | [Input field]              |
| Password           | [Input field]              |
| Login Button       | [Button]                   |
| Or Sign in with    | Text separator             |
| Google Button      | [Button for Google OAuth]  |

#### Landing Page (Logged In)

| Element           | Description                          |
|-------------------|--------------------------------------|
| Navbar            | Home | Profile navigation links        |
| Welcome, User!    | Greeting with username                |
| Progress Bar      | Visual progress indicator (e.g., 40%) |
| Learning Paths    | List of paths:                        |
|                   | - Path 1 [Start]                      |
|                   | - Path 2 [Continue]                   |
|                   | - Path 3 [Locked]                     |

#### Profile Page

| Element          | Description                      |
|------------------|----------------------------------|
| Navbar           | Navigation bar                   |
| Profile Picture  | User avatar                      |
| Name             | Editable name field              |
| Points           | User's points (e.g., 500)        |
| Badges           | Icons for earned achievements    |
| Progress Summary | Overview of learning progress    |


### Workflow and User Flows

The app follows a user-centric workflow:

#### Main Workflow

- **Unauthenticated**: Users see the LoginPage. On successful login, they are redirected to the LandingPage.
- **Authenticated**:
  - **LandingPage**: Displays personalized progress and available learning paths.
    - Select a path → Navigate to LearningPathPage.
    - View profile → Navigate to ProfilePage.
  - **LearningPathPage**: Users complete modules with activities (e.g., quizzes). Progress is saved, points are awarded, and milestones trigger rewards (e.g., badges, animations).
  - **Logout**: Clears session and redirects to LoginPage.

#### Detailed Flows

1. **Authentication**:
   - User enters credentials or uses OAuth → Backend validates → Stores session token → Redirects to LandingPage.
   - Error handling: Displays "Invalid credentials" for failed logins.
2. **Learning**:
   - Select a path → Load sequential modules → Complete activities → Earn points → Unlock next module.
   - Milestones award badges and unlock advanced content.
3. **Profile Management**:
   - View/edit user details (name, email) → Save to backend.
   - Display points, badges, and path progress summaries.

#### Error Handling

- Network errors: Show retry options or offline notices.
- Unauthorized access: Redirect to LoginPage.
- Progress saving: Auto-save on module completion to prevent data loss.

## Setup

1. Navigate to `frontend/` and run `npm install` to install dependencies.
2. Run `npm start` to launch the React app.
3. For backend, navigate to `backend/` and run `npm install`, then `node src/server.js`.

## Folder Structure

- `frontend/`: React SPA with components, pages, context, and styles.
- `backend/`: Node.js API (placeholder for authentication, progress storage).
- `features/`: Gherkin feature files for BDD testing with scenarios for authentication, landing page, profile, learning paths, and gamification.
# AI Learning Paths for AI Education Platform

This document outlines the AI learning paths, their modules, activities, proficiency levels, and quizzes for integration into the AI Education Platform. Each path is designed for users with zero AI knowledge, building concepts progressively with interactive activities to enhance engagement.

## Learning Path 1: AI Basics

**Type**: Foundational  
**Proficiency Level**: Beginner  
**Description**: Introduces core AI concepts, terminology, and applications for users new to AI.  
**End Goal**: Users understand basic AI principles and can identify AI use cases.

### Modules and Activities

1. **Module: What is AI?**
   - **Activity**: Quiz - AI Fundamentals
     - **Description**: Multiple-choice quiz to test understanding of AI definitions and examples.
     - **Questions**:
       - What does AI stand for? (A) Artificial Intelligence (B) Automated Integration (C) Algorithmic Insight (D) Adaptive Interface [Correct: A]
       - Which is an AI application? (A) Word processing (B) Self-driving cars (C) Email sorting (D) File compression [Correct: B]
       - True/False: Machine learning is a subset of AI. [Correct: True]
     - **Points**: 50 points for completion (10 per correct answer, 5 questions total).
   - **Status**: Unlocked

2. **Module: Types of AI (Narrow vs. General)**
   - **Activity**: Prompt Exercise - Identify AI Types
     - **Description**: Users write a short prompt to describe a scenario and classify it as Narrow or General AI (e.g., "A chatbot answers customer queries" → Narrow AI).
     - **Example Prompt**: "Describe a system that predicts weather patterns. Is it Narrow or General AI?"
     - **Feedback**: Simulated AI evaluates the response for accuracy (e.g., checks for keywords like "Narrow").
     - **Points**: 30 points for submitting a valid response.
   - **Status**: Locked until Module 1 completed.

3. **Module: AI in Everyday Life**
   - **Activity**: Interactive Task - Map AI Applications
     - **Description**: Users drag-and-drop real-world scenarios (e.g., "Siri answers questions") to categories like "Speech Recognition" or "Recommendation Systems."
     - **Example**: Match "Netflix suggests movies" to "Recommendation Systems."
     - **Points**: 40 points for correct matches (8 scenarios, 5 points each).
   - **Status**: Locked until Module 2 completed.

**Total Points**: 120

## Learning Path 2: Prompt Analysis and Engineering

**Type**: Practical  
**Proficiency Level**: Intermediate  
**Description**: Teaches users how to craft effective AI prompts for tools like chatbots or code generators.  
**End Goal**: Users can design precise prompts to achieve desired AI outputs.

### Modules and Activities

1. **Module: Understanding Prompts**
   - **Activity**: Quiz - Prompt Basics
     - **Description**: Multiple-choice quiz on prompt structure and clarity.
     - **Questions**:
       - What makes a good prompt? (A) Vague terms (B) Specific instructions (C) Long paragraphs (D) Ambiguous goals [Correct: B]
       - Which prompt is clearer? (A) "Tell me about AI" (B) "Explain supervised learning in 100 words" [Correct: B]
       - True/False: Context in a prompt improves AI responses. [Correct: True]
     - **Points**: 50 points (10 per correct answer, 5 questions).
   - **Status**: Unlocked

2. **Module: Crafting Effective Prompts**
   - **Activity**: Prompt Exercise - Write a Prompt
     - **Description**: Users write a prompt for an AI to generate a specific output (e.g., "Write a prompt to generate a Python function that calculates the factorial of a number").
     - **Example Answer**: "Write a Python function named `factorial` that takes an integer input `n` and returns its factorial. Include error handling for negative numbers."
     - **Feedback**: Simulated AI checks for clarity, specificity, and correctness.
     - **Points**: 40 points for a valid prompt.
   - **Status**: Locked until Module 1 completed.

3. **Module: Optimizing Prompts**
   - **Activity**: Coding Task - Refine a Prompt
     - **Description**: Users are given a vague prompt (e.g., "Make a program") and must rewrite it to be specific (e.g., "Generate a JavaScript function to sort an array of numbers").
     - **Task**: Edit the prompt in a text input and submit for validation.
     - **Points**: 50 points for a correctly refined prompt.
   - **Status**: Locked until Module 2 completed.

**Total Points**: 140

## Learning Path 3: Data Preparation and AI Data

**Type**: Technical  
**Proficiency Level**: Intermediate  
**Description**: Covers data cleaning, preprocessing, and preparation for AI model training.  
**End Goal**: Users can prepare datasets for AI applications.

### Modules and Activities

1. **Module: Introduction to Data Preparation**
   - **Activity**: Quiz - Data Concepts
     - **Description**: Multiple-choice quiz on data preparation basics.
     - **Questions**:
       - What is data cleaning? (A) Adding noise (B) Removing errors (C) Encrypting data (D) Compressing files [Correct: B]
       - Why is missing data problematic? (A) Slows AI training (B) Causes model bias (C) Both A and B (D) No impact [Correct: C]
       - True/False: Normalization scales data to a standard range. [Correct: True]
     - **Points**: 50 points (10 per correct answer, 5 questions).
   - **Status**: Unlocked

2. **Module: Data Cleaning Techniques**
   - **Activity**: Coding Task - Clean a Dataset
     - **Description**: Users write Python code in a web-based editor to clean a sample dataset (e.g., remove null values, standardize formats).
     - **Example Task**: "Given a CSV with missing values, write Python code to replace nulls with the column mean."
     - **Points**: 60 points for correct code (validated by simulated execution).
   - **Status**: Locked until Module 1 completed.

3. **Module: Data Preprocessing for AI**
   - **Activity**: Interactive Task - Preprocess Data
     - **Description**: Users interact with a form to select preprocessing steps (e.g., normalization, encoding) for a dataset.
     - **Example**: Choose "One-hot encoding" for categorical data.
     - **Points**: 40 points for correct selections.
   - **Status**: Locked until Module 2 completed.

**Total Points**: 150

## Learning Path 4: Requirements Analysis

**Type**: Analytical  
**Proficiency Level**: Intermediate  
**Description**: Teaches users to gather and analyze requirements for AI projects.  
**End Goal**: Users can define clear requirements for AI solutions.

### Modules and Activities

1. **Module: Basics of Requirements Analysis**
   - **Activity**: Quiz - Requirements Fundamentals
     - **Description**: Multiple-choice quiz on requirements gathering.
     - **Questions**:
       - What is a stakeholder in an AI project? (A) Developer (B) End-user (C) Both A and B (D) None [Correct: C]
       - Why are clear requirements important? (A) Reduce costs (B) Ensure alignment (C) Both A and B (D) Aesthetic design [Correct: C]
       - True/False: Requirements should be measurable. [Correct: True]
     - **Points**: 50 points (10 per correct answer, 5 questions).
   - **Status**: Unlocked

2. **Module: Defining AI Requirements**
   - **Activity**: Prompt Exercise - Write Requirements
     - **Description**: Users write requirements for a hypothetical AI project (e.g., "An AI chatbot for customer support").
     - **Example Prompt**: "Write 3 measurable requirements for an AI to predict stock prices."
     - **Feedback**: Simulated AI checks for specificity and measurability.
     - **Points**: 40 points for valid requirements.
   - **Status**: Locked until Module 1 completed.

3. **Module: Validating Requirements**
   - **Activity**: Interactive Task - Validate Requirements
     - **Description**: Users review a set of requirements and mark them as valid or invalid based on clarity and feasibility.
     - **Example**: "AI must be 100% accurate" → Invalid (unrealistic).
     - **Points**: 40 points for correct validations.
   - **Status**: Locked until Module 2 completed.

**Total Points**: 130

## Learning Path 5: SOP and Regulation Documentation

**Type**: Compliance  
**Proficiency Level**: Advanced  
**Description**: Covers creating Standard Operating Procedures (SOPs) and regulatory documentation for AI systems.  
**End Goal**: Users can produce compliant AI documentation.

### Modules and Activities

1. **Module: Introduction to SOPs and Regulations**
   - **Activity**: Quiz - Compliance Basics
     - **Description**: Multiple-choice quiz on SOPs and AI regulations.
     - **Questions**:
       - What is an SOP? (A) Software Optimization Plan (B) Standard Operating Procedure (C) System Output Protocol (D) None [Correct: B]
       - Which regulation governs EU data privacy? (A) HIPAA (B) GDPR (C) CCPA (D) None [Correct: B]
       - True/False: SOPs ensure consistent AI operations. [Correct: True]
     - **Points**: 50 points (10 per correct answer, 5 questions).
   - **Status**: Unlocked

2. **Module: Writing SOPs for AI**
   - **Activity**: Prompt Exercise - Draft an SOP
     - **Description**: Users write a short SOP for an AI process (e.g., "Deploying a machine learning model").
     - **Example Prompt**: "Draft an SOP for validating AI model outputs."
     - **Feedback**: Simulated AI checks for structure and clarity.
     - **Points**: 50 points for a valid SOP.
   - **Status**: Locked until Module 1 completed.

3. **Module: Regulatory Compliance**
   - **Activity**: Interactive Task - Compliance Checklist
     - **Description**: Users complete a checklist to ensure an AI system meets regulatory requirements (e.g., GDPR, HIPAA).
     - **Example**: Check "Data anonymization implemented" for GDPR compliance.
     - **Points**: 40 points for correct checklist completion.
   - **Status**: Locked until Module 2 completed.

**Total Points**: 140

## Learning Path 6: AI Model Deployment

**Type**: Technical  
**Proficiency Level**: Advanced  
**Description**: Covers deploying AI models into production environments.  
**End Goal**: Users can deploy a simple AI model and understand deployment pipelines.

### Modules and Activities for Deployment

1. **Module: Introduction to Model Deployment**
   - **Activity**: Quiz - Deployment Basics
     - **Description**: Multiple-choice quiz on deployment concepts.
     - **Questions**:
       - What is model deployment? (A) Training a model (B) Making a model accessible for use (C) Data cleaning (D) None [Correct: B]
       - What is a common deployment platform? (A) Excel (B) AWS SageMaker (C) Word (D) None [Correct: B]
       - True/False: Monitoring is needed post-deployment. [Correct: True]
     - **Points**: 50 points (10 per correct answer, 5 questions).
   - **Status**: Unlocked

2. **Module: Setting Up a Deployment Pipeline**
   - **Activity**: Coding Task - Deploy a Model
     - **Description**: Users write Python code to deploy a simple model (e.g., a Flask API serving a pre-trained model).
     - **Example Task**: "Write a Flask endpoint to serve predictions from a pre-trained linear regression model."
     - **Points**: 60 points for correct code.
   - **Status**: Locked until Module 1 completed.

3. **Module: Monitoring Deployed Models**
   - **Activity**: Interactive Task - Monitor Metrics
     - **Description**: Users select appropriate monitoring metrics (e.g., accuracy, latency) for a deployed