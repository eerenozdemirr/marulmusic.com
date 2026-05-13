import React, { useEffect, useState, useRef } from 'react';
import './BirKadinVarmis.css'; // Stil dosyasını içe aktar
import oldBackground from './old-background.webp'; // Eski arka plan
import newBackground from './new-background.webp'; // Yeni arka plan
import clickableImage from './kadın.webp'; // Tıklanabilir PNG
import backgroundMusic from './birkadinvarmis.mp3'; // Arka plan müziği
import newSound from './caz.mp3'; // Yeni ses
import buttonImage from './caz.webp'; // PNG buton

import spotifyLogo from '../../assets/images/common/spotify-logo.webp';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioElement, stopAudio } from '../../lib/audio';


const BirKadinVarmis = () => {
    const [show, setShow] = useState(false);
    const [backgroundImage, setBackgroundImage] = useState(oldBackground);
    const [imageVisible, setImageVisible] = useState(true);
    const [imageHidden, setImageHidden] = useState(false); // PNG'nin kaybolma durumu
    const [isNewSoundPlaying, setIsNewSoundPlaying] = useState(false); // Yeni ses durumu
    const audioRef = useRef(null); // Ses referansı
    const newSoundRef = useRef(null); // Yeni ses referansı

    useEffect(() => {
        const timeout = setTimeout(() => {
            document.querySelector('.birkadinvarmis-page').classList.add('show');
            setShow(true); // Sayfa görünür hale geldiğinde
            playAudioElement(audioRef.current); // Tarayıcı izin verirse çal
        }, 100); // Gecikmeli gösterim için 100 ms

        // Temizlik işlemi için audioRef.current'ı bir değişkene kopyala
        const audioElement = audioRef.current;

        return () => {
            clearTimeout(timeout); // Temizlik işlemi
            if (audioElement) {
                stopAudio(audioElement); // Sayfa kapandığında sesi durdur
            }
        };
    }, []);

    const handleImageClick = () => {
        setImageHidden(true); // Tıklanan görüntüyü gizle
        setTimeout(() => {
            setBackgroundImage(newBackground); // Yeni arka planı ayarla
            setImageVisible(false); // Görseli tamamen gizle
        }, 500); // PNG kaybolduktan sonra arka planı değiştir
    };

    const handleNewSoundButtonClick = () => {
        if (isNewSoundPlaying) {
            stopAudio(newSoundRef.current); // Yeni ses zamanını sıfırla
        } else {
            playAudioElement(newSoundRef.current);
            audioRef.current.pause(); // Eski sesi durdur
        }
        setIsNewSoundPlaying(!isNewSoundPlaying); // Yeni sesin durumunu değiştir
    };

    return (
        <div className="birkadinvarmis-page" style={{ backgroundImage: `url(${backgroundImage})` }}>
            <audio ref={audioRef} src={backgroundMusic} loop /> {/* Arka plan sesini ekle */}
            <audio ref={newSoundRef} src={newSound} /> {/* Yeni ses bileşenini ekle */}
            {show && imageVisible && (
                <img
                    src={clickableImage}
                    alt="Clickable"
                    className={`clickable-image ${imageHidden ? 'hidden' : ''}`}
                    onClick={handleImageClick}
                   
                />
            )}
            <img
                src={buttonImage}
                alt="New Sound Button"
                className="new-sound-button"
                onClick={handleNewSoundButtonClick}
               
            />
            <div className="birkadinvarmis-music-links">
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

export default BirKadinVarmis;
