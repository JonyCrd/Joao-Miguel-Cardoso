export default function Select({ data, setFrom, setTo }) {
  return (
    <div className="caixa w-full">
      <h1>Select currency</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          width: "100%",
        }}
      >
        <div>
          <h3>From</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            {data.map((item) => (
              <button
                className="currencyBtn rounded w-30"
                onClick={() => setFrom(item)}
              >
                {item.currency}
              </button>
            ))}
          </div>
        </div>
        <div>
          <h3>To</h3>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              maxHeight: "200px",
              overflow: "auto",
            }}
          >
            {data.map((item) => (
              <button className="rounded w-30" onClick={() => setTo(item)}>
                {item.currency}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
