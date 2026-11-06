import { X, Sparkles } from 'lucide-react';
import { SALON_SERVICES } from '../data/worlds';

interface RateCardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RateCardModal({ isOpen, onClose }: RateCardModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-label="Salon Rate Card"
        className="fixed inset-x-4 top-1/2 z-50 mx-auto max-w-sm -translate-y-1/2 rounded-3xl border border-amber-500/30 bg-[#120d0a] p-5 shadow-[0_25px_70px_rgba(0,0,0,0.95)] backdrop-blur-2xl sm:p-6"
      >
        {/* Retro Header */}
        <div className="flex items-start justify-between border-b border-amber-500/20 pb-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Sparkles size={13} />
              <span>डीलक्स हेयर सैलून</span>
            </div>
            <h3 className="mt-1 font-deva text-xl font-bold text-amber-100">
              सेवा सूची & रेट कार्ड
            </h3>
            <p className="font-mono text-[0.62rem] text-amber-200/50">
              प्रो. उस्ताद जी • सिंस 1998
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close rate card"
            className="grid size-9 place-items-center rounded-full bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
          >
            <X size={18} />
          </button>
        </div>

        {/* Rate list */}
        <div className="mt-4 divide-y divide-white/5">
          {SALON_SERVICES.map((service, i) => (
            <div key={i} className="flex items-center justify-between py-2.5">
              <div className="flex items-center gap-2.5">
                <span className="text-lg">{service.icon}</span>
                <span className="font-deva text-sm text-neutral-200">
                  {service.name}
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-amber-400">
                {service.price}
              </span>
            </div>
          ))}
        </div>

        {/* Retro Barber Note */}
        <div className="mt-4 rounded-xl border border-amber-500/20 bg-amber-500/5 p-3 text-center">
          <p className="font-deva text-xs leading-relaxed text-amber-200/80">
            "उधार मांगकर लज्जित न करें। बाल कटवाते समय गर्दन सीधी रखें और 90s के गानों का आनंद लें!"
          </p>
        </div>
      </div>
    </>
  );
}

