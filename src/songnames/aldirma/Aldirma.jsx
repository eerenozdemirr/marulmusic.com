import React, { useEffect, useState, useRef } from 'react';
import './Aldirma.css'; // Stil dosyasını içe aktar
import arkaPlanSes from './arka-plan-ses.mp3'; // Ses dosyasını içe aktar
import spotifyLogo from '../../assets/images/common/spotify-logo.png';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import background1 from './background1.webp'; // İlk arka plan
import background2 from './background2.webp'; // İkinci arka plan
import button1Image from './button1.PNG'; // Birinci PNG buton
import button2Image from './button2.PNG'; // İkinci PNG buton
import { playAudioElement, stopAudio } from '../../lib/audio';

const Aldirma = () => {
    const [show, setShow] = useState(false);
    const [background, setBackground] = useState(''); // Arka plan durumu
    const [buttonsVisible, setButtonsVisible] = useState(true); // Butonların görünürlüğünü kontrol eden state
    const audioRef = useRef(null); // Ses referansı

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(true);
            playAudioElement(audioRef.current); // Tarayıcı izin verirse çal
        }, 100); // 100 ms gecikme ile göster

        const audioElement = audioRef.current;

        return () => {
            clearTimeout(timer);
            if (audioElement) {
                stopAudio(audioElement);
            }
        };
    }, []);

    const sendChoiceToServer = (buttonChoice) => {
        window.localStorage.setItem('marul:aldirma-choice', buttonChoice);
    };

    // Arka planı değiştiren işlevler ve butonları gizler
    const changeBackgroundToFirst = () => {
        setBackground(`url(${background1})`);
        setButtonsVisible(false); // Butonları gizle
        sendChoiceToServer('fark_eder'); // Sunucuya "fark eder" seçimini gönder
    };

    const changeBackgroundToSecond = () => {
        setBackground(`url(${background2})`);
        setButtonsVisible(false); // Butonları gizle
        sendChoiceToServer('fark_etmez'); // Sunucuya "fark etmez" seçimini gönder
    };

    return (
        <div className={`aldirma-page ${show ? 'show' : ''}`} style={{ backgroundImage: background }}>
            <audio ref={audioRef} src={arkaPlanSes} />

            <div className="aldirma-music-links">
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

            {/* PNG butonları */}
            {buttonsVisible && (
                <div className="aldirma-buttons fade-out"> {/* fade-out sınıfını ekledik */}
                    <img src={button1Image} alt="Buton 1" className="background-button" onClick={changeBackgroundToFirst} />
                    <img src={button2Image} alt="Buton 2" className="background-button" onClick={changeBackgroundToSecond} />
                </div>
            )}
        </div>
    );
};

export default Aldirma;
