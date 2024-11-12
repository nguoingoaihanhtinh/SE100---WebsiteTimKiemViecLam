import { Button, Dropdown, Menu, Slider } from 'antd'
import React, { useState } from 'react'
import { FaBriefcase, FaCaretDown, FaMapLocation, FaMoneyBill1Wave, FaUserTie } from 'react-icons/fa6';

const positions = [
  'designer',
  'frontend dev',
  'backend dev',
  'business analyst',
];
const place = [
  'Ho Chi Minh City',
  'Ha Noi',
  'Da Nang'
];
const experience = [
  'graduated',
  '1 year',
  '2+ years'
];
const paymentBy = [
  'per month',
  'per year',
  'per project'
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

const SortBar = () => {
  const [salaryRange, setSalaryRange] = useState([5000000, 200000000]);
  const [selectedPosition, setSelectedPosition] = useState('Positions');
  const [selectedLocation, setSelectedLocation] = useState('Location');
  const [selectedExperience, setSelectedExperience] = useState('Experience');
  const [selectedPayment, setSelectedPayment] = useState('Payment');

  const onSliderChange = (value) => {
    setSalaryRange(value);
  };

  const setSelectedItem = (item, label) => {
    if (label === 'Positions') setSelectedPosition(item);
    if (label === 'Location') setSelectedLocation(item);
    if (label === 'Experience') setSelectedExperience(item);
    if (label === 'Payment') setSelectedPayment(item);
  };

  return (
    <div className="flex gap-12 items-center">
      {/* Positions Dropdown */}
      <Dropdown overlay={createMenu(positions, setSelectedItem, 'Positions')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] min-w-[300px] border-r-2 pr-4">
          <FaUserTie />
          {selectedPosition}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Place Dropdown */}
      <Dropdown overlay={createMenu(place, setSelectedItem, 'Location')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] min-w-[300px] border-r-2 pr-4">
          <FaMapLocation />
          {selectedLocation}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      {/* Experience Dropdown */}
      <Dropdown overlay={createMenu(experience, setSelectedItem, 'Experience')} trigger={['click']}>
        <Button className="flex items-center gap-2 text-2xl min-h-[60px] min-w-[300px] border-r-2 pr-4">
          <FaBriefcase />
          {selectedExperience}
          <FaCaretDown className="ml-2" />
        </Button>
      </Dropdown>

      <div className="Salary flex gap-10">
        {/* Payment By Dropdown */}
        <div className="button">
          <Dropdown overlay={createMenu(paymentBy, setSelectedItem, 'Payment')} trigger={['click']}>
            <Button className="flex items-center gap-2 text-2xl min-h-[60px] min-w-[300px]">
              <FaMoneyBill1Wave />
              {selectedPayment}
              <FaCaretDown className="ml-2" />
            </Button>
          </Dropdown>
        </div>

        {/* Slider */}
        <div className="slider w-full min-w-[300px] border rounded-xl px-3">
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
          {/* Display the selected range */}
          <div className="text-gray-400 mt-2">
            {salaryRange[0].toLocaleString()} VND - {salaryRange[1].toLocaleString()} VND
          </div>
        </div>
      </div>
    </div>
  );
};

export default SortBar;
