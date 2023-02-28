const SortUpIcon = ({ isActive }) => (
  <svg
    width="8"
    height="8"
    viewBox="0 0 8 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="sorted ascending"
  >
    <g clip-path="url(#clip0_650_6752)">
      <path
        d="M-0.000244141 6L3.99976 2L7.99976 6H-0.000244141Z"
        fill="url(#paint0_linear_650_6752)"
      />
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
      <clipPath id="clip0_650_6752">
        <rect
          width="8"
          height="8"
          fill="white"
          transform="translate(-0.000244141)"
        />
      </clipPath>
    </defs>
  </svg>
);

export default SortUpIcon;
