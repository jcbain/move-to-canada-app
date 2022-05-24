import { useState, useEffect, useRef } from "react";

const RoutePath = ({ percentShown, pathData }) => {
  const ref = useRef();
  const [pathLength, setLength] = useState(null);

  const distance = pathLength - (percentShown / 100) * pathLength;
  console.log("distance", distance);

  useEffect(() => {
    if (ref.current) {
      console.log(ref.current.getTotalLength());
      setLength(ref.current.getTotalLength());
    }
  });

  return (
    <>
      <path
        ref={ref}
        d={pathData}
        fill={"none"}
        stroke="lightgray"
        strokeWidth={5}
      />
      ;
      {pathLength !== null && (
        <path
          d={pathData}
          fill={"none"}
          stroke="blue"
          strokeWidth={5}
          strokeDasharray={`${pathLength} ${pathLength}`}
          strokeDashoffset={`-${distance}`}
        />
      )}
      ;
    </>
  );
};

export default RoutePath;
