import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../PortfolioList/PortfolioList.css";

function PortfolioList({ portfolio, addToPortfolio, sellFromPortfolio }) {
  const [data, setData] = useState({ data: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");

  const [isPopup, setPopup] = useState(false);

  console.log("in pl", portfolio);
  let total = portfolio.reduce(function (acc, obj) {
    return acc + obj?.units;
  }, 0);

  const handleClick = async (schemecode) => {
    setIsLoading(true);
    console.log("code", schemecode);
    try {
      const response = await fetch(`https://api.mfapi.in/mf/${schemecode}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setData(result);
      setPopup(true);
    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div>
      <h1>Portfolio List</h1>

      <div style={{ display: "flex", marginLeft: "50%" }}>
        <h4 style={{ marginRight: "10px" }}>
          <Link to="/">Search Mutual Funds</Link>
        </h4>
        <h3 style={{ color: "#006666", marginLeft: "25px" }}>
          Total Units: {total}
        </h3>
      </div>
      {err && <h2>{err}</h2>}
      <div className="portfolio">
        {portfolio.length === 0 ? (
          <h3>
            your portfolio is empty....please search & select the mutual funds{" "}
          </h3>
        ) : null}
        {portfolio.map((mutualFund) => {
          return (
            <div key={mutualFund.schemeCode}>
              <h6>{mutualFund?.schemeName}</h6>
              <p>units: {mutualFund?.units}</p>

              <button onClick={() => handleClick(mutualFund.schemeCode)}>
                Details
              </button>
              <hr />
            </div>
          );
        })}
      </div>
      {isLoading && <h2>Loading...</h2>}

      {console.log("details", data)}

      {isPopup && (
        <div className="popUp">
          <div className="para">
            <p>
              <strong>fund name: </strong>
              {data.meta.scheme_name}
            </p>
            <p>
              <strong>fund house: </strong> {data.meta.fund_house}
            </p>
            <p>
              <strong>nav: </strong>
              {data.data[0].nav}
            </p>
            <p>
              <strong>scheme category: </strong>
              {data.meta.scheme_category}
            </p>
            <p>
              <strong>scheme type: </strong>
              {data.meta.scheme_type}
            </p>
          </div>
          <button className="close" onClick={() => setPopup(false)}>
            X
          </button>
          {portfolio
            .filter((item) => item.schemeCode === data.meta.scheme_code)
            .map((item, index) => {
              return (
                <div key={index} className="buySell">
                  <button onClick={() => addToPortfolio(item)}>Buy</button>
                  <p>Available units: {item.units}</p>
                  <button onClick={() => sellFromPortfolio(item)}>Sell</button>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}

export default PortfolioList;
