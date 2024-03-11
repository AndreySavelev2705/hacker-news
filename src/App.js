import {NewsItem} from "./NewsItem/NewsItem";
import {useEffect, useState} from "react";

const initNews = [
    {
        title: 'Первая новость',
        url: 'www.example.com',
        username: 'пользователь',
        date: '11.11.11',
        score: 100,
        id: '1'
    },
    {
        title: 'Вторая новость',
        url: 'www.example.com',
        username: 'пользователь 2',
        date: '11.10.11',
        score: 1000,
        id: '2'
    },
    {
        title: 'Третья новость',
        url: 'www.example.com',
        username: 'пользователь 3',
        date: '11.09.11',
        score: 200,
        id: '3'
    }
]

const newNews = {
    title: 'Четвертая новость',
    url: 'www.example.com',
    username: 'пользователь 3',
    date: '11.09.11',
    score: 100,
    id: '4'
}

function App() {
    const checkStorage = () => JSON.stringify(window.localStorage.getItem('newsKey')) || initNews
    const [news, setNews] = useState(checkStorage)



    const newCountHandler = () => {
        setNews((prevState) => [...prevState, newNews])
    }

    useEffect(() => {
        window.localStorage.setItem('newsKey', JSON.stringify(news))
    }, [news]);

    return (
        <>
            <div>Количество новостей: {news.length}</div>
            <button onClick={newCountHandler}>Добавить новость</button>
            {
                news.map(item => {
                    return <NewsItem
                        key={item.id}
                        title={item.title}
                        url={item.url}
                        username={item.username}
                        date={item.date}
                        score={item.score}/>
                })
            }
        </>
    );
}

export default App;
