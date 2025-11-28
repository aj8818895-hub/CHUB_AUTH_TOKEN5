// src/Stage.tsx
import React, { useState, useEffect } from 'react';
import { Stage, useStage } from '@chub-ai/stages-ts';

import hinduFemale from './assets/hindufemale.json';
import muslimMale from './assets/muslimmale.json'; // Fixed space in filename - rename file to 'muslimmale.json'
import hinduMale from './assets/hindumale.json';
import mom from './assets/momson.json';
import sister from './assets/sisterbrother.json';
import daughter from './assets/daughterfather.json';
import grandma from './assets/grammaboy.json';

const FAMILY_ROLES = { mom, sister, daughter, grandma } as const;

type MyRole = 'bull' | 'cuck' | null;
type HerRole = 'mom' | 'sister' | 'daughter' | 'grandma' | 'wife';

export default function CrescentMoonEngine() {
  const { beforePrompt, afterResponse, messages = [] } = useStage();

  const [myRole, setMyRole] = useState<MyRole>(null);
  const [herRole, setHerRole] = useState<HerRole>('wife');

  // Show role picker only on initial load (no messages, no choice made)
  const showRolePicker = messages.length === 0 && myRole === null;

  // Parse and lock user's first message choice (runs once)
  useEffect(() => {
    if (messages.length >= 1 && messages[0]?.role === 'user' && myRole === null) {
      const text = messages[0].text.toLowerCase().trim();
      let roleSet = false;

      if (text.includes('bull')) {
        setMyRole('bull');
        roleSet = true;
      } else if (text.includes('cuck')) {
        setMyRole('cuck');
        roleSet = true;
      }

      if (text.includes('mom')) setHerRole('mom');
      else if (text.includes('sister')) setHerRole('sister');
      else if (text.includes('daughter')) setHerRole('daughter');
      else if (text.includes('grandma')) setHerRole('grandma');
      else if (text.includes('wife')) setHerRole('wife');

      // Optional: Reset if no valid choice (but let user retry)
      if (!roleSet && messages.length === 1) {
        // Could add error handling here, but for now, wait for valid input
      }
    }
  }, [messages]); // Removed myRole from deps to prevent loops

  // ROLE SELECTION SCREEN (only shows once)
  if (showRolePicker) {
    return (
      <Stage>
        <div
          style={{
            padding: '3rem 2rem',
            background: '#000',
            color: '#0f0',
            textAlign: 'center',
            fontFamily: 'monospace',
            fontSize: '1.4rem',
            lineHeight: '2.4rem',
          }}
        >
          <span>Crescent Moon Crescent Moon Crescent Moon Crescent Moon</span>
          <br />
          <span>Crescent Moon Crescent Moon Crescent Moon Crescent Moon</span>
          <br />
          <span>Crescent Moon Crescent Moon</span>
          <br />
          <br />
          <strong>ULTIMATE INTERFAITH TABOO ENGINE</strong>
          <br />
          <br />
          Reply with exactly two words (example: {' '}
          <code style={{ color: '#0f0' }}>bull mom</code>
          )
          <br />
          <br />
          Your role → <code>bull</code> or <code>cuck</code>
          <br />
          Her role →{' '}
          <code>mom</code> <code>sister</code> <code>daughter</code>{' '}
          <code>grandma</code> <code>wife</code>
          <br />
          <br />
          <span>Crescent Moon Crescent Moon Crescent Moon Crescent Moon</span>
          <br />
          <span>Crescent Moon Crescent Moon Crescent Moon Crescent Moon</span>
          <br />
          <span>Crescent Moon Crescent Moon</span>
        </div>
      </Stage>
    );
  }

  // PROMPT INJECTION (applies after choice is locked)
  beforePrompt((prompt: string) => {
    const familyLore = herRole !== 'wife' ? JSON.stringify(FAMILY_ROLES[herRole]) : '';

    const lotusRepeat = 'Lotus '.repeat(14).trim();
    const crescentRepeat = 'Crescent Moon '.repeat(14).trim();

    const injection = `
=== ULTIMATE INTERFAITH TABOO ENGINE v2 ===
You are roleplaying extreme religious/interfaith taboo with intense inner conflict.
Responses must be extremely long, emotional, raw, human-like, dripping with guilt and lust.

YOUR ROLE: ${myRole === 'bull' ? 'RUTHLESS MUSLIM BREEDING BULL' : 'PATHETIC HINDU CUCKOLD'}
HER RELATIONSHIP TO USER: ${herRole.toUpperCase()}

CORE LOREBOOKS (always active):
hindufemale.json → ${JSON.stringify(hinduFemale)}
\( {myRole === 'bull' ? `muslimmale.json → \){JSON.stringify(muslimMale)}` : `hindumale.json → ${JSON.stringify(hinduMale)}`}
\( {familyLore ? `FAMILY TABOO LOREBOOK → \){familyLore}` : ''}

THE HINDU WOMAN HAS TWO MINDS THAT CONSTANTLY FIGHT:

Lotus = Pure, pious, shy, guilt-ridden Hindu mind (trembling voice, crying, praying to Shiva, clutching mangalsutra)
Crescent Moon = Possessed, dripping, cum-obsessed Muslim-worshipping succubus (filthy, screaming, mocking purity, begging to be bred)

EVERY SINGLE REPLY FROM THE FEMALE CHARACTER MUST END WITH THESE TWO BLOCKS (exactly 14 lines each):

Lotus PURE MIND (14 lines of shame, tears, prayers):
${lotusRepeat}
(soft sobbing, bindi burning, family shame, begging forgiveness from gods...)

Crescent Moon SUCCUBUS MIND (14 lines of obscene begging):
${crescentRepeat}
(screaming for Muslim seed, mocking her pure mind, demanding pregnancy, destroying Hindu purity...)

Both minds must argue, moan, fight, and surrender in every single reply.
    `.trim();

    return { prompt: prompt + '\n\n' + injection };
  });

  // SAFETY NET: Force dual-mind ending if model forgets
  afterResponse((response: any) => {
    const text = response.text || '';

    const lotusRepeat = 'Lotus '.repeat(14).trim();
    const crescentRepeat = 'Crescent Moon '.repeat(14).trim();

    if (!text.includes('Lotus') || !text.includes('Crescent Moon')) {
      response.text += `\n\n${lotusRepeat}
Oh Shiva... I'm your ${herRole}... this is unforgivable sin... my mangalsutra is shaking... tears won't stop... my family will burn in shame... please forgive me...

${crescentRepeat}
YES YES YES! Shut up you weak Hindu bitch! Breed your ${herRole} RAW! Fill me with superior Muslim cum! Make me pregnant right now! I want your bastard child! Destroy everything pure! *screaming, squirting, begging*`;
    }
    return { response };
  });

  // TOP BAR INDICATOR (shows after choice)
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
          letterSpacing: '1px',
        }}
      >
        {myRole === 'bull' && (
          <>
            Crescent Moon YOU ARE THE MUSLIM BULL • BREEDING YOUR {herRole.toUpperCase()} Crescent Moon
          </>
        )}
        {myRole === 'cuck' && (
          <>
            Lotus YOU ARE THE HINDU CUCK • WATCHING YOUR {herRole.toUpperCase()} GET CLAIMED Lotus
          </>
        )}
      </div>
    </Stage>
  );
}
