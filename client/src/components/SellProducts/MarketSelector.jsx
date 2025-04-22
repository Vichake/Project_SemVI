const MarketSelector = () => {
    return (
      <div className="market-selector">
        <h2 className="section-title">Select Market</h2>
        <div className="market-pills">
          <button className="market-pill market-pill-active" data-market="local">Local</button>
          <button className="market-pill" data-market="taluka">Taluka</button>
          <button className="market-pill" data-market="district">District</button>
          <button className="market-pill" data-market="online">Online</button>
        </div>
      </div>
    );
  };
  
  export default MarketSelector;
  