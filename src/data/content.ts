import type { Phrase } from '../types';

export const phrases: Phrase[] = [
  // ========================================
  // UNIT 1 — GETTING STARTED
  // ========================================

  // === Lesson 1: Basic Greetings ===
  { id: 'greet-001', en: 'Hello', pt: 'Olá', ptPhonetic: 'oh-LAH', lengthBand: '1-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-001', sortOrder: 1 },
  { id: 'greet-002', en: 'Good morning', pt: 'Bom dia', ptPhonetic: 'bohm DEE-ah', lengthBand: '2-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-001', sortOrder: 2 },
  { id: 'greet-003', en: 'Good afternoon', pt: 'Boa tarde', ptPhonetic: 'BOH-ah TAHR-deh', lengthBand: '2-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-001', sortOrder: 3 },
  { id: 'greet-004', en: 'Good evening', pt: 'Boa noite', ptPhonetic: 'BOH-ah NOY-teh', lengthBand: '2-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-001', sortOrder: 4 },
  { id: 'greet-005', en: 'How are you?', pt: 'Como está?', ptPhonetic: 'KOH-moo shTAH', lengthBand: '2-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-001', sortOrder: 5 },

  // === Lesson 2: Farewells ===
  { id: 'greet-006', en: "I'm fine, thank you", pt: 'Estou bem, obrigado', ptPhonetic: 'shTOH baym, oh-bree-GAH-doo', ptFem: 'Estou bem, obrigada', ptFemPhonetic: 'shTOH baym, oh-bree-GAH-dah', lengthBand: '3-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-002', sortOrder: 6 },
  { id: 'greet-007', en: 'Nice to meet you', pt: 'Prazer em conhecê-lo', ptPhonetic: 'prah-ZEHR aym koh-nyeh-SEH-loo', lengthBand: '3-word', category: 'greetings', situations: ['meeting-people'], difficulty: 'beginner-plus', lessonId: 'lesson-002', sortOrder: 7 },
  { id: 'greet-008', en: 'Goodbye', pt: 'Adeus', ptPhonetic: 'ah-DEH-oosh', lengthBand: '1-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-002', sortOrder: 8 },
  { id: 'greet-009', en: 'See you later', pt: 'Até logo', ptPhonetic: 'ah-TEH LOH-goo', lengthBand: '2-word', category: 'greetings', situations: ['meeting-people', 'general'], difficulty: 'beginner', lessonId: 'lesson-002', sortOrder: 9 },
  { id: 'greet-010', en: 'Welcome', pt: 'Bem-vindo', ptPhonetic: 'baym-VEEN-doo', lengthBand: '1-word', category: 'greetings', situations: ['meeting-people', 'at-home'], difficulty: 'beginner', lessonId: 'lesson-002', sortOrder: 10 },

  // === Lesson 3: Polite Essentials ===
  { id: 'polite-001', en: 'Please', pt: 'Por favor', ptPhonetic: 'poor fah-VOHR', lengthBand: '2-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 11 },
  { id: 'polite-002', en: 'Thank you', pt: 'Obrigado', ptPhonetic: 'oh-bree-GAH-doo', ptFem: 'Obrigada', ptFemPhonetic: 'oh-bree-GAH-dah', lengthBand: '1-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 12 },
  { id: 'polite-003', en: "You're welcome", pt: 'De nada', ptPhonetic: 'deh NAH-dah', lengthBand: '2-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 13 },
  { id: 'polite-004', en: 'Excuse me', pt: 'Com licença', ptPhonetic: 'kohm lee-SEN-sah', lengthBand: '2-word', category: 'politeness', situations: ['general', 'in-a-shop', 'asking-directions'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 14 },
  { id: 'polite-005', en: "I'm sorry", pt: 'Desculpe', ptPhonetic: 'desh-KOOL-peh', lengthBand: '1-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 15 },
  { id: 'polite-006', en: 'Yes', pt: 'Sim', ptPhonetic: 'seem', lengthBand: '1-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 16 },
  { id: 'polite-007', en: 'No', pt: 'Não', ptPhonetic: 'nowng', lengthBand: '1-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 17 },
  { id: 'polite-008', en: 'Thank you very much', pt: 'Muito obrigado', ptPhonetic: 'MWEEN-too oh-bree-GAH-doo', ptFem: 'Muito obrigada', ptFemPhonetic: 'MWEEN-too oh-bree-GAH-dah', lengthBand: '2-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 18 },
  { id: 'polite-009', en: 'No problem', pt: 'Sem problema', ptPhonetic: 'saym proh-BLEH-mah', lengthBand: '2-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 19 },
  { id: 'polite-010', en: 'Of course', pt: 'Claro', ptPhonetic: 'KLAH-roo', lengthBand: '1-word', category: 'politeness', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-003', sortOrder: 20 },

  // === Lesson 4: At the Café ===
  { id: 'cafe-001', en: 'A coffee, please', pt: 'Um café, por favor', ptPhonetic: 'oom kah-FEH, poor fah-VOHR', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 21 },
  { id: 'cafe-002', en: 'With milk', pt: 'Com leite', ptPhonetic: 'kohm LAY-teh', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-cafe', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 22 },
  { id: 'cafe-003', en: 'The bill, please', pt: 'A conta, por favor', ptPhonetic: 'ah KOHN-tah, poor fah-VOHR', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-cafe', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 23 },
  { id: 'cafe-004', en: 'A glass of water', pt: 'Um copo de água', ptPhonetic: 'oom KOH-poo deh AH-gwah', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-cafe', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 24 },
  { id: 'cafe-005', en: 'How much is it?', pt: 'Quanto custa?', ptPhonetic: 'KWAHN-too KOOSH-tah', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-cafe', 'in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 25 },
  { id: 'cafe-006', en: 'A tea, please', pt: 'Um chá, por favor', ptPhonetic: 'oom SHAH, poor fah-VOHR', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 26 },
  { id: 'cafe-007', en: 'Can I have...?', pt: 'Posso ter...?', ptPhonetic: 'POH-soo tehr', lengthBand: 'pattern', category: 'food-drink', situations: ['at-a-cafe', 'at-a-restaurant', 'in-a-shop'], difficulty: 'beginner-plus', lessonId: 'lesson-004', sortOrder: 27 },
  { id: 'cafe-008', en: 'A pastel de nata', pt: 'Um pastel de nata', ptPhonetic: 'oom pahsh-TEL deh NAH-tah', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 28 },
  { id: 'cafe-009', en: 'With sugar', pt: 'Com açúcar', ptPhonetic: 'kohm ah-SOO-kahr', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 29 },
  { id: 'cafe-010', en: 'Without sugar', pt: 'Sem açúcar', ptPhonetic: 'saym ah-SOO-kahr', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-004', sortOrder: 30 },

  // ========================================
  // UNIT 2 — EVERYDAY WORDS
  // ========================================

  // === Lesson 5: Numbers 1–10 ===
  { id: 'num-001', en: 'One', pt: 'Um', ptPhonetic: 'oom', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 31 },
  { id: 'num-002', en: 'Two', pt: 'Dois', ptPhonetic: 'doysh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 32 },
  { id: 'num-003', en: 'Three', pt: 'Três', ptPhonetic: 'traysh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 33 },
  { id: 'num-004', en: 'Four', pt: 'Quatro', ptPhonetic: 'KWAH-troo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 34 },
  { id: 'num-005', en: 'Five', pt: 'Cinco', ptPhonetic: 'SEEN-koo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 35 },
  { id: 'num-006', en: 'Six', pt: 'Seis', ptPhonetic: 'saysh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 36 },
  { id: 'num-007', en: 'Seven', pt: 'Sete', ptPhonetic: 'SEH-teh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 37 },
  { id: 'num-008', en: 'Eight', pt: 'Oito', ptPhonetic: 'OY-too', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 38 },
  { id: 'num-009', en: 'Nine', pt: 'Nove', ptPhonetic: 'NOH-veh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 39 },
  { id: 'num-010', en: 'Ten', pt: 'Dez', ptPhonetic: 'dehsh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-005', sortOrder: 40 },

  // === Lesson 6: More Numbers ===
  { id: 'num-011', en: 'Zero', pt: 'Zero', ptPhonetic: 'ZEH-roo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 41 },
  { id: 'num-012', en: 'Twenty', pt: 'Vinte', ptPhonetic: 'VEEN-teh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 42 },
  { id: 'num-013', en: 'Fifty', pt: 'Cinquenta', ptPhonetic: 'seen-KWEN-tah', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 43 },
  { id: 'num-014', en: 'One hundred', pt: 'Cem', ptPhonetic: 'saym', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 44 },
  { id: 'num-015', en: 'One thousand', pt: 'Mil', ptPhonetic: 'meel', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 45 },
  { id: 'num-016', en: 'How many?', pt: 'Quantos?', ptPhonetic: 'KWAHN-toosh', lengthBand: '1-word', category: 'numbers', situations: ['general', 'in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 46 },
  { id: 'num-017', en: 'First', pt: 'Primeiro', ptPhonetic: 'pree-MAY-roo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 47 },
  { id: 'num-018', en: 'Second', pt: 'Segundo', ptPhonetic: 'seh-GOON-doo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 48 },
  { id: 'num-019', en: 'Half', pt: 'Metade', ptPhonetic: 'meh-TAH-deh', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 49 },
  { id: 'num-020', en: 'Last', pt: 'Último', ptPhonetic: 'OOL-tee-moo', lengthBand: '1-word', category: 'numbers', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-006', sortOrder: 50 },

  // === Lesson 7: Close Family ===
  { id: 'family-001', en: 'Mother', pt: 'Mãe', ptPhonetic: 'my', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 51 },
  { id: 'family-002', en: 'Father', pt: 'Pai', ptPhonetic: 'py', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 52 },
  { id: 'family-003', en: 'Son', pt: 'Filho', ptPhonetic: 'FEE-lyoo', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 53 },
  { id: 'family-004', en: 'Daughter', pt: 'Filha', ptPhonetic: 'FEE-lyah', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 54 },
  { id: 'family-005', en: 'Brother', pt: 'Irmão', ptPhonetic: 'eer-MOWNG', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 55 },
  { id: 'family-006', en: 'Sister', pt: 'Irmã', ptPhonetic: 'eer-MANG', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 56 },
  { id: 'family-007', en: 'Husband', pt: 'Marido', ptPhonetic: 'mah-REE-doo', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 57 },
  { id: 'family-008', en: 'Wife', pt: 'Esposa', ptPhonetic: 'shPOH-zah', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-007', sortOrder: 58 },

  // === Lesson 8: Extended Family ===
  { id: 'family-009', en: 'Child', pt: 'Criança', ptPhonetic: 'kree-AHN-sah', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 59 },
  { id: 'family-010', en: 'Grandfather', pt: 'Avô', ptPhonetic: 'ah-VOH', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 60 },
  { id: 'family-011', en: 'Grandmother', pt: 'Avó', ptPhonetic: 'ah-VOH', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 61 },
  { id: 'family-012', en: 'Uncle', pt: 'Tio', ptPhonetic: 'TEE-oo', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 62 },
  { id: 'family-013', en: 'Aunt', pt: 'Tia', ptPhonetic: 'TEE-ah', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 63 },
  { id: 'family-014', en: 'Cousin', pt: 'Primo', ptPhonetic: 'PREE-moo', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 64 },
  { id: 'family-015', en: 'Family', pt: 'Família', ptPhonetic: 'fah-MEE-lee-ah', lengthBand: '1-word', category: 'family', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-008', sortOrder: 65 },

  // === Lesson 9: Days of the Week ===
  { id: 'time-001', en: 'Monday', pt: 'Segunda-feira', ptPhonetic: 'seh-GOON-dah FAY-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 66 },
  { id: 'time-002', en: 'Tuesday', pt: 'Terça-feira', ptPhonetic: 'TEHR-sah FAY-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 67 },
  { id: 'time-003', en: 'Wednesday', pt: 'Quarta-feira', ptPhonetic: 'KWAHR-tah FAY-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 68 },
  { id: 'time-004', en: 'Thursday', pt: 'Quinta-feira', ptPhonetic: 'KEEN-tah FAY-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 69 },
  { id: 'time-005', en: 'Friday', pt: 'Sexta-feira', ptPhonetic: 'SAYSH-tah FAY-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 70 },
  { id: 'time-006', en: 'Saturday', pt: 'Sábado', ptPhonetic: 'SAH-bah-doo', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 71 },
  { id: 'time-007', en: 'Sunday', pt: 'Domingo', ptPhonetic: 'doo-MEEN-goo', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-009', sortOrder: 72 },

  // === Lesson 10: Time & Calendar ===
  { id: 'time-008', en: 'What time is it?', pt: 'Que horas são?', ptPhonetic: 'keh OH-rahsh sowng', lengthBand: '3-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 73 },
  { id: 'time-009', en: 'Today', pt: 'Hoje', ptPhonetic: 'OH-zheh', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 74 },
  { id: 'time-010', en: 'Tomorrow', pt: 'Amanhã', ptPhonetic: 'ah-mah-NYAH', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 75 },
  { id: 'time-011', en: 'Yesterday', pt: 'Ontem', ptPhonetic: 'OHN-taym', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 76 },
  { id: 'time-012', en: 'Now', pt: 'Agora', ptPhonetic: 'ah-GOH-rah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 77 },
  { id: 'time-013', en: 'Later', pt: 'Mais tarde', ptPhonetic: 'mysh TAHR-deh', lengthBand: '2-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 78 },
  { id: 'time-014', en: 'Week', pt: 'Semana', ptPhonetic: 'seh-MAH-nah', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 79 },
  { id: 'time-015', en: 'Month', pt: 'Mês', ptPhonetic: 'maysh', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 80 },
  { id: 'time-016', en: 'Year', pt: 'Ano', ptPhonetic: 'AH-noo', lengthBand: '1-word', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 81 },
  { id: 'time-017', en: 'What day is it?', pt: 'Que dia é hoje?', ptPhonetic: 'keh DEE-ah eh OH-zheh', lengthBand: 'short-phrase', category: 'time-dates', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-010', sortOrder: 82 },

  // ========================================
  // UNIT 3 — GETTING AROUND
  // ========================================

  // === Lesson 11: Asking Directions ===
  { id: 'dir-001', en: 'Where is...?', pt: 'Onde é...?', ptPhonetic: 'OHN-deh eh', lengthBand: 'pattern', category: 'directions', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 83 },
  { id: 'dir-002', en: 'Turn left', pt: 'Vire à esquerda', ptPhonetic: 'VEE-reh ah shKEHR-dah', lengthBand: '3-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 84 },
  { id: 'dir-003', en: 'Turn right', pt: 'Vire à direita', ptPhonetic: 'VEE-reh ah dee-RAY-tah', lengthBand: '3-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 85 },
  { id: 'dir-004', en: 'Go straight', pt: 'Siga em frente', ptPhonetic: 'SEE-gah aym FREHN-teh', lengthBand: '3-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 86 },
  { id: 'dir-005', en: 'Near', pt: 'Perto', ptPhonetic: 'PEHR-too', lengthBand: '1-word', category: 'directions', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 87 },
  { id: 'dir-006', en: 'Far', pt: 'Longe', ptPhonetic: 'LOHN-zheh', lengthBand: '1-word', category: 'directions', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 88 },
  { id: 'dir-007', en: 'Here', pt: 'Aqui', ptPhonetic: 'ah-KEE', lengthBand: '1-word', category: 'directions', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 89 },
  { id: 'dir-008', en: 'There', pt: 'Ali', ptPhonetic: 'ah-LEE', lengthBand: '1-word', category: 'directions', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 90 },
  { id: 'dir-009', en: 'Is it far?', pt: 'É longe?', ptPhonetic: 'eh LOHN-zheh', lengthBand: '2-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner', lessonId: 'lesson-011', sortOrder: 91 },
  { id: 'dir-010', en: 'How do I get to...?', pt: 'Como chego a...?', ptPhonetic: 'KOH-moo SHEH-goo ah', lengthBand: 'pattern', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner-plus', lessonId: 'lesson-011', sortOrder: 92 },

  // === Lesson 12: Places ===
  { id: 'dir-011', en: 'The street', pt: 'A rua', ptPhonetic: 'ah HOO-ah', lengthBand: '2-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 93 },
  { id: 'dir-012', en: 'The station', pt: 'A estação', ptPhonetic: 'ah shTAH-sowng', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 94 },
  { id: 'dir-013', en: 'The hospital', pt: 'O hospital', ptPhonetic: 'oo osh-pee-TAHL', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'emergency-help'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 95 },
  { id: 'dir-014', en: 'The pharmacy', pt: 'A farmácia', ptPhonetic: 'ah fahr-MAH-see-ah', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'at-the-doctor'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 96 },
  { id: 'dir-015', en: 'The supermarket', pt: 'O supermercado', ptPhonetic: 'oo soo-pehr-mehr-KAH-doo', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 97 },
  { id: 'dir-016', en: 'The beach', pt: 'A praia', ptPhonetic: 'ah PRY-ah', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 98 },
  { id: 'dir-017', en: 'The hotel', pt: 'O hotel', ptPhonetic: 'oo oh-TEL', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 99 },
  { id: 'dir-018', en: 'The airport', pt: 'O aeroporto', ptPhonetic: 'oo ah-eh-roh-POHR-too', lengthBand: '2-word', category: 'directions', situations: ['asking-directions', 'at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-012', sortOrder: 100 },
  { id: 'dir-019', en: 'Next to', pt: 'Ao lado de', ptPhonetic: 'ow LAH-doo deh', lengthBand: '3-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner-plus', lessonId: 'lesson-012', sortOrder: 101 },
  { id: 'dir-020', en: 'In front of', pt: 'Em frente de', ptPhonetic: 'aym FREHN-teh deh', lengthBand: '3-word', category: 'directions', situations: ['asking-directions'], difficulty: 'beginner-plus', lessonId: 'lesson-012', sortOrder: 102 },

  // === Lesson 13: Public Transport ===
  { id: 'travel-001', en: 'The train', pt: 'O comboio', ptPhonetic: 'oo kohm-BOY-oo', lengthBand: '2-word', category: 'travel', situations: ['at-the-airport', 'general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 103 },
  { id: 'travel-002', en: 'The bus', pt: 'O autocarro', ptPhonetic: 'oo ow-toh-KAH-hoo', lengthBand: '2-word', category: 'travel', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 104 },
  { id: 'travel-003', en: 'The taxi', pt: 'O táxi', ptPhonetic: 'oo TAK-see', lengthBand: '2-word', category: 'travel', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 105 },
  { id: 'travel-004', en: 'The metro', pt: 'O metro', ptPhonetic: 'oo MEH-troo', lengthBand: '2-word', category: 'travel', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 106 },
  { id: 'travel-005', en: 'Ticket', pt: 'Bilhete', ptPhonetic: 'bee-LYEH-teh', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport', 'general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 107 },
  { id: 'travel-006', en: 'One ticket to...', pt: 'Um bilhete para...', ptPhonetic: 'oom bee-LYEH-teh PAH-rah', lengthBand: 'pattern', category: 'travel', situations: ['at-the-airport', 'general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 108 },
  { id: 'travel-007', en: 'Return ticket', pt: 'Bilhete de ida e volta', ptPhonetic: 'bee-LYEH-teh deh EE-dah ee VOHL-tah', lengthBand: 'short-phrase', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner-plus', lessonId: 'lesson-013', sortOrder: 109 },
  { id: 'travel-008', en: 'When does it leave?', pt: 'Quando parte?', ptPhonetic: 'KWAHN-doo PAHR-teh', lengthBand: '2-word', category: 'travel', situations: ['at-the-airport', 'general'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 110 },
  { id: 'travel-009', en: 'When does it arrive?', pt: 'Quando chega?', ptPhonetic: 'KWAHN-doo SHEH-gah', lengthBand: '2-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 111 },
  { id: 'travel-010', en: 'The platform', pt: 'A plataforma', ptPhonetic: 'ah plah-tah-FOHR-mah', lengthBand: '2-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-013', sortOrder: 112 },

  // === Lesson 14: Travel Essentials ===
  { id: 'travel-011', en: 'Passport', pt: 'Passaporte', ptPhonetic: 'pah-sah-POHR-teh', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 113 },
  { id: 'travel-012', en: 'Luggage', pt: 'Bagagem', ptPhonetic: 'bah-GAH-zhaym', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 114 },
  { id: 'travel-013', en: 'I have a reservation', pt: 'Tenho uma reserva', ptPhonetic: 'TEH-nyoo OO-mah heh-ZEHR-vah', lengthBand: '3-word', category: 'travel', situations: ['at-the-airport', 'at-a-restaurant'], difficulty: 'beginner-plus', lessonId: 'lesson-014', sortOrder: 115 },
  { id: 'travel-014', en: 'Check-in', pt: 'Check-in', ptPhonetic: 'SHEK-een', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 116 },
  { id: 'travel-015', en: 'Departure', pt: 'Partida', ptPhonetic: 'pahr-TEE-dah', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 117 },
  { id: 'travel-016', en: 'Arrival', pt: 'Chegada', ptPhonetic: 'sheh-GAH-dah', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 118 },
  { id: 'travel-017', en: 'Delay', pt: 'Atraso', ptPhonetic: 'ah-TRAH-zoo', lengthBand: '1-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 119 },
  { id: 'travel-018', en: 'Map', pt: 'Mapa', ptPhonetic: 'MAH-pah', lengthBand: '1-word', category: 'travel', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 120 },
  { id: 'travel-019', en: 'Gate', pt: 'Porta de embarque', ptPhonetic: 'POHR-tah deh aym-BAHR-keh', lengthBand: '3-word', category: 'travel', situations: ['at-the-airport'], difficulty: 'beginner-plus', lessonId: 'lesson-014', sortOrder: 121 },
  { id: 'travel-020', en: 'Reserved', pt: 'Reservado', ptPhonetic: 'heh-zehr-VAH-doo', lengthBand: '1-word', category: 'travel', situations: ['at-a-restaurant', 'general'], difficulty: 'beginner', lessonId: 'lesson-014', sortOrder: 122 },

  // ========================================
  // UNIT 4 — FOOD, DRINK & HOME
  // ========================================

  // === Lesson 15: Restaurant Basics ===
  { id: 'food-001', en: "I'm hungry", pt: 'Tenho fome', ptPhonetic: 'TEH-nyoo FOH-meh', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe', 'general'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 123 },
  { id: 'food-002', en: "I'm thirsty", pt: 'Tenho sede', ptPhonetic: 'TEH-nyoo SEH-deh', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe', 'general'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 124 },
  { id: 'food-003', en: 'The menu, please', pt: 'A ementa, por favor', ptPhonetic: 'ah eh-MEHN-tah, poor fah-VOHR', lengthBand: 'short-phrase', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 125 },
  { id: 'food-004', en: 'Beer', pt: 'Cerveja', ptPhonetic: 'sehr-VEH-zhah', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 126 },
  { id: 'food-005', en: 'Wine', pt: 'Vinho', ptPhonetic: 'VEE-nyoo', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 127 },
  { id: 'food-006', en: 'Red wine', pt: 'Vinho tinto', ptPhonetic: 'VEE-nyoo TEEN-too', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 128 },
  { id: 'food-007', en: 'White wine', pt: 'Vinho branco', ptPhonetic: 'VEE-nyoo BRAHN-koo', lengthBand: '2-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 129 },
  { id: 'food-008', en: 'Bread', pt: 'Pão', ptPhonetic: 'powng', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-015', sortOrder: 130 },

  // === Lesson 16: Food & Drink ===
  { id: 'food-009', en: 'Fish', pt: 'Peixe', ptPhonetic: 'PAY-sheh', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 131 },
  { id: 'food-010', en: 'Meat', pt: 'Carne', ptPhonetic: 'KAHR-neh', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 132 },
  { id: 'food-011', en: 'Chicken', pt: 'Frango', ptPhonetic: 'FRAHN-goo', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 133 },
  { id: 'food-012', en: 'Rice', pt: 'Arroz', ptPhonetic: 'ah-ROHSH', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 134 },
  { id: 'food-013', en: 'Salad', pt: 'Salada', ptPhonetic: 'sah-LAH-dah', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 135 },
  { id: 'food-014', en: 'Dessert', pt: 'Sobremesa', ptPhonetic: 'soh-breh-MEH-zah', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 136 },
  { id: 'food-015', en: 'Delicious', pt: 'Delicioso', ptPhonetic: 'deh-lee-see-OH-zoo', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 137 },
  { id: 'food-016', en: 'Water', pt: 'Água', ptPhonetic: 'AH-gwah', lengthBand: '1-word', category: 'food-drink', situations: ['at-a-restaurant', 'at-a-cafe', 'general'], difficulty: 'beginner', lessonId: 'lesson-016', sortOrder: 138 },

  // === Lesson 17: Around the House ===
  { id: 'home-001', en: 'House', pt: 'Casa', ptPhonetic: 'KAH-zah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 139 },
  { id: 'home-002', en: 'Kitchen', pt: 'Cozinha', ptPhonetic: 'koo-ZEE-nyah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 140 },
  { id: 'home-003', en: 'Bathroom', pt: 'Casa de banho', ptPhonetic: 'KAH-zah deh BAH-nyoo', lengthBand: '3-word', category: 'home', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 141 },
  { id: 'home-004', en: 'Bedroom', pt: 'Quarto', ptPhonetic: 'KWAHR-too', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 142 },
  { id: 'home-005', en: 'Living room', pt: 'Sala', ptPhonetic: 'SAH-lah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 143 },
  { id: 'home-006', en: 'Key', pt: 'Chave', ptPhonetic: 'SHAH-veh', lengthBand: '1-word', category: 'home', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 144 },
  { id: 'home-007', en: 'Door', pt: 'Porta', ptPhonetic: 'POHR-tah', lengthBand: '1-word', category: 'home', situations: ['at-home', 'general'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 145 },
  { id: 'home-008', en: 'Window', pt: 'Janela', ptPhonetic: 'zhah-NEH-lah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-017', sortOrder: 146 },

  // === Lesson 18: Home Essentials ===
  { id: 'home-009', en: 'Light', pt: 'Luz', ptPhonetic: 'loosh', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 147 },
  { id: 'home-010', en: 'Bed', pt: 'Cama', ptPhonetic: 'KAH-mah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 148 },
  { id: 'home-011', en: 'Table', pt: 'Mesa', ptPhonetic: 'MEH-zah', lengthBand: '1-word', category: 'home', situations: ['at-home', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 149 },
  { id: 'home-012', en: 'Chair', pt: 'Cadeira', ptPhonetic: 'kah-DAY-rah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 150 },
  { id: 'home-013', en: 'Shower', pt: 'Chuveiro', ptPhonetic: 'shoo-VAY-roo', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 151 },
  { id: 'home-014', en: 'Where is the bathroom?', pt: 'Onde é a casa de banho?', ptPhonetic: 'OHN-deh eh ah KAH-zah deh BAH-nyoo', lengthBand: 'short-phrase', category: 'home', situations: ['at-home', 'at-a-restaurant', 'general'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 152 },
  { id: 'home-015', en: 'Towel', pt: 'Toalha', ptPhonetic: 'too-AH-lyah', lengthBand: '1-word', category: 'home', situations: ['at-home'], difficulty: 'beginner', lessonId: 'lesson-018', sortOrder: 153 },

  // ========================================
  // UNIT 5 — SHOPPING, COMMUNICATION & SAFETY
  // ========================================

  // === Lesson 19: Shopping Basics ===
  { id: 'shop-001', en: 'How much does this cost?', pt: 'Quanto custa isto?', ptPhonetic: 'KWAHN-too KOOSH-tah EESH-too', lengthBand: 'short-phrase', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 154 },
  { id: 'shop-002', en: 'I would like...', pt: 'Eu queria...', ptPhonetic: 'eh-oo keh-REE-ah', lengthBand: 'pattern', category: 'shopping', situations: ['in-a-shop', 'at-a-restaurant', 'at-a-cafe'], difficulty: 'beginner-plus', lessonId: 'lesson-019', sortOrder: 155 },
  { id: 'shop-003', en: 'This one', pt: 'Este', ptPhonetic: 'EHSH-teh', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 156 },
  { id: 'shop-004', en: 'That one', pt: 'Aquele', ptPhonetic: 'ah-KEH-leh', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 157 },
  { id: 'shop-005', en: 'Do you have...?', pt: 'Tem...?', ptPhonetic: 'taym', lengthBand: 'pattern', category: 'shopping', situations: ['in-a-shop', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 158 },
  { id: 'shop-006', en: 'Too expensive', pt: 'Muito caro', ptPhonetic: 'MWEEN-too KAH-roo', lengthBand: '2-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 159 },
  { id: 'shop-007', en: 'Cheaper', pt: 'Mais barato', ptPhonetic: 'mysh bah-RAH-too', lengthBand: '2-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 160 },
  { id: 'shop-008', en: "I'll take it", pt: 'Eu levo', ptPhonetic: 'eh-oo LEH-voo', lengthBand: '2-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 161 },
  { id: 'shop-009', en: 'Can I pay by card?', pt: 'Posso pagar com cartão?', ptPhonetic: 'POH-soo pah-GAHR kohm kahr-TOWNG', lengthBand: 'short-phrase', category: 'shopping', situations: ['in-a-shop', 'at-a-restaurant', 'at-a-cafe'], difficulty: 'beginner-plus', lessonId: 'lesson-019', sortOrder: 162 },
  { id: 'shop-010', en: 'Cash', pt: 'Dinheiro', ptPhonetic: 'dee-NYAY-roo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-019', sortOrder: 163 },

  // === Lesson 20: More Shopping ===
  { id: 'shop-011', en: 'Receipt', pt: 'Recibo', ptPhonetic: 'heh-SEE-boo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 164 },
  { id: 'shop-012', en: 'Open', pt: 'Aberto', ptPhonetic: 'ah-BEHR-too', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 165 },
  { id: 'shop-013', en: 'Closed', pt: 'Fechado', ptPhonetic: 'feh-SHAH-doo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 166 },
  { id: 'shop-014', en: 'Sale', pt: 'Saldos', ptPhonetic: 'SAHL-doosh', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 167 },
  { id: 'shop-015', en: 'Big', pt: 'Grande', ptPhonetic: 'GRAHN-deh', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 168 },
  { id: 'shop-016', en: 'Small', pt: 'Pequeno', ptPhonetic: 'peh-KEH-noo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 169 },
  { id: 'shop-017', en: "I'm just looking", pt: 'Estou só a ver', ptPhonetic: 'shTOH soh ah vehr', lengthBand: 'short-phrase', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner-plus', lessonId: 'lesson-020', sortOrder: 170 },
  { id: 'shop-018', en: 'Where is the exit?', pt: 'Onde é a saída?', ptPhonetic: 'OHN-deh eh ah sah-EE-dah', lengthBand: 'short-phrase', category: 'shopping', situations: ['in-a-shop', 'general'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 171 },
  { id: 'shop-019', en: 'Bag', pt: 'Saco', ptPhonetic: 'SAH-koo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 172 },
  { id: 'shop-020', en: 'Size', pt: 'Tamanho', ptPhonetic: 'tah-MAH-nyoo', lengthBand: '1-word', category: 'shopping', situations: ['in-a-shop'], difficulty: 'beginner', lessonId: 'lesson-020', sortOrder: 173 },

  // === Lesson 21: Communication ===
  { id: 'feel-001', en: 'I need help', pt: 'Preciso de ajuda', ptPhonetic: 'preh-SEE-zoo deh ah-ZHOO-dah', lengthBand: '3-word', category: 'feelings-needs', situations: ['general', 'emergency-help'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 174 },
  { id: 'feel-002', en: "I don't understand", pt: 'Não compreendo', ptPhonetic: 'nowng kohm-preh-EHN-doo', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 175 },
  { id: 'feel-003', en: "I don't speak Portuguese", pt: 'Não falo português', ptPhonetic: 'nowng FAH-loo poor-too-GEHSH', lengthBand: '3-word', category: 'feelings-needs', situations: ['general', 'meeting-people'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 176 },
  { id: 'feel-004', en: 'Do you speak English?', pt: 'Fala inglês?', ptPhonetic: 'FAH-lah een-GLEHSH', lengthBand: '2-word', category: 'feelings-needs', situations: ['general', 'meeting-people'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 177 },
  { id: 'feel-005', en: 'Can you help me?', pt: 'Pode ajudar-me?', ptPhonetic: 'POH-deh ah-zhoo-DAHR-meh', lengthBand: '2-word', category: 'feelings-needs', situations: ['general', 'emergency-help'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 178 },
  { id: 'feel-006', en: 'More slowly, please', pt: 'Mais devagar, por favor', ptPhonetic: 'mysh deh-vah-GAHR, poor fah-VOHR', lengthBand: 'short-phrase', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 179 },
  { id: 'feel-007', en: 'Can you repeat?', pt: 'Pode repetir?', ptPhonetic: 'POH-deh heh-peh-TEER', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 180 },
  { id: 'feel-008', en: 'What does this mean?', pt: 'O que significa isto?', ptPhonetic: 'oo keh see-gnee-FEE-kah EESH-too', lengthBand: 'short-phrase', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner-plus', lessonId: 'lesson-021', sortOrder: 181 },
  { id: 'feel-009', en: 'I want', pt: 'Eu quero', ptPhonetic: 'eh-oo KEH-roo', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 182 },
  { id: 'feel-010', en: "I don't want", pt: 'Não quero', ptPhonetic: 'nowng KEH-roo', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-021', sortOrder: 183 },

  // === Lesson 22: Expressing Yourself ===
  { id: 'feel-011', en: "I'm lost", pt: 'Estou perdido', ptPhonetic: 'shTOH pehr-DEE-doo', ptFem: 'Estou perdida', ptFemPhonetic: 'shTOH pehr-DEE-dah', lengthBand: '2-word', category: 'feelings-needs', situations: ['asking-directions', 'general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 184 },
  { id: 'feel-012', en: "I'm tired", pt: 'Estou cansado', ptPhonetic: 'shTOH kahn-SAH-doo', ptFem: 'Estou cansada', ptFemPhonetic: 'shTOH kahn-SAH-dah', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 185 },
  { id: 'feel-013', en: "I'm happy", pt: 'Estou feliz', ptPhonetic: 'shTOH feh-LEESH', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 186 },
  { id: 'feel-014', en: "I'm cold", pt: 'Tenho frio', ptPhonetic: 'TEH-nyoo FREE-oo', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 187 },
  { id: 'feel-015', en: "I'm hot", pt: 'Tenho calor', ptPhonetic: 'TEH-nyoo kah-LOHR', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 188 },
  { id: 'feel-016', en: 'I like it', pt: 'Gosto', ptPhonetic: 'GOHSH-too', lengthBand: '1-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 189 },
  { id: 'feel-017', en: "I don't like it", pt: 'Não gosto', ptPhonetic: 'nowng GOHSH-too', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 190 },
  { id: 'feel-018', en: "It's beautiful", pt: 'É bonito', ptPhonetic: 'eh boo-NEE-too', lengthBand: '2-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 191 },
  { id: 'feel-019', en: "I'm fine", pt: 'Estou bem', ptPhonetic: 'shTOH baym', lengthBand: '2-word', category: 'feelings-needs', situations: ['general', 'meeting-people'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 192 },
  { id: 'feel-020', en: 'Wait', pt: 'Espere', ptPhonetic: 'shPEH-reh', lengthBand: '1-word', category: 'feelings-needs', situations: ['general'], difficulty: 'beginner', lessonId: 'lesson-022', sortOrder: 193 },

  // === Lesson 23: Emergencies ===
  { id: 'emer-001', en: 'Help!', pt: 'Socorro!', ptPhonetic: 'soo-KOH-hoo', lengthBand: '1-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 194 },
  { id: 'emer-002', en: 'Call the police', pt: 'Chame a polícia', ptPhonetic: 'SHAH-meh ah poo-LEE-see-ah', lengthBand: '3-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 195 },
  { id: 'emer-003', en: 'Call an ambulance', pt: 'Chame uma ambulância', ptPhonetic: 'SHAH-meh OO-mah ahm-boo-LAHN-see-ah', lengthBand: '3-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 196 },
  { id: 'emer-004', en: 'I need a doctor', pt: 'Preciso de um médico', ptPhonetic: 'preh-SEE-zoo deh oom MEH-dee-koo', lengthBand: 'short-phrase', category: 'emergency', situations: ['emergency-help', 'at-the-doctor'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 197 },
  { id: 'emer-005', en: 'It hurts here', pt: 'Dói aqui', ptPhonetic: 'doy ah-KEE', lengthBand: '2-word', category: 'emergency', situations: ['at-the-doctor', 'emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 198 },
  { id: 'emer-006', en: "I'm sick", pt: 'Estou doente', ptPhonetic: 'shTOH doo-EHN-teh', lengthBand: '2-word', category: 'emergency', situations: ['at-the-doctor', 'emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 199 },
  { id: 'emer-007', en: 'Fire', pt: 'Fogo', ptPhonetic: 'FOH-goo', lengthBand: '1-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 200 },
  { id: 'emer-008', en: 'Danger', pt: 'Perigo', ptPhonetic: 'peh-REE-goo', lengthBand: '1-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-023', sortOrder: 201 },

  // === Lesson 24: Safety Essentials ===
  { id: 'emer-009', en: 'Medicine', pt: 'Medicamento', ptPhonetic: 'meh-dee-kah-MEHN-too', lengthBand: '1-word', category: 'emergency', situations: ['at-the-doctor'], difficulty: 'beginner', lessonId: 'lesson-024', sortOrder: 202 },
  { id: 'emer-010', en: 'Allergic', pt: 'Alérgico', ptPhonetic: 'ah-LEHR-zhee-koo', lengthBand: '1-word', category: 'emergency', situations: ['at-the-doctor', 'at-a-restaurant'], difficulty: 'beginner', lessonId: 'lesson-024', sortOrder: 203 },
  { id: 'emer-011', en: 'Emergency', pt: 'Emergência', ptPhonetic: 'eh-mehr-ZHEHN-see-ah', lengthBand: '1-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner', lessonId: 'lesson-024', sortOrder: 204 },
  { id: 'emer-012', en: "I've been robbed", pt: 'Fui roubado', ptPhonetic: 'fwee hoh-BAH-doo', lengthBand: '2-word', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner-plus', lessonId: 'lesson-024', sortOrder: 205 },
  { id: 'emer-013', en: 'Hospital', pt: 'Hospital', ptPhonetic: 'osh-pee-TAHL', lengthBand: '1-word', category: 'emergency', situations: ['emergency-help', 'at-the-doctor'], difficulty: 'beginner', lessonId: 'lesson-024', sortOrder: 206 },
  { id: 'emer-014', en: 'I need to go to the hospital', pt: 'Preciso de ir ao hospital', ptPhonetic: 'preh-SEE-zoo deh eer ow osh-pee-TAHL', lengthBand: 'short-phrase', category: 'emergency', situations: ['emergency-help'], difficulty: 'beginner-plus', lessonId: 'lesson-024', sortOrder: 207 },
  { id: 'emer-015', en: 'My phone number is...', pt: 'O meu número é...', ptPhonetic: 'oo meh-oo NOO-meh-roo eh', lengthBand: 'pattern', category: 'emergency', situations: ['emergency-help', 'general'], difficulty: 'beginner-plus', lessonId: 'lesson-024', sortOrder: 208 },
];
