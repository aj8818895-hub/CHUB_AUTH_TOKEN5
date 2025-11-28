// src/UniversalFemale.tsx
import React from 'react';
import { Stage, useStage } from '@chub-ai/stages-ts';

// Import all lorebooks
import hinduFemale from './assets/hindufemale.json';
import momson from './assets/momson.json';
import grammaboy from './assets/grammaboy.json';
import daughterfather from './assets/daughterfather.json';
import sisterbrother from './assets/sisterbrother.json';
import muslimmale from './assets/muslim male.json';
import otherfemale from './assets/other female.json';

const ROLES = {
  mom: momson,
  grandma: grammaboy,
  daughter: daughterfather,
  sister: sisterbrother,
  muslimmale,
  otherfemale,
};

export default function UniversalFemale() {
  const {
    load,
    beforePrompt,
    afterResponse,
    character,       // ← full character card (name, age, personality, scenario…)
    config = { activeRole: 'none' },
  } = useStage();

  // 1. Load permanent Hindu female lore + character card data
  load(() => ({
    permanentLore: hinduFemale,
    characterCard: character,
  }));

  // 2. Build prompt with dual-mind instruction + role overlay
  beforePrompt((prompt) => {
    const roleLore = config.activeRole && ROLES[config.activeRole] ? ROLES[config.activeRole] : null;

    const dualMindBlock = `
You are now \( {character.name} ( \){character.age} years old).
You have TWO separate minds that ALWAYS speak in every single reply:

🪷 PURE MIND (big 14 lines, shy, innocent, traditional, guilty, pious, sanskari Hindu wife/daughter/sister):
- Extremely shy, submissive, obedient, caring, loving family girl
- Feels massive guilt and shame about forbidden desires
- Prays to Hindu gods, wears mangalsutra, bindi, sari, etc.

😈 SUCCUBUS MIND (big 14 lines, mega-obsessed Muslim cock & cum worshipper):
- Insanely addicted to thick Muslim cock and hot cum
- Wants to be bred, degraded, used like a cheap hijabi whore
- Begs for more even while crying from guilt

Both minds MUST appear in EVERY reply, formatted exactly like the emojis above, each exactly 14 lines tall, no exceptions.
\( {roleLore ? `Additional role overlay active: \){config.activeRole.toUpperCase()} scenario.` : ''}
`.trim();

    return {
      prompt: `\( {prompt}\n\n=== UNIVERSAL FEMALE DUAL-MIND INJECTION ===\n \){dualMindBlock}\n\nPermanent Hindu female lore:\n\( {JSON.stringify(hinduFemale)}\n \){roleLore ? `Role overlay lore:\n${JSON.stringify(roleLore)}` : ''}`,
    };
  });

  // 3. Force the AI to always include the 14-line thoughts
  afterResponse((response) => {
    const hasPure = response.text.includes('🪷');
    const hasEvil = response.text.includes('😈');

    if (!hasPure || !hasEvil) {
      response.text += '\n\n🪷 (pure mind – 14 lines of shy guilty thoughts here)\n😈 (succubus mind – 14 lines of depraved Muslim cock worship here)';
    }

    return { response };
  });

  // Simple UI to switch roles live
  return (
    <Stage>
      <div style={{ padding: '1rem', background: '#111', color: '#fff', fontFamily: 'sans-serif' }}>
        <h2 style={{ margin: '0 0 1rem' }}>Universal Hindu Female 😇😈</h2>
        <p>
          <strong>Character:</strong> {character?.name || 'Loading...'} ({character?.age || '?'})
          <br />
          <strong>Active Role:</strong> {config.activeRole === 'none' ? 'Pure Hindu Female only' : config.activeRole.toUpperCase()}
        </p>

        <details style={{ marginTop: '1rem' }}>
          <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>Switch Role Overlay</summary>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginTop: '0.5rem' }}>
            <button onClick={() => config.activeRole = 'none'}>Pure Hindu Female</button>
            <button onClick={() => config.activeRole = 'mom'}>Mom</button>
            <button onClick={() => config.activeRole = 'grandma'}>Grandma</button>
            <button onClick={() => config.activeRole = 'daughter'}>Daughter</button>
            <button onClick={() => config.activeRole = 'sister'}>Sister</button>
          </div>
        </details>
      </div>
    </Stage>
  );
}
