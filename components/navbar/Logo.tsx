import Link from "next/link";
import { LuTent } from "react-icons/lu";
import { Button } from "../ui/button";

const Logo = () => {
  return (
    // this as child from shandcn doc, this tells that make the button as child which is Link.
    <Button size="icon" asChild>
      <Link href="/">
        <LuTent className="w-6 h-6" />
      </Link>
    </Button>
  );
};
export default Logo;
