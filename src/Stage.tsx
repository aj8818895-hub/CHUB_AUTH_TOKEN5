// src/Stage.tsx
import React, { useState, useEffect } from 'react';
import { useStage } from '@chub-ai/stages-ts';  // ← FIXED: Revert to useStage (pre-refactor hook); confirm export in package

// Only import used ones; fix paths to root + casing
import mom from '../momson.json';
import sister from '../sisterbrother.json';
import daughter from '../daughterfather.json';
import grandma from '../granmaboy.json';

const FAMILY_ROLES = { mom, sister, daughter, grandma } as const;  // Kept for now; remove if unused

type MyRole = 'bull' | 'cuck' | null;
type HerRole = 'mom' | 'sister' | 'daughter' | 'grandma' | 'wife';

export default function CrescentMoonEngine() {
  // ← FIXED: useStage instead of useChatContext
  const { messages = [] } = useStage();  // Assuming it returns { messages }; adjust if props differ

  const [myRole, setMyRole] = useState<MyRole>(null);
  const [herRole, setHerRole] = useState<HerRole>('wife');

  const showRolePicker = messages.length === 0 && myRole === null;

  useEffect(() => {
    if (messages.length >= 1 && messages[0]?.role === 'user' && myRole === null) {
      const text = messages[0].content.toLowerCase().trim();
      let roleSet = false;  // Unused var; can remove if not needed elsewhere

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
    }
  }, [messages, myRole]);  // ← FIXED: Remove myRole dep if it causes loops (useState stable)

  if (showRolePicker) {
    return (
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
        <span>🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙</span>
        <br />
        <br />
        <strong>ULTIMATE INTERFAITH TABOO ENGINE</strong>
        <br />
        <br />
        Reply with exactly two words (example: <code style={{ color: '#0f0' }}>bull mom</code>)
        <br />
        <br />
        Your role → <code>bull</code> or <code>cuck</code>
        <br />
        Her role → <code>mom sister daughter grandma wife</code>
        <br />
        <br />
        <span>🌙 Crescent Moon 🌙 Crescent Moon 🌙 Crescent Moon 🌙</span>
      </div>
    );
  }

  return (
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
          🌙 YOU ARE THE MUSLIM BULL • BREEDING YOUR {herRole.toUpperCase()} 🌙
        </>
      )}
      {myRole === 'cuck' && (
        <>
          🪷 YOU ARE THE HINDU CUCK • WATCHING YOUR {herRole.toUpperCase()} GET CLAIMED 🪷
        </>
      )}
    </div>
  );
}
