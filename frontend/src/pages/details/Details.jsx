import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./DetailsBanner";
import Cast from "./Cast";
import VideosSection from "./VideosSection";
import Similar from "./Similar";
import Recommendation from "./Recommendation";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    let { data:credits, loading:creditsLoading } = {data:null, loading:true};
    // renaming data to credits to avoid error
    // console.log(mediaType)
    if(mediaType === "movie") ( {data:credits, loading:creditsLoading} = useFetch(`/movie/${id}/credits`) );
    else ( {data:credits, loading:creditsLoading} = useFetch(`/tv/${id}/aggregate_credits`));
    // console.log(data);
    // console.log(credits);
    return (
        <div>
            <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
            <Cast data={credits?.cast} loading={creditsLoading} mediaType={mediaType}/>
            <VideosSection data={data} loading={loading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
        </div>
    );
};

export default Details;