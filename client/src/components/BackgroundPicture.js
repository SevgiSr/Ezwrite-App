function BackgroundPicture({ filename, timestamp }) {
  return (
    <div className="background">
      <img src={`/images/background/${filename}?t=${timestamp}`} alt="" />
    </div>
  );
}

export default BackgroundPicture;
