import React, { useEffect, useState, useRef } from 'react';
import './Dur.css';
import yeniGorsel from './yeni-gorsel.webp';
import alternatifGorsel from './sonfoto.webp';
import arkaPlanSes from './arka-plan-ses.mp3';
import spotifyLogo from '../../assets/images/common/spotify-logo.webp';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioElement, stopAudio } from '../../lib/audio';

const Dur = () => {
    const [showNewImage, setShowNewImage] = useState(false);
    const [clickCount, setClickCount] = useState(0); // Tıklama sayısını tutacak durum
    const audioRef = useRef(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.dur-page').classList.add('show');
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const handleClick = (event) => {
        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const xRatio = ((clientX - rect.left) / rect.width) * 100;
        const yRatio = ((clientY - rect.top) / rect.height) * 100;

        if (xRatio >= 1.6 && xRatio <= 93.02 && yRatio >= 45.7 && yRatio <= 88.4) {
            setClickCount(prevCount => prevCount + 1); // Tıklama sayısını artır
            setShowNewImage(true);
            playAudioElement(audioRef.current);

            setTimeout(() => {
                setShowNewImage(false);
                stopAudio(audioRef.current);
            }, 1400);
        }
    };

    // Arka plan görselini belirleme
    const getBackgroundImage = () => {
        if (clickCount > 0 && clickCount % 3 === 0) {
            return alternatifGorsel; // Her 3. tıklamada alternatif görsel
        }
        return yeniGorsel; // Diğer tüm tıklamalarda yeni görsel
    };

    return (
        <div className="dur-page" onClick={handleClick}>
            {showNewImage && (
                <div className="new-image" style={{ backgroundImage: `url(${getBackgroundImage()})` }}></div>
            )}
            <audio ref={audioRef} src={arkaPlanSes} />

            <div className="music-links">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="music-logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="music-logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="music-logo" />
                </a>
            </div>
        </div>
    );
};

export default Dur;
