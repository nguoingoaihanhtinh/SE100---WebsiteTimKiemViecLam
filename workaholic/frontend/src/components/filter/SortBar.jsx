import { Button, Dropdown, Slider } from "antd";
import { useEffect, useState } from "react";
import { FaBriefcase, FaCaretDown, FaMapLocation, FaUserTie } from "react-icons/fa6";
import jobApi from "../../api/jobApi";
import { useSearchParams } from "react-router-dom";

const place = [
  { name: "An Giang", latitude: 10.521583, longitude: 105.125897 },
  { name: "Bac Giang", latitude: 21.301601, longitude: 106.203757 },
  { name: "Bac Kan", latitude: 22.145555, longitude: 105.838069 },
  { name: "Bac Lieu", latitude: 9.286111, longitude: 105.724444 },
  { name: "Bac Ninh", latitude: 21.186089, longitude: 106.076309 },
  { name: "Binh Dinh", latitude: 13.782668, longitude: 109.219663 },
  { name: "Binh Duong", latitude: 11.166666, longitude: 106.633333 },
  { name: "Binh Phuoc", latitude: 11.720183, longitude: 106.894471 },
  { name: "Binh Thuan", latitude: 11.090847, longitude: 108.070652 },
  { name: "Ca Mau", latitude: 9.188499, longitude: 105.15242 },
  { name: "Cao Bang", latitude: 22.665271, longitude: 106.257855 },
  { name: "Dak Lak", latitude: 12.710011, longitude: 108.237751 },
  { name: "Dak Nong", latitude: 12.264647, longitude: 107.609809 },
  { name: "Dien Bien", latitude: 21.38606, longitude: 103.016844 },
  { name: "Dong Nai", latitude: 10.964025, longitude: 106.843246 },
  { name: "Dong Thap", latitude: 10.475246, longitude: 105.632927 },
  { name: "Gia Lai", latitude: 13.983333, longitude: 108.0 },
  { name: "Ha Giang", latitude: 22.823333, longitude: 104.983889 },
  { name: "Ha Nam", latitude: 20.583333, longitude: 105.916667 },
  { name: "Ha Noi", latitude: 21.028511, longitude: 105.804817 },
  { name: "Ha Tinh", latitude: 18.342222, longitude: 105.905833 },
  { name: "Hau Giang", latitude: 9.78887, longitude: 105.71184 },
  { name: "Ho Chi Minh City", latitude: 10.776889, longitude: 106.700806 },
  { name: "Hoa Binh", latitude: 20.817189, longitude: 105.337593 },
  { name: "Hung Yen", latitude: 20.646044, longitude: 106.051379 },
  { name: "Khanh Hoa", latitude: 12.238791, longitude: 109.196749 },
  { name: "Kien Giang", latitude: 10.012433, longitude: 105.080915 },
  { name: "Kon Tum", latitude: 14.35252, longitude: 108.00082 },
  { name: "Lai Chau", latitude: 22.394578, longitude: 103.47095 },
  { name: "Lang Son", latitude: 21.845922, longitude: 106.75772 },
  { name: "Lao Cai", latitude: 22.338089, longitude: 104.148857 },
  { name: "Long An", latitude: 10.695572, longitude: 106.223786 },
  { name: "Nam Dinh", latitude: 20.420031, longitude: 106.16846 },
  { name: "Nghe An", latitude: 18.802182, longitude: 105.779908 },
  { name: "Ninh Binh", latitude: 20.254509, longitude: 105.975718 },
  { name: "Ninh Thuan", latitude: 11.565367, longitude: 108.988616 },
  { name: "Phu Tho", latitude: 21.383636, longitude: 105.218774 },
  { name: "Phu Yen", latitude: 13.088186, longitude: 109.308212 },
  { name: "Quang Binh", latitude: 17.48366, longitude: 106.599312 },
  { name: "Quang Nam", latitude: 15.539353, longitude: 108.019112 },
  { name: "Quang Ngai", latitude: 15.120471, longitude: 108.792244 },
  { name: "Quang Ninh", latitude: 21.006382, longitude: 107.292514 },
  { name: "Quang Tri", latitude: 16.756729, longitude: 107.185928 },
  { name: "Soc Trang", latitude: 9.603095, longitude: 105.980848 },
  { name: "Son La", latitude: 21.328248, longitude: 103.914451 },
  { name: "Tay Ninh", latitude: 11.310988, longitude: 106.098028 },
  { name: "Thai Binh", latitude: 20.448327, longitude: 106.340774 },
  { name: "Thai Nguyen", latitude: 21.594221, longitude: 105.84826 },
  { name: "Thanh Hoa", latitude: 19.807964, longitude: 105.77655 },
  { name: "Thua Thien-Hue", latitude: 16.463713, longitude: 107.590866 },
  { name: "Tien Giang", latitude: 10.36098, longitude: 106.363592 },
  { name: "Tuyen Quang", latitude: 21.80764, longitude: 105.213922 },
  { name: "Vinh Long", latitude: 10.243007, longitude: 105.972203 },
  { name: "Vinh Phuc", latitude: 21.308824, longitude: 105.604847 },
  { name: "Yen Bai", latitude: 21.723866, longitude: 104.911328 },
];

