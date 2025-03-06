import { useState, useEffect, useContext } from "react";

import "./client_homepage_css/bootstrap.min.css";
import "./client_homepage_css/nice-select.css";
import "./client_homepage_css/font-awesome.min.css";
import "./client_homepage_css/icofont.css";
import "./client_homepage_css/slicknav.min.css";
import "./client_homepage_css/datepicker.css";
import "./client_homepage_css/animate.min.css";
import "./client_homepage_css/magnific-popup.css";
import "./client_homepage_css/normalize.css";
import "./HomePageStyles.scss";
import "./client_homepage_css/responsive.css";
import sliderImage1 from "./client_homepage_img/slider2.jpeg";
import sliderImage2 from "./client_homepage_img/slider.jpeg";
import sliderImage3 from "./client_homepage_img/slider3.jpeg";
import sectionImage from "./client_homepage_img/section-img.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StoreContext } from "../../StoreContext/StoreContext";
import { useNavigate } from "react-router-dom";


const HomePage = () => {
  const { isLoggedIn } = useContext(StoreContext);
  const navigate = useNavigate();

  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
      title: "Expert Guidance for a Better You",
      description:
        "Our professional counselors are here to support your mental well-being. Book a session today and take the first step toward a happier life.",
      button1: { text: "Book an Appointment", link: "/appointment" },
      button2: { text: "Contact Us", link: "/contact" },
    },
    {
      id: 2,
      image: sliderImage2,
      title: "Trusted Counseling for a Healthier Mind",
      description:
        "We provide a safe and confidential space to talk about your concerns. Let’s work together to find the right solutions for you.",
      button1: { text: "Schedule a Session", link: "/appointment" },
      button2: { text: "Reach Out", link: "/contact" },
    },
    {
      id: 3,
      image: sliderImage3,
      title: "Your Well-Being is Our Priority",
      description:
        "Embrace positivity and self-growth with our professional counseling services. Let’s build a better future together.",
      button1: { text: "Start Your Journey", link: "/appointment" },
      button2: { text: "Get in Touch", link: "/contact" },
    },
  ];




  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <>
      <section className="slider">
        <div>
          <Slider {...settings}>
            {sliderData.map((slide) => (
              <div key={slide.id}>
                <div
                  className="single-slider"
                  style={{
                    backgroundImage: `url('${slide.image}')`,
                  }}
                >
                  <div className="row">
                    <div className="col-lg-7">
                      <div className="text">
                        <h1>{slide.title}</h1>
                        <p>{slide.description}</p>
                        <div className="button">
                          {!isLoggedIn ? (
                            <>
                              <button
                                className="btn"
                                onClick={() => navigate("/register")}
                              >
                                Get Start
                              </button>
                              <button
                                className="btn primary"
                                onClick={() => navigate("/consultant-register")}
                              >
                                Join as Counselor
                              </button>
                            </>
                          ) : (
                            <>
                              <button
                                className="btn"
                                onClick={() => navigate("/consultants")}
                              >
                                {slide.button1.text}
                              </button>
                              <button
                                className="btn primary"
                                onClick={() => navigate(slide.button2.link)}
                              >
                                {slide.button2.text}
                              </button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
      {/*/ End Slider Area */}
      {/* Start Schedule Area */}
      <section className="schedule">
        <div className="container">
          <div className="schedule-inner">
            <div className="row">
              <div className="col-lg-4 col-md-6 col-12">
                {/* Single Schedule - Join as a Counselor */}
                <div className="single-schedule first">
                  <div className="inner">
                    <div className="icon">
                      <i className="fa fa-handshake-o" />
                    </div>
                    <div className="single-content">
                      <span>Empower Others</span>
                      <h4>Become a Counselor</h4>
                      <p>
                        Join our network of professionals and make a meaningful impact.
                        Help individuals overcome challenges and lead fulfilling lives.
                      </p>
                      <a href="/join">
                        LEARN MORE <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-12">
                {/* Single Schedule - Counselor Timetable */}
                <div className="single-schedule middle">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-calendar" />
                    </div>
                    <div className="single-content">
                      <span>Plan Your Session</span>
                      <h4>Counselor Availability</h4>
                      <p>
                        View our expert counselors' schedules and book your session at a
                        time that suits you best.
                      </p>
                      <a href="/schedule">
                        VIEW SCHEDULE <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-12 col-12">
                {/* Single Schedule - Opening Hours */}
                <div className="single-schedule last">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-clock-time" />
                    </div>
                    <div className="single-content">
                      <span>Flexible Support</span>
                      <h4>Opening Hours</h4>
                      <ul className="time-sidual">
                        <li className="day">
                          Monday - Friday <span>8:00 AM - 8:00 PM</span>
                        </li>
                        <li className="day">
                          Saturday <span>9:00 AM - 6:30 PM</span>
                        </li>
                        <li className="day">
                          Sunday <span>Closed</span>
                        </li>
                      </ul>
                      <a href="/contact">
                        CONTACT US <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* End Schedule Area */}

      {/* Start Fun-facts */}
      <div id="fun-facts" className="fun-facts section overlay">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Fun */}
              <div className="single-fun">
                <i className="icofont icofont-home" />
                <div className="content">
                  <span className="counter">3468</span>
                  <p>Hospital Rooms</p>
                </div>
              </div>
              {/* End Single Fun */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Fun */}
              <div className="single-fun">
                <i className="icofont icofont-user-alt-3" />
                <div className="content">
                  <span className="counter">557</span>
                  <p>Specialist Counselors</p>
                </div>
              </div>
              {/* End Single Fun */}
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              {/* Start Single Fun */}
              <div className="single-fun">
                <i className="icofont-simple-smile" />
                <div className="content">
                  <span className="counter">4379</span>
                  <p>Happy Clinets</p>
                </div>
              </div>
              {/* End Single Fun */}
            </div>
          </div>
        </div>
      </div>
      {/*/ End Fun-facts */}
      {/* Start Why Choose Us */}
      <section className="why-choose section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>Empowering Lives Through Professional Counseling</h2>
                <img src={sectionImage} alt="Why Choose Us" />
                <p>
                  At EmpowerOne, we provide expert guidance, support, and resources
                  to help you navigate life's challenges and achieve mental well-being.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              {/* Start Choose Left */}
              <div className="choose-left">
                <h3>Why Choose EmpowerOne?</h3>
                <p>
                  We are dedicated to offering professional, compassionate, and
                  confidential counseling services. Our team of experts ensures
                  personalized support tailored to your needs.
                </p>
                <p>
                  Whether you are seeking guidance for personal growth, relationship
                  challenges, or emotional well-being, we are here to empower you.
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right" />
                        Certified and Experienced Counselors
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Secure & Confidential Sessions
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Personalized Therapy Plans
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right" />
                        Flexible Online & Offline Appointments
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Evidence-Based Techniques
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Community Support & Workshops
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Choose Left */}
            </div>
            <div className="col-lg-6 col-12">
              {/* Start Choose Right */}
              <div className="choose-right">
                <div className="video-image">
                  {/* Video Animation */}
                  <div className="promo-video">
                    <div className="waves-block">
                      <div className="waves wave-1" />
                      <div className="waves wave-2" />
                      <div className="waves wave-3" />
                    </div>
                  </div>
                  {/* End Video Animation */}
                  <a href="https://www.youtube.com/watch?v=your-video-link"
                    className="video video-popup mfp-iframe">
                    <i className="fa fa-play" />
                  </a>
                </div>
              </div>
              {/* End Choose Right */}
            </div>
          </div>
        </div>
      </section>
      {/* End Why Choose Us */}

      {/*/ End Why choose */}
      {/* Start Call to action */}
      <section
  className="call-action overlay"
  data-stellar-background-ratio="0.5"
>
  <div className="container">
    <div className="row">
      <div className="col-lg-12 col-md-12 col-12">
        <div className="content">
          <h2>Need Professional Counseling Support? Call Us at 1234 56789</h2>
          <p>
            Whether you're facing personal challenges, stress, or emotional 
            difficulties, our experienced counselors are here to guide and 
            support you. Reach out today!
          </p>
          <div className="button">
            <a href="#" className="btn">
              Get Support Now
            </a>
            <a href="#" className="btn second">
              Learn More
              <i className="fa fa-long-arrow-right" />
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
{/*/ End Call to Action */}

{/* Footer Area */}
<footer id="footer" className="footer">
  {/* Footer Top */}
  <div className="footer-top">
    <div className="container">
      <div className="row">
        {/* About Us Section */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="single-footer">
            <h2>About Us</h2>
            <p>
              EmpowerOne is dedicated to providing professional online counseling 
              services, ensuring privacy, accessibility, and expert support 
              for your mental well-being.
            </p>
            {/* Social Links */}
            <ul className="social">
              <li><a href="#"><i className="icofont-facebook" /></a></li>
              <li><a href="#"><i className="icofont-twitter" /></a></li>
              <li><a href="#"><i className="icofont-linkedin" /></a></li>
              <li><a href="#"><i className="icofont-instagram" /></a></li>
            </ul>
          </div>
        </div>

        {/* Quick Links */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="single-footer f-link">
            <h2>Quick Links</h2>
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12">
                <ul>
                  <li><a href="#"><i className="fa fa-caret-right" /> Home</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> About Us</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Services</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Blog</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Resources</a></li>
                </ul>
              </div>
              <div className="col-lg-6 col-md-6 col-12">
                <ul>
                  <li><a href="#"><i className="fa fa-caret-right" /> Counseling</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> FAQs</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Testimonials</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Privacy Policy</a></li>
                  <li><a href="#"><i className="fa fa-caret-right" /> Contact Us</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Open Hours */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="single-footer">
            <h2>Support Hours</h2>
            <p>We are available to support you during the following hours:</p>
            <ul className="time-sidual">
              <li className="day">Monday - Friday <span>8:00 AM - 8:00 PM</span></li>
              <li className="day">Saturday <span>9:00 AM - 6:30 PM</span></li>
              <li className="day">Sunday <span>Closed</span></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="col-lg-3 col-md-6 col-12">
          <div className="single-footer">
            <h2>Stay Connected</h2>
            <p>
              Subscribe to our newsletter for the latest updates on mental health 
              and counseling services.
            </p>
            <form action="subscribe.php" method="post" className="newsletter-inner">
              <input
                name="email"
                placeholder="Your Email Address"
                className="common-input"
                required
                type="email"
              />
              <button className="button">
                <i className="icofont-paper-plane" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*/ End Footer Top */}
</footer>
    </>
  );
};


export default HomePage;
