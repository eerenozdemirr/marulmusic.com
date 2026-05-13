import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Kacma.css';
import kacmaSes from './kacma.mp3';
import playButtonImage from './play.webp';
import spotifyLogo from '../../assets/images/common/spotify-logo.webp';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioElement, stopAudio } from '../../lib/audio';

const Kacma = () => {
    const [show, setShow] = useState(false);
    const audioRef = useRef(new Audio(kacmaSes));
    const navigate = useNavigate();

    useEffect(() => {
        const audio = audioRef.current;

        playAudioElement(audio);

        const timer = setTimeout(() => {
            setShow(true);
        }, 100);

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                stopAudio(audio);
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            stopAudio(audio);
            clearTimeout(timer);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    const handlePlayButtonClick = () => {
        const audio = audioRef.current;
        stopAudio(audio);
        navigate('/yuksek/kac');
    };

    return (
        <div className={`kacma-page ${show ? 'show' : ''}`}>
            <img
                src={playButtonImage}
                alt="Oyna"
                className="play-button"
                onClick={handlePlayButtonClick}
                style={{ cursor: 'pointer' }}
            />

            <div className="logos">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="logo" />
                </a>
            </div>
        </div>
    );
};

export default Kacma;
