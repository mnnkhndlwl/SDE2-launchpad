// Curriculum metadata: track definitions + the 8-week study plan.
// Lessons themselves live in src/content/lessons/*. This file describes how
// they are grouped and the recommended week-by-week path.

export type TrackId =
  | 'quick-wins'
  | 'javascript'
  | 'react-native'
  | 'dsa'
  | 'system-design'
  | 'behavioral'
  | 'ai-engineering'
  | 'js-output'
  | 'lld'
  | 'frontend-system-design'
  | 'hld';

export interface TrackMeta {
  id: TrackId;
  name: string;
  blurb: string;
  goal: string;
  accent: string; // css var name
  icon: string; // emoji or short label
}

export const TRACKS: TrackMeta[] = [
  {
    id: 'quick-wins',
    name: 'Quick Wins',
    blurb: 'Close your known interview gaps first — blind spots, not deep gaps.',
    goal: 'Solve move-zeros cold, explain the prototype chain on a whiteboard, and explain useImperativeHandle with a real use case.',
    accent: '--warn',
    icon: '⚡',
  },
  {
    id: 'javascript',
    name: 'JavaScript & TypeScript Core',
    blurb: 'The language internals interviewers probe to test depth beyond framework usage.',
    goal: 'Explain closures, the event loop, prototypes, and async clearly with examples.',
    accent: '--accent-2',
    icon: '🟨',
  },
  {
    id: 'react-native',
    name: 'React & React Native',
    blurb: 'Know the internals, not just the API — rendering, refs, perf, architecture.',
    goal: 'Explain rendering, refs, performance, and RN architecture under follow-up questions.',
    accent: '--accent',
    icon: '⚛️',
  },
  {
    id: 'dsa',
    name: 'Data Structures & Algorithms',
    blurb: 'The 18 patterns that cover ~90% of startup SDE-2 DSA. Quality over grind.',
    goal: 'Recognize the pattern instantly and code the template without bugs.',
    accent: '--accent-2',
    icon: '🧩',
  },
  {
    id: 'system-design',
    name: 'System Design',
    blurb: 'Frontend and backend design — a repeatable framework and the core building blocks.',
    goal: 'Structure any design answer and defend every tradeoff.',
    accent: '--hot',
    icon: '🏗️',
  },
  {
    id: 'behavioral',
    name: 'Behavioral & Job Search',
    blurb: 'The non-coding half that decides offers and pay. Do not skip it.',
    goal: 'Tell compelling STAR stories, target the right companies, negotiate well.',
    accent: '--mine',
    icon: '🎯',
  },
  {
    id: 'ai-engineering',
    name: 'AI Engineering Roadmap',
    blurb: 'A 6-phase path to become an AI engineer — built on your existing backend skills, hosted on your LeetCode clone.',
    goal: 'Ship raw LLM APIs → RAG on pgvector → a tool-using agent → evals & observability, one public project per phase.',
    accent: '--accent',
    icon: '🤖',
  },
  {
    id: 'js-output',
    name: 'JS Output Questions',
    blurb: '72 predict-the-output questions — the category that trips up even experienced JS devs in real interviews.',
    goal: 'Predict the output of any hoisting, closure, async, coercion, or prototype question without running it.',
    accent: '--accent-2',
    icon: '🔮',
  },
  {
    id: 'lld',
    name: 'Low-Level Design (LLD)',
    blurb: 'Design real UI systems from scratch — EventEmitter, Modal, Autocomplete, Toast, and Form Validation with full TypeScript implementations.',
    goal: 'Walk through a component LLD in under 30 minutes: requirements → API → data model → working code.',
    accent: '--hot',
    icon: '🧱',
  },
  {
    id: 'frontend-system-design',
    name: 'Frontend System Design',
    blurb: 'Architect production-scale frontend systems — feeds, chat, video, Kanban — using the 6-step framework.',
    goal: 'Apply the framework to any frontend design question, defend rendering/state/perf decisions under follow-up.',
    accent: '--mine',
    icon: '🖥️',
  },
  {
    id: 'hld',
    name: 'High-Level Design (HLD)',
    blurb: 'Design scalable backend systems — URL shortener, rate limiter, Twitter feed, notifications, and search autocomplete.',
    goal: 'Use the 6-step framework to design any system and defend every architectural decision under follow-up.',
    accent: '--accent-2',
    icon: '🏗️',
  },
];

export interface PlanItem {
  text: string;
  lesson?: string; // slug of a lesson in the lessons collection
}
export interface PlanWeek {
  id: string;
  title: string;
  focus: string;
  goal: string;
  items: PlanItem[];
}

