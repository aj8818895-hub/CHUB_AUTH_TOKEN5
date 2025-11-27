import { useEffect, useState } from 'react';
import './Index.scss';

interface Particle { id: number; x: number; y: number; vy: number; life: number; emoji: string; }

export default function Stage() {
  const [corruption, setCorruption] = useState(0);
  const [cucks, setCucks] = useState(0);
  const [risk, setRisk] = useState(0);
  const [alert, setAlert] = useState('');
  const [particles, setParticles] = useState<Particle[]>([]);

  const spawn = (n: number, holy = false) => {
    const p: Particle[] = [];
    for (let i = 0; i < n; i++) {
      p.push({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: -100,
        vy: Math.random() * 8 + 6,
        life: 1,
        emoji: holy ? '☪' : 'sperm',
      });
    }
    setParticles(prev => [...prev, ...p]);
  };

  useEffect(() => {
    const t = setInterval(() => {
      setParticles(prev => prev
        .map(p => ({ ...p, y: p.y + p.vy, life: p.life - 0.015 }))
        .filter(p => p.life > 0)
      );
    }, 16);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (corruption > 20 && corruption < 100) {
      const t = setInterval(() => {
        if (Math.random() < 0.3) {
          setAlert(['Hindu BF calling!', 'Parents coming!', 'Temple crowd!'][Math.floor(Math.random()*3)]);
          setRisk(95);
          spawn(30);
        }
      }, 14000);
      return () => clearInterval(t);
    }
  }, [corruption]);

  const savior = () => {
    setAlert('Step-brother saved her ☪');
    setRisk(0);
    setCorruption(c => Math.min(100, c + 20));
    setCucks(v => v + 1);
    spawn(120, true);
  };

  const act = (boost: number, sperm: number, holy = false) => {
    spawn(sperm, holy);
    setCorruption(c => Math.min(100, c + boost));
    setRisk(r => Math.min(100, r + 12));
  };

  return (
    <div className="stage-container">

      {particles.map(p => (
        <div key={p.id} className="seed" style={{
          left: p.x - 30,
          top: p.y,
          opacity: p.life,
          filter: p.emoji === '☪' ? 'drop-shadow(0 0 20px #00ff00)' : 'none',
        }}>
          {p.emoji}
        </div>
      ))}

      <h1>
        <span style={{opacity:1-corruption/100, color:'#ff4400'}}>Hindu Step-Sister</span>{' '}
        <span style={{opacity:corruption/100}}>Muslim Breeding Slave ☪</span>
      </h1>

      <div style={{textAlign:'center', fontSize:'1.6rem'}}>
        Corruption {corruption}% • Cucks {cucks} • Risk {risk}%
        <div style={{width:'90%', height:30, background:'#000', margin:'15px auto', border:'4px solid #00ff00', borderRadius:15}}>
          <div style={{width:`${corruption}%`, height:'100%', background:'linear-gradient(90deg,#ff4400,#00ff00)'}}/>
        </div>

        {risk > 80 && (
          <>
            <div style={{color:'#ff0000', fontSize:'2.2rem'}}>⚠ {alert} ⚠</div>
            <button className="btn-jihad" style={{fontSize:'1.8rem', padding:20}} onClick={savior}>
              STEP-BROTHER SAVES HER ☪
            </button>
          </>
        )}
      </div>

      <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:12, padding:20}}>
        <button className="btn-jihad" onClick={()=>act(12,50)}>Deepthroat</button>
        <button className="btn-jihad" onClick={()=>act(15,60)}>Titfuck</button>
        <button className="btn-jihad" onClick={()=>act(20,80)}>Anal Only</button>
        <button className="btn-jihad" onClick={()=>act(35,150,true)}>CREAMPIE FLOOD ☪</button>
        <button className="btn-jihad" onClick={()=>act(25,100,true)}>Force Hijab</button>
        <button className="btn-jihad" onClick={()=>act(40,200,true)}>Make Her Say Shahada</button>
        <button className="btn-jihad" onClick={()=>act(30,120)}>Public Free-Use</button>
        <button className="btn-jihad" onClick={()=>{setCorruption(100); spawn(300,true);}}>
          Final Mosque Gang-Breeding
        </button>
      </div>

      <div className="footer-conquest">
        {cucks} Hindu males permanently cucked ☪ • Bloodline erased
      </div>
    </div>
  );
}
