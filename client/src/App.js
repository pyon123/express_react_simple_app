import { useState, useEffect } from "react";
import { getRequest } from "./utils/request";

import "./App.css";

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getRequest("/data");
        setData(
          (response || []).filter((item) =>
            item.symbol.toLowerCase().startsWith("a")
          )
        );
      } catch (error) {
        setData([]);
      }
    }
    fetchData();

    return () => {};
  }, []);

  return (
    <div>
      <ul>
        {data.map((item, i) => (
          <li key={i}>
            <a href={`https://finance.yahoo.com/quote/${item.symbol}`}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
