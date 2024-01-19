import { Button, Sidebar } from "flowbite-react";
import { GiHamburgerMenu } from "react-icons/gi";
import { HiInbox } from "react-icons/hi2";

const HomeHeader = () => {
  return (
    <div className="flex items-center justify-between py-2 mx-2">
      <div className="mx-2">
        <h2 className="px-4 py-2 text-xl font-semibold">Home</h2>
      </div>
      <div className="sm:hidden">
        <Button color="gray" className="border-none">
          <GiHamburgerMenu />
        </Button>
      </div>
    </div>
  );
};

export default HomeHeader;
