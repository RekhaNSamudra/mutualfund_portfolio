import React from "react";
import { Link } from "react-router-dom";
import Data from "../data/data";
import { List } from "react-virtualized";
import "./SearchMutualFunds.css";

function SearchMutualFunds({ filteredResults, searchItems, addToPortfolio }) {
  const data = Data();
  console.log(data);

  console.log("filter", filteredResults);

  const renderRow = ({ index, key, style }) => {
    return (
      <div key={key} style={style} className="row">
        <div className="content">
          <div>{filteredResults[index].schemeName}</div>
          <div>
            <button
              className="select"
              onClick={() => addToPortfolio(filteredResults[index])}
            >
              {" "}
              Select
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h1>Mutual Funds</h1>

      <input
        type="search"
        className="search-bar"
        onChange={(e) => searchItems(e.target.value)}
        placeholder="Search Mutual funds... eg: SBI"
      />
      <Link to="/portfolio">
        {" "}
        <h3 className="portfolioList">Portfolio List</h3>
      </Link>
      {filteredResults.length === 0 ? (
        <div className="list">
          <List
            width={600}
            height={400}
            rowCount={data.length}
            rowHeight={80}
            rowRenderer={({ key, style, index }) => {
              const fund = data[index];
              return (
                <div style={style} key={key}>
                  <h5>{fund.schemeName}</h5>
                </div>
              );
            }}
          />
        </div>
      ) : (
        <div className="list">
          <List
            width={600}
            height={400}
            rowCount={filteredResults.length}
            rowHeight={80}
            rowRenderer={renderRow}
          />
        </div>
      )}
    </div>
  );
}

export default SearchMutualFunds;
