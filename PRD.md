# Planning Guide

A comprehensive knowledge base for curating and discovering M365 and Power Platform articles, designed to provide an organized, searchable repository similar to Microsoft Learn where users can add public websites as knowledge sources and efficiently find relevant technical content.

**Experience Qualities**:
1. **Professional** - Clean, structured interface that reflects Microsoft's design language with clear information hierarchy
2. **Efficient** - Fast search and filtering capabilities that help users find exactly what they need without friction
3. **Trustworthy** - Organized categorization and metadata that gives confidence in content quality and relevance

**Complexity Level**: Light Application (multiple features with basic state)
  - This is a content management and discovery tool with CRUD operations for articles, search/filter functionality, and persistent storage, but doesn't require complex multi-view navigation or advanced backend integration.

## Essential Features

### Article Management
- **Functionality**: Add new articles by entering a URL, title, description, and metadata (category, tags, date added)
- **Purpose**: Build a curated collection of high-quality M365 and Power Platform resources
- **Trigger**: User clicks "Add Article" button
- **Progression**: Click Add Article → Form dialog opens → Enter URL, title, description → Select category and add tags → Submit → Article card appears in grid
- **Success criteria**: Article persists in storage, displays correctly in grid view, and appears in search results

### Search Functionality
- **Functionality**: Real-time search across article titles, descriptions, and tags
- **Purpose**: Quick discovery of relevant content without scrolling through entire collection
- **Trigger**: User types in search bar
- **Progression**: Type query → Results filter in real-time → Matching articles highlighted → Clear search to reset
- **Success criteria**: Search returns accurate results within 100ms, matches partial strings, highlights matched terms

### Category Filtering
- **Functionality**: Filter articles by M365/Power Platform categories (SharePoint, Teams, Power Apps, Power Automate, etc.)
- **Purpose**: Browse content by specific technology area of interest
- **Trigger**: User selects category filter
- **Progression**: Click category filter → Select one or multiple categories → Grid updates to show matching articles → Clear filters to reset
- **Success criteria**: Filters apply instantly, support multi-select, show article count per category

### Article Details View
- **Functionality**: Click article card to view full details and access the source URL
- **Purpose**: Review complete information before visiting external resource
- **Trigger**: User clicks on article card
- **Progression**: Click article → Dialog/panel opens → View full description and metadata → Click "Visit Source" to open URL in new tab → Close to return
- **Success criteria**: Details load instantly, external links open correctly, smooth transitions

### Article Management Actions
- **Functionality**: Edit or delete existing articles
- **Purpose**: Maintain accurate, up-to-date knowledge base
- **Trigger**: User clicks edit/delete button on article card
- **Progression**: Click edit → Pre-filled form opens → Update fields → Save → Article updates in view | Click delete → Confirmation dialog → Confirm → Article removed
- **Success criteria**: Changes persist, UI updates immediately, deletion requires confirmation

### Progressive Web App (PWA) Capabilities
- **Functionality**: Install app on device, work offline, receive update notifications
- **Purpose**: Enable offline access to knowledge base and native app-like experience
- **Trigger**: Browser prompts for installation, automatic service worker registration
- **Progression**: Install prompt appears → User clicks install → App added to home screen → Service worker caches assets → App works offline → Update notifications appear when new version available
- **Success criteria**: App installs successfully, works offline, data persists, updates smoothly, offline indicator shows connection status

## Edge Case Handling

- **Empty State** - Show welcoming illustration and "Add your first article" prompt when no articles exist
- **No Search Results** - Display helpful message with suggestion to try different keywords or clear filters
- **Duplicate URLs** - Detect and warn user if URL already exists in knowledge base before adding
- **Invalid URLs** - Validate URL format and show inline error message
- **Long Content** - Truncate descriptions in card view with "Read more" affordance
- **Many Tags** - Limit visible tags in card view to 3-4 with "+N more" indicator
- **Filter Combinations** - Handle search + category filters together with clear applied filters display
- **Offline Mode** - Show clear offline indicator when connection is lost, allow access to cached content
- **Update Available** - Prompt user with friendly notification when new app version is ready

## Design Direction

The design should evoke the professionalism and clarity of Microsoft Learn - clean, spacious, and information-forward. It should feel modern and technical without being cold, using Microsoft's Fluent design principles of depth, light, and motion. The interface should inspire confidence and productivity, making users feel they're working with an enterprise-grade tool while maintaining approachability.

## Color Selection

A professional palette inspired by Microsoft's brand with strong blues and clean neutrals that feel both technical and trustworthy.

- **Primary Color**: Deep Microsoft Blue (oklch(0.45 0.15 265)) - Conveys professionalism, trust, and aligns with Microsoft's brand identity
- **Secondary Colors**: 
  - Soft Slate (oklch(0.96 0.005 265)) - Subtle backgrounds for cards and surfaces
  - Medium Gray (oklch(0.85 0.01 265)) - Borders and dividers that create structure without harshness
