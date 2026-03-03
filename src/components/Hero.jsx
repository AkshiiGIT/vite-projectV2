import { useState } from 'react';
import GarageScene from './GarageScene';

export default function Hero() {
  const [activeInfo, setActiveInfo] = useState(null);

  const closeModal = () => setActiveInfo(null);

  return (
    <>
      {/* La scène 3D en plein écran */}
      <GarageScene onBubbleClick={setActiveInfo} />

      {/* La Fenêtre Popup en verre dépoli */}
      <div className={`modal-overlay ${activeInfo ? 'active' : ''}`} onClick={closeModal}>
        <div className="modal-card" onClick={(e) => e.stopPropagation()}>
          <button className="close-btn" onClick={closeModal}>✕</button>
          
          {activeInfo && (
            <>
              <h2>{activeInfo.title}</h2>
              <div className="modal-body">{activeInfo.content}</div>
            </>
          )}
        </div>
      </div>
    </>
  );
}