import { Input } from "@/components/ui/input";

const NavSearch = () => {
  return (
    <Input
      type="text"
      placeholder="Search for a property..."
      className="max-w-sm dark:bg-muted"
    />
  );
};
export default NavSearch;
