import { Link } from "react-router-dom";
import { FaBookmark, FaBriefcase } from 'react-icons/fa';

export default function BookmarkBanner({ totalBookmarks = 0 }) {
  return (
    <div className="flex gap-8 pt-4">
      <div className="basis-[85%]">
        <div className="w-full h-[350px] bg-no-repeat bg-cover bg-primary-color rounded-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-600/75" />
          <div className="relative h-full flex items-center px-12">
            <div className="text-white max-w-2xl">
              <h1 className="text-5xl font-bold mb-6">
                Your Bookmarked Jobs
              </h1>
              <p className="text-xl mb-8 opacity-90">
                You have saved {totalBookmarks} jobs
              </p>
              <div className="flex gap-6">
                <div className="flex items-center gap-2">
                  <FaBookmark className="text-2xl" />
                  <span>Saved Jobs</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaBriefcase className="text-2xl" />
                  <span>Easy Apply</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}