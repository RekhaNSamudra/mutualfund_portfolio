import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import PortfolioList from "../PortfolioList/PortfolioList";
import SearchMutualFunds from "../SearchMutualFunds/SearchMutualFunds";

function AllRoutes({
  filteredResults,
  searchItems,
  addToPortfolio,
  portfolio,
  sellFromPortfolio,
}) {
  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <SearchMutualFunds
                searchItems={searchItems}
                filteredResults={filteredResults}
                addToPortfolio={addToPortfolio}
              />
            }
          />
          <Route
            path="/portfolio"
            element={
              <PortfolioList
                addToPortfolio={addToPortfolio}
                portfolio={portfolio}
                sellFromPortfolio={sellFromPortfolio}
              />
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default AllRoutes;
