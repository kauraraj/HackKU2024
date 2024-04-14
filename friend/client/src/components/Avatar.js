// This component is called Avatar and it takes a prop called isGptUser
const Avatar = ({ isGptUser }) => {
  return (
    <div>
      {/* This is an SVG element */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={41}
        height={41}
        fill="none"
        strokeWidth={1.5}
        className="h-6 w-6"
      >
        {/* If isGptUser is true, render the first path */}
        {isGptUser ? (
          <path
            fill="currentColor"
            d="M20.5 0C9.17 0 0 9.17 0 20.5c0 7.755 4.846 14.386 11.692 17.07v4.43c0 .507.415.923.923.923.274 0 .529-.12.706-.327l3.462-3.231h.846l3.462 3.231c.177.207.432.327.706.327.508 0 .923-.416.923-.923v-4.43C35.654 34.886 40.5 28.255 40.5 20.5 40.5 9.17 31.33 0 20.5 0zm0 7.846c5.472 0 9.923 4.452 9.923 9.923S25.972 27.692 20.5 27.692 10.577 23.24 10.577 17.77c0-5.472 4.452-9.923 9.923-9.923zm0 2.769c-4.423 0-8.154 3.731-8.154 8.154 0 .507.415.923.923.923.508 0 .923-.416.923-.923 0-3.402 2.77-6.173 6.231-6.173 3.461 0 6.231 2.77 6.231 6.173 0 .507.415.923.923.923.508 0 .923-.416.923-.923 0-4.423-3.731-8.154-8.154-8.154z"
          />

        ) : (
          /* If isGptUser is false, render the second path */
          <path
            fill="currentColor"
            d="M6.462 0H31.538C34.34 0 36.692 2.352 36.692 5.154v31.692C36.692 39.648 34.34 42 31.538 42H6.462C3.66 42 1.308 39.648 1.308 36.846V5.154C1.308 2.352 3.66 0 6.462 0zm0 4.846c-.85 0-1.538.688-1.538 1.538v2.308c0 .85.688 1.538 1.538 1.538h25.077c.85 0 1.538-.688 1.538-1.538V6.385c0-.85-.688-1.538-1.538-1.538H6.462zm0 32.308c-.85 0-1.538-.688-1.538-1.538V8.615c0-.85.688-1.538 1.538-1.538h25.077c.85 0 1.538.688 1.538 1.538v27.692c0 .85-.688 1.538-1.538 1.538H6.462z"
          />

        )}
      </svg>
    </div>
  );
};

export default Avatar;
