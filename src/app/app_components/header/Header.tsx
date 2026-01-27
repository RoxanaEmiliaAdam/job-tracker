import { AddJob } from "@/app/add-job/AddJobService";
import AddJobButton from "./AddBtn";
import Link from "next/link";

import MyListButton from "./MyListBtn";

type HeaderProps = {
  job?: AddJob & { reminder?: { interviewDate: string } };
};

const Header: React.FC<HeaderProps> = ({ job }) => {
  console.log("header job", job);
  return (
    <header className="flex items-center justify-between px-2 py-2 shadow-md bg-white">
      {/* home button */}
      <Link href="/" className="flex items-center">
        <h1 className="text-4xl italic text-blue-800 font-bold hover:underline underline-offset-4">
          {" "}
          JobTrackr
        </h1>
      </Link>
      <div className="flex items-center gap-2">
        <MyListButton />
        <AddJobButton />
      </div>
    </header>
  );
};

export default Header;
