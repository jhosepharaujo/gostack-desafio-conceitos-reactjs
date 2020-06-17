import React from "react";
import api from './services/api'
import "./styles.css";
import { useState, useEffect } from "react";



function App() {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    api.get('repositories').then(response => {
      setProjects(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: `Repository ${Date.now()}`,
      url : "https://github.com/Rocketseat/gostack-template-conceitos-reactjs",
      techs : ["JavaScript","ReactJS"]
    })

    setProjects([...projects, response.data])
  }

  async function handleRemoveRepository(id) {
    api.delete(`repositories/${id}`).then(response=> {
      const projecstFiltered = projects.filter(project => project.id != id)
      setProjects(projecstFiltered)
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {projects.map(project => (
          <li key={project.id}>
            {project.title}
            <button onClick={() => handleRemoveRepository(project.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
