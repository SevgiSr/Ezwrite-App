function BackgroundPicture({ filename, timestamp, height }) {
  return (
    <div className="background" style={{ width: "100%", height: height }}>
      <img
        src={`/api/images/background/${filename}?t=${timestamp}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center center",
        }}
        alt=""
      />
    </div>
  );
}

export default BackgroundPicture;
