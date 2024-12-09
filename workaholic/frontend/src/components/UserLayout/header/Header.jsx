import { Link } from "react-router-dom";
import UserSection from "./UserSection";
import SearchBox from "./SearchBox";

const Header = () => {
  return (
    <div className="flex flex-col fixed bg-blue-900 left-0 right-0 top-0 px-4 md:px-12 gap-4 py-2 z-[10] w-full">
      {/* Header Section */}
      <div className="flex flex-wrap w-full justify-between items-center mt-4 gap-4 md:gap-6">
        <Link
          to="/"
          style={{
            backgroundImage: `url('picture/logo.png')`,
          }}
          className="h-[30px] w-[80px] md:h-[40px] md:w-[120px] bg-no-repeat bg-contain bg-center"
        ></Link>

        {/* On smaller screens, search box and user section stack */}
        <div className="flex flex-grow justify-center">
          <SearchBox />
        </div>

        {/* User section aligned on the right */}
        <div className="flex justify-end flex-shrink-0">
          <UserSection />
        </div>
      </div>

      <div className="separator w-full border-b border-blue-500"></div>
    </div>
  );
};

export default Header;
