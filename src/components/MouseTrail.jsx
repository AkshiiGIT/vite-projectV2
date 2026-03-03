import React, { useRef, useEffect } from 'react';

const MouseTrail = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]); 

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Ajuster la taille du canvas à la fenêtre
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Taille initiale

    // Fonction pour ajouter une particule
    const addParticle = (x, y) => {
        // Les 2 couleurs néon principales de ta vidéo
        const neonColors = [
          'rgba(0, 255, 255, 0.8)', // Turquoise néon (Cyan)
          'rgba(255, 0, 255, 0.8)'  // Rose néon (Magenta)
        ];
        
        // Choisir une couleur au hasard parmi les 2
        const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];

        particlesRef.current.push({
            x, y,
            size: Math.random() * 8 + 3, // Particules un peu plus grandes pour un meilleur effet de lueur
            speedX: (Math.random() - 0.5) * 2,
            speedY: (Math.random() - 0.5) * 2,
            baseColor: randomColor, 
            fadeSpeed: 0.02, 
            life: 1 
        });
    };

    // Gérer le mouvement de la souris
    const handleMouseMove = (event) => {
        addParticle(event.clientX, event.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    // Boucle d'animation principale
    const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
        ctx.fillStyle = 'transparent'; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Mettre à jour et dessiner chaque particule
        for (let i = particlesRef.current.length - 1; i >= 0; i--) {
            const particle = particlesRef.current[i];
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            particle.life -= particle.fadeSpeed; 
            particle.size *= 0.99; 

            if (particle.life <= 0 || particle.size < 0.2) {
                particlesRef.current.splice(i, 1); 
                continue;
            }

            // Dessiner la particule avec la bonne couleur et la bonne opacité
            // On utilise globalAlpha pour gérer l'opacité au fil du temps
            ctx.globalAlpha = particle.life; 
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            
            // On applique la couleur néon
            ctx.fillStyle = particle.baseColor; 
            ctx.fill();
            
            ctx.globalAlpha = 1; // On remet l'opacité par défaut pour le reste
        }

        // Limiter le nombre de particules
        if (particlesRef.current.length > 250) {
            particlesRef.current.shift(); 
        }

        animationFrameId = requestAnimationFrame(animate); 
    };

    animate(); 

    // Nettoyage
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); 

  return <canvas ref={canvasRef} className="mouse-trail-canvas" />;
};

export default MouseTrail;