import Link from "next/link";

export default function PageHeader({
  title,
  current,
}: {
  title: string;
  current: string;
}) {
  return (
    <div className="bg-navy py-[60px] text-white">
      <div className="mx-auto flex max-w-[1200px] flex-col items-start justify-between px-[12px] md:flex-row md:items-center">
        <h1 className="mb-2 text-[24px] font-bold text-white md:mb-0">
          {title}
        </h1>
        <ol className="m-0 flex list-none gap-[4px] p-0 text-sm">
          <li className="flex items-center gap-[4px]">
            <Link
              href="/"
              className="no-underline"
              style={{ color: "var(--color-accent)" }}
            >
              Home
            </Link>
            <i className="bi bi-chevron-right text-[12px] text-navm" />
          </li>
          <li className="capitalize text-navm">{current}</li>
        </ol>
      </div>
    </div>
  );
}