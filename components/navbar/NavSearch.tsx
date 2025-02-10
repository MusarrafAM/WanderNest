"use client";
import { Input } from "../ui/input";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { useState, useEffect } from "react";

// Since in NabSearch we don't have any Link or button we need to programmatically redirect to user to the homepage with searchParams.
function NavSearch() {
  const searchParams = useSearchParams(); //This is how we get the search params in the client component.

  const { replace } = useRouter(); // with the replace we can programmatically redirect the user.
  const [search, setSearch] = useState(searchParams.get("search")?.toString() || "");

  const handleSearch = useDebouncedCallback((value: string) => {
    //! with the URLSearchParams method we don't remove the existing search params.
    const params = new URLSearchParams(searchParams); // create our new searchParams
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
    replace(`/?${params.toString()}`); // programmatically redirection to homepage with searchparams.
  }, 300); // 0.3 sec debounce

  // this useEffect is extra no need to worry, if the user remove the "search" from url manually,
  // it update the search state to empty. this is really an extra no need to worry.
  useEffect(() => {
    if (!searchParams.get("search")) {
      setSearch("");
    }
  }, [searchParams.get("search")]);

  return (
    <Input
      type="search" // this will add the close clear or close button when type something in input field.
      placeholder="find a property..."
      className="max-w-xs dark:bg-muted "
      onChange={(e) => {
        setSearch(e.target.value); // updating the search state.
        handleSearch(e.target.value); // this will handle the debounced redirection to the homepage with new search.
      }}
      value={search}
    />
  );
}
export default NavSearch;
