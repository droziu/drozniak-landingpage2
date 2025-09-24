
import React, { useState, useEffect, useRef } from 'react';

export const useFadeIn = <T extends HTMLElement,>() => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<T | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const animationClasses = isVisible
    ? 'opacity-100 translate-y-0'
    : 'opacity-0 translate-y-5';
  
  const transitionClasses = 'transition-all duration-1000 ease-in-out';

  return { ref: domRef, className: `${transitionClasses} ${animationClasses}` };
};
