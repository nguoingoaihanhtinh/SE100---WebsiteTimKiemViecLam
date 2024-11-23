import { Button, Dropdown, Menu, Slider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { FaBriefcase, FaCaretDown, FaMapLocation, FaMoneyBill1Wave, FaUserTie } from 'react-icons/fa6';
import jobApi from '../../api/jobApi';
import useDebounce from '../../hooks/useDebouce';

const place = [
  'An Giang', 'Bac Giang', 'Bac Kan', 'Bac Lieu', 'Bac Ninh', 'Binh Dinh', 'Binh Duong', 'Binh Phuoc', 'Binh Thuan',
  'Ca Mau', 'Cao Bang', 'Dak Lak', 'Dak Nong', 'Dien Bien', 'Dong Nai', 'Dong Thap', 'Gia Lai', 'Ha Giang', 'Ha Nam',
  'Ha Noi', 'Ha Tinh', 'Hau Giang', 'Ho Chi Minh City', 'Hoa Binh', 'Hung Yen', 'Khanh Hoa', 'Kien Giang', 'Kon Tum',
  'Lai Chau', 'Lang Son', 'Lao Cai', 'Long An', 'Nam Dinh', 'Nghe An', 'Ninh Binh', 'Ninh Thuan', 'Phu Tho', 'Phu Yen',
  'Quang Binh', 'Quang Nam', 'Quang Ngai', 'Quang Ninh', 'Quang Tri', 'Soc Trang', 'Son La', 'Tay Ninh', 'Thai Binh',
  'Thai Nguyen', 'Thanh Hoa', 'Thua Thien-Hue', 'Tien Giang', 'Tuyen Quang', 'Vinh Long', 'Vinh Phuc', 'Yen Bai'
];

const experience = [
  'graduated', '1 year', '2+ years'
];

const paymentBy = [
  'Monthly', 'Yearly', 'per project'
];

const createMenu = (items, setSelectedItem, label) => (
  <Menu>
    {items.map((item, index) => (
      <Menu.Item key={index} onClick={() => setSelectedItem(item, label)}>
        {item}
      </Menu.Item>
    ))}
  </Menu>
);

const SortBar = ({ onFilterChange }) => {
  const [salaryRange, setSalaryRange] = useState([5000000, 200000000]);
  const [selectedJobType, setSelectedJobType] = useState('Job Type');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [selectedExperience, setSelectedExperience] = useState('Experience');
  const [selectedPayment, setSelectedPayment] = useState('Payment');
  const [jobTypes, setJobTypes] = useState([]);

  // Use debounced filters
  const debouncedFilters = useDebounce(
    {
      salaryRange,
      selectedJobType,
      selectedLocation,
      selectedExperience,
      selectedPayment,
    },
    3000 // Debounce delay in milliseconds
  );

  const debouncedOnFilterChange = useCallback(() => {
    onFilterChange(debouncedFilters);  // Trigger onFilterChange after debounce
  }, [debouncedFilters, onFilterChange]);

  useEffect(() => {
    debouncedOnFilterChange(); // Call debounced function when filters change
  }, [debouncedOnFilterChange]);

  useEffect(() => {
    const getAllJobType = async () => {
      const response = await jobApi.getAllJobTypes();
      if (response.success) {
        setJobTypes(response.data.map((job) => job.name));
      }
    };
    getAllJobType();
  }, []);

  const onSliderChange = (value) => {
    setSalaryRange(value); // Update salary range when slider is changed
  };

  const setSelectedItem = (item, label) => {
    if (label === 'Job Type' && item !== selectedJobType) setSelectedJobType(item);
    if (label === 'Location' && item !== selectedLocation) setSelectedLocation(item);
    if (label === 'Experience' && item !== selectedExperience) setSelectedExperience(item);
    if (label === 'Payment' && item !== selectedPayment) setSelectedPayment(item);
  };

  return (
    <div className="flex gap-12 items-center">
      {/* Job Type Dropdown */}
      <Dropdown overlay={createMenu(jobTypes.length > 0 ? jobTypes : ['No job types available'], setSelectedItem, 'Job Type')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] basis-[18%] border-r-2 pr-4">
          <FaUserTie />
          {selectedJobType}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Location Dropdown */}
      <Dropdown overlay={createMenu(place, setSelectedItem, 'Location')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] basis-[18%] border-r-2 pr-4">
          <FaMapLocation />
          {selectedLocation}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Experience Dropdown */}
      <Dropdown overlay={createMenu(experience, setSelectedItem, 'Experience')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] basis-[18%] border-r-2 pr-4">
          <FaBriefcase />
          {selectedExperience}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Salary & Payment Filters */}
      <div className="Salary flex gap-10 basis-[46%]">
        {/* Payment Dropdown */}
        <div className="button">
          <Dropdown overlay={createMenu(paymentBy, setSelectedItem, 'Payment')} trigger={['click']}>
            <Button className="flex items-center gap-2 text-2xl min-h-[60px] basis-[40%]">
              <FaMoneyBill1Wave />
              {selectedPayment}
              <FaCaretDown className="ml-2" />
            </Button>
          </Dropdown>
        </div>

        {/* Salary Range Slider */}
        <div className="slider w-full min-w-[300px] border rounded-xl px-3 text-center">
          <Slider
            range
            min={5000000}
            max={200000000}
            step={500000}
            value={salaryRange}
            onChange={onSliderChange}
            tooltip={{
              formatter: (value) => `${value.toLocaleString()} VND`,
            }}
            trackStyle={{ backgroundColor: 'white' }}  // Track color for the slider
            handleStyle={{ backgroundColor: '#3B82F6' }} // Handle color for the slider
          />
          <div className="text-gray-400 mt-2">
            {salaryRange[0].toLocaleString()} VND - {salaryRange[1].toLocaleString()} VND
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;