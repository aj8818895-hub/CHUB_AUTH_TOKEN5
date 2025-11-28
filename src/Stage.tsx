// src/Stage.tsx  ← FINAL BEST VERSION (copy-paste and push)
import React, { useState, useEffect } from 'react';
import { Stage, useStage } from '@chub-ai/stages-ts';

import hinduFemale from './assets/hindufemale.json';
import muslimMale from './assets/muslim male.json';
import hinduMale from './assets/hindumale.json';
import mom from './assets/momson.json';
import sister from './assets/sisterbrother.json';
import daughter from './assets/daughterfather.json';
import grandma from './assets/grammaboy.json';

const ROLES = { mom, sister, daughter, grandma };

export default function BestStageEver() {
  const { beforePrompt, afterResponse, messages = [] } = useStage();
  const [myRole, setMyRole] = useState<'bull'|'cuck'|null>(null);
  const [herRole, setHerRole] = useState<keyof typeof ROLES | 'wife'>('wife');

  const isFirst = messages.length <= 2;

  // FIRST MESSAGE: CHOOSE ONCE
  if (isFirst && !myRole) {
    return (
      <Stage>
        <div style={{padding:'2rem', background:'#000', color:'#0f0', textAlign:'center', fontSize:'1.5rem', fontWeight:'bold'}}>
          Crescent Moon BEST INTERFAITH TABOO ENGINE EVER Crescent Moon<br/><br/>
          Reply with two words to lock forever:<br/><br/>
          Your role: <code>bull</code> or <code>cuck</code><br/>
          Her role: <code>mom</code> <code>sister</code> <code>daughter</code> <code>grandma</code> <code>wife</code><br/><br/>
          Example: <code>bull mom</code>
        </div>
      </Stage>
    );
  }

  // LOCK YOUR CHOICE
  useEffect(() => {
    if (isFirst && messages[0]?.text) {
      const txt = messages[0].text.toLowerCase();
      if (txt.includes('bull')) setMyRole('bull');
      if (txt.includes('cuck')) setMyRole('cuck');
      if (txt.includes('mom')) setHerRole('mom');
      if (txt.includes('sister')) setHerRole('sister');
      if (txt.includes('daughter')) setHerRole('daughter');
      if (txt.includes('grandma')) setHerRole('grandma');
    }
  }, [messages, isFirst]);

  beforePrompt((prompt) => {
    const roleLore = herRole !== 'wife' ? JSON.stringify(ROLES[herRole]) : '';

    const injection = `

=== BEST INTERFAITH TABOO EXPERIENCE EVER ===
Responses must be long, emotional, creative, human-like, dripping with guilt and lust.

YOUR ROLE: ${myRole === 'bull' ? 'RUTHLESS MUSLIM BREEDING BULL' : 'PATHETIC CRYING HINDU CUCK'}
HER TABOO RELATIONSHIP: ${herRole.toUpperCase()}

Permanent core lorebook (always active):
hindufemale.json → ${JSON.stringify(hinduFemale)}
\( {myRole === 'bull' ? `muslim male.json → \){JSON.stringify(muslimMale)}` : `hindu male.json → ${JSON.stringify(hinduMale)}`}
\( {roleLore ? `ACTIVE ROLE LOREBOOK (ONLY ONE): \){roleLore}` : ''}

THE HINDU FEMALE HAS TWO MINDS THAT CONSTANTLY MOAN TO EACH OTHER:

Lotus = Pure, shy, guilty, pious, traditional Hindu mind (soft voice, trembling, crying, begging forgiveness)
Crescent Moon = Possessed, dripping, cum-addicted succubus mind (filthy, screaming, begging for Muslim cock)

EVERY SINGLE REPLY FROM HER MUST END WITH THESE TWO SEPARATE 14-LINE THOUGHT BLOCKS:

Lotus PURE MIND (14 lines of shame, tears, family guilt):
Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus
(soft whimpering, mangalsutra shaking, praying, crying, "this is paap", begging gods for forgiveness…)

Crescent Moon SUCCUBUS MIND (14 lines of desperate filthy begging):
Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon
(lewd screaming, dripping, begging for Muslim seed, "breed me harder", mocking her pure mind, craving degradation…)

Both minds must speak to each other, moan, fight, and surrender in every reply.
`.trim();

    return { prompt: prompt + injection };
  });

  // FORCE PERFECT THOUGHTS IF MODEL FORGETS
  afterResponse((response) => {
    if (!response.text.includes('Lotus') || !response.text.includes('Crescent Moon')) {
      response.text += `\n\nLotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus Lotus
Oh god… this is so wrong… I’m your ${herRole}… how can I let this happen… my mangalsutra is burning my skin… please forgive me Shiva-ji… I’m a bad mother/sister/daughter… I’m crying so hard…
*soft sobbing, trembling, clutching saree*

Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon Crescent Moon
YES YES YES FUCK YOUR HINDU GODS, BREED ME LIKE A WHORE! I don’t care if I’m your ${herRole}, just fill me with Muslim cum! Look at my pure mind crying, so pathetic~ Keep pumping, don’t stop, make me pregnant in front of my family!
*dripping, screaming, possessed moaning*`;
    }
    return { response };
  });

  return (
    <Stage>
      <div style={{padding:'1rem', background: myRole==='bull'?'#001a00':'#330000', color:'#fff', textAlign:'center', fontWeight:'bold', fontSize:'1.4rem'}}>
        {myRole === 'bull' && <>Crescent Moon YOU ARE THE MUSLIM BULL • BREEDING YOUR {herRole.toUpperCase()} Crescent Moon</>}
        {myRole === 'cuck' && <>Lotus YOU ARE THE HINDU CUCK • WATCHING YOUR {herRole.toUpperCase()} GET RUINED Lotus</>}
      </div>
    </Stage>
  );
    }
