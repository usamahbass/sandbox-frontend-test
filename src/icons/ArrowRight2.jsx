const ArrowRightTwo = ({ w = "12", h = "12", color = "#5dc3b2" }) => (
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
      strokeMiterlimit="10"
      strokeWidth="1.5"
      d="M8.91 19.92l6.52-6.52c.77-.77.77-2.03 0-2.8L8.91 4.08"
    />
  </svg>
);

export default ArrowRightTwo;
