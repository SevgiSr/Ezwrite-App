import StyledBlob from "./styles/Blob.styled";

function Blob() {
  return (
    <StyledBlob>
      <svg
        viewBox="0 0 800 500"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="100%"
        id="blobSvg"
      >
        <g transform="translate(134.13898468017578, 0.10846710205078125)">
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "rgb(255, 97, 34)" }}
              ></stop>
              <stop
                offset="100%"
                style={{ stopColor: "rgb(255, 195, 113)" }}
              ></stop>
            </linearGradient>
          </defs>
          <path fill="url(#gradient)">
            <animate
              attributeName="d"
              dur="10000ms"
              repeatCount="indefinite"
              values="M460.5,298.5Q435,347,395,374.5Q355,402,314.5,425.5Q274,449,232,428Q190,407,138,401Q86,395,62.5,348.5Q39,302,60,255Q81,208,80,153.5Q79,99,125.5,71.5Q172,44,220.5,69.5Q269,95,318,88Q367,81,401,117Q435,153,460.5,201.5Q486,250,460.5,298.5Z; M428,295Q421,340,394.5,380Q368,420,318.5,413Q269,406,232,401Q195,396,129.5,405.5Q64,415,45,360Q26,305,60.5,258.5Q95,212,94.5,162Q94,112,129,67Q164,22,221.5,17Q279,12,332.5,32.5Q386,53,409,103.5Q432,154,433.5,202Q435,250,428,295Z; M458.5,295.5Q424,341,379.5,357Q335,373,306,420.5Q277,468,220.5,472.5Q164,477,133,429Q102,381,87,337.5Q72,294,49.5,244.5Q27,195,76,167Q125,139,157.5,115.5Q190,92,230,88.5Q270,85,316.5,85.5Q363,86,407,115Q451,144,472,197Q493,250,458.5,295.5Z; M437.5,302.5Q450,355,415,396.5Q380,438,329,459Q278,480,235,441.5Q192,403,162,378.5Q132,354,117,320.5Q102,287,77.5,244Q53,201,83,164.5Q113,128,153,114Q193,100,234.5,68.5Q276,37,319.5,62Q363,87,413.5,112.5Q464,138,444.5,194Q425,250,437.5,302.5Z; M474.5,305Q460,360,399.5,369.5Q339,379,309,433.5Q279,488,225.5,472Q172,456,123,431Q74,406,42,357.5Q10,309,50,260Q90,211,90.5,160.5Q91,110,128.5,69.5Q166,29,219.5,46.5Q273,64,329.5,59Q386,54,421,98Q456,142,472.5,196Q489,250,474.5,305Z; M460.5,298.5Q435,347,395,374.5Q355,402,314.5,425.5Q274,449,232,428Q190,407,138,401Q86,395,62.5,348.5Q39,302,60,255Q81,208,80,153.5Q79,99,125.5,71.5Q172,44,220.5,69.5Q269,95,318,88Q367,81,401,117Q435,153,460.5,201.5Q486,250,460.5,298.5Z;"
            ></animate>
          </path>
        </g>
      </svg>
    </StyledBlob>
  );
}

export default Blob;