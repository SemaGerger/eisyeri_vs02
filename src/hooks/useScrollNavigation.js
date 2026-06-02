import { useRef, useState, useEffect, useCallback } from "react";

export const useScrollNavigation = () => {
  const containerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalVisibleItems, setTotalVisibleItems] = useState(0);

  const updateScrollIndicator = useCallback(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const containerWidth = container.clientWidth;
      const itemWidth = container.querySelector('.scroll-item')?.offsetWidth || 240;
      const visibleItems = Math.floor(containerWidth / itemWidth);
      
      setTotalVisibleItems(visibleItems);
      
      const scrollPos = container.scrollLeft;
      const newIndex = Math.floor(scrollPos / itemWidth);
      setCurrentIndex(newIndex);
    }
  }, []);

  const checkScrollPosition = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      updateScrollIndicator();
    }
  }, [updateScrollIndicator]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollPosition);
      window.addEventListener("resize", checkScrollPosition);
      checkScrollPosition();
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScrollPosition);
      }
      window.removeEventListener("resize", checkScrollPosition);
    };
  }, [checkScrollPosition]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - containerRef.current.offsetLeft);
    setScrollLeft(containerRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollLeftHandler = () => {
    containerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRightHandler = () => {
    containerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const scrollToIndex = (index) => {
    if (containerRef.current) {
      const itemWidth = containerRef.current.querySelector('.scroll-item')?.offsetWidth || 240;
      containerRef.current.scrollTo({
        left: index * itemWidth,
        behavior: "smooth"
      });
    }
  };

  return {
    containerRef,
    showLeftArrow,
    showRightArrow,
    currentIndex,
    totalVisibleItems,
    scrollLeftHandler,
    scrollRightHandler,
    scrollToIndex,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove
  };
};