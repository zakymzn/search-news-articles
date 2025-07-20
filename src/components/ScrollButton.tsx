import { useEffect, useState } from "react";

function ScrollButton() {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      if (window.pageYOffset > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    }
  }, []);

  return (
    <button onClick={() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }} className={`${showScrollButton ? '' : 'hidden'} fixed bottom-4 right-4 p-4 rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-black hover:fill-white hover:cursor-pointer hover:animate-pulse`}>
      <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" /></svg>
    </button>
  )
}

export default ScrollButton