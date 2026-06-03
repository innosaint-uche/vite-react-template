import { useState } from 'react';
import { Plus, Edit, Trash2, Eye } from 'lucide-react';
import { mockBlogPosts } from '../../data/mockData';
import Modal from '../../components/ui/Modal';

export default function AdminContent() {
  const [showNew, setShowNew] = useState(false);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">Content Management</h1>
          <p className="text-legali-gray mt-1">Manage blog posts, legal knowledge articles, and newsletters</p>
        </div>
        <button onClick={() => setShowNew(true)} className="btn-primary gap-2 text-sm"><Plus size={15} />New Article</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[['Published', mockBlogPosts.filter(p => p.featured).length, 'badge-green'], ['Total Articles', mockBlogPosts.length, 'badge-orange'], ['Featured', mockBlogPosts.filter(p => p.featured).length, 'badge-blue']].map(([l, v, c]) => (
          <div key={l as string} className="card p-4 text-center">
            <p className="text-2xl font-black font-display text-legali-dark">{v}</p>
            <p className="text-legali-gray text-sm mt-1">{l}</p>
          </div>
        ))}
      </div>

      {/* Article list */}
      <div className="card p-0 overflow-hidden">
        <div className="px-4 py-3 border-b border-legali-border bg-legali-light flex items-center justify-between">
          <p className="font-semibold text-sm text-legali-dark">All Articles</p>
        </div>
        <div className="divide-y divide-legali-border">
          {mockBlogPosts.map(post => (
            <div key={post.id} className="flex items-center gap-4 p-4 hover:bg-legali-light transition-colors">
              <img src={post.coverImage} alt={post.title} className="w-14 h-10 rounded-lg object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-legali-dark truncate">{post.title}</p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="badge-orange text-[10px]">{post.category}</span>
                  <span className="text-xs text-legali-gray">{post.author} · {post.readTime}min</span>
                  {post.featured && <span className="badge-blue text-[10px]">Featured</span>}
                </div>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button className="w-7 h-7 rounded-lg hover:bg-blue-50 flex items-center justify-center text-blue-600"><Eye size={14} /></button>
                <button className="w-7 h-7 rounded-lg hover:bg-legali-orange/10 flex items-center justify-center text-legali-orange"><Edit size={14} /></button>
                <button className="w-7 h-7 rounded-lg hover:bg-red-50 flex items-center justify-center text-red-600"><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New article modal */}
      <Modal isOpen={showNew} onClose={() => setShowNew(false)} title="Create New Article" size="lg">
        <form className="flex flex-col gap-4">
          <input type="text" placeholder="Article title" className="input-field" required />
          <div className="grid grid-cols-2 gap-3">
            <select className="input-field">
              <option>Select category</option>
              {['Law Enforcement', 'Housing', 'Family Law', 'Business', 'Employment', 'General'].map(c => <option key={c}>{c}</option>)}
            </select>
            <input type="number" placeholder="Read time (minutes)" className="input-field" />
          </div>
          <textarea className="input-field resize-none" rows={2} placeholder="Article excerpt/summary..." />
          <textarea className="input-field resize-none" rows={8} placeholder="Full article content (Markdown supported)..." />
          <div className="border-2 border-dashed border-legali-border rounded-xl p-4 text-center">
            <p className="text-sm text-legali-gray">Upload cover image or <span className="text-legali-orange font-semibold">paste URL</span></p>
          </div>
          <div className="flex items-center gap-3">
            <input type="checkbox" id="featured" className="accent-legali-orange" />
            <label htmlFor="featured" className="text-sm text-legali-dark">Mark as featured article</label>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={() => setShowNew(false)} className="btn-ghost flex-1 justify-center">Cancel</button>
            <button type="button" onClick={() => setShowNew(false)} className="btn-secondary flex-1 justify-center">Save Draft</button>
            <button type="submit" onClick={e => { e.preventDefault(); setShowNew(false); }} className="btn-primary flex-1 justify-center">Publish</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
