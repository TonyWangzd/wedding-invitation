import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import './App.css';

const CoverTransition = ({ isOpened, onOpen }) => {
  return (
    <motion.div
      className="cover-overlay"
      initial={false}
      animate={isOpened ? "opened" : "closed"}
      style={{ pointerEvents: isOpened ? 'none' : 'auto' }}
      onPan={(e, info) => { if (Math.abs(info.offset.y) > 20) onOpen(); }}
      onWheel={(e) => { if (e.deltaY > 10 || e.deltaY < -10) onOpen(); }}
      onClick={onOpen}
    >
      <motion.div
        className="cover-half top"
        variants={{ closed: { y: "0%" }, opened: { y: "-100%" } }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="cover-half bottom"
        variants={{ closed: { y: "0%" }, opened: { y: "100%" } }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="cover-content"
        style={{ x: "-50%", y: "-50%" }}
        variants={{ closed: { opacity: 1, scale: 1 }, opened: { opacity: 0, scale: 0.8, pointerEvents: 'none' } }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        <div className="cover-circle-wrapper">
          <div className="cover-circle">
            <img src="/assets/cover.jpg" alt="Cover Circle" />
          </div>
        </div>
        <div className="scroll-indicator">
          <span className="scroll-text">开启</span>
          <span style={{ color: 'rgba(255,255,255,0.85)', fontFamily: 'var(--font-serif-cn)', fontSize: '1.2rem', letterSpacing: '0.6em', marginBottom: '1.5rem', marginTop: '-0.5rem', marginLeft: '0.6em' }}>邀请函</span>
          <div className="scroll-line"></div>
        </div>
      </motion.div>
    </motion.div>
  );
};

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
  const [isCoverOpened, setIsCoverOpened] = useState(false);

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
    <div className="app-container" style={{ height: isCoverOpened ? 'auto' : '100vh', overflow: isCoverOpened ? 'visible' : 'hidden' }}>
      <CoverTransition isOpened={isCoverOpened} onOpen={() => setIsCoverOpened(true)} />

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
          <p className="hero-names">我们结婚啦</p>
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
          <p className="section-text mt-2">
            好久不见<br />
            不知你们是否还记得<br />
            下面的两个小可爱
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
            <br />那时的我们<br />
            还不认识彼此<br />
            甚至不知道<br />
            在遥远的时空里<br />
            有一个人正穿越人海，朝自己走来
          </p>
        </FadeInSection>
      </section>

      <div className="divider-container" style={{ paddingBottom: '1rem' }}>
        <FadeInSection>
          <img src="/assets/decoration_line.png" alt="Decoration" className="decoration-small mx-auto" />
        </FadeInSection>
      </div>

      {/* 3. The Journey Section: Our Story */}
      <section className="content-section text-center" style={{ paddingTop: '0', paddingBottom: '0', minHeight: 'auto' }}>
        <FadeInSection>

          <img src="/assets/rotation_pic.jpg" alt="Journey" className="mx-auto" style={{ maxWidth: '350px', width: '80%', height: 'auto', borderRadius: '8px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />

          <p className="section-text" style={{ marginTop: '2.5rem' }}>
            从此<br />
            两条在各自时空里奔跑的线<br />
            不再是孤独的平行<br />
            而是交织成一个完整的圆<br />
            这一路成长的轨迹<br />
            每一段都刻着你们见证的印记
          </p>

          <img src="/assets/decoration_line2.png" alt="Decor" className="decoration-tiny mx-auto" style={{ filter: 'none', marginTop: '2.5rem' }} />
        </FadeInSection>
      </section>

      <div className="divider-container" style={{ paddingTop: '2.5rem' }}>
        <FadeInSection>
          <img src="/assets/decoration_line.png" alt="Decoration" className="decoration-small mx-auto" style={{ transform: 'rotate(180deg)' }} />
        </FadeInSection>
      </div>

      {/* 4. Time & Timeline Section */}
      <section className="content-section bg-off-white text-center">
        <FadeInSection>
          <div className="font-script">Our Day</div>
          <h2 className="section-title">时间安排</h2>
          <p className="section-text" style={{ letterSpacing: '0.05em' }}>
            2026年4月25日 星期六<br />
            农历丙午年三月初九
          </p>
          <div className="countdown-container">
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.days).padStart(2, '0')}</span><span className="countdown-label">天</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.hours).padStart(2, '0')}</span><span className="countdown-label">时</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.minutes).padStart(2, '0')}</span><span className="countdown-label">分</span></div>
            <div className="countdown-box"><span className="countdown-num">{String(timeLeft.seconds).padStart(2, '0')}</span><span className="countdown-label">秒</span></div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2} yOffset={20}>
          <div className="font-script mt-spacing">Timeline</div>
          <h2 className="section-title">婚礼流程</h2>
          <div className="timeline">
            <div className="timeline-item">
              <span className="timeline-time">10:30</span><span className="timeline-cn" style={{ flex: 1, textAlign: 'left', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>迎宾 <span className="timeline-en" style={{ padding: 0, flex: 'none', color: 'var(--color-text-light)' }}>Reception</span></span>
            </div>
            <div className="timeline-item">
              <span className="timeline-time">12:00</span><span className="timeline-cn" style={{ flex: 1, textAlign: 'left', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>仪式 <span className="timeline-en" style={{ padding: 0, flex: 'none', color: 'var(--color-text-light)' }}>Ceremony</span></span>
            </div>
            <div className="timeline-item" style={{ borderBottom: 'none' }}>
              <span className="timeline-time">12:30</span><span className="timeline-cn" style={{ flex: 1, textAlign: 'left', paddingLeft: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>宴会 <span className="timeline-en" style={{ padding: 0, flex: 'none', color: 'var(--color-text-light)' }}>Banquet</span></span>
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
            <div className="swatch" style={{ backgroundColor: '#F8C8DC' }}></div>
            <div className="swatch" style={{ backgroundColor: '#C8A2C8' }}></div>
            <div className="swatch" style={{ backgroundColor: '#9CAF88' }}></div>
            <div className="swatch" style={{ backgroundColor: '#F5E6CC' }}></div>
            <div className="swatch" style={{ backgroundColor: '#7C92A6' }}></div>
            <div className="swatch" style={{ backgroundColor: '#1A2A3A' }}></div>
          </div>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="font-script mt-spacing">Location</div>
          <h2 className="section-title">婚礼地址</h2>
          <p className="section-text" style={{ marginBottom: '1.5rem' }}>
            西安香格里拉大酒店・长安厅
          </p>
          <a href="https://uri.amap.com/search?keyword=西安香格里拉酒店" target="_blank" rel="noopener noreferrer" className="navigation-container">
            <img src="/assets/navigation.jpg" alt="Map Navigation to Shangri-La Xi'an" className="no-shadow mx-auto" style={{ width: '50%', minWidth: '150px', borderRadius: '4px', marginTop: '1rem' }} />
            <div className="nav-text-container">
              <span className="nav-hint-text">点击导航至高德地图</span>
              <img src="/assets/click.jpg" alt="Click" className="click-icon" style={{ width: '24px', height: 'auto', mixBlendMode: 'multiply' }} />
            </div>
          </a>
        </FadeInSection>
      </section>

      {/* 6. RSVP & Tips */}
      <section className="content-section text-center">
        <FadeInSection>
          <div className="font-script">RSVP</div>
          <h2 className="section-title">宾客回执</h2>
          <form className="rsvp-form mx-auto" onSubmit={async (e) => {
            e.preventDefault();
            const submitBtn = e.target.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "提交中...";
            submitBtn.disabled = true;

            const formData = new FormData(e.target);
            formData.append("access_key", "4f30eeed-04ad-4d7d-90cf-500b8be458a6");
            formData.append("subject", `新婚礼回执: ${formData.get("name")}`);

            try {
              const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json"
                },
                body: JSON.stringify(Object.fromEntries(formData))
              });

              const result = await res.json();
              if (result.success) {
                alert("您的回执已成功提交，期待您的到来！");
                e.target.reset(); // 清空表单
              } else {
                alert("提交失败，请稍后重试。");
              }
            } catch (error) {
              alert("提交出错，请检查网络。");
            } finally {
              submitBtn.innerText = originalText;
              submitBtn.disabled = false;
            }
          }}>
            <input type="text" name="name" className="rsvp-input" placeholder="姓名 / Name" required />
            <select name="attendance" className="rsvp-input" required defaultValue="">
              <option value="" disabled>出席人数 / Attendance</option>
              <option value="1 人">1 人</option>
              <option value="2 人">2 人</option>
              <option value="3 人">3 人</option>
              <option value="4 人以上">4 人以上</option>
            </select>
            <select name="accommodation" className="rsvp-input" required defaultValue="">
              <option value="" disabled>住宿安排 / Accommodation</option>
              <option value="需安排">需代为安排下榻之所</option>
              <option value="无需安排">无需安排，心领美意</option>
            </select>
            <textarea name="message" className="rsvp-input" placeholder="想对我们说的话 (选填) / Messages" style={{ height: '80px', paddingTop: '12px' }}></textarea>
            <button type="submit" className="rsvp-btn">提 交</button>
          </form>
        </FadeInSection>

        <FadeInSection delay={0.2}>
          <div className="css-divider mx-auto"></div>
        </FadeInSection>

        <FadeInSection delay={0.3} yOffset={20}>
          <div className="font-script">Tips</div>
          <p className="section-text text-sm">
            如果您身在不同城市<br />
            或是繁忙的工作脱不开身无法到达婚礼现场<br />
            没有关系，我们已收到您的祝福<br />
            祝您万事胜意<br /><br />
            如果您有时间<br />
            请带着您的好心情和好胃口，来见证我们的幸福吧<br /><br />
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