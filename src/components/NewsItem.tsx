import { type Doc } from "../data/interfaces"

interface NewsProps {
    article: Doc;
}

function NewsItem({
    article
}: NewsProps) {
    return (
        <li className='bg-gray-100 rounded-xl p-4 hover:scale-105 transition-all shadow-lg'>
            <a href={article.web_url} target="_blank" rel="noopener noreferrer">
                {article.multimedia.default.url ?
                    <img src={article.multimedia.default.url} alt="thumbnail" className='rounded-lg w-full h-60 object-cover' />
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24px" className='w-full h-60 bg-gray-200 fill-gray-300 rounded-lg'><path d="M0 0h24v24H0z" fill="none" /><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" /></svg>
                }
                <p className='text-xl font-bold py-2 text-justify'>{article.headline.main}</p>
                <p className='text-sm font-medium'>{article.byline.original}</p>
                <p className='text-xs font-light'>Published {new Date(article.pub_date).toLocaleString('en-US', { dateStyle: 'full', timeStyle: 'short' })}</p>
                <p className='text-justify line-clamp-3 mt-2'>{article.abstract}</p>
            </a>
        </li>
    )
}

export default NewsItem