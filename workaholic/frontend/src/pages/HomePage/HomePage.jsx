import HomeContent from "./HomeContent";
import Banner from "./Banner";
import Banner2 from "./Banner2";
import CategorySection from "./CategorySection";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col justify-center gap-5 ">
      <div className="banner">
        <Banner />
      </div>
      <div className="w-full flex gap-10 px-25 ">
        <div className="content w-full">
          <HomeContent />
        </div>
      </div>
      <div className="banner2 flex justify-center">
        <Banner2 />
      </div>
      <div className="category px-25">
        <CategorySection />
      </div>
    </div>
  );
};

export default HomePage;
