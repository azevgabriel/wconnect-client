interface BadgeInterface {
  label: string;
  color: "red" | "blue" | "green" | "yellow" | "purple";
  size: "sm" | "xs";
}

const colorMap = {
  red: "bg-red-100 text-red-800",
  blue: "bg-blue-100 text-blue-800",
  green: "bg-green-100 text-green-800",
  yellow: "bg-yellow-100 text-yellow-800",
  purple: "bg-purple-100 text-purple-800",
};

const sizeMap = {
  sm: "text-sm",
  xs: "text-xs",
};

export const Badge = ({ label, color, size }: BadgeInterface) => {
  const colorClasses = colorMap[color] || "bg-gray-100 text-gray-800";
  const sizeClasses = sizeMap[size] || "text-sm";

  return (
    <span
      className={`${colorClasses} ${sizeClasses} font-medium me-2 px-2.5 py-1 rounded-sm`}
    >
      {label}
    </span>
  );
};
