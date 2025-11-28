// src/Stage.tsx
import React from 'react';
import { StageBase } from '@chub-ai/stages-ts';  // ← FIXED: Use StageBase (exported in package); messages via props

type MyRole = 'bull' | 'cuck' | null;
type HerRole = 'mom' | 'sister' | 'daughter' | 'grandma' | 'wife';

export default class CrescentMoonEngine extends StageBase {
  constructor(props: any) {
    super(props);
    this.state = {
      myRole: null as MyRole,
      herRole: 'wife' as HerRole,
    };
  }

  componentDidUpdate(prevProps: any) {
    const { messages = [] } = this.props;
    if (messages.length >= 1 && messages[0]?.role === 'user' && this.state.myRole === null) {
      const text = messages[0].content.toLowerCase().trim();

      let newMyRole: MyRole = null;
      if (text.includes('bull')) {
        newMyRole = 'bull';
      } else if (text.includes('cuck')) {
        newMyRole = 'cuck';
      }

      let newHerRole: HerRole = 'wife';
      if (text.includes('mom')) newHerRole = 'mom';
      else if (text.includes('sister')) newHerRole = 'sister';
      else if (text.includes('daughter')) newHerRole = 'daughter';
      else if (text.includes('grandma')) newHerRole = 'grandma';
      else if (text.includes('wife')) newHerRole = 'wife';

      if (newMyRole !== null || newHerRole !== 'wife') {
        this.setState({ myRole: newMyRole, herRole: newHerRole });
      }
    }
  }

  render() {
    const { messages = [] } = this.props;
    const { myRole, herRole } = this.state;
    const showRolePicker = messages.length === 0 && myRole === null;

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
}
