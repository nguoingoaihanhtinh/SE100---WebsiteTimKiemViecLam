import { Link } from "react-router-dom";
import Navigation from "./Navigation";
import UserSection from "./UserSection";
import SortBar from "../../filter/SortBar";

const Header = () => {
  return (
    <div className="flex flex-col fixed bg-blue-900 h-[224px] left-0 right-0 top-0 items-center px-6 md:px-24 gap-8 py-4 md:py-0 z-[10]">
      {/* Header Section */}
      <div className="top-header  flex w-full justify-between items-center mt-5 ">
        <Link
          to="/"
          style={{
            backgroundImage: `url('picture/logo.png')`,
          }}
          className="h-[40px] w-[100px] md:h-[50px] md:w-[146px] bg-no-repeat bg-contain bg-center"
        ></Link>
        <Navigation />
        <UserSection />
      </div>
      <div className="seperator w-full border-b border-blue-500"></div>
      {/* Additional Content */}
      <div>
        <SortBar />
      </div>
    </div>
  );
};

export default Header;
