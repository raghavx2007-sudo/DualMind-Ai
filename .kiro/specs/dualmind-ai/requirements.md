# Requirements Document: DualMind AI

## Introduction

DualMind AI is an adaptive learning and productivity assistant platform designed to help students and learners manage their academic workload, track productivity, prevent burnout, and maintain consistent study habits. The system combines AI-powered tutoring with behavioral analytics to provide personalized support and adaptive scheduling.

## Glossary

- **Learning_Agent**: The AI-powered module that handles educational queries, concept explanations, and quiz generation
- **Productivity_Agent**: The module that manages tasks, deadlines, mood logging, and daily activity tracking
- **Analytics_Engine**: The behavioral analytics system that calculates burnout risk, discipline scores, and productivity trends
- **Scheduler_Engine**: The intelligent scheduling system that generates reminders and adapts schedules based on user behavior
- **BRI**: Burnout Risk Index - a weighted score indicating user's burnout risk level (0-100)
- **DS**: Discipline Score - percentage of completed tasks versus assigned tasks
- **User**: A student, exam aspirant, or self-learner using the platform
- **Task**: A discrete work item with a description, deadline, and completion status
- **Study_Plan**: A personalized learning schedule generated for a specific topic or goal
- **Dashboard**: The main user interface displaying analytics, tasks, and system status
- **Sentiment_Score**: A numerical value (-1 to 1) representing emotional state derived from text analysis
- **Consistency_Streak**: Number of consecutive days with completed tasks

## Requirements

### Requirement 1: User Authentication and Profile Management

**User Story:** As a user, I want to create an account and manage my profile, so that I can securely access my personalized learning and productivity data.

#### Acceptance Criteria

1. WHEN a new user provides valid registration credentials (email, password, name), THE System SHALL create a new user account
2. WHEN a user provides valid login credentials, THE System SHALL authenticate the user and grant access to their dashboard
3. WHEN a user requests password reset, THE System SHALL send a secure reset link to their registered email
4. WHEN a user updates their profile information, THE System SHALL validate and persist the changes
5. THE System SHALL encrypt all user passwords before storage
6. WHEN authentication fails, THE System SHALL return a descriptive error message without revealing sensitive information

### Requirement 2: Learning Agent - Doubt Resolution

**User Story:** As a user, I want to ask questions and receive explanations, so that I can understand difficult concepts.

#### Acceptance Criteria

1. WHEN a user submits a question via text input, THE Learning_Agent SHALL generate a relevant explanation within 2 seconds
2. WHEN a user submits a question via voice input, THE Learning_Agent SHALL transcribe the audio and generate a relevant explanation
3. WHEN the Learning_Agent generates an explanation, THE System SHALL store the interaction in the user's learning history
4. WHEN a user requests clarification on a previous explanation, THE Learning_Agent SHALL provide additional context using conversation history
5. IF the Learning_Agent cannot answer a question, THEN THE System SHALL inform the user and suggest alternative resources

### Requirement 3: Learning Agent - Quiz Generation

**User Story:** As a user, I want to generate quizzes on specific topics, so that I can test my understanding and track my progress.

#### Acceptance Criteria

1. WHEN a user requests a quiz for a specific topic, THE Learning_Agent SHALL generate 5-10 questions relevant to that topic
2. WHEN a user submits quiz answers, THE System SHALL evaluate the responses and calculate a score
3. WHEN quiz results are calculated, THE System SHALL update the user's topic mastery tracking
4. THE Learning_Agent SHALL generate questions with varying difficulty levels (easy, medium, hard)
5. WHEN a user completes a quiz, THE System SHALL store the results with timestamp and topic metadata

### Requirement 4: Learning Agent - Topic Mastery Tracking

**User Story:** As a user, I want to track my mastery of different topics, so that I can identify areas needing more focus.

#### Acceptance Criteria

