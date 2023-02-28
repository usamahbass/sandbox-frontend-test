const SortDownIcon = ({ isActive }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="sorted descending"
  >
    <g clip-path="url(#clip0_650_6755)">
      <path d="M7.99976 2L3.99976 6L-0.000245094 2L7.99976 2Z" fill="#B7C1CC" />
    </g>
    <defs>
      {isActive && (
        <linearGradient
          id="paint0_linear_650_6752"
          x1="-0.788414"
          y1="4"
          x2="8.78793"
          y2="4"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#276CBD" />
          <stop offset="1" stop-color="#2D49AB" />
        </linearGradient>
      )}
      <clipPath id="clip0_650_6755">
        <rect
          width="8"
          height="8"
          fill="white"
          transform="translate(7.99976 8) rotate(-180)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SortDownIcon;
