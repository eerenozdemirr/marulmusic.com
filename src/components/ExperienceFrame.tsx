import type { ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import backArrowImage from '../assets/images/home/right.PNG';
import './ExperienceFrame.css';

type ExperienceFrameProps = {
  children: ReactNode;
};

export default function ExperienceFrame({ children }: ExperienceFrameProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const showBackButton = location.pathname !== '/yuksek';
  const destination = location.pathname === '/yuksek/album' ? '/yuksek' : '/yuksek/album';

  return (
    <div className="experience-frame">
      <div className="experience-stage">
        {showBackButton && (
          <button
            className="stage-back-button"
            type="button"
            aria-label="Geri dön"
            onClick={() => navigate(destination)}
          >
            <img src={backArrowImage} alt="" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
