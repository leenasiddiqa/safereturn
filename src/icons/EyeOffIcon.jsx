// src/icons/EyeOffIcon.jsx
export default function EyeOffIcon({ className, ...props }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      {...props}
    >
      {/* Eye shape */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.98 8.223A10.477 10.477 0 0 0 2.036 12.322a1.012 1.012 0 0 0 0 .639C3.423 17.49 7.36 20.5 12 20.5c1.62 0 3.156-.34 4.53-.94M21.964 12.322a1.012 1.012 0 0 0 0-.639C20.577 7.01 16.64 4 12 4c-.94 0-1.859.112-2.746.32"
      />
      {/* Slash line */}
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"
      />
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3 21 21" />
    </svg>
  );
}
