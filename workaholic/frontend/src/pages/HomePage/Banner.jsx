export default function Banner() {
    return (
      <div>
        <div className="flex gap-8  pt-4">
          <div className="basis-[65%]">
            <div
              className="rounded-lg w-full h-[350px] bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)`,
              }}
            >
              <div className="w-full relative h-full rounded-lg bg-banner-ct ">
                <div className="absolute top-[20%] left-[8%]">
                  <p className="text-sm font-bold text-orange-500">
                    Deal of the weekend
                  </p>
                  <p className="font-serif text-4xl font-medium my-4 text-blue-950">
                    Hello, Austine Robertson
                  </p>
                  <p className="text-gray-800 ">
                    Get{" "}
                    <span className="text-orange-500 font-bold">
                      FREE delivery
                    </span>{" "}
                    on every weekend
                  </p>
                  <p className="px-4 py-3 bg-primary-color rounded-full inline-block text-white mt-4 cursor-pointer hover:bg-orange-600 transition-all">
                    Check menu
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="basis-[35%]">
            <div className="bg-white h-[350px] py-6 rounded-lg flex items-center flex-col">
              <div
                className="w-[250px] h-[200px] bg-cover"
                style={{
                  backgroundImage: `url(https://shopcartimg2.blob.core.windows.net/shopcartctn/burger.png)`,
                }}
              ></div>
              <p className="font-serif text-4xl font-medium my-4 text-blue-950">
                50 % off
              </p>
              <p className="text-gray-500 font-bold"> The full price of burger</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  