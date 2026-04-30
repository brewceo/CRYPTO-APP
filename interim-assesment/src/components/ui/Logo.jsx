const Logo = ({ height = 28, className = "" }) => (
  <svg
    aria-label="Crypto App"
    role="img"
    viewBox="0 0 40 40"
    height={height}
    style={{ height: `${height}px`, width: "auto", display: "block" }}
    className={className}
  >
    <title>Crypto App</title>
    <circle cx="20" cy="20" r="20" fill="#0052FF" />
    <path
      d="M20 6C12.268 6 6 12.268 6 20s6.268 14 14 14c6.23 0 11.5-4.06 13.32-9.67H25.7A6.9 6.9 0 1125.7 15.7h7.62C31.5 10.06 26.23 6 20 6z"
      fill="white"
    />
  </svg>
);

export default Logo;
