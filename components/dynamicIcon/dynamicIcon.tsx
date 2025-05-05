// components/DynamicIcon.tsx
"use client";

import * as Icons from "lucide-react";
import { LucideProps } from "lucide-react";
import { ComponentType } from "react";

type IconName = keyof typeof Icons;

type Props = {
  name: IconName;
  size?: number;
  color?: string;
};

export default function DynamicIcon({
  name,
  size = 24,
  color = "currentColor",
}: Props) {
  const LucideIcon = Icons[name];

  const isValidIcon =
    typeof LucideIcon === "function" || typeof LucideIcon === "object";

  if (!isValidIcon) {
    const Fallback = Icons.HelpCircle;
    return <Fallback size={size} color="red" />;
  }

  const IconComponent = LucideIcon as ComponentType<LucideProps>;
  return <IconComponent size={size} color={color} />;
}
