import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import noResults from "../assets/no-results.png";
import { fetchDataFromApi } from "../utils/api";
import MovieCard from "../components/MovieCard";
import Spinner from "../components/Spinner";

const SearchResult = () => {
    const [data, setData] = useState(null);
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(false);
    const { query } = useParams();

    const fetchInitialData = () => {
        setLoading(true);
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                setData(res);
                setPageNum((prev) => prev + 1);
                setLoading(false);
            }
        );
    };

    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
            (res) => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...res.results],
                    });
                } else {
                    setData(res);
                }
                setPageNum((prev) => prev + 1);
            }
        );
    };

    useEffect(() => {
        setPageNum(1);
        fetchInitialData();
    }, [query]);

    return (
        <div className="min-h-[700px] pt-[100px] text-white">
            {loading && <Spinner initial={true} />}
            {!loading && (
                <div className='w-[100%] max-w-screen-xl my-0 mx-auto py-0 px-[20px]'>
                    {data?.results?.length > 0 ? (
                        <>
                            <div className="text-[24px] leading-[34px] text-white mb-[25px]">
                                {`Search ${data?.total_results > 1 ? "results" : "result"} for '${query}'`}
                            </div>
                            <InfiniteScroll
                                className="flex flex-wrap gap-[10px] mb-[50px] md:gap-[20px]"
                                dataLength={data?.results?.length || []}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />} >
                                {data?.results.map((item, index) => {
                                    if (item.media_type === "person") return;
                                    return (
                                        <MovieCard key={index} data={item} fromSearch={true} />
                                    );
                                })}
                            </InfiniteScroll>
                        </>
                    ) : (
                        <span className="text-[24px] text-white">
                            Sorry, Results not found!
                        </span>
                    )}
                </div>
            )}
        </div>
    );
};

export default SearchResult;