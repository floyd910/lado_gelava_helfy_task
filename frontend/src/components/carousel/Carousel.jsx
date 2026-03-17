import React, { useState, useRef, useEffect } from "react";
import "../../styles/Carousel.css";
import { FaChevronRight } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa6";
import TaskItem from "../taskItem/TaskItem";

const Carousel = ({
  handleEdit,
  tasks,
  handleDelete,
  handleToggle,
  setIsModalOpen,
}) => {
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const slideRef = useRef(null);

  const total = tasks.length;

  const next = () => {
    if (isTransitioning) return;
    setIndex((prev) => prev + 1);
    setIsTransitioning(true);
  };

  const prev = () => {
    if (isTransitioning) return;
    setIndex((prev) => prev - 1);
    setIsTransitioning(true);
  };

  useEffect(() => {
    const transitionEnd = () => {
      setIsTransitioning(false);
      if (index >= total) {
        setIndex(0);
        slideRef.current.style.transition = "none";
        slideRef.current.style.transform = `translateX(0%)`;
      }
      if (index < 0) {
        setIndex(total - 1);
        slideRef.current.style.transition = "none";
        slideRef.current.style.transform = `translateX(-${(total - 1) * 100}%)`;
      }
    };

    const refCurrent = slideRef.current;
    refCurrent.addEventListener("transitionend", transitionEnd);

    return () => refCurrent.removeEventListener("transitionend", transitionEnd);
  }, [index, total]);

  useEffect(() => {
    if (slideRef.current) {
      slideRef.current.style.transition = "transform 0.5s ease-in-out";
      slideRef.current.style.transform = `translateX(-${index * 100}%)`;
    }
  }, [index]);

  return (
    <div className="carousel">
      <div className="slides" ref={slideRef}>
        {tasks.map((slide, i) => (
          <div className="slide" key={i}>
            <TaskItem
              task={slide}
              handleDelete={handleDelete}
              handleToggle={handleToggle}
              handleEdit={handleEdit}
            />
          </div>
        ))}
      </div>
      <button className="prev" onClick={prev}>
        <FaChevronLeft color="#333" />
      </button>
      <button className="next" onClick={next}>
        <FaChevronRight color="#333" />
      </button>
    </div>
  );
};

export default Carousel;
