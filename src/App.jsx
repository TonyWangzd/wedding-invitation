import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

const FadeInSection = ({ children, delay = 0, yOffset = 30 }) => (
  <motion.div
    initial={{ opacity: 0, y: yOffset }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 1, delay, ease: "easeOut" }}
    className="fade-in-section"
  >
    {children}
  </motion.div>
);

function App() {
  const { scrollYProgress } = useScroll();
  const heroImageScale = useTransform(scrollYProgress, [0, 0.2], [1.05, 1.0]);

  const calculateTimeLeft = () => {
    const difference = +new Date(`2026-04-25T12:08:00`) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearTimeout(timer);
  });

  return (
    <div className="app-container">
      {/* 1. Hero Section */}
      <section className="hero-section">
        <motion.div 
          className="hero-image-container"
          style={{ scale: heroImageScale }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img src="/assets/main_photo_beginning.jpg" alt="Wedding Beginning" className="hero-image" />
          <div className="hero-overlay"></div>
        </motion.div>
        
        <motion.div 
          className="hero-text-overlay"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        >
          <div className="font-script hero-script">Invitation</div>
          <p className="hero-date">2026 / 04 / 25</p>
          <p className="hero-names">Zhaodong & Minyan</p>
          
          <div className="hero-quote-box">
            <h1 className="hero-quote mt-spacing">所有的相遇<br />都是久别重逢</h1>
            <img src="/assets/decoration_line2.png" alt="Decor" className="decoration-tiny mx-auto mt-2" />
          </div>
        </motion.div>
      </section>

      {/* 2. Childhood Section: About Us */}
      <section className="content-section bg-off-white text-center">
        <FadeInSection>
          <div className="font-script">About Us</div>
          <h2 className="section-title">那时的我们</h2>
          <p className="section-text">
            还不认识彼此，<br />
            甚至不知道，<br />
            在遥远的时空里，<br />
            有一个人正穿越人海，朝自己走来。
          </p>
        </FadeInSection>

        <div className="portraits-wrapper">
          <FadeInSection delay={0.2} yOffset={20}>
            <div className="portrait-item">
              <img src="/assets/boy_child.jpg" alt="Boy" className="portrait-img" />
              <span className="portrait-name">王兆东</span>
            </div>
          </FadeInSection>
          <FadeInSection delay={0.4} yOffset={20}>
            <div className="portrait-item">
              <img src="/assets/girl_child.jpg" alt="Girl" className="portrait-img" />
              <span className="portrait-name">赵敏言</span>
            </div>
          </FadeInSection>
        </div>

        <FadeInSection delay={0.2}>
          <p className="section-text mt-spacing">
            好久不见<br />
            不知你们是否还记得上面的两个小可爱
          </p>
        </FadeInSection>
      </section>

      <div className="divider-container">
        <FadeInSection>
          <img src="/assets/decoration_line.png" alt="Decoration" className="decoration-small mx-auto" />
        </FadeInSection>
      </div>

      {/* 3. The Journey Section: Our Story */}
      <section className="content-section text-center">
        <FadeInSection>
          <div className="font-script">Our Story</div>
          <h2 className="section-title">交织成圆</h2>
          
          <img src="/assets/cartoon_character.png" alt="Journey" className="cartoon-img mx-auto mt-spacing" />
          
          <p className="section-text mt-spacing">
            从此,<br />
            两条在各自相限里奔跑的射线。<br />
            不再是孤独的平行，<br />
            而是交织成一个完整的圆。<br />
            这一路成长的轨迹，<br />
            每一段都刻着你们见证的印记。
          </p>
        </FadeInSection>
      </section>

      <div className="divider-container">
        <FadeInSection>
          <img src="/assets/decoration_line.png" alt="Decoration" className="decoration-small mx-auto" style={{ transform: 'rotate(180deg)' }} />
        </FadeInSection>
      </div>

      {/* 4. Time & Timeline Section */}
      <section className="content-section bg-off-white text-center">
        <FadeInSection>
          <div className="font-script">Time</div>
          <h2 className="section-title">时间安排</h2>
          <p className="section-text" style={{letterSpacing: '0.05em'}}>
            2026年4月25日 星期六<br />
            农历丙午年三月初九 12:08
          </p>
          <div className="countdown-container">
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.days).padStart(2,'0')}</span><span className="countdown-label">天</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.hours).padStart(2,'0')}</span><span className="countdown-label">时</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.minutes).padStart(2,'0')}</span><span className="countdown-label">分</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.seconds).padStart(2,'0')}</span><span className="countdown-label">秒</span></div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2} yOffset={20}>
          <div className="font-script mt-spacing">Timeline</div>
          <h2 className="section-title">婚礼流程</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-time">11:30</span><span className="timeline-en">Welcome Reception</span><span className="timeline-cn">迎宾</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">12:08</span><span className="timeline-en">Wedding Ceremony</span><span className="timeline-cn">仪式</span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">17:00</span><span className="timeline-en">Banquet</span><span className="timeline-cn">晚宴</span>
            </div>
            <div className="timeline-item" style={{borderBottom: 'none'}}>
              <span className="timeline-time">20:08</span><span className="timeline-en">After Party</span><span className="timeline-cn">派对</span>
            </div>
          </div>
        </FadeInSection>
      </section>

      {/* 5. Dresscode & Location Section */}
      <section className="content-section text-center">
        <FadeInSection>
          <div className="font-script">Dresscode</div>
          <h2 className="section-title">着装建议</h2>
          <p className="section-text text-sm">
            四月的西安气温通常在15℃到25℃之间<br />
            建议您选择舒适得体的服装材质<br />
            如果方便<br />
            建议您身着以下颜色的衣物出席<br />
            期待与您留下美好回忆
          </p>
          <div className="swatch-container">
            <div className="swatch" style={{backgroundColor: '#FFFFFF'}}></div>
            <div className="swatch" style={{backgroundColor: '#111111'}}></div>
            <div className="swatch" style={{backgroundColor: '#F5F5DC'}}></div>
            <div className="swatch" style={{backgroundColor: '#E2E8D3'}}></div>
            <div className="swatch" style={{backgroundColor: '#E3C1A1'}}></div>
            <div className="swatch" style={{backgroundColor: '#A8805F'}}></div>
          </div>
        </FadeInSection>
        
        <FadeInSection delay={0.2}>
          <div className="font-script mt-spacing">Location</div>
          <h2 className="section-title">导航地址</h2>
          <p className="section-text" style={{marginBottom: '1.5rem'}}>
            西安香格里拉大酒店
          </p>
          <a href="https://uri.amap.com/search?keyword=西安香格里拉酒店" target="_blank" rel="noopener noreferrer" className="navigation-container">
            <img src="/assets/navigation.jpg" alt="Map Navigation to Shangri-La Xi'an" className="nav-img-large mx-auto" />
            <p className="mt-2 text-wine" style={{fontSize: '0.9rem', opacity: 0.8}}>( 点击图片导航至高德地图 )</p>
          </a>
        </FadeInSection>
      </section>

      {/* 6. RSVP & Tips */}
      <section className="content-section bg-off-white text-center">
        <FadeInSection>
          <div className="font-script">RSVP</div>
          <h2 className="section-title">宾客回执</h2>
          <form className="rsvp-form mx-auto" onSubmit={(e) => { e.preventDefault(); alert("您的回执已提交，期待您的到来！"); }}>
            <input type="text" className="rsvp-input" placeholder="姓名 / Name" required />
            <select className="rsvp-input" required defaultValue="">
               <option value="" disabled>出席人数 / Attendance</option>
               <option value="1">1 人</option>
               <option value="2">2 人</option>
               <option value="3">3 人</option>
               <option value="4">4 人以上</option>
            </select>
            <button type="submit" className="rsvp-btn">提 交</button>
          </form>
        </FadeInSection>

        <FadeInSection delay={0.2} yOffset={20}>
          <div className="font-script mt-spacing">Tips</div>
          <p className="section-text text-sm">
            如果您身在不同城市<br />
            或是繁忙的工作脱不开身无法到达婚礼现场<br />
            没有关系，我们已收到您的祝福<br />
            祝您万事胜意<br /><br />
            如果您有时间<br />
            请带着您的好心情和好胃口，来参加我们的婚礼吧<br /><br />
            <strong>婚礼见</strong>
          </p>
        </FadeInSection>
      </section>

      {/* Full width bottom image placed at the very end of app layout */}
      <img src="/assets/decoration_bottom.jpg" alt="Decoration Bottom" className="decoration-bottom" />
      
    </div>
  );
}

export default App;