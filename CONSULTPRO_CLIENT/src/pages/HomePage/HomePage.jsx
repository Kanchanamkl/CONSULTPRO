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

const HomePage = () => {
  const { isLoggedIn } = useContext(StoreContext);
  const sliderData = [
    {
      id: 1,
      image: sliderImage1,
      title: "We Provide Professional Guidance for Make You Happy!",

      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.",
      button1: { text: "Get Appointment", link: "#" },
      button2: { text: "Contact Now", link: "#" },
    },
    {
      id: 2,
      image: sliderImage2,
      title: "We Provide Couselling Services That You Can Trust!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.",
      button1: { text: "Get Appointment", link: "#" },
      button2: { text: "Contact Now", link: "#" },
    },
    {
      id: 3,
      image: sliderImage3,
      title: "Your Happiness is Our Priority!",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed nisl pellentesque, faucibus libero eu, gravida quam.",
      button1: { text: "Get Appointment", link: "#" },
      button2: { text: "Contact Now", link: "#" },
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
              <div>
                <div
                  key={slide.id}
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
                              <a href="/register" className="btn">
                                Get Start
                              </a>
                              <a
                                href="/consultant-register"
                                className="btn primary"
                              >
                                Join as Counselor
                              </a>
                            </>
                          ) : (
                            <>
                              <a href="/consultants" className="btn">
                                {slide.button1.text}
                              </a>
                              <a
                                href={slide.button2.link}
                                className="btn primary"
                              >
                                {slide.button2.text}
                              </a>
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
              <div className="col-lg-4 col-md-6 col-12 ">
                {/* single-schedule */}
                <div className="single-schedule first">
                  <div className="inner">
                    <div className="icon">
                      <i className="fa fa-ambulance" />
                    </div>
                    <div className="single-content">
                      <span>Lorem Amet</span>
                      <h4>How join as Counselor</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit.
                        Vivamus et erat in lacus convallis sodales.
                      </p>
                      <a href="#">
                        LEARN MORE
                        <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-12">
                {/* single-schedule */}
                <div className="single-schedule middle">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-prescription" />
                    </div>
                    <div className="single-content">
                      <span>Fusce Porttitor</span>
                      <h4>Counselors Timetable</h4>
                      <p>
                        Lorem ipsum sit amet consectetur adipiscing elit.
                        Vivamus et erat in lacus convallis sodales.
                      </p>
                      <a href="#">
                        LEARN MORE
                        <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-12">
                {/* single-schedule */}
                <div className="single-schedule last">
                  <div className="inner">
                    <div className="icon">
                      <i className="icofont-ui-clock" />
                    </div>
                    <div className="single-content">
                      <span>Donec luctus</span>
                      <h4>Opening Hours</h4>
                      <ul className="time-sidual">
                        <li className="day">
                          Monday - Fridayp <span>8.00-20.00</span>
                        </li>
                        <li className="day">
                          Saturday <span>9.00-18.30</span>
                        </li>
                        <li className="day">
                          Monday - Thusday <span>9.00-15.00</span>
                        </li>
                      </ul>
                      <a href="#">
                        LEARN MORE
                        <i className="fa fa-long-arrow-right" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/*/End Start schedule Area */}
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
      {/* Start Why choose */}
      <section className="why-choose section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h2>We Offer Different Services To Improve Your Health</h2>
                <img src={sectionImage} alt="#" />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipiscing elit
                  praesent aliquet. pretiumts
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6 col-12">
              {/* Start Choose Left */}
              <div className="choose-left">
                <h3>Who We Are</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Maecenas pharetra antege vel est lobortis, a commodo magna
                  rhoncus. In quis nisi non emet quam pharetra commodo.{" "}
                </p>
                <p>
                  className aptent taciti sociosqu ad litora torquent per
                  conubia nostra, per inceptos himenaeos.{" "}
                </p>
                <div className="row">
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right" />
                        Maecenas vitae luctus nibh.{" "}
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Duis massa massa.
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Aliquam feugiat interdum.
                      </li>
                    </ul>
                  </div>
                  <div className="col-lg-6">
                    <ul className="list">
                      <li>
                        <i className="fa fa-caret-right" />
                        Maecenas vitae luctus nibh.{" "}
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Duis massa massa.
                      </li>
                      <li>
                        <i className="fa fa-caret-right" />
                        Aliquam feugiat interdum.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {/* End Choose Left */}
            </div>
            <div className="col-lg-6 col-12">
              {/* Start Choose Rights */}
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
                  {/*/ End Video Animation */}
                  <a href="" className="video video-popup mfp-iframe">
                    <i className="fa fa-play" />
                  </a>
                </div>
              </div>
              {/* End Choose Rights */}
            </div>
          </div>
        </div>
      </section>
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
                <h2>Do you need Emergency Medical Care? Call @ 1234 56789</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Quisque porttitor dictum turpis nec gravida.
                </p>
                <div className="button">
                  <a href="#" className="btn">
                    Contact Now
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
      {/*/ End Call to action */}
      {/* Footer Area */}
      <footer id="footer" className="footer ">
        {/* Footer Top */}
        <div className="footer-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer">
                  <h2>About Us</h2>
                  <p>
                    Lorem ipsum dolor sit am consectetur adipisicing elit do
                    eiusmod tempor incididunt ut labore dolore magna.
                  </p>
                  {/* Social */}
                  <ul className="social">
                    <li>
                      <a href="#">
                        <i className="icofont-facebook" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-google-plus" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-twitter" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-vimeo" />
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="icofont-pinterest" />
                      </a>
                    </li>
                  </ul>
                  {/* End Social */}
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer f-link">
                  <h2>Quick Links</h2>
                  <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                      <ul>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Home
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            About Us
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Services
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Our Cases
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Other Links
                          </a>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                      <ul>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Consuling
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Finance
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Testimonials
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            FAQ
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i
                              className="fa fa-caret-right"
                              aria-hidden="true"
                            />
                            Contact Us
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer">
                  <h2>Open Hours</h2>
                  <p>
                    Lorem ipsum dolor sit ame consectetur adipisicing elit do
                    eiusmod tempor incididunt.
                  </p>
                  <ul className="time-sidual">
                    <li className="day">
                      Monday - Fridayp <span>8.00-20.00</span>
                    </li>
                    <li className="day">
                      Saturday <span>9.00-18.30</span>
                    </li>
                    <li className="day">
                      Monday - Thusday <span>9.00-15.00</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-12">
                <div className="single-footer">
                  <h2>Newsletter</h2>
                  <p>
                    subscribe to our newsletter to get allour news in your
                    inbox.. Lorem ipsum dolor sit amet, consectetur adipisicing
                    elit,
                  </p>
                  <form
                    action="mail/mail.php"
                    method="get"
                    target="_blank"
                    className="newsletter-inner"
                  >
                    <input
                      name="email"
                      placeholder="Email Address"
                      className="common-input"
                      onFocus="this.placeholder = ''"
                      onBlur="this.placeholder = 'Your email address'"
                      required=""
                      type="email"
                    />
                    <button className="button">
                      <i className="icofont icofont-paper-plane" />
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
