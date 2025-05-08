import { Link } from "@/i18n/routing";

const HeadingButton = ({ title, link }: { title: string; link: string }) => {
  return (
    <Link href={link}>
      <button className="capitalize border border-gray-400 rounded-full px-4 py-1 text-sm">
        {title}
      </button>
    </Link>
  );
};
export default HeadingButton;
