import { Link } from "react-router-dom";
import { FaBuilding, FaBriefcase } from 'react-icons/fa';

export default function CompanyBanner({ totalCompanies }) {
  return (
    <div className="flex gap-8 pt-4">
      <div className="basis-[85%]">
        <div className="w-full h-[350px] bg-no-repeat bg-cover bg-primary-color rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/75" />
          <div className="relative h-full flex items-center px-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">
                Find Your Dream Company
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Explore {totalCompanies} top companies hiring now
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <FaBuilding className="text-2xl" />
                  <span>All Industries</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-2xl" />
                  <span>Multiple Locations</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}