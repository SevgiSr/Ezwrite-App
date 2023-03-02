function Cover({ width, filename }) {
  const numericWidth = parseFloat(width);
  return (
    <img
      style={{
        width: width,
        height: numericWidth * (125 / 80) + "px",
        objectFit: "cover",
        boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
      }}
      src={`/images/cover/${filename}`}
      alt=""
    />
  );
}

export default Cover;
