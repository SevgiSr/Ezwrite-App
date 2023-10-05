function Cover({ width, filename, timestamp }) {
  const numericWidth = parseFloat(width);
  const imageUrl = `/api/images/cover/${filename}?t=${timestamp}`;
  const height = numericWidth * (125 / 80) + "px";
  if (!filename) {
    return (
      <div
        style={{
          width: width,
          height: height,
          backgroundColor: "var(--font2)",
          boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
        }}
      ></div>
    );
  }
  return (
    <img
      style={{
        width: width,
        height: height,
        objectFit: "cover",
        boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
      }}
      src={imageUrl}
      alt=""
    />
  );
}

export default Cover;
