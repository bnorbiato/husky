import * as React from "react";

interface ICardHeaderProps {
  title: string;
  subtitle?: string;
}

export default function AssitiveHeader({ title, subtitle }: ICardHeaderProps) {
  return (
    <>
      <p>
        {title}
      </p>
      {subtitle && (
        <p>
          {subtitle}
        </p>
      )}
    </>
  );
}
