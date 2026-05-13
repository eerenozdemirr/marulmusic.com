import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import backgroundSound from './assets/sounds/background-sound.mp3'; // Ses dosyasını içe aktar
import { playAudioElement, stopAudio } from './lib/audio';
import newBackground from './assets/images/yuksek/new-background.webp';

import song1 from './assets/images/yuksek/song1.webp';
import song2 from './assets/images/yuksek/song2.webp';
import song3 from './assets/images/yuksek/song3.webp';
import song4 from './assets/images/yuksek/song4.webp';
import song5 from './assets/images/yuksek/song5.webp';
import song6 from './assets/images/yuksek/song6.webp';
import song7 from './assets/images/yuksek/song7.webp';
import song8 from './assets/images/yuksek/song8.webp';


const Yuksek = () => {
    const audioRef = useRef(new Audio(backgroundSound)); // Audio referansı

    const songRoutes = [
        { image: song1, path: '/yuksek/yuksegim' },
        { image: song2, path: '/yuksek/kacma' },
        { image: song3, path: '/yuksek/dur' },
        { image: song4, path: '/yuksek/birkadinvarmis' },
        { image: song5, path: '/yuksek/olsunolmasin' },
        { image: song6, path: '/yuksek/aldirma' },
        { image: song7, path: '/yuksek/ruhum' },
        { image: song8, path: '/yuksek/tutmazellerim' },
    ];

    useEffect(() => {
        const audio = audioRef.current; // Değeri bir değişkene kopyalayalım
        audio.loop = true; // Ses döngüde çalsın
        playAudioElement(audio); // Tarayıcı izin verirse çal

        // Temizlik fonksiyonu
        return () => {
            stopAudio(audio); // Bileşen kaldırıldığında sesi durdur
        };
    }, []);

    return (
        <div className="App marul-album" style={{ backgroundImage: `url(${newBackground})` }}>
                <div className="new-background">
                    <div className="song-titles">
                        {songRoutes.map((song, index) => (
                            <Link
                                to={song.path}
                                key={index}
                            >
                                <img
                                    src={song.image}
                                    alt={`El yazısı ${index + 1}`}
                                    className="handwritten-song"
                                    style={{ animationDelay: `${index * 0.5}s` }}
                                />
                            </Link>
                        ))}
                    </div>
                </div>
        </div>
    );
};

export default Yuksek;
