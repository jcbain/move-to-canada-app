import { useState } from "react";
import RoutePath from "./components/RoutePath";
import { geoEquirectangular, geoPath } from "d3-geo";
import routes from "./data/calgary_to_kc.json";

function App() {
  const [offset, setOffset] = useState(0);

  const projection = geoEquirectangular().fitSize([800, 500], routes);
  const pathGenerator = geoPath().projection(projection);
  const pathData = pathGenerator(routes.features[12]);
  return (
    <div className="App">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3">
        <g transform="translate(0,0) scale(1)">
          <RoutePath pathData={pathData} percentShown={50.5} />
        </g>
      </svg>
      <button onClick={() => setOffset((prev) => prev + 1)}>
        Update {offset}
      </button>
    </div>
  );
}

export default App;
