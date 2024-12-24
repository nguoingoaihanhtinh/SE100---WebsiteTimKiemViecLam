import { Link } from "react-router-dom"; // Import Link from react-router-dom

export default function Banner() {
  return (
    <div>
      <div className="flex gap-8 pt-4">
        <div className="basis-[85%]">
          <div className="w-full h-[350px] bg-no-repeat bg-cover bg-primary-color rounded-xl">
            <div className="w-full relative h-full rounded-lg bg-banner-ct ">
              <div className="absolute top-[20%] left-[8%] bg-blue-700 p-3 rounded-xl">
                <p className="font-serif text-4xl font-medium my-4 text-white">Hello, Austine Robertson</p>
                <div className="px-4 py-3 text-xl text-white mt-4 cursor-pointer transition-all flex justify-center items-center">
                  <Link to="/" className="text-white text-xl">
                    Home
                  </Link>{" "}
                  {/* Link to the home page */}
                  <p>/Technology</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="basis-[15%]">
          <div className="bg-white h-full overflow-hidden rounded-[12px] flex items-center flex-col">
            <div
              className="w-[250px]  h-full bg-cover bg-center"
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
