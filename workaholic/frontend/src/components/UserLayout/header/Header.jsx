import { Link, useNavigate } from "react-router-dom";
import UserSection from "./UserSection";
import SearchBox from "./SearchBox";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-blue-700 fixed top-0 right-0 left-0 z-[99999]">
      {/* Header Section */}
      <div className="flex justify-between py-2 items-center px-12">
        <Link
          to="/"
          style={{
            backgroundImage: `url('picture/logo.png')`,
          }}
          className="h-[40px] w-[90px]  bg-no-repeat bg-contain bg-center"
        ></Link>

        <div className="flex items-center gap-8">
          <div onClick={() => navigate("/registerEmployer")} className="font-semibold cursor-pointer">
            Become employer
          </div>
          <SearchBox />
        </div>

        <div className="">
          <UserSection />
        </div>
      </div>
    </div>
  );
};

export default Header;
