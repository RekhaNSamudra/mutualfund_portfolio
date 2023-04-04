import { useState } from "react";
import "./App.css";
import AllRoutes from "./Components/AllRoutes/AllRoutes";
import Data from "../src/Components/data/data";

function App() {
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [portfolio, setPortfolio] = useState([]);

  const data = Data();
  console.log(data);

  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      let result = data.filter((fund) =>
        fund.schemeName.toLowerCase().includes(searchValue.toLowerCase())
      );
      setFilteredResults(result);
    }
  };

  const addToPortfolio = (item) => {
    const itemExist = portfolio.find(
      (curItem) => curItem.schemeCode === item.schemeCode
    );

    if (itemExist) {
      setPortfolio(
        portfolio.map((curItem) =>
          curItem.schemeCode === item.schemeCode
            ? { ...itemExist, units: itemExist.units + 1 }
            : curItem
        )
      );
    } else {
      setPortfolio([...portfolio, { ...item, units: 1 }]);
    }
  };

  const sellFromPortfolio = (item) => {
    const itemExist = portfolio.find(
      (curItem) => curItem.schemeCode === item.schemeCode
    );
    if (itemExist.units === 1) {
      setPortfolio(
        portfolio.filter((curItem) => curItem.schemeCode === item.schemeCode)
      );
    } else {
      setPortfolio(
        portfolio.map((curItem) =>
          curItem.schemeCode === item.schemeCode
            ? { ...itemExist, units: itemExist.units - 1 }
            : curItem
        )
      );
    }
  };

  return (
    <div className="App">
      <AllRoutes
        searchItems={searchItems}
        filteredResults={filteredResults}
        addToPortfolio={addToPortfolio}
        portfolio={portfolio}
        sellFromPortfolio={sellFromPortfolio}
      />
    </div>
  );
}

export default App;
