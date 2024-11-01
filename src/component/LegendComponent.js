function LegendComponent() {
  return (
    <>
      {/* Legend container */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "15px 20px",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          borderRadius: "10px",
          zIndex: 500,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          width: "150px",
        }}
      >
        <h4
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#333",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Color Legend
        </h4>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              backgroundColor: "Red",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "10px",
              borderRadius: "3px",
            }}
          ></span>
          <span>Republican</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginBottom: "8px",
          }}
        >
          <span
            style={{
              backgroundColor: "Blue",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "10px",
              borderRadius: "3px",
            }}
          ></span>
          <span>Democrat</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              backgroundColor: "Yellow",
              display: "inline-block",
              width: "15px",
              height: "15px",
              marginRight: "10px",
              borderRadius: "3px",
            }}
          ></span>
          <span>Others</span>
        </div>
      </div>
    </>
  );
}

export default LegendComponent;
