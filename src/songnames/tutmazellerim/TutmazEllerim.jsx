import React, { useState, useEffect, useRef } from 'react';
import './TutmazEllerim.css';
import video from './video.mp4';
import sound from './benkimim.mp3'; // Ses dosyanızı buraya ekleyin
import spotifyLogo from '../../assets/images/common/spotify-logo.webp';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioElement, stopAudio } from '../../lib/audio';

const TutmazEllerim = () => {
    const [coordinates, setCoordinates] = useState(null);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef(null);
    const audioRef = useRef(null); // Ses referansı

    const handleClick = (event) => {
        const highlightArea = document.querySelector('.highlight-area');
        const rect = highlightArea.getBoundingClientRect();
        const { clientX, clientY } = event;

        setCoordinates(`X: ${clientX}, Y: ${clientY}`);

        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
            setShowVideo(true);
        }
    };

    useEffect(() => {
        if (showVideo && videoRef.current) {
            videoRef.current.play();
        }

        // Video gösterildiğinde sesi durdur
        if (showVideo && audioRef.current) {
            stopAudio(audioRef.current); // Sesin baştan başlamasını sağla
        }
    }, [showVideo]);

    useEffect(() => {
        // Bileşen yüklendiğinde sesi çal
        if (audioRef.current) {
            playAudioElement(audioRef.current);
        }
    }, []);

    return (
        <div className="tutmaz-ellerim-page" onClick={handleClick}>
            {coordinates && (
                <div className="coordinates-display">
                    {coordinates}
                </div>
            )}

            <div className="highlight-area"></div>

            {showVideo && (
                <div className="video-container">
                    <video ref={videoRef} width="100%" controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            {/* Ses bileşeni */}
            <audio ref={audioRef} src={sound} preload="auto" />

            {/* Spotify, YouTube ve Apple Music logoları */}
            <div className="tutmaz-ellerim-logos">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="tutmaz-ellerim-logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="tutmaz-ellerim-logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="tutmaz-ellerim-logo" />
                </a>
            </div>
        </div>
    );
};

export default TutmazEllerim;
