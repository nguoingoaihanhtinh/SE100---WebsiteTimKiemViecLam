import React, { useEffect, useRef, useState } from "react";
import { Carousel, Button, Row, Col } from "antd";
import { CompanyCardHorizontal } from "./CompanyCardHorizontal";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useGetAllCompaniesQuery } from "../../redux/rtk/company.service";

const CompanyCarousel = () => {
  const carouselRef = useRef(null);
  const navigate = useNavigate();
  const chunkSize = 9;
  const chunks = [];
  const [companies, setCompanies] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const { data, error, isLoading } = useGetAllCompaniesQuery({
    page: 1,
    limit: 20,
    type: selectedType,
  });
  useEffect(() => {
    if (data) {
      setCompanies(data.companies);
    }
  }, [data]);

  for (let i = 0; i < companies.length; i += chunkSize) {
    chunks.push(companies.slice(i, i + chunkSize));
  }

  const goToNext = () => {
    if (carouselRef.current) {
      carouselRef.current.next();
    }
  };
  const goToPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.prev();
    }
  };
  const handleTypeClick = (type) => {
    setSelectedType(type);
  };
  const handleButton = () => {
    navigate("/company");
  };
  const jobTypes = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Healthcare" },
    { id: 3, name: "Education" },
    { id: 4, name: "Agriculture" },
    { id: 5, name: "Food & Beverage" },
    { id: 6, name: "Finance" },
    { id: 7, name: "Environmental Services" },
    { id: 8, name: "Logistics" },
    { id: 9, name: "Smart Cities" },
    { id: 10, name: "Media" },
    { id: 11, name: "Renewable Energy" },
  ];
  return (
    <div className="company rounded-xl shadow-md mt-10 border ">
      <div className="heading rounded-t-xl bg-blue-800 flex">
        <div className="w-3/5 flex flex-col justify-center gap-5 text-left px-5">
          <p className="text-3xl font-bold text-white">Thương hiệu lớn tiêu biểu</p>
          <p className="text-white font-semibold">
            Những thương hiệu tuyển dụng đã khẳng định được vị thế trên thị trường.
          </p>
        </div>
        <div
          className="w-2/5 bg-cover bg-center bg-no-repeat h-[140px] p-2"
          style={{
            backgroundImage: `url(https://media.tapchitaichinh.vn/w1480/images/upload/hoangthuviet/07292019/0_10-thuong-hieu-dan-dau-viet-nam-dat-gia-tri-gan-7.jpg)`,
          }}
        ></div>
      </div>
      <div className="category flex flex-wrap py-5 border-t gap-3 px-5 justify-between   w-full">
        {jobTypes.map((type) => (
          <Button
            key={type.id}
            className="min-w-[calc(100%/7)] text-[16px]"
            onClick={() => handleTypeClick(type.name)} // Pass type name to filter
          >
            {type.name}
          </Button>
        ))}
        <Button className="min-w-[calc(100%/7)] text-[16px]" onClick={() => handleTypeClick("")}>
          All
        </Button>
      </div>

      {/* Carousel with 9 items per slide */}
      <div className="carousel-container relative px-14">
        <Carousel
          ref={carouselRef}
          dots={false}
          autoplay
          speed={500}
          slidesToShow={1} // Show only 1 slide at a time (each with 9 items)
        >
          {chunks.map((chunk, index) => (
            <div key={index}>
              <Row gutter={[16, 32]} justify="center">
                {chunk.map((company) => (
                  <Col span={8} key={company.id}>
                    <CompanyCardHorizontal companyData={company} />
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </Carousel>

        {/* Left and Right Buttons */}
        <div
          className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-transparent text-black text-xl font-semibold p-2 mx-2 hover:scale-105 hover:text-blue-800"
          onClick={goToPrev}
        >
          <FaAngleLeft />
        </div>
        <div
          className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-transparent text-black text-xl font-semibold p-2 mx-2 hover:scale-105 hover:text-blue-800"
          onClick={goToNext}
        >
          <FaAngleRight />
        </div>
      </div>

      <Button
        onClick={handleButton}
        className="bg-sky-800 text-white font-semibold text-lg h-[46px] rounded-[8px] p-5 m-5"
      >
        Tìm hiểu thêm về các công ty
      </Button>
    </div>
  );
};

export default CompanyCarousel;
