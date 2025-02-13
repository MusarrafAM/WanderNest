import NavSearch from "./NavSearch";
import LinksDropdown from "./LinksDropdown";
import DarkMode from "./DarkMode";
import Logo from "./Logo";

const Navbar = () => {
  // below container class is the custom tailwind class we created and its in the global.css
  return (
    <nav className="border-b sticky top-0 z-50 bg-background/30 backdrop-blur-md">
      <div className="container flex flex-col sm:flex-row sm:justify-between sm:items-center flex-wrap gap-4 py-8">
        {/* mobile dropdown and theme selector */}
        <div className="sm:hidden flex justify-between">
          <Logo />
          <div className="flex gap-4 items-center">
            <DarkMode />
            <LinksDropdown />
          </div>
        </div>

        <div className="hidden sm:block">
          <Logo />
        </div>
        <NavSearch />

        <div className="sm:flex gap-4 items-center hidden">
          <DarkMode />
          <LinksDropdown />
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
