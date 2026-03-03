import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, Html, ContactShadows } from '@react-three/drei'
import { Suspense } from 'react'

// --- 1. La Bulle Interactive ---
function Annotation({ position, title, subtitle, onClick }) {
  return (
    <Html position={position} center className="annotation">
      <div className="bubble-container">
        <div className="bubble-content" onClick={onClick}>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
        <div className="connector"></div>
        <div className="dot"></div>
      </div>
    </Html>
  )
}

// --- 2. Le Showroom Model ---
function ShowroomModel() {
  const { scene } = useGLTF('/showroom.glb')
  return (
    <primitive object={scene} scale={1} position={[0, -1.21, 0]} />
  )
}

// --- 3. La voiture et ses 4 Bulles ---
function CarModel({ onBubbleClick }) {
  const { scene } = useGLTF('/voiture.glb')
  
  return (
    <group position={[0, -1.2, 0]}>
      <primitive object={scene} scale={1} />
      
      {/* BULLE 1 : À PROPOS */}
      <Annotation 
        position={[1.1, 0.7, 0.2]} 
        title="À propos" 
        subtitle="Mon parcours" 
        onClick={() => onBubbleClick({
          title: "Qui suis-je ?",
          content: (
            <div className="about-content">
              <img src="/profil.png" alt="Photo de profil Akasche" className="profile-pic" />
              <div>
                <p>Passionné par l'automobile et le développement web, je conçois des interfaces sur-mesure et interactives.</p>
                <br/>
                <p>Mon objectif : allier la performance technique (le moteur) à un design minimaliste et élégant (la carrosserie), pour offrir la meilleure expérience utilisateur possible.</p>
              </div>
            </div>
          )
        })} 
      />

      {/* BULLE 2 : COMPÉTENCES */}
      <Annotation 
        position={[0.5, 0.8, 2.0]} 
        title="Sous le capot" 
        subtitle="Mes compétences" 
        onClick={() => onBubbleClick({
          title: "Mon Moteur",
          content: (
            <div>
              <p style={{ marginBottom: '1rem' }}>Voici les technologies que j'utilise au quotidien pour construire mes projets :</p>
              <div className="skills-container">
                <span className="skill-badge">HTML5 & CSS3</span>
                <span className="skill-badge">JavaScript (ES6+)</span>
                <span className="skill-badge">React.js</span>
                <span className="skill-badge">Three.js / 3D Web</span>
                <span className="skill-badge">Tailwind CSS</span>
                <span className="skill-badge">Git & GitHub</span>
                <span className="skill-badge">Figma</span>
              </div>
            </div>
          )
        })} 
      />
      
      {/* BULLE 3 : PROJETS */}
      <Annotation 
        position={[0, 0.7, -2.1]} 
        title="Projets" 
        subtitle="Mes réalisations" 
        onClick={() => onBubbleClick({
          title: "Mes Expériences",
          content: (
            <ul className="project-list">
              <li>
                <strong>Ce Portfolio 3D</strong>
                Showroom interactif réalisé avec React et Three.js pour présenter mes compétences sous un nouvel angle.
              </li>
              <li>
                <strong>Application Web Santé</strong>
                Interface d'administration fluide et sécurisée pour la gestion de données médicales.
              </li>
              <li>
                <strong>E-commerce "Fast-UI"</strong>
                Boutique en ligne optimisée pour la conversion avec des temps de chargement records.
              </li>
            </ul>
          )
        })} 
      />

      {/* BULLE 4 : CONTACT */}
      <Annotation 
        position={[0, 1.4, -0.2]} 
        title="Contact" 
        subtitle="Me joindre" 
        onClick={() => onBubbleClick({
          title: "Démarrons un projet",
          content: (
            <div style={{ textAlign: 'center', marginTop: '1rem' }}>
              <p style={{ marginBottom: '2rem' }}>Vous cherchez un développeur motivé pour votre prochaine application Web ? Mon moteur est chaud !</p>
              <a href="mailto:ton.email@gmail.com" className="btn-primary">
                Envoyer un message
              </a>
            </div>
          )
        })} 
      />
    </group>
  )
}

// --- 4. La Scène Principale ---
export default function GarageScene({ onBubbleClick }) {
  return (
    <div className="garage-container">
      <Canvas 
        camera={{ position: [5, 1, 0], fov: 45 }}
        gl={{ 
          toneMapping: THREE.ACESFilmicToneMapping, 
          toneMappingExposure: 1.6 
        }}
      >
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={2.0} color="#ffffff" />
        <directionalLight position={[5, 15, 5]} intensity={5} />
        <directionalLight position={[-5, 15, -5]} intensity={3} />
        
        <Environment preset="apartment" />
        
        <Suspense fallback={null}>
          <ShowroomModel />
          <CarModel onBubbleClick={onBubbleClick} />
          <ContactShadows position={[0, -1.2, 0]} opacity={0.8} scale={12} blur={2.5} far={4} color="#000000" />
        </Suspense>

        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 2.3} 
          maxPolarAngle={Math.PI / 2.1} 
          minDistance={4}
          maxDistance={8} 
        />
      </Canvas>
    </div>
  )
}