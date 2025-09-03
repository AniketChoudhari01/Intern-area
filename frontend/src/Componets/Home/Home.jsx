import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import first from "../../Assets/Firstslide.png";
import second from "../../Assets/secondslide.webp";
import third from "../../Assets/thirdsilde.webp";
import fourth from "../../Assets/fourthslide.webp";

import Job from "./Job";
import "./home.css";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("Big Brands");
  const [internshipData, setInternshipData] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);
  const [showImageLeftButton, setShowImageLeftButton] = useState(false);
  const [showImageRightButton, setShowImageRightButton] = useState(true);

  const internshipContainerRef = useRef(null);
  const imageSliderRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:10000/api/internship"
        );
        setInternshipData(response.data);
      } catch (error) {
        console.error("Error fetching internship data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // Check scroll position on mount and when data or container changes
    checkScrollPosition();
    checkImageScrollPosition();
  }, [internshipData, selectedCategory]);

  const filterInternships = internshipData.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  const sideScroll = (element, direction, speed, distance, step) => {
    let scrollAmount = 0;
    const slideTimer = setInterval(() => {
      if (direction === "left") {
        element.scrollLeft -= step;
      } else {
        element.scrollLeft += step;
      }
      scrollAmount += step;
      if (scrollAmount >= distance) {
        clearInterval(slideTimer);
        checkScrollPosition();
        checkImageScrollPosition();
      }
    }, speed);
  };

  const checkScrollPosition = () => {
    const container = internshipContainerRef.current;
    if (!container) return;

    // Check if we're at the start (can't scroll left anymore)
    setShowLeftButton(container.scrollLeft > 0);

    // Check if we're at the end (can't scroll right anymore)
    const isAtEnd =
      container.scrollWidth - container.scrollLeft <= container.clientWidth + 5; // Small buffer
    setShowRightButton(!isAtEnd);
  };

  const checkImageScrollPosition = () => {
    const container = imageSliderRef.current;
    if (!container) return;

    // Check if we're at the start (can't scroll left anymore)
    setShowImageLeftButton(container.scrollLeft > 0);

    // Check if we're at the end (can't scroll right anymore)
    const isAtEnd =
      container.scrollWidth - container.scrollLeft <= container.clientWidth + 5; // Small buffer
    setShowImageRightButton(!isAtEnd);
  };

  const handleSlide = (direction) => {
    const container = imageSliderRef.current;
    const scrollAmount = 300; // Adjust based on your image width

    if (container) {
      sideScroll(container, direction, 25, scrollAmount, 20);
    }
  };

  const handleSlideIntern = (direction) => {
    const container = internshipContainerRef.current;
    const scrollAmount = 300; // You can adjust this value based on your card width

    if (container) {
      sideScroll(container, direction, 25, scrollAmount, 20);
    }
  };

  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "media",
    "Design",
    "Data Science",
  ];

  return (
    <>
      <h1 className="text-center text-3xl font-bold">
        Make your dream career a reality
      </h1>
      <p className="text-center text-lg font-bold">Trending on InternArea 🔥</p>

      {/* Image Slider */}
      <div
        ref={imageSliderRef}
        className="imgs flex justify-center overflow-x-auto scrollbar-hide scroll-smooth"
        id="container"
        onScroll={checkImageScrollPosition}
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="slide flex mt-10" id="content">
          <img className="slide_Img ml-4" src={first} alt="First Slide" />
          <img className="slide_Img ml-4" src={second} alt="Second Slide" />
          <img className="slide_Img ml-4" src={third} alt="Third Slide" />
          <img className="slide_Img ml-4" src={fourth} alt="Fourth Slide" />
        </div>
      </div>

      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          className={`back flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-400 hover:bg-gray-200 ${
            !showImageLeftButton ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleSlide("left")}
          disabled={!showImageLeftButton}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className={`next flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-400 hover:bg-gray-200 ${
            !showImageRightButton ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleSlide("right")}
          disabled={!showImageRightButton}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>

      {/* Internship Section */}
      <div className="infoys">
        <div className="info-intern mt-12">
          <h1 className="text-center font-bold">
            Latest internships on Intern Area
          </h1>

          <div className="categories flex flex-wrap mt-14 mx-2">
            <p>POPULAR CATEGORIES :</p>
            {categories.map((cat) => (
              <span
                key={cat}
                className={`category mr-4 ml-6 cursor-pointer ${
                  selectedCategory === cat ? "bg-blue-500 text-white" : ""
                }`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>

        <div className="internships mt-8 relative">
          <div
            ref={internshipContainerRef}
            className="internShip-Info flex overflow-x-auto scrollbar-hide scroll-smooth"
            onScroll={checkScrollPosition}
            style={{ scrollBehavior: "smooth" }}
          >
            {filterInternships.map((data, index) => (
              <div className="int-1 mt-6 flex-shrink-0" key={index}>
                <p className="mb-4 mt-3 text-blue-500 font-semibold" id="boxer">
                  <i className="bi bi-arrow-up-right"></i> Actively Hiring
                </p>
                <p className="font-bold">{data.title}</p>
                <small className="text-slate-400 text-sm">{data.company}</small>

                <hr className="mt-5" />
                <p className="mt-3">
                  <i className="bi bi-geo-alt-fill"></i> {data.location}
                </p>
                <p className="mt-1">
                  <i className="bi bi-cash-stack"></i> {data.stipend}
                </p>
                <p className="mt-1">
                  <i className="bi bi-calendar-fill"></i> {data.Duration}
                </p>

                <div className="more flex justify-between mt-6 items-center">
                  <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-sm text-sm">
                    Internship
                  </span>
                  <Link to={`/detailInternship?q=${data._id}`}>
                    <span className="text-blue-500 mr-2 text-sm font-medium">
                      View details <i className="bi bi-chevron-right"></i>
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-4">
          <button
            className={`back flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-400 hover:bg-gray-200 ${
              !showLeftButton ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleSlideIntern("left")}
            disabled={!showLeftButton}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className={`next flex items-center justify-center w-10 h-10 rounded-full border border-gray-400 text-gray-400 hover:bg-gray-200 ${
              !showRightButton ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={() => handleSlideIntern("right")}
            disabled={!showRightButton}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <Job />

      <hr className="my-8" />

      {/* Analytics Section */}
      <div className="analytics mt-8 mb-2 p-2 w-11/12 sm:w-11/12 md:w-5/6 lg:w-2/3 xl:w-1/2 mx-auto text-center border-gray-600 border-solid border-2 bg-stone-100 rounded-lg">
        <div className="flex flex-nowrap justify-between items-stretch w-full text-center">
          {/* Analytics Block 1 */}
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2 border-r-2 border-gray-600 last:border-none">
            <span className="font-bold text-[0.6rem] sm:text-sm md:text-xl lg:text-2xl text-blue-600">
              300K+
            </span>
            <p className="text-[0.5rem] sm:text-xs md:text-sm">
              companies hiring
            </p>
          </div>

          {/* Analytics Block 2 */}
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2 border-r-2 border-gray-600 last:border-none">
            <span className="font-bold text-[0.6rem] sm:text-sm md:text-xl lg:text-2xl text-blue-600">
              10K+
            </span>
            <p className="text-[0.5rem] sm:text-xs md:text-sm">
              new openings everyday
            </p>
          </div>

          {/* Analytics Block 3 */}
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2 border-r-2 border-gray-600 last:border-none">
            <span className="font-bold text-[0.6rem] sm:text-sm md:text-xl lg:text-2xl text-blue-600">
              21Mn+
            </span>
            <p className="text-[0.5rem] sm:text-xs md:text-sm">
              active students
            </p>
          </div>

          {/* Analytics Block 4 */}
          <div className="flex-1 flex flex-col justify-center px-1 sm:px-2">
            <span className="font-bold text-[0.6rem] sm:text-sm md:text-xl lg:text-2xl text-blue-600">
              600K+
            </span>
            <p className="text-[0.5rem] sm:text-xs md:text-sm">learners</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
