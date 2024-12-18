import React, { useEffect, useState } from 'react';
import Filter from '../../components/filter/Filter';
import BookmarkListContent from './BookmarkListContent';
import BookmarkBanner from './BookmarkBanner';
import SortBar from '../../components/filter/SortBar';
import jobApi from '../../api/jobApi';

const BookmarkPage = () => {
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const getBookmarkedJobs = async () => {
    setLoading(true);
    try {
      // Assuming you have an endpoint for bookmarked jobs
      const response = await jobApi.getBookmarkedJobs(page, 9);
      if (response.status === "success") {
        setBookmarkedJobs(response.data);
        setTotalJobs(response.pagination.totalItems);
      }
    } catch (error) {
      console.error('Error fetching bookmarked jobs:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    getBookmarkedJobs();
  }, [page]);

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="bg-primary-color w-full p-5">
        <SortBar />
      </div>
      <div className="banner">
        <BookmarkBanner totalBookmarks={totalJobs} />
      </div>
      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter />
        </div>
        <div className="content w-3/4">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <BookmarkListContent 
              jobs={bookmarkedJobs} 
              totalJobs={totalJobs} 
              page={page} 
              setPage={setPage} 
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;