const experience = [
  { label: "Experience", value: 0 },
  { label: "1 Year+", value: 1 },
  { label: "2 Year+", value: 2 },
];

const SortBar = ({ onFilterChange }) => {
  const [salaryRange, setSalaryRange] = useState([0, 100000000]);
  const [searchParams] = useSearchParams();
  const [selectedJobType, setSelectedJobType] = useState({
    id: searchParams.get("jobType_id"),
    name: "",
  });
  const [selectedLocation, setSelectedLocation] = useState({
    name: "Location",
  });
  const [selectedExperience, setSelectedExperience] = useState({ label: "Experience", value: 0 });
  const [jobTypes, setJobTypes] = useState([]);
  useEffect(() => {
    if (onFilterChange) {
      onFilterChange({
        selectedJobType,
        salaryRange,
        selectedLocation,
        selectedExperience,
      });
    }
  }, [selectedJobType, salaryRange, selectedLocation, selectedExperience]);
  useEffect(() => {
    const getAllJobType = async () => {
      const response = await jobApi.getAllJobTypes();
      if (response.success) {
        setJobTypes(
          response.data.map((job) => {
            return {
              id: job.id,
              name: job.name,
            };
          })
        );
      }
    };
    getAllJobType();
  }, []);

  const onSliderChange = (value) => {
    setSalaryRange(value); // Update salary range when slider is changed
  };

  return (
    <div className="flex gap-12 items-center">
      {/* Job Type Dropdown */}
      <Dropdown
        menu={{
          items:
            jobTypes.length > 0
              ? jobTypes.map((item) => ({ label: item.name, key: item.name }))
              : [{ label: "Loading...", key: "Loading..." }],

          onClick: ({ key }) => {
            setSelectedJobType({
              name: key,
              id: jobTypes.find((job) => job.name === key).id,
            });
          },
        }}
        trigger={["click"]}
      >
        <Button className="flex items-center gap-2 text-lg min-h-[50px] basis-[18%] border-r-2 pr-4">
          <FaUserTie />
          {selectedJobType.name || "Job Type"} {/* Display blank if no job type selected */}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>
      {/* Location Dropdown */}
      <Dropdown
        menu={{
          items: place.map((item) => ({
            label: item.name,
            key: JSON.stringify(item),
          })),
          onClick: (item) => setSelectedLocation(JSON.parse(item.key)),
        }}
        trigger={["click"]}
      >
        <Button className="flex items-center gap-2 text-lg min-h-[50px] basis-[18%] border-r-2 pr-4">
          <FaMapLocation />
          {selectedLocation?.name}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Experience Dropdown */}
      <Dropdown
        menu={{
          items: experience.map((item) => ({ label: item.label, key: JSON.stringify(item) })),
          onClick: (item) => setSelectedExperience(JSON.parse(item.key)),
        }}
        //  overlay={createMenu(experience, setSelectedItem, 'Experience')}
        trigger={["click"]}
      >
        <Button className="flex items-center gap-2 text-lg min-h-[50px] basis-[18%] border-r-2 pr-4">
          <FaBriefcase />
          {selectedExperience.label}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Salary & Payment Filters */}
      <div className="Salary flex gap-10 basis-[35%]">
        {/* Salary Range Slider */}
        <div className="slider w-full min-w-[300px] border rounded-xl px-3 text-center">
          <Slider
            range
            min={0}
            max={100000000}
            step={1000000}
            value={salaryRange}
            onChange={onSliderChange}
            tooltip={{
              formatter: (value) => `${value.toLocaleString()} VND`,
            }}
          />
          <div className="text-white font-semibold mt-2">
            {salaryRange[0].toLocaleString()} VND - {salaryRange[1].toLocaleString()} VND
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
