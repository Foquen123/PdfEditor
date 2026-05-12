import Link from 'next/link';

interface IProps {
  href: string;
  title: string;
  desc: string;
}

export default function ToolCard({ desc, href, title }: IProps) {
  return (
    <Link
      href={href}
      className="w-62.5 h-62.5 bg-primary border-border border rounded-[20px] p-6 flex flex-col gap-2.5 hover:border-text transition-all"
    >
      <h3 className="font-bold text-[22px]">{title}</h3>
      <p className="font-normal text-[14px]">{desc}</p>
    </Link>
  );
}
