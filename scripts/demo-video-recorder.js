#!/usr/bin/env node

/**
 * LEVERAGE Demo Video Recorder Helper
 *
 * This script automates the demo page navigation for video recording.
 * Run with: node scripts/demo-video-recorder.js
 *
 * Make sure the dev server is running: npm run dev
 */

const sections = [
  { name: 'Trade OS Hero', duration: 8, section: 0 },
  { name: 'Marketplace', duration: 10, section: 1 },
  { name: 'Documents', duration: 10, section: 2 },
  { name: 'Compliance', duration: 10, section: 3 },
  { name: 'Freight', duration: 10, section: 4 },
  { name: 'Payments', duration: 10, section: 5 },
  { name: 'AI Copilot', duration: 10, section: 6 },
  { name: 'Network', duration: 10, section: 7 },
];

console.log('═══════════════════════════════════════════════════════════');
console.log('   LEVERAGE Demo Video Recorder');
console.log('═══════════════════════════════════════════════════════════\n');

console.log('Make sure the dev server is running:');
console.log('  cd apps/web && npm run dev\n');

console.log('Then open: http://localhost:3000/demo\n');

console.log('Recording sequence:\n');

sections.forEach((sec, i) => {
  const time = sections.slice(0, i).reduce((a, s) => a + s.duration, 0);
  console.log(`  [${String(time).padStart(2, '0')}:00] Section ${i + 1}/${sections.length}: ${sec.name}`);
  console.log(`            (Navigate to section ${sec.section}, record for ${sec.duration}s)\n`);
});

const totalDuration = sections.reduce((a, s) => a + s.duration, 0);
console.log(`Total video duration: ${Math.floor(totalDuration / 60)}:${String(totalDuration % 60).padStart(2, '0')}\n`);

console.log('═══════════════════════════════════════════════════════════');
console.log('   Tips for best results:');
console.log('═══════════════════════════════════════════════════════════');
console.log(`
  1. Use Chrome in fullscreen mode (F11)
  2. Set browser zoom to 100%
  3. Use a recording tool like OBS or Loom
  4. Record at 1080p or higher resolution
  5. Use 60fps for smooth animations
  6. Enable "Auto Demo" mode in the demo page
  7. Or manually click through sections

  For the best video:
  - Enable Auto Demo mode
  - It will auto-play through all sections
  - Just record the browser window
`);
