const ArrowLeftTwo = ({ color = "#FF8A65", w = "24px", h = "24px" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={w}
    height={h}
    viewBox="0 0 24 24"
    fill="none"
  >
    <path
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth="1.5"
      d="M15 19.92L8.48 13.4c-.77-.77-.77-2.03 0-2.8L15 4.08"
    />
  </svg>
);

export default ArrowLeftTwo;
