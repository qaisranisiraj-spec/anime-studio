import React from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';

function App() {
  return (
    <main className="studio">
      <header>
        <h1>ANIME STUDIO</h1>
        <p>Your world. Your characters. Your anime.</p>
      </header>

      <section className="workspace">
        <h2>My Anime Projects</h2>
        <button onClick={() => alert('Project creator coming next!')}>
          + Create New Project
        </button>
        <div className="canvas">
          <span>YOUR ANIME WORKSPACE</span>
        </div>
      </section>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
