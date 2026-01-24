"use client";

interface IconProps {
  name: "user";
  size?: number;
  className?: string;
}

export default function Icon({
  name,
  size = 20,
  className = ""
}: IconProps) {
  return (
    <img
      src={`/icons/${name}.svg`}
      width={size}
      height={size}
      alt={`${name} icon`}
      className={className}
    />
  );
}