1. WHEN a user completes a quiz, THE System SHALL update the mastery score for the associated topic
2. THE System SHALL calculate topic mastery as a percentage based on quiz performance history
3. WHEN a user views their learning dashboard, THE System SHALL display mastery levels for all studied topics
4. WHEN a topic mastery score falls below 60%, THE System SHALL flag it as needing review
5. THE System SHALL maintain historical mastery data for trend analysis

### Requirement 5: Learning Agent - Personalized Study Plans

**User Story:** As a user, I want to receive personalized study plans, so that I can structure my learning effectively.

#### Acceptance Criteria

1. WHEN a user requests a study plan for a topic, THE Learning_Agent SHALL generate a structured plan with subtopics and time estimates
2. WHEN generating a study plan, THE Learning_Agent SHALL consider the user's current mastery level and available time
3. WHEN a study plan is created, THE System SHALL integrate it with the user's task list and schedule
4. WHEN a user completes a study plan item, THE System SHALL mark it as complete and update progress tracking
5. THE Learning_Agent SHALL adapt study plans based on quiz performance and mastery scores

### Requirement 6: Productivity Agent - Task Management

**User Story:** As a user, I want to create and manage tasks from natural language input, so that I can quickly capture my to-do items.

#### Acceptance Criteria

1. WHEN a user enters a task description in natural language, THE Productivity_Agent SHALL extract the task title, deadline, and priority
2. WHEN a task is created, THE System SHALL assign it a unique identifier and store it in the user's task list
3. WHEN a user marks a task as complete, THE System SHALL update the task status and timestamp
4. WHEN a user views their task list, THE System SHALL display tasks sorted by deadline and priority
5. WHEN a user deletes a task, THE System SHALL remove it from the active task list but retain it in history for analytics
6. THE Productivity_Agent SHALL handle task descriptions without explicit deadlines by prompting the user or setting a default

### Requirement 7: Productivity Agent - Deadline Tracking

**User Story:** As a user, I want to track upcoming deadlines, so that I can prioritize my work effectively.

#### Acceptance Criteria

1. WHEN a task has a deadline within 24 hours, THE System SHALL mark it as urgent
2. WHEN a deadline is missed, THE System SHALL flag the task as overdue
3. WHEN a user views the dashboard, THE System SHALL display a timeline of upcoming deadlines
4. THE System SHALL calculate time remaining for each task and display it in human-readable format
5. WHEN multiple tasks have the same deadline, THE System SHALL group them together in the display

### Requirement 8: Productivity Agent - Mood and Activity Logging

**User Story:** As a user, I want to log my mood and daily activities, so that the system can understand my behavioral patterns.

#### Acceptance Criteria

1. WHEN a user submits a mood log entry, THE System SHALL analyze the text for sentiment and store the Sentiment_Score
2. WHEN a user logs a daily activity, THE System SHALL record the activity type, duration, and timestamp
3. THE System SHALL prompt users to log their mood at configurable intervals (default: daily)
4. WHEN analyzing mood logs, THE System SHALL identify stress keywords (e.g., "overwhelmed", "anxious", "tired")
5. THE System SHALL maintain a 30-day rolling history of mood and activity logs for analytics

### Requirement 9: Behavioral Analytics - Burnout Risk Index

**User Story:** As a user, I want the system to calculate my burnout risk, so that I can take preventive action before becoming overwhelmed.

#### Acceptance Criteria

1. THE Analytics_Engine SHALL calculate BRI using the formula: BRI = (0.4 × Sentiment_Score_Normalized) + (0.3 × Pending_Tasks_Normalized) + (0.2 × Continuous_Work_Hours_Normalized) + (0.1 × Stress_Keyword_Frequency)
2. THE Analytics_Engine SHALL normalize all BRI components to a 0-100 scale before calculation
3. WHEN BRI exceeds 70, THE System SHALL classify the user as high burnout risk
4. WHEN BRI is between 40-70, THE System SHALL classify the user as moderate burnout risk
5. WHEN BRI is below 40, THE System SHALL classify the user as low burnout risk
6. THE Analytics_Engine SHALL recalculate BRI whenever new mood logs, tasks, or activity data is recorded
7. WHEN a user views the dashboard, THE System SHALL display the current BRI with a visual gauge indicator

