import { useState } from "react";
import RoutePath from "./components/RoutePath";
import { geoEquirectangular, geoPath, geoMercator } from "d3-geo";
import routes from "./data/calgary_to_kc.json";

function App() {
  const [offset, setOffset] = useState(0);
  const [width, setWidth] = useState(800);
  const [scale, setScale] = useState(1);
  const [fields, setFields] = useState({ x: 0, y: 0 });

  const projection = geoMercator();
  const pathGenerator = geoPath().projection(projection);
  const pathData = pathGenerator(routes.features[12]);

  console.log("bounds", projection.center());

  console.log("reoutes", routes.features[12]);
  return (
    <div className="App">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g
          transform={`translate(120, 0) scale(${scale})`}
          width="100%"
          height="100%"
        >
          <RoutePath pathData={pathData} percentShown={50.5} />
        </g>
      </svg>
      <button onClick={() => setOffset((prev) => prev + 1)}>
        Update {offset}
      </button>
      <button onClick={() => setWidth((prev) => prev - 10)}>
        Width {width}
      </button>
      <button onClick={() => setScale((prev) => prev + 0.1)}>
        Scale {scale}
      </button>
      <div>
        x: {fields.x}
        y: {fields.y}
      </div>
      <button onClick={() => setFields((prev) => ({ ...prev, x: prev.x + 1 }))}>
        up x
      </button>
      <button onClick={() => setFields((prev) => ({ ...prev, x: prev.x - 1 }))}>
        down x
      </button>
      <button onClick={() => setFields((prev) => ({ ...prev, y: prev.y + 1 }))}>
        up x
      </button>
      <button onClick={() => setFields((prev) => ({ ...prev, y: prev.y - 1 }))}>
        down y
      </button>
    </div>
  );
}

export default App;
