import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const lines = [
  "You can't change everything. Start with what you can.",
  "You can't control the cards you're dealt. You can only play the best game possible.",
  "You don't need to become someone else. Become the best version of yourself.",
  "Small things, done consistently, change how you look, feel, and carry yourself.",
  "There is no perfect man. There is only a better version of you."
];

const desktopVideos = [
  '/LongFrom1.mp4',
  '/LongFrom2.mp4'
];

const mobileVideo = '/ShortFrom1.mp4';

const ImageCarousel = ({ items, intervalMs = 3500, maxWidth = '900px' }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(intervalMs);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 100);
      }, 100);
    }
    return () => clearInterval(interval);
  }, [playing]);

  useEffect(() => {
    if (timeLeft <= 0) {
      setIndex((c) => (c + 1) % items.length);
      setTimeLeft(intervalMs);
    }
  }, [timeLeft, items.length, intervalMs]);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % items.length);
    setTimeLeft(intervalMs);
  };
  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + items.length) % items.length);
    setTimeLeft(intervalMs);
  };
  const togglePlay = () => setPlaying(!playing);

  const currentItem = items[index];

  const content = (
    <>
      <div className="section-image-wrapper">
        <img src={currentItem.image} alt={currentItem.caption || "Carousel slide"} className="section-image" draggable={false} />
        <div className="carousel-timer">{(Math.max(0, timeLeft) / 1000).toFixed(1)}</div>
        <div className="carousel-controls">
          <button className="control-btn" aria-label="Previous slide" onClick={(e) => { e.preventDefault(); handlePrev(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 18 9 12 15 6"></polyline></svg>
          </button>
          <button className="control-btn" aria-label={playing ? "Pause slideshow" : "Play slideshow"} onClick={(e) => { e.preventDefault(); togglePlay(); }}>
            {playing ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
            )}
          </button>
          <button className="control-btn" aria-label="Next slide" onClick={(e) => { e.preventDefault(); handleNext(); }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      </div>
      <div className="carousel-caption-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: '1rem', width: '100%' }}>
        {currentItem.caption ? (
          <p className="grid-item-caption" style={{ margin: 0, textAlign: 'left' }}>{currentItem.caption}</p>
        ) : <div />}
        <button 
          className="disclaimer-link" 
          onClick={(e) => { e.preventDefault(); setModalOpen(true); }}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', cursor: 'pointer', padding: 0, flexShrink: 0, marginLeft: '1rem', textDecoration: 'none' }}
        >
          Credits & Disclaimer
        </button>
      </div>
    </>
  );

  return (
    <div className="carousel-container" style={{ position: 'relative', width: '100%', maxWidth, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      {currentItem.link ? (
        <a href={currentItem.link} target="_blank" rel="noopener noreferrer" className="image-link-wrapper" style={{ flexGrow: 1, textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
          {content}
        </a>
      ) : (
        <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          {content}
        </div>
      )}

      {modalOpen && (
        <div className="modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Credits & Disclaimer</h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
              The visual content featured in this section has been curated from public platforms, including YouTube and Instagram, and subsequently modified for educational and illustrative purposes.
            </p>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
              We deeply respect the intellectual property of all original creators. Should any copyright holder wish to request the removal of their content or discuss compensation, please contact us and we will promptly address the request.
            </p>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

function Home() {
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });
  const [desktopIndex, setDesktopIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(true); 
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [cringeModalOpen, setCringeModalOpen] = useState(false);

  const videoRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentVideo = isMobile ? mobileVideo : desktopVideos[desktopIndex];
  const showCredit = !isMobile;

  const section3Carousel = [
    {
      image: '/homepage-image-1.png',
      caption: 'Studies show women are attracted to more than just a man’s face. Click to view the study.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/35179485/'
    },
    {
      image: '/homepage-image-3.png',
      caption: 'Stop wasting time on trends that deliver zero results. Click to view the study.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/35179485/'
    }
  ];

  const section4Carousel = [
    { image: '/homepage-image-4.png' },
    { image: '/homepage-image-6.png' },
    { image: '/homepage-image-5.png' },
    { image: '/homepage-image-7.png' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); 
      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % lines.length); 
        setFade(true); 
      }, 500); 
    }, 10000); 
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVideoReady(false); 
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  const handleCanPlay = () => {
    setIsVideoReady(true);
    if (videoRef.current) {
      videoRef.current.play().catch(e => console.error("Play failed:", e));
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      videoRef.current.volume = 0.3; 
    }
  }, [isMuted]);

  const handleVideoEnd = () => {
    if (isMobile) {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(e => console.error("Play failed:", e));
      }
    } else {
      setDesktopIndex(prev => (prev + 1) % desktopVideos.length);
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play().catch(e => console.error("Play failed:", e));
      } else {
        videoRef.current.pause();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="home-container">

      <section className="hero-section">
        <div className="hero-content-wrapper">
          <div className="hero-text-side">
            <h1 className="main-headline">Build yourself. One step at a time.</h1>
            <p className="main-subheadline">Science Based. Practical. No bullshit</p>
          </div>
        </div>

        <div className="hero-video-side">
          <div className="video-wrapper-container">
            <div className="video-wrapper">
              <a 
                href="https://www.youtube.com/@BenLionelScott"
                target="_blank"
                rel="noopener noreferrer"
                className={`video-credit ${showCredit && isVideoReady ? 'visible' : 'hidden'}`}
                style={{ textDecoration: 'none' }}
              >
                Video by @BenLionelScott
              </a>
              <video 
                ref={videoRef}
                src={currentVideo}
                playsInline
                autoPlay
                loop={isMobile}
                muted={isMuted}
                onEnded={handleVideoEnd}
                onCanPlay={handleCanPlay}
                onLoadedData={() => setIsVideoReady(true)}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onVolumeChange={(e) => setIsMuted(e.target.muted)}
                className={`sidebar-video ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}
              />
              <div className={`video-controls ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}>
                <button className="control-btn" onClick={togglePlay} aria-label={isPlaying ? "Pause video" : "Play video"}>
                  {isPlaying ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                  )}
                </button>
                <button className="control-btn" onClick={toggleMute} aria-label={isMuted ? "Unmute video" : "Mute video"}>
                  {isMuted ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line></svg>
                  ) : (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path></svg>
                  )}
                </button>
              </div>
            </div>

            <div className={`quote-container ${isVideoReady ? 'opacity-100' : 'opacity-0'}`}>
              <h1 className={`rotating-text ${fade ? 'fade-in' : 'fade-out'}`}>
                "{lines[index]}"
              </h1>
            </div>
          </div>
        </div>
      </section>

        <section className="fourth-section">
          <ImageCarousel items={section4Carousel} maxWidth="100%" />
        </section>

        <section className="third-section">
          <div className="section-title-group">
            <h2 className="section-title">Know what works and what doesn't.</h2>
          </div>
          <div className="carousel-wrapper-padding" style={{ width: '100%' }}>
            <ImageCarousel items={section3Carousel} />
          </div>
        </section>

        <section className="fundamentals-section">
          <div className="fundamentals-container">
            <div className="section-title-group">
              <h2 className="section-title">MASTER THE <span className="clickbait-red">EIGHT FUNDAMENTALS</span>.</h2>
              <p className="section-subtitle">Everything you need to <span className="clickbait-blue">look better</span>, <span className="clickbait-blue">feel better</span>, and <span className="clickbait-red">live better</span>.</p>
            </div>

            <div className="fundamentals-grid">
              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>GROOMING</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>PHYSIQUE</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>STYLE</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>PRESENCE</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>SOCIAL</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>DATING</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>MINDSET</span>
                </h3>
              </div>

              <div className="fundamental-box">
                <h3 className="fundamental-title">
                  <span>LIFE</span>
                </h3>
              </div>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <div className="benefits-container">
            <div className="section-title-group">
              <h2 className="section-title">WHAT DO YOU GET OUT OF THIS?</h2>
            </div>

            <div className="benefits-grid">
              <div className="benefit-item">
                <img src="/hgirl1.png" alt="Hotter Women" className="benefit-img woman-img" draggable={false} />
                <h3 className="benefit-title">HOTTER WOMEN</h3>
              </div>

              <div className="benefit-item">
                <img src="/rich1.png" alt="More Money" className="benefit-img" draggable={false} />
                <h3 className="benefit-title">MORE MONEY</h3>
              </div>

              <div className="benefit-item">
                <img src="/conf1.png" alt="More Confidence" className="benefit-img" draggable={false} />
                <h3 className="benefit-title">MORE CONFIDENCE</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="cringe-section">
          <div className="cringe-container">
            <div className="section-title-group">
              <h2 className="section-title">THINK THIS IS CRINGE?</h2>
            </div>

            <div className="cringe-image-box">
              <div className="cringe-image-wrapper">
                <img src="/Final.png" alt="Think this is cringe?" className="cringe-image" draggable={false} />
              </div>
              <div className="cringe-caption-row">
                <button 
                  className="disclaimer-link" 
                  onClick={() => setCringeModalOpen(true)}
                >
                  Credits & Disclaimer
                </button>
              </div>
            </div>

            <div className="cringe-text-group">
              <p className="cringe-text">
                You've seen the "ALPHA" bullshit. The fake gurus. The rented Lambos. That's not us. We're here to help you improve your life. Still think it's cringe? That's fine. We're not here to impress you.
              </p>
            </div>
          </div>

          {cringeModalOpen && (
            <div className="modal-overlay" onClick={() => setCringeModalOpen(false)}>
              <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Credits & Disclaimer</h3>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                  The visual content featured in this section has been curated from public platforms, including YouTube and Instagram, and subsequently modified for educational and illustrative purposes.
                </p>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                  We deeply respect the intellectual property of all original creators. Should any copyright holder wish to request the removal of their content or discuss compensation, please contact us and we will promptly address the request.
                </p>
                <button className="modal-close-btn" onClick={() => setCringeModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          )}
        </section>

        <section className="fifth-section">
          <button className="final-action-btn" onClick={() => navigate('/courses')}>
            <h2 className="final-action-title">TAKE ACTION BEFORE IT'S TOO LATE.</h2>
          </button>
      </section>
    </div>
  );
}

export default Home;
