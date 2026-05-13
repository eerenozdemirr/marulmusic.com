import React, { useEffect, useState, useRef } from 'react';
import './OlsunOlmasin.css'; // Stil dosyasını içe aktar
import elYazisi from './el-yazisi.PNG'; // El yazısı resmini içe aktar
import birinciGorsel from './birinci-gorsel.webp'; // Birinci görsel
import ikinciGorsel from './ikinci-gorsel.webp'; // İkinci görsel
import birinciSes from './birinci-ses.mp3'; // Birinci ses
import ikinciSes from './ikinci-ses.mp3'; // İkinci ses
import video from './video.mp4'; // Video dosyası
import spotifyLogo from '../../assets/images/common/spotify-logo.png';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioFile } from '../../lib/audio';

const OlsunOlmasin = () => {
    const [showFirstImage, setShowFirstImage] = useState(null);
    const [clickCount, setClickCount] = useState(0);
    const [showVideo, setShowVideo] = useState(false);
    const videoRef = useRef(null);
    const [lastDirection, setLastDirection] = useState(null);

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.olsunolmasin-page').classList.add('show');
        }, 100);

        return () => clearTimeout(timeout);
    }, []);

    const handleLeftClick = () => {
        setShowFirstImage(true);
        playAudioFile(birinciSes);
        setClickCount((prevCount) => prevCount + 1);
        setLastDirection('left');
    };

    const handleRightClick = () => {
        setShowFirstImage(false);
        playAudioFile(ikinciSes);
        setClickCount((prevCount) => prevCount + 1);
        setLastDirection('right');
    };

    useEffect(() => {
        if (clickCount === 4) {
            setTimeout(() => {
                setShowVideo(true);
            }, 3000);
        }
    }, [clickCount]);

    useEffect(() => {
        if (showVideo && videoRef.current) {
            videoRef.current.play();
        }
    }, [showVideo]);

    return (
        <div className="olsunolmasin-page">
            {/* Sol alan */}
            <div className="left-zone" onClick={handleLeftClick}></div>

            {/* Sağ alan */}
            <div className="right-zone" onClick={handleRightClick}></div>

            {/* Diğer öğeler */}
            <div
                className={`toggle-image ${showFirstImage === true ? 'visible' : ''}`}
                style={{ backgroundImage: `url(${birinciGorsel})` }}
            ></div>
            <div
                className={`toggle-image ${showFirstImage === false ? 'visible' : ''}`}
                style={{ backgroundImage: `url(${ikinciGorsel})` }}
            ></div>
            <img src={elYazisi} alt="El Yazısı" className="handwritten-text" />
            {showVideo && (
                <div className="video-container">
                    <video ref={videoRef} width="100%" controls>
                        <source src={video} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}
            {/* Spotify, YouTube ve Apple Music logoları */}
            <div className="olsunolmasin-logos">
                <a href="https://open.spotify.com/intl-tr/album/3wxcKyph85kjeV2ig9jwfa?si=7LXVtxPmT7KY0VrG83B11w" target="_blank" rel="noopener noreferrer">
                    <img src={spotifyLogo} alt="Spotify" className="olsunolmasin-logo" />
                </a>
                <a href="https://www.youtube.com/watch?v=2rbkYbMLhBE&list=OLAK5uy_kY7RuQPD109-it-WGVPM0dZHLjna0TavQ" target="_blank" rel="noopener noreferrer">
                    <img src={youtubeLogo} alt="YouTube" className="olsunolmasin-logo" />
                </a>
                <a href="https://music.apple.com/us/album/y%C3%BCksek/1772486207" target="_blank" rel="noopener noreferrer">
                    <img src={appleMusicLogo} alt="Apple Music" className="olsunolmasin-logo" />
                </a>
            </div>
        </div>
    );

};

export default OlsunOlmasin;