### Requirement 10: Behavioral Analytics - Discipline Score

**User Story:** As a user, I want to track my task completion rate, so that I can measure my productivity discipline.

#### Acceptance Criteria

1. THE Analytics_Engine SHALL calculate DS using the formula: DS = (Completed_Tasks / Total_Assigned_Tasks) × 100
2. THE Analytics_Engine SHALL calculate DS over a rolling 7-day window
3. WHEN a user completes a task, THE System SHALL immediately update the DS calculation
4. WHEN a user views the dashboard, THE System SHALL display DS as a percentage with a progress bar
5. THE System SHALL maintain historical DS data for trend visualization
6. WHEN DS falls below 50%, THE System SHALL display a motivational message encouraging improvement

### Requirement 11: Behavioral Analytics - Consistency Tracking

**User Story:** As a user, I want to track my consistency streak, so that I can build and maintain productive habits.

#### Acceptance Criteria

1. THE Analytics_Engine SHALL increment Consistency_Streak when a user completes at least one task in a day
2. WHEN a user fails to complete any tasks in a day, THE Analytics_Engine SHALL reset Consistency_Streak to zero
3. THE Analytics_Engine SHALL apply a streak multiplier to DS calculation: Adjusted_DS = DS × (1 + (Consistency_Streak / 100))
4. WHEN a user achieves milestone streaks (7, 14, 30 days), THE System SHALL display a congratulatory notification
5. WHEN a user views the dashboard, THE System SHALL display the current Consistency_Streak prominently

### Requirement 12: Behavioral Analytics - Productivity Trends

**User Story:** As a user, I want to visualize my productivity trends over time, so that I can identify patterns and improve my habits.

#### Acceptance Criteria

1. THE Analytics_Engine SHALL calculate daily, weekly, and monthly productivity metrics
2. WHEN a user views the analytics dashboard, THE System SHALL display trend graphs for BRI, DS, and task completion
3. THE Analytics_Engine SHALL identify productivity patterns (e.g., most productive time of day, day of week)
4. WHEN significant trend changes are detected (>20% change week-over-week), THE System SHALL highlight them in the dashboard
5. THE System SHALL provide insights and recommendations based on identified trends

### Requirement 13: Scheduler Engine - Natural Language Task Extraction

**User Story:** As a user, I want to input tasks in natural language, so that I can quickly add items without structured forms.

#### Acceptance Criteria

1. WHEN a user inputs text containing task information, THE Scheduler_Engine SHALL extract task title, deadline, and priority
2. THE Scheduler_Engine SHALL recognize common date formats (e.g., "tomorrow", "next Monday", "Dec 25", "in 3 days")
3. THE Scheduler_Engine SHALL recognize priority indicators (e.g., "urgent", "important", "low priority")
4. WHEN extraction is ambiguous, THE Scheduler_Engine SHALL prompt the user for clarification
5. THE Scheduler_Engine SHALL handle multiple tasks in a single input by creating separate task entries

### Requirement 14: Scheduler Engine - Automatic Reminder Generation

**User Story:** As a user, I want to receive automatic reminders for my tasks, so that I don't miss important deadlines.

#### Acceptance Criteria

1. WHEN a task is created with a deadline, THE Scheduler_Engine SHALL generate reminders at 24 hours, 6 hours, and 1 hour before the deadline
2. WHEN a reminder is triggered, THE System SHALL display a notification in the user interface
3. WHERE push notifications are enabled, THE System SHALL send push notifications for reminders
4. WHEN a task is completed, THE Scheduler_Engine SHALL cancel all pending reminders for that task
5. THE Scheduler_Engine SHALL allow users to customize reminder timing preferences