export const PLAN: PlanWeek[] = [
  {
    id: 'w1',
    title: 'Week 1 — Foundations & quick wins',
    focus: 'Close gaps, set rhythm, start DSA patterns.',
    goal: 'Daily 2 DSA problems begin. All Quick Wins done by end of week.',
    items: [
      { text: 'Master the two-pointer "move zeros" pattern', lesson: 'quick-wins/move-zeros' },
      { text: 'Understand the JS prototype chain', lesson: 'javascript/prototype-chain' },
      { text: 'Learn useImperativeHandle + forwardRef', lesson: 'react-native/imperative-handle' },
      { text: 'Arrays & Hashing patterns', lesson: 'dsa/arrays-hashing' },
      { text: 'JS: scope, closures, hoisting', lesson: 'javascript/closures-scope' },
    ],
  },
  {
    id: 'w2',
    title: 'Week 2 — Two pointers, sliding window, JS deep dive',
    focus: 'The patterns startups love most + JS internals.',
    goal: 'Comfortable with two-pointer & sliding-window template; can explain async JS end to end.',
    items: [
      { text: 'Two Pointers pattern', lesson: 'dsa/two-pointers' },
      { text: 'Sliding Window pattern', lesson: 'dsa/sliding-window' },
      { text: 'The event loop: microtasks vs macrotasks', lesson: 'javascript/event-loop' },
      { text: 'Promises & async/await', lesson: 'javascript/promises-async' },
      { text: 'this, call/apply/bind', lesson: 'javascript/this-binding' },
      { text: 'Type coercion, equality & truthy/falsy', lesson: 'javascript/type-coercion' },
    ],
  },
  {
    id: 'w3',
    title: 'Week 3 — Trees, recursion & RN internals',
    focus: 'Recursion fluency + the RN architecture questions.',
    goal: 'Recurse on trees confidently; explain the RN bridge/JSI and re-render model.',
    items: [
      { text: 'Binary Search template', lesson: 'dsa/binary-search' },
      { text: 'Trees: DFS/BFS, BST, traversals', lesson: 'dsa/trees' },
      { text: 'RN architecture: bridge vs JSI/Fabric', lesson: 'react-native/architecture' },
      { text: 'Render, reconciliation & re-renders', lesson: 'react-native/rendering' },
      { text: 'Hooks deep dive: refs & memoization', lesson: 'react-native/hooks-deep' },
      { text: 'useCallback vs useMemo — when they actually help', lesson: 'react-native/usecallback-memo' },
    ],
  },
  {
    id: 'w4',
    title: 'Week 4 — Graphs, DP & frontend system design',
    focus: 'Harder DSA categories + structured frontend design.',
    goal: 'BFS/DFS on grids; structure a frontend system design answer.',
    items: [
      { text: 'Graphs: BFS/DFS, islands, topo sort', lesson: 'dsa/graphs' },
      { text: 'Dynamic Programming intro', lesson: 'dsa/dynamic-programming' },
      { text: 'Frontend system design framework', lesson: 'system-design/frontend-framework' },
      { text: 'Design an infinite-scroll feed', lesson: 'system-design/news-feed' },
      { text: 'State management: Redux Toolkit vs Zustand vs Context', lesson: 'react-native/state-management' },
    ],
  },
  {
    id: 'w5',
    title: 'Week 5 — HLD system design + JS depth',
    focus: 'Complete HLD framework + classic systems + JS advanced topics.',
    goal: 'Design any backend system with a structured 6-step approach. Implement debounce and curry cold.',
    items: [
      { text: 'HLD framework: 6-step process', lesson: 'hld/framework' },
      { text: 'HLD building blocks: cache, queues, CDN, CAP', lesson: 'hld/scalability-building-blocks' },
      { text: 'HLD: Design a URL shortener', lesson: 'hld/design-url-shortener' },
      { text: 'HLD: Design a rate limiter', lesson: 'hld/design-rate-limiter' },
      { text: 'HLD: Design Twitter/X feed (fanout)', lesson: 'hld/design-twitter-feed' },
      { text: 'HLD: Design a notification system', lesson: 'hld/design-notification-system' },
      { text: 'HLD: Design search autocomplete', lesson: 'hld/design-search-autocomplete' },
      { text: 'Debounce & throttle — implement from scratch', lesson: 'javascript/debounce-throttle' },
      { text: 'Functional JS: currying, composition, pure functions', lesson: 'javascript/functional-js' },
      { text: 'React Navigation: stacks, tabs, deep links', lesson: 'react-native/navigation' },
    ],
  },
  {
    id: 'w6',
    title: 'Week 6 — DSA consolidation + RN performance',
    focus: 'Tighten DSA gaps; master list performance and animations.',
    goal: 'Re-solve every missed problem. Explain FlatList virtualization and Reanimated worklets.',
    items: [
      { text: 'Heaps, backtracking, intervals', lesson: 'dsa/heaps' },
      { text: 'Node.js internals: event loop, streams', lesson: 'system-design/nodejs-internals' },
      { text: 'Databases: SQL vs NoSQL, indexing', lesson: 'system-design/databases' },
      { text: 'List performance: FlatList, FlashList & virtualization', lesson: 'react-native/list-performance' },
      { text: 'Animations: Animated API vs Reanimated 3', lesson: 'react-native/animations' },
      { text: 'Re-solve everything in your mistakes log' },
    ],
  },
  {
    id: 'w7',
    title: 'Week 7 — Advanced JS + production RN patterns',
    focus: 'TypeScript depth, error handling, and production-grade RN.',
    goal: 'Explain TypeScript generics, utility types, and error boundaries confidently.',
    items: [
      { text: 'TypeScript: generics, utility types & narrowing', lesson: 'javascript/typescript-core' },
      { text: 'Error handling patterns', lesson: 'javascript/error-handling' },
      { text: 'ES Modules vs CommonJS — tree shaking', lesson: 'javascript/modules-bundling' },
      { text: 'Generators & iterators', lesson: 'javascript/generators-iterators' },
      { text: 'Design patterns in JavaScript', lesson: 'javascript/design-patterns' },
      { text: 'Immutability, WeakRefs & memory management', lesson: 'javascript/immutability-memory' },
      { text: 'Error boundaries & crash handling', lesson: 'react-native/error-boundaries' },
      { text: 'React 18: concurrent rendering & new hooks', lesson: 'react-native/react-18-concurrent' },
    ],
  },
  {
    id: 'w8',
    title: 'Week 8 — Production RN + behavioral prep',
    focus: 'Complete RN production knowledge + pressure-test everything.',
    goal: '3+ full mocks done. Can discuss storage, testing, Expo, and app lifecycle confidently.',
    items: [
      { text: 'Storage, networking & offline patterns', lesson: 'react-native/storage-networking' },
      { text: 'App lifecycle & background tasks', lesson: 'react-native/app-lifecycle' },
      { text: 'Testing React Native: RNTL, Jest & Detox', lesson: 'react-native/testing' },
      { text: 'Platform APIs, native modules & platform-specific code', lesson: 'react-native/platform-native' },
      { text: 'Expo, EAS Build & OTA updates', lesson: 'react-native/expo-eas' },
      { text: 'Prepare 6–8 STAR stories', lesson: 'behavioral/star-stories' },
      { text: '"Tell me about yourself" pitch', lesson: 'behavioral/tell-me-about-yourself' },
    ],
  },
  {
    id: 'w9',
    title: 'Week 9 — JS Output Questions + LLD',
    focus: 'Lock in JS internals via predict-the-output drills, then design real component systems.',
    goal: 'Zero surprises on JS output. Can walk through EventEmitter, Modal, Autocomplete, Toast, and Form LLD cold.',
    items: [
      { text: 'JS output: hoisting & scope (12 Qs)', lesson: 'js-output/hoisting-scope' },
      { text: 'JS output: closures & loops (12 Qs)', lesson: 'js-output/closures-loops' },
      { text: 'JS output: event loop & async (12 Qs)', lesson: 'js-output/event-loop-async' },
      { text: 'JS output: this & prototype (12 Qs)', lesson: 'js-output/this-prototype' },
      { text: 'JS output: coercion & operators (12 Qs)', lesson: 'js-output/coercion-operators' },
      { text: 'JS output: mixed & advanced (12 Qs)', lesson: 'js-output/mixed-advanced' },
      { text: 'LLD framework: 5-step process', lesson: 'lld/framework' },
      { text: 'LLD: SOLID principles in JS/TS', lesson: 'lld/solid-principles' },
      { text: 'LLD: Design an EventEmitter', lesson: 'lld/design-event-emitter' },
      { text: 'LLD: Design a Modal dialog', lesson: 'lld/design-modal' },
      { text: 'LLD: Design an Autocomplete / Typeahead', lesson: 'lld/design-autocomplete' },
      { text: 'LLD: Design a Toast notification system', lesson: 'lld/design-toast' },
      { text: 'LLD: Design a Form Validation library', lesson: 'lld/design-form-validation' },
    ],
  },
  {
    id: 'w10',
    title: 'Week 10 — Frontend System Design + Final Prep',
    focus: 'End-to-end frontend architecture answers + mocks, applications, and negotiation.',
    goal: 'Can walk through any frontend system design question. 3+ mocks done. Offers incoming.',
    items: [
      { text: 'Frontend SD framework: 6-step process', lesson: 'frontend-system-design/framework' },
      { text: 'Frontend SD: Design a social news feed', lesson: 'frontend-system-design/design-news-feed' },
      { text: 'Frontend SD: Design a real-time chat widget', lesson: 'frontend-system-design/design-chat-widget' },
      { text: 'Frontend SD: Design a Kanban board', lesson: 'frontend-system-design/design-kanban-board' },
      { text: 'Frontend SD: Design a video player', lesson: 'frontend-system-design/design-video-player' },
      { text: 'Run 3 mock interviews', lesson: 'behavioral/mock-strategy' },
      { text: 'Polish resume & target list' },
      { text: 'Apply to 15–20 matching roles' },
      { text: 'Negotiation: know your number', lesson: 'behavioral/negotiation' },
      { text: 'Daily warm-up: 1 easy DSA + mistakes log' },
      { text: 'After each interview: log what was asked' },
    ],
  },
];
