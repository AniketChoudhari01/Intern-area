import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Job() {
  const [selectedCategory, setSelectedCategory] = useState("Big Brands");
  const [JobData, setJobData] = useState([]);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(true);

  const jobContainerRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:10000/api/job`);
        setJobData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    checkJobScrollPosition();
  }, [JobData]);

  const categories = [
    "Big Brands",
    "Work From Home",
    "Part-time",
    "MBA",
    "Engineering",
    "Media",
    "Design",
    "Data Science",
  ];

  const filterJobs = JobData.filter(
    (item) => !selectedCategory || item.category === selectedCategory
  );

  const sideScrollJob = (element, direction, speed, distance, step) => {
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
        checkJobScrollPosition();
      }
    }, speed);
  };

  const checkJobScrollPosition = () => {
    const container = jobContainerRef.current;
    if (!container) return;

    // Check if we're at the start (can't scroll left anymore)
    setShowLeftButton(container.scrollLeft > 0);

    // Check if we're at the end (can't scroll right anymore)
    const isAtEnd =
      container.scrollWidth - container.scrollLeft <= container.clientWidth + 5; // Small buffer
    setShowRightButton(!isAtEnd);
  };

  const handleJobSlide = (direction) => {
    const container = jobContainerRef.current;
    const scrollAmount = 300; // Adjust based on your card width

    if (container) {
      sideScrollJob(container, direction, 25, scrollAmount, 20);
    }
  };

  return (
    <div>
      <div className="info-intern mt-12">
        <div className="categories flex flex-wrap mt-14 mx-2">
          <p>POPULAR CATEGORIES :</p>
          {categories.map((category) => (
            <span
              key={category}
              className={`category mr-4 ml-6 cursor-pointer ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </span>
          ))}
        </div>
      </div>
      <div className="internships mt-8 relative">
        <div
          ref={jobContainerRef}
          className="internShip-Info flex overflow-x-auto scrollbar-hide scroll-smooth"
          onScroll={checkJobScrollPosition}
          style={{ scrollBehavior: "smooth" }}
        >
          {filterJobs.map((data, index) => (
            <div
              className="int-1 mt-6 flex-shrink-0 w-80 p-4 border rounded-lg shadow-md"
              key={index}
            >
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
                <i className="bi bi-cash-stack"></i> {data.CTC}
              </p>
              <p className="mt-1">
                <i className="bi bi-calendar-fill"></i> {data.Experience}
              </p>
              <div className="more flex justify-between mt-6 items-center">
                <span className="bg-slate-200 text-slate-600 px-3 py-1 rounded-sm text-sm">
                  Job
                </span>
                <Link to={`detailjob?q=${data._id}`}>
                  <span className="text-blue-500 mr-2 text-sm font-medium">
                    View details <i className="bi bi-chevron-right"></i>
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex BUttons mt-9 justify-center space-x-4">
        <button
          className={`back px-4 py-2 rounded-full bg-blue-500 text-white ${
            !showLeftButton ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleJobSlide("left")}
          disabled={!showLeftButton}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button
          className={`next px-4 py-2 rounded-full bg-blue-500 text-white ${
            !showRightButton ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={() => handleJobSlide("right")}
          disabled={!showRightButton}
        >
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
}

export default Job;