### Requirement 15: Scheduler Engine - Adaptive Break Insertion

**User Story:** As a user, I want the system to suggest breaks when I'm at risk of burnout, so that I can maintain sustainable productivity.

#### Acceptance Criteria

1. WHEN BRI exceeds 70, THE Scheduler_Engine SHALL insert 15-minute break slots into the user's schedule
2. WHEN continuous work hours exceed 3 hours, THE Scheduler_Engine SHALL recommend a 30-minute break
3. THE Scheduler_Engine SHALL not schedule tasks during inserted break periods
4. WHEN a user dismisses a break recommendation, THE System SHALL record the dismissal and adjust future recommendations
5. THE Scheduler_Engine SHALL prioritize break insertion over low-priority tasks

### Requirement 16: Scheduler Engine - Task Reordering

**User Story:** As a user, I want the system to intelligently reorder my tasks based on my behavioral patterns, so that I can work more effectively.

#### Acceptance Criteria

1. WHEN BRI is high, THE Scheduler_Engine SHALL prioritize easier or shorter tasks to build momentum
2. WHEN DS is low, THE Scheduler_Engine SHALL prioritize high-impact tasks to improve completion rate
3. THE Scheduler_Engine SHALL consider task deadlines, priority, and estimated duration when reordering
4. WHEN the schedule is reordered, THE System SHALL notify the user of significant changes
5. THE Scheduler_Engine SHALL allow users to manually override automatic reordering

### Requirement 17: Interaction Layer - Text Input

**User Story:** As a user, I want to interact with the system through text input, so that I can communicate my needs clearly.

#### Acceptance Criteria

1. WHEN a user types a message in the chat interface, THE System SHALL process it within 2 seconds
2. THE System SHALL support multi-line text input for longer queries or task descriptions
3. WHEN processing text input, THE System SHALL route it to the appropriate agent (Learning_Agent or Productivity_Agent)
4. THE System SHALL display user messages and agent responses in a conversational format
5. THE System SHALL maintain conversation history for context-aware responses

### Requirement 18: Interaction Layer - Voice Input and Output

**User Story:** As a user, I want to use voice commands, so that I can interact with the system hands-free.

#### Acceptance Criteria

1. WHEN a user activates voice input, THE System SHALL capture audio and transcribe it to text
2. THE System SHALL process voice-transcribed text identically to typed text input
3. WHERE voice output is enabled, THE System SHALL convert text responses to speech
4. WHEN voice transcription fails, THE System SHALL prompt the user to try again or use text input
5. THE System SHALL support voice input in multiple languages based on user preferences

### Requirement 19: Dashboard Visualization

**User Story:** As a user, I want to view my productivity metrics and tasks in a visual dashboard, so that I can quickly understand my status.

#### Acceptance Criteria

1. WHEN a user accesses the dashboard, THE System SHALL display BRI as a gauge with color-coded risk levels (green: 0-40, yellow: 40-70, red: 70-100)
2. WHEN a user accesses the dashboard, THE System SHALL display DS as a progress bar with percentage label
3. THE Dashboard SHALL display upcoming tasks in a card layout with priority tags and deadline indicators
4. THE Dashboard SHALL display an adaptive schedule timeline showing tasks and breaks
5. THE Dashboard SHALL display the current Consistency_Streak prominently
6. THE Dashboard SHALL update in real-time when data changes without requiring page refresh
7. THE Dashboard SHALL be responsive and functional on mobile devices (minimum width: 320px)

### Requirement 20: Reminder Notification Panel

**User Story:** As a user, I want to see all my active reminders in one place, so that I can stay aware of upcoming deadlines.

#### Acceptance Criteria

