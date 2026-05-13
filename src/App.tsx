import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import SoundControl from './components/SoundControl';
import ExperienceFrame from './components/ExperienceFrame';

const Home = lazy(() => import('./Home'));
const Yuksek = lazy(() => import('./Yuksek'));
const Yuksegim = lazy(() => import('./songnames/yuksegim/Yuksegim'));
const Kacma = lazy(() => import('./songnames/kacma/Kacma'));
const Dur = lazy(() => import('./songnames/dur/Dur'));
const BirKadinVarmis = lazy(() => import('./songnames/birkadinvarmis/BirKadinVarmis'));
const OlsunOlmasin = lazy(() => import('./songnames/olsunolmasin/OlsunOlmasin'));
const Aldirma = lazy(() => import('./songnames/aldirma/Aldirma'));
const Ruhum = lazy(() => import('./songnames/ruhum/Ruhum'));
const TutmazEllerim = lazy(() => import('./songnames/tutmazellerim/TutmazEllerim'));
const Kac = lazy(() => import('./songnames/kacma/Kac'));
const Studio = lazy(() => import('./studio/Studio'));

const Loading = () => (
  <div className="route-loading" role="status" aria-live="polite">
    Yükleniyor...
  </div>
);

const framed = (children: React.ReactNode) => <ExperienceFrame>{children}</ExperienceFrame>;

function App() {
  return (
    <Router>
      <SoundControl />
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Navigate to="/yuksek" replace />} />
          <Route path="/home" element={<Navigate to="/yuksek" replace />} />
          <Route path="/yuksek" element={framed(<Home />)} />
          <Route path="/yuksek/album" element={framed(<Yuksek />)} />
          <Route path="/yuksek/yuksegim" element={framed(<Yuksegim />)} />
          <Route path="/yuksek/kacma" element={framed(<Kacma />)} />
          <Route path="/yuksek/dur" element={framed(<Dur />)} />
          <Route path="/yuksek/birkadinvarmis" element={framed(<BirKadinVarmis />)} />
          <Route path="/yuksek/olsunolmasin" element={framed(<OlsunOlmasin />)} />
          <Route path="/yuksek/aldirma" element={framed(<Aldirma />)} />
          <Route path="/yuksek/ruhum" element={framed(<Ruhum />)} />
          <Route path="/yuksek/tutmazellerim" element={framed(<TutmazEllerim />)} />
          <Route path="/yuksek/kac" element={framed(<Kac />)} />
          <Route path="/yuksegim" element={<Navigate to="/yuksek/yuksegim" replace />} />
          <Route path="/kacma" element={<Navigate to="/yuksek/kacma" replace />} />
          <Route path="/dur" element={<Navigate to="/yuksek/dur" replace />} />
          <Route path="/birkadinvarmis" element={<Navigate to="/yuksek/birkadinvarmis" replace />} />
          <Route path="/olsunolmasin" element={<Navigate to="/yuksek/olsunolmasin" replace />} />
          <Route path="/aldirma" element={<Navigate to="/yuksek/aldirma" replace />} />
          <Route path="/ruhum" element={<Navigate to="/yuksek/ruhum" replace />} />
          <Route path="/tutmazellerim" element={<Navigate to="/yuksek/tutmazellerim" replace />} />
          <Route path="/kac" element={<Navigate to="/yuksek/kac" replace />} />
          <Route path="/studio" element={<Studio />} />
          <Route path="/yukseks" element={<Navigate to="/studio" replace />} />
          <Route path="*" element={<Navigate to="/yuksek" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
