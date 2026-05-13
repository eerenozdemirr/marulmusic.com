import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import background from './assets/images/home/background.jpg';
import chairImage from './assets/images/home/chair1.PNG';
import creditImage from './assets/images/home/credit.webp';
import leftButtonImage from './assets/images/home/left.PNG';
import rightButtonImage from './assets/images/home/right.PNG';

const Home = () => {
    const [bgImage] = useState(`url(${background})`);
    const [showChair, setShowChair] = useState(true); // Sandalye gösteriliyor
    const [animateChair, setAnimateChair] = useState(false); // Sandalye animasyonu
    const [showNewImage, setShowNewImage] = useState(false); // Yeni görüntü gösterilmiyor
    const [showLeftButton, setShowLeftButton] = useState(false); // Sol buton ilk başta gizli
    const [showRightButton, setShowRightButton] = useState(true); // Sağ buton gösteriliyor
    const navigate = useNavigate();

    const changeBackground = () => {
        setAnimateChair(true); // Sandalyeyi yukarı kaldır
        setTimeout(() => {
            setShowChair(false); // Sandalyeyi kaybettir
            navigate('/yuksek/album'); // Albüm sayfasına yönlendirme
        }, 1000); // Animasyon süresi
    };

    const handleRightButtonClick = () => {
        setShowChair(false); // Sandalyeyi gizle
        setShowNewImage(true); // Yeni görüntüyü göster
        setShowRightButton(false); // Sağ butonu gizle
        setShowLeftButton(true); // Sol butonu göster
    };

    const handleLeftButtonClick = () => {
        setShowChair(true); // Sandalyeyi geri getir
        setShowNewImage(false); // Yeni görüntüyü gizle
        setShowRightButton(true); // Sağ butonu geri getir
        setShowLeftButton(false); // Sol butonu gizle
    };

    return (
        <div className="App marul-home" style={{ backgroundImage: bgImage }}>
                {showChair && (
                    <img
                        src={chairImage}
                        alt="Sandalye"
                        className={`chair ${animateChair ? 'fly' : ''}`} // Sandalye animasyonu
                        onClick={changeBackground} // Sandalyeye tıklayınca fonksiyon çalışır
                    />
                )}

                {showNewImage && (
                    <img
                        src={creditImage} // Yeni görüntü
                        alt="Yeni Görüntü"
                        className="credit" // Sınıf adını 'new-image' yerine 'credit' yap
                    />
                )}

                {showLeftButton && (
                    <img 
                        src={leftButtonImage} 
                        alt="Sol Buton" 
                        className="side-button left-button" 
                        onClick={handleLeftButtonClick} // Sol butona tıklama
                    />
                )}

                {showRightButton && (
                    <img 
                        src={rightButtonImage} 
                        alt="Sağ Buton" 
                        className="side-button right-button" 
                        onClick={handleRightButtonClick} // Sağ butona tıklama
                    />
                )}
        </div>
    );
};

export default Home;
