export default function Projects() {
  // Voici un tableau contenant tes projets. Tu pourras en ajouter d'autres ici !
  const mesProjets = [
    { id: 1, titre: "Projet Hopital", description: "Une application de gestion pour un hôpital.", technos: "React, Node.js" },
    { id: 2, titre: "Site E-commerce", description: "Boutique en ligne avec panier dynamique.", technos: "JavaScript, CSS" },
    { id: 3, titre: "Application Météo", description: "Consommation d'une API externe pour la météo.", technos: "React, Fetch API" },
  ];

  return (
    <section id="projets" className="projects-section">
      <h2>Mes Projets</h2>
      <div className="projects-grid">
        {mesProjets.map((projet) => (
          <div key={projet.id} className="project-card">
            <h3>{projet.titre}</h3>
            <p>{projet.description}</p>
            <span className="tech-badge">{projet.technos}</span>
          </div>
        ))}
      </div>
    </section>
  );
}