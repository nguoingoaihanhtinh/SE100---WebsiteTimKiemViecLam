import { useEffect, useState } from "react";
import Filter from "../../components/filter/Filter";
import BookmarkListContent from "./BookmarkListContent";
import BookmarkBanner from "./BookmarkBanner";
import { useGetSavedJobsQuery } from "../../redux/rtk/saved.service";

const BookmarkPage = () => {
  const [sortBy, setSortBy] = useState("createdAt");
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetSavedJobsQuery({
    page: page,
    limit: 5,
    order: sortBy,
  });
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const [totalJobs, setTotalJobs] = useState(0);
  useEffect(() => {
    if (data) {
      const jobs = data.data.map((savedJob) => savedJob.job);
      setBookmarkedJobs(jobs);
      setTotalJobs(data.pagination?.total || 0);
    }
  }, [data]);

  return (
    <div className="w-full flex flex-col justify-center gap-5 px-20">
      <div className="banner px-5">
        <BookmarkBanner totalBookmarks={totalJobs} />
      </div>

      <div className="w-full flex gap-10">
        <div className="filter w-1/4 items-center">
          <Filter setSortBy={setSortBy} />
        </div>
        <div className="content w-3/4">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <BookmarkListContent jobs={bookmarkedJobs} totalJobs={totalJobs} page={page} setPage={setPage} />
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkPage;
