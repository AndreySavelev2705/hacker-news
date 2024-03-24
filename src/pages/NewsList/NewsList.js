import {useEffect, useState} from "react";
import {get} from "../../api/api";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import styles from './NewsList.module.css'

export function NewsList() {
    const [news, setNews] = useState([])

    useEffect(() => {
        getNewsList()
    }, [])

    async function getNewsList() {
        const newsIds = await get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty&orderBy="$priority"&limitToFirst=10')
        const newsList = await Promise
            .all(newsIds.map((id) => get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)))

        setNews(newsList)
    }

    return (
        <>
            <div>Количество новостей: {news.length}</div>
            {
                news.map(item => {
                    return <NewsItem
                        className={styles.newsItem}
                        key={item.id}
                        id={item.id}
                        title={item.title}
                        url={item.url}
                        username={item.by}
                        date={item.time}
                        score={item.score}/>
                })
            }
        </>
    );
}