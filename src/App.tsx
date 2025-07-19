import React, { useEffect, useState } from 'react';
import './App.css';
import api from './services/api';
import { type NewsArticles } from './data/interfaces';
import logo from './assets/New_York_Times_T_icon.svg';
import vector from './assets/businessman_read_newspaper.svg';
import github_icon from './assets/github-mark.svg';
import linkedin_icon from './assets/InBug-Black.png';

function App() {
  const [query, setQuery] = useState('');
  const [oldQuery, setOldQuery] = useState('');
  const [filter, setFilter] = useState(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<NewsArticles>();
  const [error, setError] = useState('');
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  console.log(`Query: ${query}`);
  console.log(`Old query: ${oldQuery}`);
  console.log(`Current page: ${currentPage}`);

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      if (window.pageYOffset > 100) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    }

    window.addEventListener('scroll', handleScrollButtonVisibility);

    return () => {
      window.removeEventListener('scroll', handleScrollButtonVisibility);
    }
  }, []);

  useEffect(() => {
    const handleResetCurrentPage = () => {
      if (oldQuery != query) {
        setCurrentPage(0)
      }
    }

    handleResetCurrentPage();
  }, [query, oldQuery])

  const handleSearchArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    setOldQuery(query);
    if (query != '' || query != null) {
      try {
        setLoading(true);
        const res = await api.get(`/articlesearch.json?q=${query}&page=${currentPage}`);
        setResponse(res.data);
        setLoading(false);
      } catch (error: any) {
        console.error(error);
        setError('Failed to load news articles');
      }
    }
  }

  const handlePageNumber = (action: 'prev' | 'next') => {
    if (action === 'prev') {
      setCurrentPage(currentPage - 1)
    }

    if (action === 'next') {
      setCurrentPage(currentPage + 1)
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
          <button onClick={() => setQuery('')} className={`${query == '' || query == null ? 'hidden' : 'inline-block'} hover:cursor-pointer`}>
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
              {response.response.docs.map((article) => (
                <li key={article._id} className='bg-gray-100 rounded-xl p-4 hover:scale-105 transition-all shadow-lg'>
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
              ))}
            </ul>
          ) : (
            <>
              {
                loading ? (
                  <div className='flex items-center justify-center w-full h-screen z-[999]'>
                    <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-black' />
                  </div>
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
              <button onClick={() => handlePageNumber('prev')} className={`${currentPage > 0 ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
                {'< Prev'}
              </button>
              <p>{currentPage + 1}</p>
              <button onClick={() => handlePageNumber('next')} className={`${currentPage < Math.ceil(response.response.metadata.hits / 10) ? 'inline-block' : 'hidden'} hover:cursor-pointer`}>
                {'Next >'}
              </button>
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

      <button onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      }} className={`${showScrollButton ? '' : 'hidden'} fixed bottom-4 right-4 p-4 rounded-full bg-white shadow-lg transition-all duration-200 hover:bg-black hover:fill-white hover:cursor-pointer hover:animate-pulse`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M440-160v-487L216-423l-56-57 320-320 320 320-56 57-224-224v487h-80Z" /></svg>
      </button>
    </div>
  )
}

export default App
