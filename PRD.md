# AZ-204 Certification Prep Platform

An engaging, interactive platform that transforms Azure AZ-204 exam preparation from a tedious chore into an addictive learning experience for lazy developers who want to ace the certification in under 30 days.

**Experience Qualities**:
1. **Effortless** - Learning happens naturally through bite-sized interactive content, not grueling study sessions
2. **Addictive** - Gamification, streaks, and progress visualization make you want to come back daily
3. **Practical** - Real-world scenarios and hands-on learning that stick in memory better than passive reading

**Complexity Level**: Complex Application (advanced functionality, likely with multiple views)
This is a comprehensive learning management system with multiple interconnected features: content management, progress tracking, interactive quizzes, study plans, PDF parsing, spaced repetition algorithms, and analytics dashboards.

## Essential Features

### 1. Smart Study Plan Generator
- **Functionality**: Creates personalized 30-day study roadmap based on AZ-204 exam domains
- **Purpose**: Breaks overwhelming content into manageable daily goals, eliminating decision fatigue
- **Trigger**: User sets target exam date on first visit
- **Progression**: Select exam date → AI generates daily schedule → View today's tasks → Complete activities → Mark complete → See progress
- **Success criteria**: User can see exactly what to study each day with time estimates and completion tracking

### 2. Interactive Learning Cards
- **Functionality**: Bite-sized flashcard-style content for each AZ-204 topic with code examples
- **Purpose**: Makes learning digestible and mobile-friendly for developers on the go
- **Trigger**: User clicks on a topic in the study plan
- **Progression**: Open topic → Swipe through cards → Flag difficult ones → Test knowledge → Move to next topic
- **Success criteria**: All exam topics covered in card format with syntax-highlighted code and visual diagrams

### 3. Practice Exam Simulator
- **Functionality**: Timed practice tests that mirror real AZ-204 exam format
- **Purpose**: Builds confidence and identifies weak areas before the actual exam
- **Trigger**: User clicks "Practice Exam" or completes a topic section
- **Progression**: Select exam mode (practice/timed) → Answer questions → Get instant feedback → Review mistakes → See score breakdown by domain
- **Success criteria**: Realistic exam experience with explanations for all answers and performance analytics

### 4. PDF Upload & Auto-Parser
- **Functionality**: Uploads Udemy course PDFs and automatically extracts questions/answers into the system
- **Purpose**: Eliminates manual data entry and integrates existing study materials seamlessly
- **Trigger**: User clicks "Upload Materials" button
- **Progression**: Drop PDF files → AI extracts Q&A → Review parsed content → Approve/edit → Questions added to practice pool
- **Success criteria**: Successfully parses question-answer pairs from PDF with 85%+ accuracy

### 5. Progress Dashboard
- **Functionality**: Visual analytics showing study streaks, topic mastery, weak areas, and readiness score
- **Purpose**: Motivates continued learning and provides clarity on exam readiness
- **Trigger**: User opens app or completes any learning activity
- **Progression**: Complete activities → Earn points/badges → See stats update → Get recommendations → Share achievements
- **Success criteria**: Clear visualization of progress with actionable next steps and motivational feedback

### 6. Scenario Master
- **Functionality**: Interactive scenario-based questions with step-by-step guided solutions
- **Purpose**: Teaches problem-solving approach for complex exam scenarios that trip up most candidates
- **Trigger**: User encounters scenario question or selects "Scenarios" section
- **Progression**: Read scenario → Identify key requirements → Eliminate wrong answers → Get hints → See detailed explanation → Practice similar
- **Success criteria**: Users can confidently approach scenario questions with a systematic framework

### 7. Spaced Repetition System
- **Functionality**: Automatically resurfaces difficult topics and questions at optimal intervals
- **Purpose**: Ensures long-term retention using proven memory science
- **Trigger**: System schedules reviews based on performance
- **Progression**: Study topic → Rate difficulty → System schedules next review → Get reminded → Review content → Repeat
- **Success criteria**: Topics are automatically reviewed before being forgotten, improving retention rates

## Edge Case Handling

- **Incomplete Daily Goals**: Show encouraging message with option to extend deadline or adjust pace
- **PDF Parsing Failures**: Allow manual question entry with simple form interface
- **No Progress for 3+ Days**: Send friendly reminder notification with fun fact about Azure
- **100% Complete Before Exam Date**: Unlock "Master Mode" with harder questions and advanced scenarios
- **Failed Practice Exam (<70%)**: Show supportive message with targeted study recommendations for weak domains
- **Duplicate Questions from PDF**: Automatically detect and merge, flagging for user review
- **Offline Usage**: Cache downloaded content for offline study, sync progress when online

## Design Direction

The design should evoke the feeling of a premium gaming app crossed with a modern productivity tool—satisfying to interact with, visually rewarding progress, and making the user feel like a capable, progressing developer rather than a struggling student. Think Duolingo meets VS Code: clean, professional, but with delightful micro-interactions and a sense of leveling up.

