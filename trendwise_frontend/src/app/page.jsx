"use client"


import React, { useState, useEffect } from 'react';
import { Search, User, ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;
const FootballBlogPage = () => {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isPaused, setIsPaused] = useState(false);
  const [recentBlogs, setRecentBlogs] = useState([])
  const [topPicks, setTopPicks] = useState([])
  const [trendingPosts, setTrendingPosts] = useState([])
  // const recentBlogs = [
  //   {
  //     id: 1,
  //     title: "Manchester City vs Al-Hilal: A Clash of Titans in the Club World Cup",
  //     description: "Experience the thrilling encounter between Premier League champions Manchester City and Saudi Arabian giants Al-Hilal in the Club World Cup! Relive the goals, key moments, and tactical battles from this captivating match.",
  //     image: "https://images.unsplash.com/photo-1710788989294-844321bf734d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzE4NDB8MHwxfHNlYXJjaHwxfHxtYW5jaGVzdGVyJTIwY2l0eSUyMGFsLWhpbGFsJTIwY2x1YiUyMHdvcmxkJTIwY3VwJTIwZm9vdGJhbGwlMjBzb2NjZXIlMjBwZXAlMjBndWFyZGlvbGElMjBuZXltYXIlMjBtYXRjaCUyMHJlcG9ydCUyMGhpZ2hsaWdodHMlMjBzYXVkaSUyMHBybyUyMGxlYWd1ZSUyMHByZW1pZXIlMjBsZWFndWV8ZW58MHwwfHx8MTc1MTM4NzAxMHww&ixlib=rb-4.1.0&q=80&w=1080",
  //     tags: ["Club World Cup", "Manchester City", "Al-Hilal", "Football"],
  //     date: "2025-07-01"
  //   },
  //   {
  //     id: 2,
  //     title: "Inter vs Fluminense: A Rivalry Renewed",
  //     description: "Witness the electrifying clash between Internacional and Fluminense! Dive into the history, key players, and tactical analysis of this thrilling Brazilian football showdown.",
  //     image: "https://images.unsplash.com/photo-1723669424783-dca626422101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzE4NDB8MHwxfHNlYXJjaHwxfHxpbnRlciUyMGZsdW1pbmVuc2UlMjBicmFzaWxlaXIlQzMlQTNvJTIwYnJhemlsaWFuJTIwZm9vdGJhbGwlMjBjYW1wZW9uYXRvJTIwYnJhc2lsZWlybyUyMHNvY2NlciUyMGZvb3RiYWxsJTIwbWF0Y2glMjBwcmV2aWV3JTIwdGFjdGljYWwlMjBhbmFseXNpcyUyMHBsYXllciUyMHNwb3RsaWdodCUyMHJpbyUyMGRlJTIwamFuZWlybyUyMHBvcnRvJTIwYWxlZ3JlJTIwc291dGglMjBhbWVyaWNhbiUyMGZvb3RiYWxsfGVufDB8MHx8fDE3NTEzODcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  //     tags: ["Brasileirão", "Internacional", "Fluminense", "Brazilian Football"],
  //     date: "2025-06-30"
  //   },
  //   {
  //     id: 3,
  //     title: "European Football: The Rise of Young Talents",
  //     description: "Exploring the emergence of young football talents across European leagues and their impact on modern football tactics and strategies.",
  //     image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1080&h=720&fit=crop",
  //     tags: ["European Football", "Young Talents", "Premier League", "La Liga"],
  //     date: "2025-06-29"
  //   }
  // ];

  // Auto-slide functionality
  useEffect(() => {
    axios.get(`${baseURL}/api/article/recent`) // calling your own API route
      .then((res) => setRecentBlogs(res.data))
      .catch((err) => console.error(err));
  }, []);


  async function fetchtoppicks(){
  try{

    const res = await axios.get(`${baseURL}/api/article/toppicks`)
    if(!res){
      console.log('unable to get response ')
    }
    setTopPicks(res.data)
  }
    catch(err){
      console.log('error in fetching topPicks', err)
    };
 }

  useEffect(() => {
    fetchtoppicks()
  }, []);

  useEffect(() => {
    axios.get(`${baseURL}/api/article/trending`) // calling your own API route
      .then((res) => setTrendingPosts(res.data))
      .catch((err) => console.error(err));
  }, []);





  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % recentBlogs.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, [recentBlogs.length, isPaused]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recentBlogs.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + recentBlogs.length) % recentBlogs.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Search logic separated for useEffect and form
  const performSearch = async (query) => {
    try {
      const res = await axios.post(`${baseURL}/api/article/search`, { query });
      setTopPicks(res.data);
      setCurrentSlide(0); // Reset slider to first result
    } catch (err) {
      console.error('Search error:', err);
    }
  };

  // Form submit handler
  const handleSearch = (e) => {
    e.preventDefault();
    performSearch(searchQuery);
  };

  useEffect(() => {
    if (searchQuery.trim() !== "") {
      performSearch(searchQuery);
    } else {
      fetchtoppicks()
    }
  }, [searchQuery])

  // const trendingPosts = [
  //   {
  //     id: 1,
  //     title: "An delighted offending curiosity",
  //     description: "Considered use prospect regular boy did. Say occasional depending furniture. Continue celebration of her had...",
  //     image: "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400&h=250&fit=crop",
  //     color: "bg-red-100"
  //   },
  //   {
  //     id: 2,
  //     title: "The Surprising Return of a Game",
  //     description: "Contrariness to favourable. Examine tear has of. the but can recommending frequency.",
  //     image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=400&h=250&fit=crop",
  //     color: "bg-blue-100"
  //   },
  //   {
  //     id: 3,
  //     title: "However Distant quite request",
  //     description: "Everything so we contained no preference so unfeeling do to discretion.",
  //     image: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=400&h=250&fit=crop",
  //     color: "bg-yellow-100"
  //   }
  // ];

  // const topPicks = [
  //   {
  //     id: 1,
  //     title: "Eye-Catching Water Based Murals and Installations",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  //     gradient: "from-green-400 to-blue-500"
  //   },
  //   {
  //     id: 2,
  //     title: "Mom overturns wrongful in conviction, catches true",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  //     gradient: "from-blue-400 to-green-500"
  //   },
  //   {
  //     id: 3,
  //     title: "Inter vs Fluminense: A Rivalry Renewed",
  //     description: "Witness the electrifying clash between Internacional and Fluminense! Dive into the history, key players, and tactical analysis.",
  //     image: "https://images.unsplash.com/photo-1723669424783-dca626422101?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzE4NDB8MHwxfHNlYXJjaHwxfHxpbnRlciUyMGZsdW1pbmVuc2UlMjBicmFzaWxlaXIlQzMlQTNvJTIwYnJhemlsaWFuJTIwZm9vdGJhbGwlMjBjYW1wZW9uYXRvJTIwYnJhc2lsZWlybyUyMHNvY2NlciUyMGZvb3RiYWxsJTIwbWF0Y2glMjBwcmV2aWV3JTIwdGFjdGljYWwlMjBhbmFseXNpcyUyMHBsYXllciUyMHNwb3RsaWdodCUyMHJpbyUyMGRlJTIwamFuZWlybyUyMHBvcnRvJTIwYWxlZ3JlJTIwc291dGglMjBhbWVyaWNhbiUyMGZvb3RiYWxsfGVufDB8MHx8fDE3NTEzODcwMTZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
  //     gradient: "from-purple-400 to-pink-500"
  //   },
  //   {
  //     id: 4,
  //     title: "View Studio Source Local Wood to Create Sustainable",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  //     gradient: "from-orange-400 to-red-500"
  //   },
  //   {
  //     id: 5,
  //     title: "Eye-Catching Water Based Murals and installations",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop",
  //     gradient: "from-green-400 to-teal-500"
  //   },
  //   {
  //     id: 6,
  //     title: "Mom overturns wrongful in conviction, catches true",
  //     description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  //     image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  //     gradient: "from-blue-400 to-purple-500"
  //   }
  // ];

  const getTopPickImage = (pick) => {
    const img = pick.media?.images?.[0];
    if (img && typeof img === 'string' && img.trim() !== '') {
      return img;
    }
    return '/default-image.jpg';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">TrendWise</h1>
            </div>

            <div className="flex-1 max-w-lg mx-8">
              <form onSubmit={handleSearch} className="mb-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-5 h-5" />
                  <input
                    type="text"
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search Blogs"
                    className="w-full pl-10 pr-4 py-2 bg-gray-100 border-0 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white placeholder:text-gray-700 text-gray-900"
                  />
                </div>
              </form>
            </div>

            <div className="flex items-center">
              <button className="p-2 rounded-full bg-gray-900 text-white hover:bg-gray-800 transition-colors">
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Hero Section with Auto Slider */}
            {recentBlogs.length === 0 ? (
              <div className="h-80 sm:h-96 lg:h-[500px] flex items-center justify-center bg-white rounded-2xl shadow mb-12 text-gray-400 text-xl">Loading...</div>
            ) : (
              <div
                className="relative h-80 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden mb-12 group"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                {/* Slider Container */}
                <div className="relative w-full h-full">
                  {recentBlogs.map((blog, index) => (
                    <div
                      key={blog._id}
                      className={`absolute inset-0 transition-transform duration-700 ease-in-out ${index === currentSlide ? 'translate-x-0' :
                        index < currentSlide ? '-translate-x-full' : 'translate-x-full'
                        }`}
                    >
                      <div
                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                        style={{
                          backgroundImage: `linear-gradient(45deg, rgba(147, 197, 253, 0.3), rgba(196, 181, 253, 0.3)), url(${blog.media.images[0]})`
                        }}
                        onClick={() => router.push(`/blog/${blog.slug}`)}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    </div>
                  ))}
                </div>

                {/* Navigation arrows */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    prevSlide();
                  }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-20 shadow-lg hover:shadow-xl"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    nextSlide();
                  }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-3 rounded-full transition-all z-20 shadow-lg hover:shadow-xl"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Content */}
                {recentBlogs.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 lg:p-12 z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {recentBlogs[currentSlide].meta?.tag?.slice(0, 3).map((tag, index) => (
                        <span key={index} className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                      {recentBlogs[currentSlide].title}
                    </h2>
                    <p className="text-gray-200 text-base sm:text-lg max-w-3xl line-clamp-3 mb-4">
                      {recentBlogs[currentSlide].meta?.description}
                    </p>
                    <div className="flex items-center text-white/80 text-sm">
                      <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                        {new Date(recentBlogs[currentSlide].createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </span>
                    </div>
                  </div>
                )}

                {/* Dots indicator */}
                {recentBlogs.length > 0 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                    {recentBlogs.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
                          }`}
                      />
                    ))}
                  </div>
                )}

                {/* Progress Bar */}
                {recentBlogs.length > 0 && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                    <div
                      className="h-full bg-white transition-all duration-300 ease-linear"
                      style={{ width: `${((currentSlide + 1) / recentBlogs.length) * 100}%` }}
                    />
                  </div>
                )}
              </div>
            )}

            {/* Top Picks Section */}
            <section>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8 text-center">Top Picks</h3>
              {topPicks.length === 0 ? (
                <div className="h-32 flex items-center justify-center bg-white rounded-2xl shadow text-gray-400 text-lg">Loading...</div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {topPicks.map((pick) => {
                    return (
                      <article key={pick._id} onClick={() => router.push(`/blog/${pick.slug}`)} className="group cursor-pointer">
                        <div className="relative h-48 sm:h-56 rounded-xl overflow-hidden mb-4">
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                            style={{ backgroundImage: `url(${getTopPickImage(pick)})` }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                        </div>
                        <h4 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                          {pick.title}
                        </h4>
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {pick.meta?.description}
                        </p>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Trending Posts</h3>
              {trendingPosts.length === 0 ? (
                <div className="h-32 flex items-center justify-center bg-white rounded-2xl shadow text-gray-400 text-lg">Loading...</div>
              ) : (
                <div className="space-y-4">
                  {trendingPosts.map((post) => (
                    <article key={post._id} className="group cursor-pointer" onClick={() => router.push(`/blog/${post.slug}`)}>
                      <div className="flex gap-4">
                        <div className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 ${post.color}`}>
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                            style={{ backgroundImage: `url(${post.media.image?.[0] || post.media.images?.[0]})` }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 text-sm mb-1 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-gray-600 text-xs line-clamp-2">
                            {post.meta?.description}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Navigation dots */}
              <div className="flex justify-center space-x-2 mt-6">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FootballBlogPage;