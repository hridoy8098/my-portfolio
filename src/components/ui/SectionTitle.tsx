export default function SectionTitle({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-[40px] max-w-[1200px] px-[15px] sm:px-6 sm:mb-[60px]">
      <h2 className="relative mb-5 pb-5 text-[26px] font-bold uppercase tracking-[2px] text-heading sm:text-[32px]">
        {title}
        <span className="absolute bottom-0 left-0 block h-[3px] w-[50px] bg-accent" />
      </h2>
      <p className="m-0 text-[15px] leading-relaxed text-body">{subtitle}</p>
    </div>
  );
}