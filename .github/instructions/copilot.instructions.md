---
applyTo: '**'
---
Build a modern React app with the following features:

1. User Registration & Login:
	- Users can register and log in using email and password.
	- All authentication and user data must be stored in MongoDB.

2. Main Pages:
	- Home page: Welcomes users and explains the app.
	- Profile page: Shows user info, points, badges, and progress.
	- Points page: Displays points earned and progress toward next badge.
	- Activities page: Lists AI learning activities. Completing activities gives points and unlocks badges.

3. Admin Features:
	- Admins can log in and view all users, their progress, points, badges, and activities completed.

4. Game-like Experience:
	- Use modern, responsive UI and themes (e.g., Material UI).
	- Make the app visually engaging and fun, with badges, points, and progress bars.

5. Accessibility & Purpose:
	- The app is designed for unhoused people and anyone wanting to learn about AI.
	- It should help users build essential skills and portfolios for the modern workforce.

6. Technical Requirements:
	- Use Next.js for React app structure.
	- Use Zustand or similar for state management.
	- All user actions (registration, login, activity completion) must be tracked and logged in MongoDB.
	- The app must be responsive and mobile-friendly.

7. Collaboration:
	- Code should be clean, well-documented, and easy for others to contribute.

8. Do not commit node_modules or large files. Use .gitignore to exclude them.

9. Lessons & Release Process:
	 - Lessons are created as structured activities in the Activities page. Each lesson should include:
		 - Title, description, learning objectives, content, and completion criteria.
		 - Optionally, quizzes, interactive tasks, or project assignments.
	 - To release lessons to learners:
		 - Add new lessons to the activities database or configuration.
		 - Use admin controls to publish, schedule, or update lessons for specific cohorts.
		 - Track which users have access to which lessons and their completion status.
	 - Start with 10 learners, then scale to 50, 100, and several hundred as needed.
	 - Ensure the app supports gradual scaling and cohort management for lesson releases.