- **Accent Color**: Vibrant Cyan (oklch(0.65 0.14 240)) - CTAs, links, and interactive elements that draw attention
- **Foreground/Background Pairings**:
  - Primary Blue (oklch(0.45 0.15 265)): White text (oklch(1 0 0)) - Ratio 8.5:1 ✓
  - Accent Cyan (oklch(0.65 0.14 240)): White text (oklch(1 0 0)) - Ratio 4.8:1 ✓
  - Background (oklch(0.99 0.002 265)): Foreground (oklch(0.25 0.01 265)) - Ratio 13.2:1 ✓

## Font Selection

Typography should reflect Microsoft's modern, technical aesthetic with excellent readability for scanning documentation and article metadata.

- **Primary Font**: Segoe UI Variable (with fallback to system-ui, -apple-system) - Microsoft's signature typeface that feels professional and familiar to M365 users
- **Monospace Font**: Cascadia Code - For any code snippets or technical identifiers

- **Typographic Hierarchy**:
  - H1 (Page Title): Segoe UI Variable Semibold/32px/tight letter-spacing/-0.02em
  - H2 (Section Headers): Segoe UI Variable Semibold/24px/normal letter-spacing/-0.01em
  - H3 (Article Titles): Segoe UI Variable Medium/18px/normal line-height/1.4
  - Body (Descriptions): Segoe UI Variable Regular/15px/relaxed line-height/1.6
  - Small (Metadata): Segoe UI Variable Regular/13px/normal line-height/1.4
  - Button Text: Segoe UI Variable Semibold/14px/normal letter-spacing/0.01em

## Animations

Animations should feel responsive and fluid, using Microsoft's Fluent motion principles - subtle, purposeful, and never blocking user actions.

- **Page Load**: Staggered fade-up of article cards (50ms delay between each) for a sense of content flowing into place
- **Search/Filter**: Smooth 200ms cross-fade when results update, maintaining spatial position
- **Card Interactions**: Subtle lift effect on hover (2px translate + soft shadow) to indicate interactivity
- **Dialog Transitions**: Smooth scale-fade (300ms ease-out) when opening article details or forms
- **Button States**: Quick 150ms color/shadow transitions for feedback without delay
- **Tag Pills**: Gentle bounce when added, smooth fade when removed

## Component Selection

- **Components**:
  - **Dialog**: For add/edit article forms and article detail views with clean modal overlays
  - **Card**: Primary container for article display in grid, with subtle shadows and hover states
  - **Input**: Clean text fields with clear labels for URL, title, description
  - **Textarea**: Multi-line description field with character count
  - **Select**: Dropdown for category selection with custom styling
  - **Badge**: Colorful pills for tags and category labels
  - **Button**: Various variants (default, primary, ghost, destructive) for different actions
  - **Command**: Searchable command palette for power user navigation
  - **Separator**: Subtle dividers for visual organization
  - **Alert Dialog**: Confirmation for destructive actions like delete
  - **Scroll Area**: Smooth scrolling for long content in dialogs

- **Customizations**:
  - **Article Grid**: Custom responsive grid layout (1 col mobile, 2 col tablet, 3 col desktop) with consistent gaps
  - **Filter Bar**: Custom sticky filter controls with multi-select category chips
  - **Search Bar**: Prominent search input with search icon and clear button
  - **Empty States**: Custom illustrations or icons with encouraging messaging

- **States**:
  - Buttons: Distinct hover (elevated shadow + slight brightness increase), active (pressed inset), focus (accent ring), disabled (reduced opacity + no interaction)
  - Cards: Rest (subtle shadow), hover (elevated + accent border), selected/active (accent border + slight background tint)
  - Inputs: Rest (border), focus (accent border + ring), error (destructive border + message), filled (subtle background change)
  - Tags/Badges: Hover (slight darken), interactive (pointer cursor), removable (X appears on hover)

- **Icon Selection**:
  - MagnifyingGlass: Search functionality
  - Plus: Add new article
  - Funnel: Filter controls
  - PencilSimple: Edit article
  - Trash: Delete article
  - ArrowSquareOut: Visit external URL
  - X: Close dialogs, remove tags
  - Tag: Tag/category indicators
  - Article: Article type indicator
  - CheckCircle: Confirmation states

- **Spacing**:
  - Container padding: px-6 py-8 (desktop), px-4 py-6 (mobile)
  - Card padding: p-5
  - Card gaps: gap-6 (desktop grid), gap-4 (mobile)
  - Section spacing: mb-8 between major sections
  - Form field spacing: gap-4 in form groups
  - Button spacing: gap-2 for icon+text, gap-3 for button groups
  - Tag spacing: gap-1.5 between tags

- **Mobile**:
  - Stack search and filters vertically on mobile
  - Single column article grid on mobile (< 640px)
  - Bottom sheet drawer for add/edit forms on mobile instead of centered dialog
  - Larger touch targets (min 44px) for all interactive elements
  - Collapsible filter section that can be toggled to save vertical space
  - Full-width cards with adjusted padding (p-4 instead of p-5)
