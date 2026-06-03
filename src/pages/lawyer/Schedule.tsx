import { Calendar, Clock, Video, Phone, MapPin, Check, X } from 'lucide-react';
import { mockCases, currentLawyer } from '../../data/mockData';

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const hours = ['9:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00'];

const scheduledCases = mockCases.filter(c => c.lawyerId === currentLawyer.id && c.scheduledAt);

export default function Schedule() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-header">My Schedule</h1>
          <p className="text-legali-gray mt-1">{scheduledCases.length} sessions this week</p>
        </div>
        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-sm font-semibold ${currentLawyer.available ? 'border-green-200 bg-green-50 text-green-700' : 'border-gray-200 bg-gray-100 text-gray-600'}`}>
          <div className={`w-2 h-2 rounded-full ${currentLawyer.available ? 'bg-green-500' : 'bg-gray-400'}`} />
          {currentLawyer.available ? 'Accepting Sessions' : 'Unavailable'}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Weekly calendar */}
        <div className="lg:col-span-2 card overflow-hidden p-0">
          <div className="p-4 border-b border-legali-border flex items-center justify-between">
            <h2 className="font-display font-bold text-legali-dark">Week of June 2 – 8, 2025</h2>
            <div className="flex gap-2">
              <button className="w-8 h-8 rounded-lg hover:bg-legali-light flex items-center justify-center text-legali-gray text-lg">‹</button>
              <button className="w-8 h-8 rounded-lg hover:bg-legali-light flex items-center justify-center text-legali-gray text-lg">›</button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="border-b border-legali-border">
                  <th className="p-3 text-legali-gray font-medium text-left w-16">Time</th>
                  {days.map((d, i) => (
                    <th key={d} className="p-3 text-center font-semibold text-legali-dark">
                      <p>{d}</p>
                      <p className={`text-lg font-black font-display mt-0.5 ${i === 0 ? 'text-legali-orange' : 'text-legali-dark'}`}>{i + 2}</p>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {hours.map(h => (
                  <tr key={h} className="border-b border-legali-border last:border-0">
                    <td className="p-3 text-legali-gray">{h}</td>
                    {days.map((d, i) => (
                      <td key={d} className="p-1 align-top">
                        {i === 0 && h === '10:00' && (
                          <div className="gradient-orange text-white rounded-lg p-2 text-[10px] leading-tight">
                            <p className="font-bold">Tunde B.</p>
                            <p className="opacity-80">Housing</p>
                          </div>
                        )}
                        {i === 2 && h === '14:00' && (
                          <div className="bg-blue-500 text-white rounded-lg p-2 text-[10px] leading-tight">
                            <p className="font-bold">Segun A.</p>
                            <p className="opacity-80">Employment</p>
                          </div>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming sessions */}
        <div className="flex flex-col gap-4">
          <h2 className="section-title">Upcoming Sessions</h2>
          {scheduledCases.length === 0 ? (
            <div className="card text-center py-8">
              <Calendar size={32} className="text-legali-border mx-auto mb-3" />
              <p className="text-legali-gray text-sm">No sessions scheduled</p>
            </div>
          ) : scheduledCases.map(c => (
            <div key={c.id} className="card p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-bold text-sm text-legali-dark">{c.customerName}</p>
                  <p className="text-xs text-legali-gray capitalize">{c.type.replace('_', ' ')}</p>
                </div>
                <span className="badge-orange text-[10px]">{c.priority}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-legali-gray">
                <Calendar size={11} className="text-legali-orange" />
                {c.scheduledAt && new Date(c.scheduledAt).toLocaleDateString('en-NG', { weekday: 'short', day: '2-digit', month: 'short' })}
              </div>
              <div className="flex items-center gap-2 text-xs text-legali-gray">
                <Video size={11} className="text-legali-orange" /> Virtual Session
              </div>
              <div className="flex gap-2">
                <button className="btn-ghost flex-1 justify-center text-xs py-1.5"><X size={12} />Reschedule</button>
                <button className="btn-primary flex-1 justify-center text-xs py-1.5 gap-1"><Video size={12} />Join</button>
              </div>
            </div>
          ))}

          {/* Availability hours */}
          <div className="card p-4 flex flex-col gap-3">
            <h3 className="font-display font-bold text-legali-dark text-sm">Working Hours</h3>
            {[['Mon – Fri', '9:00 AM – 6:00 PM'], ['Saturday', '10:00 AM – 2:00 PM'], ['Sunday', 'Unavailable']].map(([d, t]) => (
              <div key={d} className="flex justify-between text-sm">
                <span className="text-legali-gray">{d}</span>
                <span className={`font-medium ${t === 'Unavailable' ? 'text-red-500' : 'text-legali-dark'}`}>{t}</span>
              </div>
            ))}
            <button className="btn-ghost text-xs py-1.5 justify-center mt-1">Edit Hours</button>
          </div>
        </div>
      </div>
    </div>
  );
}
