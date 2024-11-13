import Security from "../../components/filter/Security";

export default function Banner() {
    return (
      <div>
        <div className="flex gap-8 pt-4">
          <div className="basis-[85%]">
            <div
              className="rounded-lg w-full h-[350px] bg-no-repeat bg-cover bg-center"
              style={{
                backgroundImage: `url(https://png.pngtree.com/thumb_back/fh260/background/20240104/pngtree-vectorized-linkedin-banner-with-seamless-gradient-texture-technology-image_13913254.png)`,
              }}
            >
              <div className="w-full relative h-full rounded-lg bg-banner-ct ">
                <div className="absolute top-[20%] left-[8%]">
                  <p className="text-sm font-bold text-orange-500">
                    Deal of the weekend
                  </p>
                  <p className="font-serif text-4xl font-medium my-4 text-white">
                    Hello, Austine Robertson
                  </p>
                  <p className="text-gray-300 ">
                    Get{" "}
                    on every weekend
                  </p>
                  <p className="px-4 py-3 bg-primary-color rounded-full inline-block text-white mt-4 cursor-pointer hover:bg-cyan-500 transition-all">
                    Check our offers
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[15%]">
              <Security/>
          </div>
        </div>
      </div>
    );
  }
  