import React, { useEffect, useState } from 'react';
import { getTopHeadlines } from '../services/newsAPI';

const NewsList = () => {
     const [news, setNews] = useState([]);
     const [error, setError] = useState(null);
     const [loading, setLoading] = useState(false);
     const [oneNews, setOneNews] = useState(null);
     const [opendialog, setOpendialog] = useState(false);
     const [currentPage, setCurrentPage] = useState(1);
     const articlesPerPage = 6;

     useEffect(() => {
          const fetchNews = async () => {
               try {
                    setLoading(true);
                    const headlines = await getTopHeadlines();
                    setNews(headlines); // Fetch top 5 news articles
               } catch (err) {
                    setError("Unable to fetch news. Please try again later.");
                    alert("Unable to fetch news. Please try again later.");
               } finally {
                    setLoading(false);
               }
          };
          fetchNews();
     }, []);

     const indexOfLastArticle = currentPage * articlesPerPage;
     const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
     const currentArticles = news.slice(indexOfFirstArticle, indexOfLastArticle);

     const handleNextPage = () => {
          if (currentPage < Math.ceil(news.length / articlesPerPage)) {
               setCurrentPage(currentPage + 1);
          }
     };

     const handlePreviousPage = () => {
          if (currentPage > 1) {
               setCurrentPage(currentPage - 1);
          }
     };

     if (error) {
          return <div className="text-center text-red-500">{error}</div>;
     }

     return (
          <div className="p-4">
               <h1 className="text-3xl font-bold mb-4">Latest News</h1>
               {loading ? <div className="text-center">Loading News...</div>
                    :
                    <div className="grid grid-cols-4 m-2">
                         {currentArticles.map((article, index) => (
                              article.source.id != null && (
                                   <div key={index} className="bg-white shadow-lg m-2 p-4 rounded-lg cursor-pointer" onClick={() => {
                                        setOneNews(article); setOpendialog(true);
                                   }}>
                                        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-lg font-bold text-blue-600 hover:underline">
                                             {article.title.slice(0, 59)}...
                                        </a>
                                        <hr />
                                        <p className="text-sm my-1 text-gray-500">
                                             {article.source.name} | {new Date(article.publishedAt).toLocaleDateString()} | {article.author ? article.author : "Unknown"}
                                        </p>
                                        <img src={article.urlToImage} alt={article.source.id} />
                                        <p className="text-gray-700 mt-2">
                                             {article.description}
                                        </p>
                                   </div>
                              )
                         ))}
                    </div>
               }

               {/* Pagination Controls */}
               <div className="flex justify-between mt-4">
                    <button
                         className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage === 1 && "opacity-50 cursor-not-allowed"}`}
                         onClick={handlePreviousPage}
                         disabled={currentPage === 1}
                    >
                         Previous
                    </button>
                    <span className="text-gray-700">Page {currentPage} of {Math.ceil(news.length / articlesPerPage)}</span>
                    <button
                         className={`px-4 py-2 bg-blue-500 text-white rounded ${currentPage >= Math.ceil(news.length / articlesPerPage) && "opacity-50 cursor-not-allowed"}`}
                         onClick={handleNextPage}
                         disabled={currentPage >= Math.ceil(news.length / articlesPerPage)}
                    >
                         Next
                    </button>
               </div>

               {opendialog && (
                    <>
                         <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-50" onClick={() => setOpendialog(false)}></div>
                         <div className="fixed top-1/2 left-1/2 h-5/6 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg overflow-y-auto">
                              <h2 className="text-3xl font-bold text-blue-600">{oneNews.title.split('[')[0]}</h2>
                              <p className="text-sm my-1 text-gray-500">
                                   {oneNews.source.name} | {new Date(oneNews.publishedAt).toLocaleDateString()} | {oneNews.author ? oneNews.author : "Unknown"}
                              </p>
                              <hr />
                              <div className='py-2'>
                                   <img src={oneNews.urlToImage} alt={oneNews.source.id} width={400} className='mx-auto' />
                              </div>
                              <p className="text-gray-700 mt-2">
                                   {oneNews.content.split('[')[0]}
                                   <a href={oneNews.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline cursor-pointer">Read more</a>
                              </p>
                              <button className="fixed right-3 bottom-5 bg-red-500 text-white px-4 py-2 rounded-lg mt-4" onClick={() => setOpendialog(false)}>Close</button>
                         </div>
                    </>
               )}
          </div>
     );
};

export default NewsList;
