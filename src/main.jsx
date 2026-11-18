

import React, { useEffect, useState } from "react";
import "./style.css";

export default function App() {
  const [projects, setProjects] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("animeProjects")) || [];
    } catch {
      return [];
    }
  });

  const [showCreate, setShowCreate] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    localStorage.setItem("animeProjects", JSON.stringify(projects));
  }, [projects]);

  function createProject(e) {
    e.preventDefault();
    if (!projectName.trim()) return;

    const project = {
      id: Date.now(),
      name: projectName.trim(),
      created: new Date().toLocaleDateString(),
      description: "Your new anime production"
    };

    setProjects(previous => [...previous, project]);
    setProjectName("");
    setShowCreate(false);
  }

  function deleteProject(id) {
    if (!window.confirm("Delete this project?")) return;
    setProjects(previous => previous.filter(p => p.id !== id));
    setActiveProject(null);
  }

  const styles = `
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #0b0b13;
      color: #f5f0ff;
      font-family: Arial, sans-serif;
    }
    button, input { font: inherit; }
    button { cursor: pointer; }
    .app { min-height: 100vh; }
    .topbar {
      height: 76px;
      padding: 0 5%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #292439;
      background: #11101b;
    }
    .logo { font-size: 23px; font-weight: 800; color: #d5a2ff; }
    .logo span { color: white; }
    .profile { color: #b9b0c9; font-size: 13px; }
    .hero {
      padding: 65px 7% 35px;
      background: radial-gradient(ellipse at top right,#38204f,#151222 55%,#0b0b13);
    }
    .hero h1 { font-size: clamp(32px,5vw,52px); margin: 0 0 12px; }
    .hero p { color: #bcb2cc; line-height: 1.7; }
    .accent { color: #d5a2ff; }
    .content { max-width: 1200px; margin: auto; padding: 35px 5%; }
    .sectionhead {
      display: flex; justify-content: space-between;
      align-items: center; gap: 15px; flex-wrap: wrap;
    }
    .sectionhead h2 { font-size: 24px; }
    .primary {
      border: 0; border-radius: 9px; padding: 13px 20px;
      background: #a855f7; color: white; font-weight: bold;
    }
    .primary:hover { background: #9333ea; }
    .grid {
      display: grid; grid-template-columns: repeat(auto-fill,minmax(230px,1fr));
      gap: 20px; margin-top: 25px;
    }
    .project {
      border: 1px solid #332943; border-radius: 13px;
      background: #171421; padding: 20px;
    }
    .project:hover { border-color: #a855f7; }
    .projectart {
      height: 115px; border-radius: 9px; display: grid;
      place-items: center; font-size: 42px;
      background: linear-gradient(135deg,#36204e,#191b35);
      margin-bottom: 17px;
    }
    .project h3 { margin: 0 0 8px; }
    .muted { color: #a89eb8; font-size: 13px; }
    .actions { display: flex; gap: 9px; margin-top: 18px; }
    .secondary, .danger {
      border: 1px solid #514363; border-radius: 7px;
      padding: 9px 13px; color: white; background: #252033;
    }
    .danger { border-color: #713c52; color: #ff9bb5; }
    .empty {
      text-align: center; padding: 65px 15px;
      border: 1px dashed #514363; border-radius: 13px;
      color: #bcb2cc; margin-top: 25px;
    }
    .empty .symbol { font-size: 48px; }
    .modal {
      position: fixed; inset: 0; z-index: 5;
      background: #000b; display: grid; place-items: center;
      padding: 20px;
    }
    .dialog {
      width: 100%; max-width: 430px; padding: 28px;
      background: #1b1728; border: 1px solid #57416e;
      border-radius: 15px;
    }
    .dialog h2 { margin-top: 0; }
    .dialog input {
      width: 100%; padding: 13px; margin: 12px 0 20px;
      background: #100e18; color: white;
      border: 1px solid #57416e; border-radius: 8px;
    }
    .dialogbuttons { display: flex; gap: 10px; }
    .editor { padding: 45px 7%; }
    .editorpanel {
      background: #171421; padding: 25px;
      border: 1px solid #393047; border-radius: 12px;
      margin-top: 25px;
    }
    .back { background: none; border: 0; color: #d5a2ff; padding: 0; }
    footer { text-align: center; padding: 35px; color: #82788f; font-size: 13px; }
    @media(max-width:600px) {
      .topbar { padding: 0 4%; }
      .hero { padding: 45px 5% 25px; }
      .content { padding: 25px 4%; }
    }
  `;

  return (
    <div className="app">
      <style>{styles}</style>
      <header className="topbar">
        <div className="logo">ANIME<span> STUDIO</span></div>
        <div className="profile">CREATOR WORKSPACE</div>
      </header>

      {activeProject ? (
        <main className="editor">
          <button className="back" onClick={() => setActiveProject(null)}>
            ← Back to projects
          </button>
          <h1>{activeProject.name}</h1>
          <p className="muted">Anime production workspace</p>
          <div className="editorpanel">
            <h2>Welcome to your project</h2>
            <p>Your project has been created and saved.</p>
            <p>Character creation, drawing and animation tools will be added in upcoming development stages.</p>
            <button className="danger" onClick={() => deleteProject(activeProject.id)}>
              Delete project
            </button>
          </div>
        </main>
      ) : (
        <>
          <section className="hero">
            <p className="accent">YOUR CREATIVE UNIVERSE</p>
            <h1>Bring Your Anime <span className="accent">To Life.</span></h1>
            <p>Create original worlds, characters and stories.<br />
              Your imagination is the beginning of everything.</p>
          </section>

          <main className="content">
            <div className="sectionhead">
              <div>
                <h2>My Projects</h2>
                <p className="muted">Your anime productions in one place.</p>
              </div>
              <button className="primary" onClick={() => setShowCreate(true)}>
                + Create New Project
              </button>
            </div>

            {projects.length === 0 ? (
              <div className="empty">
                <div className="symbol">🎬</div>
                <h2>Your studio is waiting.</h2>
                <p>Create your first anime project to get started.</p>
                <button className="primary" onClick={() => setShowCreate(true)}>
                  Create Your First Project
                </button>
              </div>
            ) : (
              <div className="grid">
                {projects.map(project => (
                  <article className="project" key={project.id}>
                    <div className="projectart">🎨</div>
                    <h3>{project.name}</h3>
                    <p className="muted">Created: {project.created}</p>
                    <div className="actions">
                      <button className="primary" onClick={() => setActiveProject(project)}>
                        Open Project
                      </button>
                      <button className="danger" onClick={() => deleteProject(project.id)}>
                        Delete
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {showCreate && (
        <div className="modal" onClick={() => setShowCreate(false)}>
          <form className="dialog" onSubmit={createProject} onClick={e => e.stopPropagation()}>
            <h2>Create New Project</h2>
            <p className="muted">Give your new anime production a name.</p>
            <input
              autoFocus
              placeholder="Enter your anime project name"
              value={projectName}
              onChange={e => setProjectName(e.target.value)}
              maxLength={60}
              required
            />
            <div className="dialogbuttons">
              <button className="primary" type="submit">Create Project</button>
              <button className="secondary" type="button" onClick={() => setShowCreate(false)}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <footer>ANIME STUDIO · YOUR WORLD, YOUR CREATIONS</footer>
    </div>
  );
}
