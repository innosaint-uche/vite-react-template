import { useState } from 'react';
import { BookOpen, Clock, Search, ArrowRight } from 'lucide-react';
import { mockBlogPosts } from '../../data/mockData';

export default function Knowledge() {
  const [search, setSearch] = useState('');
  const [cat, setCat] = useState('All');

  const categories = ['All', ...Array.from(new Set(mockBlogPosts.map(p => p.category)))];
  const filtered = mockBlogPosts.filter(p => {
    if (cat !== 'All' && p.category !== cat) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="page-header">Legal Knowledge Hub</h1>
        <p className="text-legali-gray mt-1">Do's & Don'ts, legal news, and expert guidance</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-legali-gray" />
          <input placeholder="Search articles..." value={search} onChange={e => setSearch(e.target.value)} className="input-field pl-9" />
        </div>
        <div className="flex gap-2 flex-wrap">
          {categories.map(c => (
            <button key={c} onClick={() => setCat(c)} className={`text-xs font-semibold px-3 py-2 rounded-xl border transition-all ${cat === c ? 'bg-legali-orange text-white border-legali-orange' : 'bg-white text-legali-gray border-legali-border hover:border-legali-orange/50'}`}>{c}</button>
          ))}
        </div>
      </div>

      {/* Featured */}
      {filtered.filter(p => p.featured).length > 0 && (
        <div>
          <h2 className="section-title mb-4">Featured Articles</h2>
          <div className="grid sm:grid-cols-2 gap-5">
            {filtered.filter(p => p.featured).map(post => (
              <div key={post.id} className="card-hover overflow-hidden p-0 flex flex-col">
                <img src={post.coverImage} alt={post.title} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="badge-orange text-[10px]">{post.category}</span>
                    <span className="flex items-center gap-1 text-xs text-legali-gray"><Clock size={10} />{post.readTime} min read</span>
                  </div>
                  <h3 className="font-display font-bold text-legali-dark leading-snug">{post.title}</h3>
                  <p className="text-xs text-legali-gray leading-relaxed line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto pt-3 border-t border-legali-border">
                    <span className="text-xs text-legali-gray">{post.author}</span>
                    <button className="text-legali-orange text-xs font-semibold flex items-center gap-1">Read more <ArrowRight size={12} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All articles */}
      <div>
        <h2 className="section-title mb-4">All Articles</h2>
        <div className="flex flex-col gap-3">
          {filtered.map(post => (
            <div key={post.id} className="card-hover flex items-start gap-4 p-4">
              <img src={post.coverImage} alt="" className="w-20 h-16 rounded-xl object-cover shrink-0 hidden sm:block" />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="badge-orange text-[10px]">{post.category}</span>
                  <span className="text-xs text-legali-gray flex items-center gap-1"><Clock size={10} />{post.readTime} min</span>
                </div>
                <h3 className="font-semibold text-legali-dark text-sm">{post.title}</h3>
                <p className="text-xs text-legali-gray mt-1 line-clamp-1">{post.excerpt}</p>
              </div>
              <button className="btn-ghost py-1.5 px-3 text-xs shrink-0">Read →</button>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="gradient-dark rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <p className="text-white font-display font-bold text-lg">Stay Informed. Stay Legali.</p>
          <p className="text-white/60 text-sm mt-1">Get weekly legal tips and news in your inbox</p>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <input type="email" placeholder="Enter your email" className="input-field flex-1 sm:w-64 py-2.5 text-sm bg-white/10 border-white/20 text-white placeholder-white/40 focus:ring-legali-orange/40 focus:border-legali-orange/60" />
          <button className="btn-primary py-2.5 whitespace-nowrap">Subscribe</button>
        </div>
      </div>
    </div>
  );
}
