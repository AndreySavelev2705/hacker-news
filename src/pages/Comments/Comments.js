import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {useEffect, useState} from "react";
import {get} from "../../api/api";

export function Comments() {
    const {id} = useParams()
    const [news, setNews] = useState()

    async function getNewsData(newsId) {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json?print=pretty`)
        setNews(newsData)
    }

    useEffect(() => {
        getNewsData(id)
    }, [id]);

    return (
        <div>
            <Link to='/'>Назад</Link>

            {news && (
                <NewsItem
                    title={news.title}
                    username={news.by}
                    date={news.time}
                    url={news.url}
                />
            )}
        </div>
    )
}