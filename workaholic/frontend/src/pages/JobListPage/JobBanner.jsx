import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

export default function Banner() {
  const { isLoggedIn, isAuthLoading, userData } = useContext(AuthContext);

  return (
    <div>
      <div className="flex gap-8 pt-4">
        <div className="basis-[85%]">
          <div className="w-full h-[350px] bg-no-repeat bg-cover bg-primary-color rounded-xl">
            <div className="w-full relative h-full rounded-lg bg-banner-ct ">
              <div className="absolute top-[20%] left-[8%] bg-blue-700 p-3 rounded-xl">
                {isLoggedIn ? (
                  <div className="">
                    <p className="font-serif text-4xl font-medium my-4 text-white">
                      Welcome back {userData.user_name}!
                    </p>
                    <p className=" px-5 font-serif  text-2xl font-medium my-4 text-gray-300">
                      We have great deals for you!
                    </p>
                  </div>
                ) : (
                  <button className="mt-4 px-6 py-2  text-white rounded-xl">Login Now</button>
                )}
                <div className="px-4 py-3 text-xl text-white mt-4 cursor-pointer transition-all flex justify-center items-center">
                  <Link to="/" className="text-white text-xl">
                    Home
                  </Link>{" "}
                  {/* Link to the home page */}
                  <p>/Technology</p>
                </div>
                {!isLoggedIn && <Link to="/login"></Link>}
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[15%]">
          <div className="bg-white h-full overflow-hidden rounded-[12px] flex items-center flex-col">
            <div
              className="w-[250px] h-full bg-cover bg-center"
              style={{
                backgroundImage: `url(https://d1csarkz8obe9u.cloudfront.net/posterpreviews/we-are-hiring-job-recruitment-template-design-a030f332e681e930f999d63393c3bb65_screen.jpg?ts=1697979619)`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
