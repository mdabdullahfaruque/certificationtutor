# AZ-204 Exam Prep Platform

A practical Azure AZ-204 certification prep platform that stores exam questions in markdown format and allows PDF import for practice. Questions are stored as plain markdown files for easy management and version control.

**Experience Qualities**:
1. **Practical** - Upload real exam PDFs and practice immediately without complex setup
2. **Straightforward** - Questions stored in simple markdown format you can edit directly
3. **Focused** - No fluff, just import questions and practice them

**Complexity Level**: Light Application (multiple features with basic state)
This is a focused exam practice tool with PDF import, markdown-based question storage, and practice exam functionality.

## Essential Features

### 1. Markdown Question Database
- **Functionality**: Questions stored in a simple markdown file (questions-database.md) in structured format
- **Purpose**: Easy to edit, version control, and manage without complex database setup
- **Trigger**: Questions are automatically loaded from the file when the app starts
- **Progression**: Edit markdown file → Save → Reload app → Practice updated questions
- **Success criteria**: App successfully parses and displays all questions from the markdown file

### 2. PDF Import & AI Extraction
- **Functionality**: Paste PDF text content and AI extracts questions into markdown format
- **Purpose**: Quickly import questions from Udemy PDFs and other study materials
- **Trigger**: User clicks "Upload" tab and pastes PDF content
- **Progression**: Copy PDF text → Paste into form → Click Extract → AI parses questions → Download/copy generated markdown → Append to questions-database.md → Refresh → Practice
- **Success criteria**: AI successfully extracts questions from PDF text and formats them as markdown

### 3. Practice Exam Mode
- **Functionality**: Practice questions from the database with instant feedback
- **Purpose**: Test knowledge and identify weak areas through realistic exam simulation
- **Trigger**: User clicks "Practice" tab and selects domain or "Practice All"
- **Progression**: Select domain/all → 10 random questions loaded → Answer question → Check answer → See explanation → Next question → View score
- **Success criteria**: Users can practice questions, see immediate feedback, and track their scores

### 4. Domain Filtering
- **Functionality**: Filter questions by Azure domain (compute, storage, security, monitoring, integration)
- **Purpose**: Focus practice on specific exam domains
- **Trigger**: User selects a domain card in Practice view
- **Progression**: View available domains → See question count per domain → Select domain → Practice questions from that domain only
- **Success criteria**: Questions are correctly filtered by domain and users can practice specific areas

### 5. Progress Tracking
- **Functionality**: Track practice sessions, scores, and streaks
- **Purpose**: Maintain motivation and see improvement over time
- **Trigger**: Completing practice sessions
- **Progression**: Complete practice → Score recorded → Points earned → Streak updated → Dashboard shows progress
- **Success criteria**: Progress persists between sessions using KV storage

## Edge Case Handling

- **Empty Database**: Show helpful message with instructions to import questions from PDFs
- **PDF Parsing Failures**: Provide clear error messages and example format guidance
- **Malformed Markdown**: Skip invalid questions and log warnings in console
- **No Questions for Domain**: Show message and suggest practicing all questions instead
- **Duplicate Questions**: AI should detect and merge duplicates during extraction

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
