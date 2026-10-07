import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const lines = [
  "You can't change everything. Start with what you can.",
  "You can't control the cards you're dealt. You can only play the best game possible.",
  "You don't need to become someone else. Become the best version of yourself.",
  "Small things, done consistently, change how you look, feel, and carry yourself.",
  "There is no perfect man. There is only a better version of you."
];

const getAssetUrl = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;

const desktopVideos = [
  'https://github.com/RealRuthvik/ConC/releases/download/v1.0-assets/LongFrom1.mp4',
  'https://github.com/RealRuthvik/ConC/releases/download/v1.0-assets/LongFrom2.mp4'
];

const mobileVideo = 'https://github.com/RealRuthvik/ConC/releases/download/v1.0-assets/ShortFrom1.mp4';

const ImageCarousel = ({ items, intervalMs = 3500, maxWidth = '900px', onSlideChange }) => {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [timeLeft, setTimeLeft] = useState(intervalMs);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (onSlideChange) {
      onSlideChange(index);
    }
  }, [index, onSlideChange]);

  useEffect(() => {
    let interval;
    if (playing) {
      interval = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 50));
      }, 50);
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
  const radius = 8.5;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min(1, Math.max(0, (intervalMs - timeLeft) / intervalMs));
  const strokeDashoffset = circumference * (1 - progress);

  const content = (
    <>
      <div className="section-image-wrapper">
        <img src={currentItem.image} alt={currentItem.caption || "Carousel slide"} className="section-image" draggable={false} />
        {playing && (
          <div className="carousel-timer" aria-label="Slide timer">
            <svg width="22" height="22" viewBox="0 0 24 24" style={{ display: 'block', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.6))' }}>
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="rgba(0, 0, 0, 0.35)"
                stroke="rgba(255, 255, 255, 0.3)"
                strokeWidth="2.5"
              />
              <circle
                cx="12"
                cy="12"
                r={radius}
                fill="none"
                stroke="#ffffff"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 12 12)"
                style={{
                  transition: timeLeft >= intervalMs - 50 ? 'none' : 'stroke-dashoffset 0.05s linear'
                }}
              />
            </svg>
          </div>
        )}
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
      <div className="carousel-caption-row" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'baseline', marginTop: '1rem', width: '100%' }}>
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
  const [whatWorksIndex, setWhatWorksIndex] = useState(0);

  const [isMobile, setIsMobile] = useState(() => {
    return typeof window !== 'undefined' ? window.innerWidth <= 768 : false;
  });
  const [desktopIndex, setDesktopIndex] = useState(0);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [initialDelayPassed, setInitialDelayPassed] = useState(false);
  const [videoCanPlay, setVideoCanPlay] = useState(false);
  const [realityModalOpen, setRealityModalOpen] = useState(false);
  const [benefitsModalOpen, setBenefitsModalOpen] = useState(false);
  const [fundamentalsModalOpen, setFundamentalsModalOpen] = useState(false);

  const videoRef = useRef(null);

  // Hold placeholder image for at least 3 seconds on initial load
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialDelayPassed(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const currentVideo = isMobile ? mobileVideo : desktopVideos[desktopIndex];
  const showCredit = !isMobile;

  const whatWorksCarousel = [
    {
      image: getAssetUrl(isMobile ? '/mob5.png' : '/homepage-image-1.png'),
      caption: 'Studies show women are attracted to more than just a man’s face. Click to view the study.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/35179485/'
    },
    {
      image: getAssetUrl(isMobile ? '/mob6.png' : '/homepage-image-3.png'),
      caption: 'Stop wasting time on trends that deliver zero results. Click to view the study.',
      link: 'https://pubmed.ncbi.nlm.nih.gov/35179485/'
    }
  ];

  const dadCarousel = [
    { image: getAssetUrl(isMobile ? '/mob1.png' : '/homepage-image-4.png') },
    { image: getAssetUrl(isMobile ? '/mob2.png' : '/homepage-image-6.png') },
    { image: getAssetUrl(isMobile ? '/mob3.png' : '/homepage-image-5.png') },
    { image: getAssetUrl(isMobile ? '/mob4.png' : '/homepage-image-7.png') }
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
    setVideoCanPlay(false);
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideo]);

  const handleCanPlay = () => {
    setVideoCanPlay(true);
  };

  // Only transition to video and start playback once 3 seconds have elapsed AND video is ready
  useEffect(() => {
    if (initialDelayPassed && videoCanPlay) {
      if (videoRef.current) {
        videoRef.current.muted = isMuted;
        videoRef.current.volume = 0.3;
        videoRef.current.currentTime = 0;
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsVideoReady(true);
              setIsPlaying(true);
            })
            .catch((err) => {
              console.warn("Autoplay or play call prevented:", err);
              setIsVideoReady(true);
            });
        } else {
          setIsVideoReady(true);
        }
      } else {
        setIsVideoReady(true);
      }
    }
  }, [initialDelayPassed, videoCanPlay]);

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
      setIsVideoReady(false);
      setTimeout(() => {
        setDesktopIndex(prev => (prev + 1) % desktopVideos.length);
      }, 700);
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
              <img
                src={getAssetUrl('/placeholder.png')}
                alt="Hercules statue"
                className={`hero-placeholder-img ${!isVideoReady ? 'placeholder-visible' : 'placeholder-hidden'}`}
                draggable={false}
                loading="eager"
                fetchPriority="high"
              />
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
                preload="auto"
                playsInline
                loop={isMobile}
                muted={isMuted}
                onEnded={handleVideoEnd}
                onCanPlay={handleCanPlay}
                onLoadedData={handleCanPlay}
                onError={() => setIsVideoReady(false)}
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

      <section className="dad-section">
        <div className="section-title-group">
          <h2 className="section-title">
            Your <span className="clickbait-red">DAD IS OFF</span> the clock. <span className="clickbait-blue">WE'LL TAKE IT</span> from here.
          </h2>
        </div>
        <div className="carousel-wrapper-padding" style={{ width: '100%' }}>
          <ImageCarousel items={dadCarousel} />
        </div>
      </section>

      <section className="fundamentals-section">
        <div className="fundamentals-container">
          <div className="section-title-group">
            <h2 className="section-title">You will learn the <span className="clickbait-red">EIGHT</span> fundamentals.</h2>
            <p className="section-subtitle">Everything you need to <span className="clickbait-blue">look better</span>, <span className="clickbait-blue">feel better</span>, and <span className="clickbait-blue">live better</span>.</p>
          </div>

          <div className="fundamentals-grid">
            <div className="fundamental-box">
              <img src={getAssetUrl('/groom.png')} alt="Grooming" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>GROOMING</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/phy.png')} alt="Physique" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>PHYSIQUE</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/Style.png')} alt="Style" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>STYLE</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/presence.png')} alt="Presence" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>PRESENCE</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/social.png')} alt="Social" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>SOCIAL</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/dating.png')} alt="Dating" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>DATING</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/mindset.png')} alt="Mindset" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>MINDSET</span>
              </h3>
            </div>

            <div className="fundamental-box">
              <img src={getAssetUrl('/life.png')} alt="Life" className="fundamental-img" draggable={false} />
              <div className="fundamental-overlay" />
              <h3 className="fundamental-title">
                <span>LIFE</span>
              </h3>
            </div>
          </div>

          <div className="fundamentals-caption-row">
            <button
              className="disclaimer-link"
              onClick={() => setFundamentalsModalOpen(true)}
            >
              Credits & Disclaimer
            </button>
          </div>
        </div>

        {fundamentalsModalOpen && (
          <div className="modal-overlay" onClick={() => setFundamentalsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Credits & Disclaimer</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                The visual content featured in this section has been curated from public platforms, including YouTube and Instagram, and subsequently modified for educational and illustrative purposes.
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                We deeply respect the intellectual property of all original creators. Should any copyright holder wish to request the removal of their content or discuss compensation, please contact us and we will promptly address the request.
              </p>
              <button className="modal-close-btn" onClick={() => setFundamentalsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="what-works-section">
        <div className="section-title-group">
          <h2 className="section-title">Know <span className="clickbait-blue">WHAT WORKS</span> and <span className="clickbait-red">WHAT DOESN'T</span>.</h2>
          <p className="section-subtitle" style={{ marginTop: '1rem', marginBottom: '0', minHeight: '3.5rem', color: '#d8d8d8' }}>
            {whatWorksCarousel[whatWorksIndex]?.caption || ''}
          </p>
        </div>
        <div className="carousel-wrapper-padding" style={{ width: '100%' }}>
          <ImageCarousel items={whatWorksCarousel} onSlideChange={setWhatWorksIndex} />
        </div>
      </section>

      <section className="benefits-section">
        <div className="benefits-container">
          <div className="section-title-group">
            <h2 className="section-title">What <span className="clickbait-blue">YOU GET</span> at the end of this.</h2>
          </div>

          <div className="benefits-grid">
            <div className="benefit-item">
              <img src={getAssetUrl('/hgirl1.png')} alt="Hotter Women" className="benefit-img woman-img" draggable={false} />
              <h3 className="benefit-title">More Dates</h3>
            </div>

            <div className="benefit-item">
              <img src={getAssetUrl('/rich1.png')} alt="More Money" className="benefit-img" draggable={false} />
              <h3 className="benefit-title">More Money</h3>
            </div>

            <div className="benefit-item">
              <img src={getAssetUrl('/conf1.png')} alt="More Confidence" className="benefit-img" draggable={false} />
              <h3 className="benefit-title">MORE CONFIDENCE</h3>
            </div>
          </div>

          <div className="benefits-caption-row">
            <button
              className="disclaimer-link"
              onClick={() => setBenefitsModalOpen(true)}
            >
              Credits & Disclaimer
            </button>
          </div>
        </div>

        {benefitsModalOpen && (
          <div className="modal-overlay" onClick={() => setBenefitsModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Credits & Disclaimer</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                The visual content featured in this section has been curated from public platforms, including YouTube and Instagram, and subsequently modified for educational and illustrative purposes.
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                We deeply respect the intellectual property of all original creators. Should any copyright holder wish to request the removal of their content or discuss compensation, please contact us and we will promptly address the request.
              </p>
              <button className="modal-close-btn" onClick={() => setBenefitsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="reality-section">
        <div className="reality-container">
          <div className="section-title-group">
            <h2 className="section-title">It's not <span className="clickbait-red">THAT</span> kind of course.</h2>
          </div>

          <div className="reality-image-box">
            <div className="reality-image-wrapper">
              <img src={getAssetUrl(isMobile ? '/finalmob.png' : '/Final.png')} alt="Think this is cringe?" className="reality-image" draggable={false} />
            </div>
            <div className="reality-caption-row">
              <button
                className="disclaimer-link"
                onClick={() => setRealityModalOpen(true)}
              >
                Credits & Disclaimer
              </button>
            </div>
          </div>

          <div className="reality-text-group">
            <h3 className="punchy-text-title">The internet is full of advice. <span className="clickbait-red">Most of it is garbage.</span></h3>
            <p className="reality-text">
              We filter it for you — combining research, expert knowledge, and the best creators in the space to give you advice that's <span className="clickbait-blue">actually worth following</span>.
            </p>
          </div>
        </div>

        {realityModalOpen && (
          <div className="modal-overlay" onClick={() => setRealityModalOpen(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <h3 style={{ marginTop: 0, marginBottom: '1rem', color: '#fff', fontSize: '1.25rem' }}>Credits & Disclaimer</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1rem' }}>
                The visual content featured in this section has been curated from public platforms, including YouTube and Instagram, and subsequently modified for educational and illustrative purposes.
              </p>
              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '2rem' }}>
                We deeply respect the intellectual property of all original creators. Should any copyright holder wish to request the removal of their content or discuss compensation, please contact us and we will promptly address the request.
              </p>
              <button className="modal-close-btn" onClick={() => setRealityModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      <section className="cta-section">
        <button className="final-action-btn" onClick={() => navigate('/courses')}>
          <h2 className="final-action-title">TAKE ACTION BEFORE IT'S TOO LATE.</h2>
        </button>
      </section>
    </div>
  );
}

export default Home;
