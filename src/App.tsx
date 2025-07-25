import React, { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import { type Doc, type NewsArticles } from './data/interfaces';
import logo from './assets/New_York_Times_T_icon.svg';
import vector from './assets/businessman_read_newspaper.svg';
import github_icon from './assets/github-mark.svg';
import linkedin_icon from './assets/InBug-Black.png';
import NewsItem from './components/NewsItem';
import Loading from './components/Loading';
import Pagination from './components/Pagination';
import ScrollButton from './components/ScrollButton';

function App() {
  const [query, setQuery] = useState('');
  const [oldQuery, setOldQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NewsArticles>();
  const [newsList, setNewsList] = useState<Doc[]>([])
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [newsPerPage] = useState(10);

  console.log(`Query: ${query}`);
  console.log(`Old query: ${oldQuery}`);
  console.log(`Current page: ${currentPage}`);
  console.log(`News per page: ${newsPerPage}`);

  useEffect(() => {
    const handleResetCurrentPage = () => {
      if (oldQuery != query) {
        setCurrentPage(0)
      }
    }

    handleResetCurrentPage();
  }, [query, oldQuery])

  useEffect(() => {
    const handleAddToNewsList = () => {
      if (response != null && response.status == 'OK') {
        setNewsList(response.response.docs)
      }
    }

    handleAddToNewsList()
  }, [response])

  const handleSearchArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setOldQuery(query);
    if (query.trim() != '') {
      try {
        setLoading(true);
        const res = await api.get(`/articlesearch.json?q=${query}${currentPage > 0 ? `&page=${currentPage}` : ''}`);
        setResponse(res.data);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        setError('Failed to load news articles');
      }
    }
  }

  return (
    <div>
      <nav className='top-0 sticky z-[999] w-full bg-white flex justify-between items-center px-8'>
        <img src={logo} alt="logo" onClick={() => {
          setResponse(undefined)
          setCurrentPage(0)
          setQuery('')
        }} className='h-10 hover:cursor-pointer' />
        <div className='bg-gray-100 w-full lg:w-1/3 flex items-center rounded-full px-4 py-2 m-4'>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z" /></svg>
          <form onSubmit={handleSearchArticle} className='w-full'>
            <input type="text" placeholder='Start searching ...' value={query} onChange={(e) => setQuery(e.target.value)} className='w-full px-4 py-2 focus:outline-none' />
          </form>
          <button onClick={() => setQuery('')} className={`${query.trim() == '' ? 'hidden' : 'inline-block'} hover:cursor-pointer`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" /></svg>
          </button>
        </div>
        <div></div>
      </nav>

      <div className='px-8 pt-8 pb-40 xl:p-8 xl:px-64'>
        {
          response != null && response.status != 'OK' && (
            <p className='text-xl'>{error}</p>
          )
        }
        {
          response != null && response.status == 'OK' ? (
            <ul className='list-none grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {newsList.map((article) => (
                <NewsItem key={article._id} article={article} />
              ))}
            </ul>
          ) : (
            <>
              {
                loading ? (
                  <Loading />
                ) : (
                  <div className='grid grid-cols-1 md:grid-cols-2 items-center justify-around'>
                    <div className='space-y-2'>
                      <p className='text-6xl font-bold'>Explore the World Through News</p>
                      <p className='text-2xl font-medium'>Search and read top stories from <span className='bg-black text-white font-bold px-2'>The New York Times</span>. Stay informed with credible journalism across categories like World, Technology, Health, and more.</p>
                    </div>
                    <img src={vector} alt="vector" />
                  </div>
                )
              }
            </>
          )
        }
        {
          response != null && response.status === 'OK' && (
            <form onSubmit={handleSearchArticle} className='flex space-x-4 mt-8 place-self-center'>
              <Pagination
                itemsPerPage={newsPerPage}
                totalItems={response?.response.metadata.hits ?? 0}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage} />
            </form>
          )
        }
      </div>

      <footer className={`${response == null || response == undefined ? 'fixed bottom-0' : 'block'} bg-white flex flex-wrap justify-center items-center py-4 space-x-4 w-full border-t border-gray-200`}>
        <p>© {new Date().getFullYear()} by Ma'mur Zaky Nurrokhman</p>
        <a href='https://github.com/zakymzn/search-news-articles' target='_blank' className='flex space-x-1 items-center'>
          <img src={github_icon} alt="github" className='h-4' />
          <p>GitHub</p>
        </a>
        <a href='https://www.linkedin.com/in/zakymzn/' target='_blank' className='flex space-x-1 items-center'>
          <img src={linkedin_icon} alt="linkedin" className='h-4' />
          <p>LinkedIn</p>
        </a>
      </footer>

      <ScrollButton />
    </div>
  )
}

export default App
