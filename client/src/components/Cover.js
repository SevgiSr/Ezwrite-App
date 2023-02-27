import src from "./cover.jpg";

function Cover({ width, height, filename }) {
  return (
    <img
      style={{
        width: width,
        height: height,
        objectFit: "cover",
        boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
      }}
      src={`/images/cover/${filename}`}
      alt=""
    />
  );
}

export default Cover;