1. WHEN a user opens the notification panel, THE System SHALL display all active reminders sorted by time
2. WHEN a reminder is triggered, THE System SHALL add it to the notification panel with a visual indicator
3. WHEN a user dismisses a reminder, THE System SHALL remove it from the notification panel
4. THE Notification_Panel SHALL display the number of unread reminders as a badge
5. THE Notification_Panel SHALL allow users to snooze reminders for a specified duration

### Requirement 21: Data Persistence and Retrieval

**User Story:** As a user, I want my data to be saved reliably, so that I don't lose my progress or history.

#### Acceptance Criteria

1. WHEN a user creates, updates, or deletes data, THE System SHALL persist the changes to the database within 1 second
2. WHEN a user logs in, THE System SHALL retrieve and display their complete profile, tasks, and analytics data
3. THE System SHALL maintain data integrity by validating all inputs before persistence
4. WHEN database operations fail, THE System SHALL retry up to 3 times before returning an error
5. THE System SHALL back up user data daily to prevent data loss

### Requirement 22: Security and Privacy

**User Story:** As a user, I want my personal data to be secure and private, so that I can trust the platform with sensitive information.

#### Acceptance Criteria

1. THE System SHALL encrypt all sensitive data (passwords, personal information) at rest and in transit
2. THE System SHALL implement session management with automatic timeout after 30 minutes of inactivity
3. WHEN a user logs out, THE System SHALL invalidate the session token immediately
4. THE System SHALL not expose sensitive information in error messages or logs
5. THE System SHALL comply with data privacy regulations by allowing users to export or delete their data
6. THE System SHALL implement rate limiting to prevent brute force attacks (max 5 login attempts per 15 minutes)

### Requirement 23: Performance and Scalability

**User Story:** As a user, I want the system to respond quickly and reliably, so that I can work efficiently without delays.

#### Acceptance Criteria

1. THE System SHALL respond to user interactions within 2 seconds under normal load
2. THE System SHALL support at least 100 concurrent users without performance degradation
3. WHEN API calls to external services timeout, THE System SHALL return a cached response or graceful error within 5 seconds
4. THE System SHALL optimize database queries to complete within 500ms for 95% of requests
5. THE System SHALL implement caching for frequently accessed data (user profiles, recent tasks)

### Requirement 24: API Integration and Cost Optimization

**User Story:** As a system administrator, I want to optimize API usage costs, so that the platform remains economically sustainable.

#### Acceptance Criteria

1. THE System SHALL cache LLM responses for identical queries to reduce API calls
2. THE System SHALL implement request batching for non-urgent operations
3. THE System SHALL monitor API usage and alert administrators when approaching budget limits
4. THE System SHALL use cost-effective API tiers and models appropriate for each use case
5. WHEN API quota is exceeded, THE System SHALL gracefully degrade functionality and inform users

### Requirement 25: Deployment and Infrastructure

**User Story:** As a developer, I want to deploy the system on free-tier hosting, so that the project remains accessible and cost-effective.

#### Acceptance Criteria

1. THE System SHALL be deployable on free-tier platforms (Vercel, Netlify, MongoDB Atlas free tier)
2. THE System SHALL use environment variables for all configuration and secrets
3. THE System SHALL include automated deployment scripts for frontend and backend
4. THE System SHALL implement health check endpoints for monitoring
5. THE System SHALL log errors and important events for debugging and monitoring

### Requirement 26: Modular Architecture

**User Story:** As a developer, I want the system to have a modular architecture, so that components can be developed, tested, and scaled independently.

#### Acceptance Criteria

1. THE System SHALL separate concerns into distinct modules: Learning_Agent, Productivity_Agent, Analytics_Engine, Scheduler_Engine
2. THE System SHALL define clear interfaces between modules using API contracts
3. WHEN one module fails, THE System SHALL isolate the failure and maintain functionality in other modules
4. THE System SHALL allow modules to be deployed and scaled independently
5. THE System SHALL document all inter-module dependencies and communication patterns

