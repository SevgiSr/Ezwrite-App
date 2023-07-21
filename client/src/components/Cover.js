function Cover({ width, filename, timestamp }) {
  const numericWidth = parseFloat(width);
  const imageUrl = `/api/images/cover/${filename}?t=${timestamp}`;
  return (
    <img
      style={{
        width: width,
        height: numericWidth * (125 / 80) + "px",
        objectFit: "cover",
        boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
      }}
      src={imageUrl}
      alt=""
    />
  );
}

export default Cover;