## Color Selection

A tech-forward palette that feels modern, energetic, and trustworthy—avoiding the sterile corporate blues typically associated with enterprise cloud platforms.

- **Primary Color**: `oklch(0.55 0.22 250)` - Deep vibrant blue-purple that conveys technical mastery and premium quality
- **Secondary Colors**: `oklch(0.25 0.02 250)` - Rich dark background for code blocks and cards, `oklch(0.95 0.01 250)` - Soft light background for contrast
- **Accent Color**: `oklch(0.75 0.18 160)` - Electric cyan-green for success states, progress indicators, and CTAs that pop
- **Foreground/Background Pairings**: 
  - Primary (Deep blue-purple #6B5AED): White text (#FFFFFF) - Ratio 5.2:1 ✓
  - Accent (Electric cyan #4ADE80): Dark text (#1F2937) - Ratio 8.1:1 ✓
  - Dark background (#2D2A3E): Light gray text (#E5E7EB) - Ratio 11.3:1 ✓
  - Light background (#F8F9FB): Dark text (#1F2937) - Ratio 14.2:1 ✓

## Font Selection

Typography should feel modern and technical while remaining highly readable for extended study sessions—conveying both authority and approachability.

- **Primary Font**: Space Grotesk for headings and UI elements - geometric and contemporary
- **Secondary Font**: JetBrains Mono for code snippets - technical and precise
- **Body Font**: Inter for body text - exceptional readability at all sizes

**Typographic Hierarchy**:
- H1 (Page Titles): Space Grotesk Bold/32px/tight letter spacing/-0.02em
- H2 (Section Headers): Space Grotesk Semibold/24px/normal/-0.01em  
- H3 (Card Titles): Space Grotesk Medium/18px/normal
- Body (Content): Inter Regular/16px/1.6 line-height
- Code: JetBrains Mono Regular/14px/1.5 line-height
- Labels: Inter Medium/14px/uppercase/tracking-wide
- Captions: Inter Regular/12px/muted color

## Animations

Animations should create a sense of progression and achievement—cards sliding smoothly, progress bars filling satisfyingly, and micro-celebrations for completed tasks that trigger dopamine without being disruptive.

- Smooth card transitions when swiping through content with slight spring physics
- Progress bar fills with easing and particle effects on milestones
- Gentle pulse on "Start Today's Tasks" button to draw attention
- Confetti burst on completing daily goals or passing practice exams
- Smooth expansion of accordion sections with content fade-in
- Hover states on interactive elements with subtle scale (1.02x) and shadow depth
- Page transitions using slide animations that maintain spatial context

## Component Selection

**Components**:
- **Dashboard Layout**: Custom grid layout with Card components for stats widgets
- **Study Plan**: Accordion for collapsible daily tasks with Checkbox for completion tracking
- **Learning Cards**: Custom swipeable cards built with framer-motion, Badge for topic tags
- **Practice Exam**: RadioGroup for answers, Progress for timer, Dialog for explanations
- **PDF Upload**: Custom dropzone with Progress for upload status
- **Navigation**: Tabs for main sections (Dashboard/Study/Practice/Upload)
- **Results**: Card with Chart (recharts) for performance visualization
- **Notifications**: Sonner toast for achievements and reminders

**Customizations**:
- Swipeable card interface (not provided by Shadcn) with gesture controls
- Circular progress rings for completion percentage
- Interactive code syntax highlighter for examples
- Custom confetti animation for achievements
- PDF viewer component for uploaded materials

**States**:
- Buttons: Solid primary with white text, scale on hover, pressed state slightly darker, disabled with opacity-50
- Cards: Elevated shadow on hover, selected state with accent border glow
- Inputs: Border accent-color on focus with smooth transition, error state with red border and shake animation
- Progress indicators: Animated fill with gradient, pulsing glow when active

**Icon Selection**:
- Books (study materials), Trophy (achievements), Target (goals), Lightning (quick review)
- Clock (timed practice), CheckCircle (completed), XCircle (incorrect), Info (explanations)
- Upload (PDF import), Calendar (schedule), BarChart (analytics), Fire (streak counter)

**Spacing**:
- Container padding: px-6 py-8 on desktop, px-4 py-6 on mobile
- Card spacing: gap-6 for main grid, gap-4 for card content, gap-2 for compact lists
- Section margins: mb-12 for major sections, mb-6 for subsections
- Interactive element padding: px-4 py-2 for buttons, p-4 for cards

**Mobile**:
- Stack dashboard cards vertically with full width
- Hamburger menu for navigation on mobile (using Sheet component)
- Bottom tab bar for primary actions (Dashboard/Study/Practice)
- Swipe gestures prioritized over click interactions
- Larger touch targets (min 44px) for all interactive elements
- Simplified charts with fewer data points on small screens
