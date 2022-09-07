import React,{useEffect,useState} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import './css/News.css'
import InfiniteScroll from 'react-infinite-scroll-component';


export default function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [totalResults, setTotalResults] = useState(0)



    const capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    useEffect(() => {
        document.title = "NewsWala - " + (capitalize(props.category));
        updateNews();
        //eslint-disable-next-line
    }, [])
    
    const updateNews=async()=>{
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        props.setProgress(20);
        let parsedData = await data.json();
        props.setProgress(60);
        setArticles(parsedData.articles)
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    }

    const fetchModeData = async () => {
        props.setProgress(0);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.api}&page=${page+1}&pageSize=${props.pageSize}`;
        setPage(page+1);
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(60);
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
        setLoading(false)
        props.setProgress(100);
    };

        return (
            <>
                <h1 className='text-center news-heading' style={{marginTop: '90px'}} >NewsWala - Top {capitalize(props.headlines)} Headlines</h1>

                <InfiniteScroll
                    dataLength={articles.length}
                    next={fetchModeData}
                    hasMore={articles.length !== totalResults}
                    loader={<Spinner />}
                >
                    <div className="container">
                        <div className="row main-content">
                            {articles.map((element) => {
                                return <div key={element.url} className="col-md-4">
                                    <NewsItem title={element.title ? element.title.slice(0, 45) + `...` : ""} description={element.description ? element.description.slice(0, 90) + `...` : ""} imgUrl={element.urlToImage ? element.urlToImage : "https://th.bing.com/th/id/OIP.VYBdXKXsZgErD_YAwvOzvwHaE8?pid=ImgDet&rs=1"}
                                        newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                                </div>
                            })}
                        </div>
                    </div>
                </InfiniteScroll>
            </>
        )
}


News.defaultProps = {
    country: 'in',
    pageSize: 6,
    category: 'general'
}

News.propTypes = {
    name: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
}

