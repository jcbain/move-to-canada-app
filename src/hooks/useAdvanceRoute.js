import { useState, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useAdvanceRoute = (ref, trigger) => {
  const [moveForward, setMoveForward] = useState(false);

  useEffect(() => {
    if (ref.current) {
      gsap.to(ref.current, {
        scrollTrigger: {
          trigger: trigger.current,
          markers: true,
          start: "top 50%",
          onEnter: () => setMoveForward(true),
          onLeaveBack: () => setMoveForward(false),
        },
      });
    }
  }, []);

  return moveForward;
};

export default useAdvanceRoute;
