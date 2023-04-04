import { useState, useEffect } from "react";

function Data() {
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("https://api.mfapi.in/mf");
        const result = await response.json();

        setData(result);
      } catch (error) {
        console.log("error", error); //Error handling
      }
    })();
  }, []);

  return data;
}
export default Data;
