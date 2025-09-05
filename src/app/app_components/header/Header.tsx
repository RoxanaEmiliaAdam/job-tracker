import AddJobButton from "./AddBtn";
import MyListButton from "./MyListBtn";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-2 py-2 shadow-md bg-white">
      <h1 className="text-4xl italic text-blue-800 font-bold"> JobTrackr</h1>
      <div className="flex items-center gap-2">
        <MyListButton />
        <AddJobButton />
      </div>
    </header>
  );
};

export default Header;
