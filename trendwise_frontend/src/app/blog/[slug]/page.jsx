"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Tag, User, MessageCircle, Heart, Share2, ChevronLeft } from 'lucide-react';
import { use } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const BlogDetailPage = ({ params }) => {
  const { slug } = use(params);
  const router = useRouter();

  const [blogData, setBlogData] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/article/details/${slug}`)
      .then((res) => setBlogData(res.data))
      .catch((err) => console.error(err));
  }, [slug]);

  if (!blogData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  // Sample blog data - in real app, this would come from props or API
//   const blogData = {
//     meta: {
//       title: "Manchester City vs Al-Hilal: A Clash of Titans in the Club World Cup",
//       description: "Experience the thrilling encounter between Premier League champions Manchester City and Saudi Arabian giants Al-Hilal in the Club World Cup! Relive the goals, key moments, and tactical battles from this captivating match.",
//       tag: [
//         "manchester city",
//         "al-hilal",
//         "club world cup",
//         "football",
//         "soccer",
//         "pep guardiola",
//         "neymar",
//         "match report"
//       ]
//     },
//     media: {
//       images: [
//         "https://images.unsplash.com/photo-1710788989294-844321bf734d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NzE4NDB8MHwxfHNlYXJjaHwxfHxtYW5jaGVzdGVyJTIwY2l0eSUyMGFsLWhpbGFsJTIwY2x1YiUyMHdvcmxkJTIwY3VwJTIwZm9vdGJhbGwlMjBzb2NjZXIlMjBwZXAlMjBndWFyZGlvbGElMjBuZXltYXIlMjBtYXRjaCUyMHJlcG9ydCUyMGhpZ2hsaWdodHMlMjBzYXVkaSUyMHBybyUyMGxlYWd1ZSUyMHByZW1pZXIlMjBsZWFndWV8ZW58MHwwfHx8MTc1MTM4NzAxMHww&ixlib=rb-4.1.0&q=80&w=1080"
//       ]
//     },
//     title: "Manchester City vs Al-Hilal: A Clash of Titans in the Club World Cup",
//     content: `The Club World Cup witnessed a fascinating clash between two footballing behemoths: the reigning Premier League champions, Manchester City, and the formidable Saudi Pro League side, Al-Hilal. This match promised a spectacle of contrasting styles and exceptional talent, and it certainly delivered. This article delves into the key moments, tactical approaches, and overall impact of this high-stakes encounter.

// ## Manchester City's Dominance: A Tactical Masterclass?

// Pep Guardiola's Manchester City approached the game with their signature possession-based style. They aimed to control the tempo, dictate the play, and exploit Al-Hilal's defensive vulnerabilities. Their intricate passing network caused problems for the Saudi Arabian side throughout the match.

// ### Key Players for Manchester City:

// * **Erling Haaland:** The Norwegian striker, known for his prolific goal-scoring ability, was a constant threat, stretching the Al-Hilal defense.
// * **Kevin De Bruyne:** The Belgian maestro orchestrated attacks with his pinpoint passes and intelligent movement.
// * **Jack Grealish:** His pace and trickery on the wings caused significant problems for Al-Hilal's full-backs.

// ## Al-Hilal's Resilience: A Fight to the Finish

// Despite facing a formidable opponent, Al-Hilal displayed impressive resilience and fighting spirit. Their counter-attacking threat, fueled by the likes of Neymar and others, kept Manchester City on their toes throughout the game. The Saudi side showcased their ability to absorb pressure and create opportunities on the break.

// ### Al-Hilal's Key Strengths:

// * **Counter-attacking Prowess:** Their speed and directness on the counter proved to be a significant weapon.
// * **Individual Brilliance:** Players like Neymar and others showcased their exceptional individual skills.

// ## The Final Verdict: A Winning Performance

// Ultimately, Manchester City's superior quality and tactical control shone through, securing a victory against Al-Hilal. While Al-Hilal offered moments of brilliance and showcased their competitive spirit, they couldn't consistently match Manchester City's relentless pressure and clinical finishing. The match served as a compelling display of both teams' strengths and provided a fascinating insight into the different footballing philosophies on display.

// ## Summary

// The Manchester City versus Al-Hilal clash in the Club World Cup provided a captivating spectacle, highlighting the contrasting styles of two top-tier teams. While Al-Hilal fought valiantly, Manchester City's dominance, spearheaded by their star players and tactical prowess, secured them the victory. The match will be remembered as a testament to both teams' talent and the exciting nature of international club football.`,
//     createdAt: "2025-07-01T16:23:29.612Z"
//   };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim() && authorName.trim()) {
      try {
        const res = await axios.post(`http://localhost:5000/api/article/update/comment/${slug}`, {
          author: authorName,
          comment: newComment,
        });
        // Refetch the blog data to get updated comments
        const updatedBlog = await axios.get(`http://localhost:5000/api/article/details/${slug}`);
        setBlogData(updatedBlog.data);
        setNewComment('');
        setAuthorName('');
      } catch (err) {
        console.error('Error posting comment:', err);
      }
    }
  };

  const handleLike = async () => {
    try {
      const res = await axios.post(`http://localhost:5000/api/article/update/like/${slug}`);
      setLiked(!liked);
      setBlogData(prev => ({
        ...prev,
        likes: res.data.likes
      }));
    } catch (err) {
      console.error('Error liking blog:', err);
    }
  };

  const formatContent = (content) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mt-8 mb-4 leading-tight">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-xl md:text-2xl font-semibold text-gray-800 mt-6 mb-3 leading-tight">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('* **')) {
        const boldPart = paragraph.match(/\*\*(.*?)\*\*/);
        const restPart = paragraph.replace(/\* \*\*(.*?)\*\*/, '');
        return (
          <div key={index} className="ml-4 mb-3">
            <span className="inline-block w-2 h-2 bg-blue-600 rounded-full mr-3"></span>
            <strong className="text-gray-900 font-semibold">{boldPart ? boldPart[1] : ''}</strong>
            <span className="text-gray-700">{restPart}</span>
          </div>
        );
      } else if (paragraph.trim()) {
        return (
          <p key={index} className="text-gray-700 text-lg leading-relaxed mb-6">
            {paragraph}
          </p>
        );
      }
      return null;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <button
            className="flex items-center text-gray-600 hover:text-blue-600 transition-colors cursor-pointer"
            onClick={() => router.push('/')}
          >
            <ChevronLeft className="h-5 w-5 mr-2" />
            Back to Blog
          </button>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Article Header */}
        <header className="mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            {blogData.meta.tag.map((tag, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200 transition-colors"
              >
                <Tag className="h-3 w-3 mr-1" />
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            {blogData.title}
          </h1>
          
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            {formatContent(blogData.meta.description)}
          </p>
          
          <div className="flex flex-wrap items-center gap-6 text-gray-500 text-sm">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(blogData.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2" />
              5 min read
            </div>
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              Sports Analyst
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="mb-8 rounded-2xl overflow-hidden shadow-xl">
          <img
            src={blogData.media.images[0]}
            alt={blogData.title}
            className="w-full h-64 md:h-96 object-cover"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                liked 
                  ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
              <span className="font-medium">Like</span>
              {typeof blogData.likes === 'number' && (
                <span className="ml-2">{blogData.likes}</span>
              )}
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100 transition-all">
              <Share2 className="h-5 w-5" />
              <span className="font-medium">Share</span>
            </button>
          </div>
          <div className="text-sm text-gray-500">
            {blogData.comments ? blogData.comments.length : 0} comments
          </div>
        </div>

        {/* Article Content */}
        <article className="prose prose-lg max-w-none mb-12">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
            {formatContent(blogData.content)}
          </div>
        </article>

        {/* Comments Section */}
        <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
          <div className="flex items-center mb-6">
            <MessageCircle className="h-6 w-6 text-blue-600 mr-3" />
            <h3 className="text-2xl font-bold text-gray-900">
              Comments ({blogData.comments ? blogData.comments.length : 0})
            </h3>
          </div>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Your name"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                required
              />
            </div>
            <textarea
              placeholder="Share your thoughts..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              required
            />
            <button
              type="submit"
              className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {blogData.comments && blogData.comments.length > 0 ? (
              blogData.comments.map((comment, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {comment.author.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h4 className="font-semibold text-gray-900">{comment.author}</h4>
                        {/* You can add a timestamp if your schema supports it */}
                      </div>
                      <p className="text-gray-700 leading-relaxed mb-3">{comment.comment}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No comments yet.</div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogDetailPage;