export default function Mark(color: string) {
  return (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M17 10.4L17 27.5L23 24.5L23 4L18 6.5L17 7L15 8L17 10.4ZM17 36L17 31L23 28L23 33L17 36Z"
      fill={color}
    />
  );
}
