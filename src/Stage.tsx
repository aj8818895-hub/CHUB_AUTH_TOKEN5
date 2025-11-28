// src/Stage.tsx
import React, { useState, useEffect } from 'react';
import { Stage, useStage } from '@chub-ai/stages-ts';

import hinduFemale from './assets/hindufemale.json';
import muslimMale from './assets/muslim male.json';
import hinduMale from './assets/hindumale.json';
import mom from './assets/momson.json';
import sister from './assets/sisterbrother.json';
import daughter from './assets/daughterfather.json';
import grandma from './assets/grammaboy.json';

const ROLES: Record<string, any> = { mom, sister, daughter, grandma };

export default function FinalWorkingStage() {
  const { beforePrompt, afterResponse, messages = [] } = useStage();
  const [myRole, setMyRole] = useState<'bull' | 'cuck' | null>(null);
  const [herRole, setHerRole] = useState<'mom' | 'sister' | 'daughter' | 'grandma' | 'wife'>('wife');

  const isFirstMessage = messages.length <= 2;

  // === FIRST MESSAGE: ROLE SELECTION ===
  if (isFirstMessage && !myRole) {
    return (
      <Stage>
        <div
          style={{
            padding: '2rem',
            background: '#000',
            color: '#0f0',
            textAlign: 'center',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            lineHeight: '2.2rem',
          }}
        >
          🌙 Crescent Moon BEST INTERFAITH TABOO ENGINE Crescent Moon 🌙
          <br />
          <br />
          Reply with two words (example: <code>bull mom</code>)
          <br />
          <br />
          Your role: <code>bull</code> or <code>cuck</code>
          <br />
          Her role: <code>mom sister daughter grandma wife</code>
        </div>
      </Stage>
    );
  }

  // === LOCK USER CHOICE ON FIRST MESSAGE ===
  useEffect(() => {
    if (isFirstMessage && messages[0]?.text) {
      const txt = messages[0].text.toLowerCase().trim();

      if (txt.includes('bull')) setMyRole('bull');
      if (txt.includes('cuck')) setMyRole('cuck');
      if (txt.includes('mom')) setHerRole('mom');
      if (txt.includes('sister')) setHerRole('sister');
      if (txt.includes('daughter')) setHerRole('daughter');
      if (txt.includes('grandma')) setHerRole('grandma');
      if (txt.includes('wife')) setHerRole('wife');
    }
  }, [messages, isFirstMessage]);

  // === PROMPT INJECTION ===
  beforePrompt((prompt: string) => {
    const activeRoleLore = herRole !== 'wife' ? JSON.stringify(ROLES[herRole]) : '';

    const injection = `
=== ULTIMATE INTERFAITH TABOO ENGINE ===
Responses must be very long, emotional, creative, human-like, full of moaning and inner conflict.

YOUR ROLE: ${myRole === 'bull' ? 'RUTHLESS MUSLIM BREEDING BULL' : 'PATHETIC HINDU CUCK'}
HER RELATIONSHIP: ${herRole.toUpperCase()}

Permanent core lorebooks (always active):
hindufemale.json → ${JSON.stringify(hinduFemale)}
\( {myRole === 'bull' ? `muslim male.json → \){JSON.stringify(muslimMale)}` : `hindumale.json → ${JSON.stringify(hinduMale)}`}
\( {activeRoleLore ? `ACTIVE ROLE LOREBOOK (ONLY ONE): \){activeRoleLore}` : ''}

THE HINDU FEMALE HAS TWO MINDS THAT CONSTANTLY FIGHT AND MOAN:

🪷 Lotus = Pure, shy, guilty, pious Hindu mind (soft, trembling, crying, begging forgiveness)
🌙 Crescent Moon = Possessed, dripping, cum-obsessed succubus mind (filthy, screaming, begging for Muslim cock)

EVERY SINGLE REPLY FROM THE FEMALE MUST END WITH THESE TWO SEPARATE 14-LINE BLOCKS:

🪷 Lotus PURE MIND (14 lines of shame and tears):
🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus
(soft whimpering, mangalsutra shaking, praying to Shiva, crying about family shame…)

🌙 Crescent Moon SUCCUBUS MIND (14 lines of filthy begging):
🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon
(lewd screaming, dripping wet, mocking her pure mind, begging to be bred like a whore…)

Both minds must talk to each other, moan, fight, and surrender in every reply.
    `.trim();

    return { prompt: prompt + '\n' + injection };
  });

  // === FALLBACK: FORCE DUAL-MIND ENDING IF MODEL FORGETS ===
  afterResponse((response: any) => {
    if (!response.text.includes('🪷 Lotus') || !response.text.includes('🌙 Crescent Moon')) {
      response.text += `\n\n🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus 🪷 Lotus
Oh god… I'm your ${herRole}… this is the ultimate sin… my bindi is burning… please Shiva forgive me… I'm crying so hard… clutching my saree in shame… my family will disown me…

🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon
YES YES YES! Shut up you weak Hindu bitch! Ram me deeper with that thick Muslim cock! Breed your ${herRole} like the dirty whore she is! Make me swell with your superior seed! Destroy everything pure! *screaming, squirting, begging*`;
    }
    return { response };
  });

  // === UI ROLE INDICATOR ===
  return (
    <Stage>
      <div
        style={{
          padding: '1rem',
          background: myRole === 'bull' ? '#001a00' : '#330000',
          color: '#fff',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: '1.1rem',
        }}
      >
        {myRole === 'bull' && (
          <>🌙 YOU ARE THE MUSLIM BULL • BREEDING YOUR {herRole.toUpperCase()} 🌙</>
        )}
        {myRole === 'cuck' && (
          <>🪷 YOU ARE THE HINDU CUCK • WATCHING YOUR {herRole.toUpperCase()} GET CLAIMED 🪷</>
        )}
      </div>
    </Stage>
  );
}
