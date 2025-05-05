const Heading = ({
  title,
  desc,
  className,
}: {
  title: string;
  desc?: string;
  className?: string;
}) => {
  return (
    <div className={`space-y-3 ${className}`}>
      <h1 className="text-displaysm text-black">{title}</h1>
      {desc && <p className="text-black/70 text-textmd max-w-5xl">{desc}</p>}
    </div>
  );
};
export default Heading;
