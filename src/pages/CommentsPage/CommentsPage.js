import {Link, useParams} from "react-router-dom";
import {NewsItem} from "../../components/NewsItem/NewsItem";
import {useCallback, useEffect, useState} from "react";
import {get} from "../../api/api";
import {CommentsWrapper} from "../../components/Comments/CommentsWrapper";

export function CommentsPage() {
    const {id} = useParams()
    const [news, setNews] = useState()
    const [comments, setComments] = useState([])

    const getNewsComment = useCallback(async (commentIds) => {
        return await Promise
            .all(commentIds.map(async commentId => {
                const comment = await get(`https://hacker-news.firebaseio.com/v0/item/${commentId}.json?print=pretty`)
                if (comment?.kids) {
                    comment.kids = await getNewsComment(comment.kids)
                }

                return comment
            }))
    }, [])

    const getNewsData = useCallback(async () =>  {
        const newsData = await get(`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`)
        setNews(newsData)

        if (newsData?.kids) {
            const commentsData = await getNewsComment(newsData.kids)
            setComments(commentsData)

            console.log(commentsData);
        }
    }, [id], getNewsComment)

    useEffect(() => {
        getNewsData()
    }, [getNewsData]);

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

            {comments && (
                <CommentsWrapper comments={comments}/>
            )}
        </div>
    )
}