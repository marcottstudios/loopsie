import type { Lesson } from '../types';

export const lessons: Lesson[] = [
  // ========================================
  // UNIT 1 — GETTING STARTED
  // ========================================
  { id: 'lesson-001', unitId: 'unit-1', title: 'Basic Greetings', description: 'Learn to say hello, good morning, and ask how someone is doing.', phraseIds: ['greet-001', 'greet-002', 'greet-003', 'greet-004', 'greet-005'], category: 'greetings', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 1 },
  { id: 'lesson-002', unitId: 'unit-1', title: 'Farewells', description: 'Learn to say goodbye, respond to greetings, and welcome people.', phraseIds: ['greet-006', 'greet-007', 'greet-008', 'greet-009', 'greet-010'], category: 'greetings', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 2 },
  { id: 'lesson-003', unitId: 'unit-1', title: 'Polite Essentials', description: 'Master the key politeness words: please, thank you, yes, no, and more.', phraseIds: ['polite-001', 'polite-002', 'polite-003', 'polite-004', 'polite-005', 'polite-006', 'polite-007', 'polite-008', 'polite-009', 'polite-010'], category: 'politeness', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 3 },
  { id: 'lesson-004', unitId: 'unit-1', title: 'At the Café', description: 'Order coffee, tea, and pastries like a local.', phraseIds: ['cafe-001', 'cafe-002', 'cafe-003', 'cafe-004', 'cafe-005', 'cafe-006', 'cafe-007', 'cafe-008', 'cafe-009', 'cafe-010'], category: 'food-drink', difficulty: 'beginner', lengthBandFocus: 'short-phrase', sortOrder: 4 },

  // ========================================
  // UNIT 2 — EVERYDAY WORDS
  // ========================================
  { id: 'lesson-005', unitId: 'unit-2', title: 'Numbers 1–10', description: 'Count from one to ten in Portuguese.', phraseIds: ['num-001', 'num-002', 'num-003', 'num-004', 'num-005', 'num-006', 'num-007', 'num-008', 'num-009', 'num-010'], category: 'numbers', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 5 },
  { id: 'lesson-006', unitId: 'unit-2', title: 'More Numbers', description: 'Learn larger numbers and ordinals.', phraseIds: ['num-011', 'num-012', 'num-013', 'num-014', 'num-015', 'num-016', 'num-017', 'num-018', 'num-019', 'num-020'], category: 'numbers', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 6 },
  { id: 'lesson-007', unitId: 'unit-2', title: 'Close Family', description: 'Learn words for your immediate family members.', phraseIds: ['family-001', 'family-002', 'family-003', 'family-004', 'family-005', 'family-006', 'family-007', 'family-008'], category: 'family', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 7 },
  { id: 'lesson-008', unitId: 'unit-2', title: 'Extended Family', description: 'Words for grandparents, cousins, and more.', phraseIds: ['family-009', 'family-010', 'family-011', 'family-012', 'family-013', 'family-014', 'family-015'], category: 'family', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 8 },
  { id: 'lesson-009', unitId: 'unit-2', title: 'Days of the Week', description: 'Learn all seven days of the week.', phraseIds: ['time-001', 'time-002', 'time-003', 'time-004', 'time-005', 'time-006', 'time-007'], category: 'time-dates', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 9 },
  { id: 'lesson-010', unitId: 'unit-2', title: 'Time & Calendar', description: 'Talk about today, tomorrow, and time.', phraseIds: ['time-008', 'time-009', 'time-010', 'time-011', 'time-012', 'time-013', 'time-014', 'time-015', 'time-016', 'time-017'], category: 'time-dates', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 10 },

  // ========================================
  // UNIT 3 — GETTING AROUND
  // ========================================
  { id: 'lesson-011', unitId: 'unit-3', title: 'Asking Directions', description: 'Ask where things are and understand basic directions.', phraseIds: ['dir-001', 'dir-002', 'dir-003', 'dir-004', 'dir-005', 'dir-006', 'dir-007', 'dir-008', 'dir-009', 'dir-010'], category: 'directions', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 11 },
  { id: 'lesson-012', unitId: 'unit-3', title: 'Places', description: 'Learn the names of common places around town.', phraseIds: ['dir-011', 'dir-012', 'dir-013', 'dir-014', 'dir-015', 'dir-016', 'dir-017', 'dir-018', 'dir-019', 'dir-020'], category: 'directions', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 12 },
  { id: 'lesson-013', unitId: 'unit-3', title: 'Public Transport', description: 'Navigate trains, buses, and taxis.', phraseIds: ['travel-001', 'travel-002', 'travel-003', 'travel-004', 'travel-005', 'travel-006', 'travel-007', 'travel-008', 'travel-009', 'travel-010'], category: 'travel', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 13 },
  { id: 'lesson-014', unitId: 'unit-3', title: 'Travel Essentials', description: 'Passport, luggage, reservations, and airports.', phraseIds: ['travel-011', 'travel-012', 'travel-013', 'travel-014', 'travel-015', 'travel-016', 'travel-017', 'travel-018', 'travel-019', 'travel-020'], category: 'travel', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 14 },

  // ========================================
  // UNIT 4 — FOOD, DRINK & HOME
  // ========================================
  { id: 'lesson-015', unitId: 'unit-4', title: 'Restaurant Basics', description: 'Order drinks and food at a restaurant.', phraseIds: ['food-001', 'food-002', 'food-003', 'food-004', 'food-005', 'food-006', 'food-007', 'food-008'], category: 'food-drink', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 15 },
  { id: 'lesson-016', unitId: 'unit-4', title: 'Food & Drink', description: 'Common food items and compliments.', phraseIds: ['food-009', 'food-010', 'food-011', 'food-012', 'food-013', 'food-014', 'food-015', 'food-016'], category: 'food-drink', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 16 },
  { id: 'lesson-017', unitId: 'unit-4', title: 'Around the House', description: 'Rooms, doors, windows, and keys.', phraseIds: ['home-001', 'home-002', 'home-003', 'home-004', 'home-005', 'home-006', 'home-007', 'home-008'], category: 'home', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 17 },
  { id: 'lesson-018', unitId: 'unit-4', title: 'Home Essentials', description: 'Furniture, bathroom, and household items.', phraseIds: ['home-009', 'home-010', 'home-011', 'home-012', 'home-013', 'home-014', 'home-015'], category: 'home', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 18 },

  // ========================================
  // UNIT 5 — SHOPPING, COMMUNICATION & SAFETY
  // ========================================
  { id: 'lesson-019', unitId: 'unit-5', title: 'Shopping Basics', description: 'Prices, payments, and buying things.', phraseIds: ['shop-001', 'shop-002', 'shop-003', 'shop-004', 'shop-005', 'shop-006', 'shop-007', 'shop-008', 'shop-009', 'shop-010'], category: 'shopping', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 19 },
  { id: 'lesson-020', unitId: 'unit-5', title: 'More Shopping', description: 'Sizes, receipts, and browsing shops.', phraseIds: ['shop-011', 'shop-012', 'shop-013', 'shop-014', 'shop-015', 'shop-016', 'shop-017', 'shop-018', 'shop-019', 'shop-020'], category: 'shopping', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 20 },
  { id: 'lesson-021', unitId: 'unit-5', title: 'Communication', description: 'Ask for help, understanding, and directions in conversation.', phraseIds: ['feel-001', 'feel-002', 'feel-003', 'feel-004', 'feel-005', 'feel-006', 'feel-007', 'feel-008', 'feel-009', 'feel-010'], category: 'feelings-needs', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 21 },
  { id: 'lesson-022', unitId: 'unit-5', title: 'Expressing Yourself', description: 'Talk about feelings, preferences, and state of mind.', phraseIds: ['feel-011', 'feel-012', 'feel-013', 'feel-014', 'feel-015', 'feel-016', 'feel-017', 'feel-018', 'feel-019', 'feel-020'], category: 'feelings-needs', difficulty: 'beginner', lengthBandFocus: '2-word', sortOrder: 22 },
  { id: 'lesson-023', unitId: 'unit-5', title: 'Emergencies', description: 'Critical phrases for urgent situations.', phraseIds: ['emer-001', 'emer-002', 'emer-003', 'emer-004', 'emer-005', 'emer-006', 'emer-007', 'emer-008'], category: 'emergency', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 23 },
  { id: 'lesson-024', unitId: 'unit-5', title: 'Safety Essentials', description: 'Medical needs, allergies, and getting help.', phraseIds: ['emer-009', 'emer-010', 'emer-011', 'emer-012', 'emer-013', 'emer-014', 'emer-015'], category: 'emergency', difficulty: 'beginner', lengthBandFocus: '1-word', sortOrder: 24 },
];
