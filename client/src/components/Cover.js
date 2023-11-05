function Cover({ width, filename, timestamp }) {
  const numericWidth = parseFloat(width);
  const imageUrl = `/api/images/cover/${filename}?t=${timestamp}`;
  const height = numericWidth * (125 / 80) + "px";
  if (!filename) {
    return (
      <div
        style={{
          maxWidth: width,
          height: height,
          backgroundColor: "var(--font2)",
          boxShadow: "0 8px 12px rgb(8 8 8 / 18%)",
          borderRadius: "8px",
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
        boxShadow: "0 8px 12px rgb(8 8 8 / 18%)",
        borderRadius: "8px",
      }}
      src={imageUrl}
      alt=""
    />
  );
}

export default Cover;
