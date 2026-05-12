import { ReactNode } from "react";

export default function PageDescription({ children }: { children: ReactNode }) {
  return (
    <p className="font-normal text-[22px] text-center text-text">{children}</p>
  );
}
