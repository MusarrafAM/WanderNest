import { LuUser2 } from "react-icons/lu";
import { fetchProfileImage } from "@/utils/actions";

// this is a server action
async function UserIcon() {
  const profileImage = await fetchProfileImage();

  if (profileImage)
    // since its a very small image its okay to use normal img tag instead of Image from nextjs
    return <img src={profileImage} className="w-6 h-6 rounded-full object-cover" />;
  return <LuUser2 className="w-6 h-6 bg-primary rounded-full text-white" />;
}
export default UserIcon;
