'use client';
import styled from "styled-components";
import { useEffect, useRef } from "react";
import {Skeleton} from "@/components/ui/skeleton";

const Scroller = ({ data, loading, title }) => {
  const scrollerRef = useRef(null);
  const customScrollbarRef = useRef(null);
  const customScrollbarThumbRef = useRef(null);

  useEffect(() => {
    if (!loading) {
      const scroller = scrollerRef.current;
      const container = scroller?.parentNode;

      const handleScroll = () => {
        if (container) {
          // Remove any existing classes to reset the gradients
          container.classList.remove("show-left-gradient", "show-right-gradient");

          if (scroller.scrollLeft > 0) {
            container.classList.add("show-left-gradient");
          }

          if (scroller.scrollLeft < scroller.scrollWidth - scroller.offsetWidth) {
            container.classList.add("show-right-gradient");
          }

          // Calculate the viewport to content ratio
          const viewportToContentRatio = scroller.offsetWidth / scroller.scrollWidth;

          // Update the thumb's width
          customScrollbarThumbRef.current.style.width = `${viewportToContentRatio * 100}%`;

          // Calculate the scroll ratio for adjusting thumb's position
          const scrollRatio = scroller.scrollLeft / (scroller.scrollWidth - scroller.offsetWidth);

          // Update the thumb's left value based on scroll position
          customScrollbarThumbRef.current.style.left = `${scrollRatio * (customScrollbarRef.current.offsetWidth - customScrollbarThumbRef.current.offsetWidth)}px`;
        }
      };

      scroller.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial position

      return () => {
        scroller.removeEventListener("scroll", handleScroll);
      };
    }
  }, [loading]);

  useEffect(() => {
    if (!loading) {
      let isDragging = false;
      let lastClientX; // to store the last x position

      const handleDragStart = (e) => {
        isDragging = true;
        lastClientX = e.clientX;
        customScrollbarThumbRef.current.style.transition = 'none'; // remove transition during drag
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
      };

      const handleDragMove = (e) => {
        if (!isDragging) return;
        const dx = e.clientX - lastClientX;
        const scrollRatio = customScrollbarRef.current.offsetWidth / customScrollbarThumbRef.current.offsetWidth;
        scrollerRef.current.scrollLeft += dx * scrollRatio;
        lastClientX = e.clientX;
      };

      const handleDragEnd = () => {
        isDragging = false;
        customScrollbarThumbRef.current.style.transition = ''; // add back the transition
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };

      // Add event listeners to both customScrollbar and customScrollbarThumb
      customScrollbarRef.current.addEventListener('mousedown', handleDragStart);
      customScrollbarThumbRef.current.addEventListener('mousedown', handleDragStart);

      return () => {
        customScrollbarRef.current.removeEventListener('mousedown', handleDragStart);
        customScrollbarThumbRef.current.removeEventListener('mousedown', handleDragStart);
        document.removeEventListener('mousemove', handleDragMove);
        document.removeEventListener('mouseup', handleDragEnd);
      };
    }
  }, [loading]);

  if (loading) return (
      <ScrollerWrapper>
        {[0,1,2,3,4,5].map((item, index) => (
            <div className={"flex flex-col flex-wrap gap-3"} key={index}>
              <Skeleton className={"w-[200px] h-[300px] m-[3px] rounded-[10px]"} />
              <Skeleton className={"w-[150px] h-[10px] m-[3px]"} />
              <Skeleton className={"w-[100px] h-[10px] m-[3px]"} />
            </div>
        ))}
      </ScrollerWrapper>
  )

  return (
      <>
        <div className={"flex items-center gap-2 mt-10 mb-2 px-3 font-bold text-2xl cursor-pointer w-max"}>
          <h1>{title}</h1>
          <div>-&gt;</div>
        </div>
        <ScrollerContainer>
          <CustomScrollbar ref={customScrollbarRef}>
            <CustomScrollbarThumb ref={customScrollbarThumbRef}></CustomScrollbarThumb>
          </CustomScrollbar>

          <ScrollerWrapper ref={scrollerRef}>
            {data?.results?.map((movie) => (
                <div className={"flex flex-col flex-wrap"} key={movie.id}>
                  <Card poster={movie.poster} />
                  <div className={"max-w-[200px] whitespace-pre-wrap px-3"}>
                    <h1>
                      {movie.title} ({new Date(movie.release_date).getFullYear()})
                    </h1>
                  </div>
                </div>
            ))}
          </ScrollerWrapper>
        </ScrollerContainer>
      </>
  );
};

const ScrollerContainer = styled.div`
  position: relative;
  padding: 0 2px;
  overflow: hidden;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50px;
    pointer-events: none;
    z-index: 2;
    visibility: hidden; // Start with the gradients hidden
  }

  html.light &::before {
    left: 0;
    background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0));
  }

  html.light &::after {
    right: 0;
    background: linear-gradient(to left, #fff, rgba(255, 255, 255, 0));
  }

  html.dark &::before {
    left: 0;
    background: linear-gradient(to right, #121212, rgba(0, 0, 0, 0));
  }

  html.dark &::after {
    right: 0;
    background: linear-gradient(to left, #121212, rgba(0, 0, 0, 0));
  }

  &.show-left-gradient::before {
    visibility: visible;
  }

  &.show-right-gradient::after {
    visibility: visible;
  }
`;
const ScrollerWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  white-space: nowrap;
  width: 100%;
  margin-top: 5px;

  &::-webkit-scrollbar {
    display: none;  // Hide default scrollbar
  }

  h1 {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
  }
`;
const Card = styled.div`
  flex: 0 0 auto;
  width: 200px;
  height: 300px;
  margin: 10px;
  background-color: #fff;
  background-image: url(${(props) => props.poster});
  background-size: cover;
  background-position: center;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    cursor: pointer;
  }
`;
const CustomScrollbar = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);  // This ensures it's centered
  height: 5px;
  width: 20%;  // You can adjust this width as needed
  background: #DFDFDF;
  z-index: 2;
  overflow: hidden;
  cursor: pointer;
  border-radius: 10px;

  html.dark & {
    background: #4F4F4F;
  }
`;
const CustomScrollbarThumb = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 20px; // Initial width, will adjust with JS
  height: 5px;
  background: #121212;
  border-radius: 10px;
  cursor: grab;

  &:active {
    cursor: grabbing;
  }

  user-select: none;
  
  html.dark & {
    background: #FFFFFF;
  }
`;

export default Scroller;
