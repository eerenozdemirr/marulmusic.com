import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Yuksegim.css';
import sound from '../../assets/sounds/sound.mp3';
import sound2 from '../../assets/sounds/sound2.mp3';
import sound3 from '../../assets/sounds/sound3.mp3';
import sound4 from '../../assets/sounds/sound4.mp3';
import alpImage from '../../assets/images/yuksegim/alp.PNG';
import senaImage from '../../assets/images/yuksegim/sena.webp';
import emreImage from '../../assets/images/yuksegim/emre.PNG';
import erenImage from '../../assets/images/yuksegim/eren.PNG';
import videoFile from '../../assets/videos/video.mp4';

import spotifyLogo from '../../assets/images/common/spotify-logo.png';
import youtubeLogo from '../../assets/images/common/youtube-logo.png';
import appleMusicLogo from '../../assets/images/common/apple-music-logo.png';
import { playAudioFile } from '../../lib/audio';

const VIDEO_SEQUENCE = ['eren', 'alp', 'sena', 'emre'];

const Yuksegim = () => {
    const navigate = useNavigate();
    const [coordinates, setCoordinates] = useState(null);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageClass, setImageClass] = useState('');
    const [showImage, setShowImage] = useState(false);
    const [clickOrder, setClickOrder] = useState([]);
    const [showVideo, setShowVideo] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [fourthRegionClickCount, setFourthRegionClickCount] = useState(0);

    useEffect(() => {
        const preloadAssets = async () => {
            const sounds = [new Audio(sound), new Audio(sound2), new Audio(sound3), new Audio(sound4)];
            const images = [alpImage, senaImage, emreImage, erenImage];

            await Promise.all([
                ...sounds.map(sound => sound.load()),
                ...images.map(src => {
                    const img = new Image();
                    img.src = src;
                    return img.decode();
                })
            ]);

            setIsLoading(false);
        };

        preloadAssets();
    }, []);

    const updateVideoSequence = (regionName) => {
        const expectedRegion = VIDEO_SEQUENCE[clickOrder.length];
        let nextClickOrder = [];

        if (regionName === expectedRegion) {
            nextClickOrder = [...clickOrder, regionName];
        } else if (regionName === VIDEO_SEQUENCE[0]) {
            nextClickOrder = [regionName];
        }

        if (nextClickOrder.length === VIDEO_SEQUENCE.length) {
            setShowVideo(true);
            setClickOrder([]);
            return;
        }

        setClickOrder(nextClickOrder);
    };

    const handleClick = (event) => {
        if (showVideo) {
            return;
        }

        const { clientX, clientY } = event;
        const rect = event.currentTarget.getBoundingClientRect();
        const localX = clientX - rect.left;
        const localY = clientY - rect.top;
        const screenWidth = rect.width;
        const screenHeight = rect.height;

        // Koordinat kontrolleri
        if (
            localX >= screenWidth * 0.105 &&
            localX <= screenWidth * 0.285 &&
            localY >= screenHeight * 0.397 &&
            localY <= screenHeight * 0.483
        ) {
            playAudioFile(sound);
            setImageSrc(alpImage);
            setImageClass('photo-in-region-alp');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 1000);
            updateVideoSequence('alp');
        } else if (
            localX >= screenWidth * 0.407 &&
            localX <= screenWidth * 0.573 &&
            localY >= screenHeight * 0.429 &&
            localY <= screenHeight * 0.515
        ) {
            playAudioFile(sound2);
            setImageSrc(senaImage);
            setImageClass('photo-in-region-sena');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 2500);
            updateVideoSequence('sena');
        } else if (
            localX >= screenWidth * 0.628 &&
            localX <= screenWidth * 0.837 &&
            localY >= screenHeight * 0.429 &&
            localY <= screenHeight * 0.558
        ) {
            playAudioFile(sound3);
            setImageSrc(emreImage);
            setImageClass('photo-in-region-emre');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 1000);
            updateVideoSequence('emre');
        } else if (
            localX >= screenWidth * 0.348 &&
            localX <= screenWidth * 0.569 &&
            localY >= screenHeight * 0.536 &&
            localY <= screenHeight * 0.644
        ) {
            playAudioFile(sound4);
            setImageSrc(erenImage);
            setImageClass('photo-in-region-eren');
            setShowImage(true);
            setTimeout(() => setShowImage(false), 2800);
            updateVideoSequence('eren');
            setFourthRegionClickCount(prevCount => prevCount + 1);

            if (fourthRegionClickCount + 1 === 4) {
                navigate('/studio');
                setFourthRegionClickCount(0);
            }
        }

        setCoordinates(`X: ${Math.round(localX)}, Y: ${Math.round(localY)}`);
    };

    if (isLoading) {
        return (
            <div className="loading-spinner">
                Yükleniyor...
            </div>
        );
    }

    return (
        <div className="yuksegim-page" onClick={handleClick}>
            {coordinates && (
                <div className="coordinates-display">
                </div>
            )}

            {showImage && imageSrc && (
                <img src={imageSrc} alt="Selected" className={imageClass} />
            )}

            {showVideo && (
                <div className="yuksegim-video-overlay" onClick={(event) => event.stopPropagation()}>
                    <video className="video" controls autoPlay>
                        <source src={videoFile} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            )}

            <div className="region first-region" />
            <div className="region second-region" />
            <div className="region third-region" />
            <div className="region fourth-region" />
        </div>
    );
};

export default Yuksegim;
