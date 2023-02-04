import src from "./cover.jpg";

function Cover({ width, height }) {
  return (
    <img
      style={{
        width: "100%",
        boxShadow: "0 8px 12px rgb(18 18 18 / 16%)",
      }}
      src={src}
      alt=""
    />
  );
}

export default Cover;
