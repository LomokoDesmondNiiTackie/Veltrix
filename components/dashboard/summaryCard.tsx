import React from "react";

interface SummaryCardProps {
  readonly title: string;
  readonly value: string | number;
  readonly icon: React.ElementType;
  readonly iconColor: string;
  readonly backgroundColor?: string;
  readonly borderColor?: string;
  readonly textColor?: string;
}

export default function SummaryCard({
  title,
  value,
  icon: Icon,
  iconColor,
  backgroundColor,
  borderColor,
  textColor,
}: SummaryCardProps) {
  return (
    <div className={`dark:bg-gray-800 shadow-card w-full rounded-2xl overflow-hidden border-2  ${borderColor} ${backgroundColor}`}>
      <div className="h-full w-full flex justify-center lg:justify-between items-center gap-3">
        <div className="w-[60%] h-full flex flex-col justify-center items-center p-5 ">
          <h3 className={`${textColor}`}>{title}</h3>
          <p className={`text-[3.5em] ${textColor} font-bold`}>{value}</p>
        </div>
        <div className={` w-[40%] h-[80%] flex justify-center items-center ${iconColor} hidden lg:flex`}>
          <Icon className="h-20 w-20" />
        </div>
      </div>
    </div>
  );
}
