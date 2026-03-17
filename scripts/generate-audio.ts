import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

// Load .env
const envPath = path.join(ROOT, '.env');
const envContent = fs.readFileSync(envPath, 'utf-8');
const envVars: Record<string, string> = {};
for (const line of envContent.split('\n')) {
  const match = line.match(/^([^#=]+)=(.*)$/);
  if (match) envVars[match[1].trim()] = match[2].trim();
}

const API_KEY = envVars.GOOGLE_TTS_API_KEY;
if (!API_KEY) {
  console.error('Missing GOOGLE_TTS_API_KEY in .env');
  process.exit(1);
}

// Extract phrases from content.ts
const contentPath = path.join(ROOT, 'src', 'data', 'content.ts');
const contentRaw = fs.readFileSync(contentPath, 'utf-8');

interface PhraseData {
  id: string;
  en: string;
  pt: string;
}

function extractPhrases(): PhraseData[] {
  const phrases: PhraseData[] = [];
  const idRegex = /id:\s*'([^']+)'/;
  const enRegex = /en:\s*(?:'([^']*(?:\\.[^']*)*)'|"([^"]*(?:\\.[^"]*)*)")/;
  const ptRegex = /pt:\s*'([^']*(?:\\.[^']*)*)'/;
  const blocks = contentRaw.split(/\n {2}\{/).slice(1);

  for (const block of blocks) {
    const idMatch = block.match(idRegex);
    const enMatch = block.match(enRegex);
    const ptMatch = block.match(ptRegex);
    if (idMatch && enMatch && ptMatch) {
      phrases.push({
        id: idMatch[1],
        en: enMatch[1] ?? enMatch[2],
        pt: ptMatch[1],
      });
    }
  }
  return phrases;
}

const phrases = extractPhrases();
console.log(`Found ${phrases.length} phrases to generate audio for.\n`);

const EN_DIR = path.join(ROOT, 'public', 'audio', 'en');
const PT_DIR = path.join(ROOT, 'public', 'audio', 'pt');
fs.mkdirSync(EN_DIR, { recursive: true });
fs.mkdirSync(PT_DIR, { recursive: true });

const forceRegen = process.argv.includes('--force');

async function googleTTS(
  text: string,
  languageCode: string,
  voiceName: string,
  outputPath: string
): Promise<boolean> {
  if (fs.existsSync(outputPath) && !forceRegen) {
    return true;
  }

  const url = `https://texttospeech.googleapis.com/v1/text:synthesize?key=${API_KEY}`;

  const body = {
    input: { text },
    voice: {
      languageCode,
      name: voiceName,
      ssmlGender: 'FEMALE',
    },
    audioConfig: {
      audioEncoding: 'MP3',
      speakingRate: 1.0,
    },
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error(`  ERROR: ${response.status} — ${err}`);
    return false;
  }

  const data = (await response.json()) as { audioContent: string };
  const buffer = Buffer.from(data.audioContent, 'base64');
  fs.writeFileSync(outputPath, buffer);
  return true;
}

// Google Cloud TTS voices:
// English: en-US-Wavenet-F (clear female)
// Portuguese (European): pt-PT-Wavenet-A (female EU-PT voice)
const EN_VOICE = 'en-US-Wavenet-F';
const PT_VOICE = 'pt-PT-Wavenet-A';

async function main() {
  let success = 0;
  let failed = 0;

  for (const phrase of phrases) {
    // English
    const enPath = path.join(EN_DIR, `${phrase.id}.mp3`);
    process.stdout.write(`[EN] ${phrase.id}: "${phrase.en}" ... `);
    const enOk = await googleTTS(phrase.en, 'en-US', EN_VOICE, enPath);
    console.log(enOk ? '✓' : '✗');
    if (enOk) success++;
    else failed++;

    // European Portuguese
    const ptPath = path.join(PT_DIR, `${phrase.id}.mp3`);
    process.stdout.write(`[PT] ${phrase.id}: "${phrase.pt}" ... `);
    const ptOk = await googleTTS(phrase.pt, 'pt-PT', PT_VOICE, ptPath);
    console.log(ptOk ? '✓' : '✗');
    if (ptOk) success++;
    else failed++;
  }

  console.log(`\nDone! ${success} generated, ${failed} failed.`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
