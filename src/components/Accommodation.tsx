import React from 'react';
import { STAYS, SHARED_FEATURES } from '@/data/resort';
import { TreePine, Flame, UtensilsCrossed, Wifi, Car, Waves } from 'lucide-react';
import StayCard from './StayCard';
import BookButton from './BookButton';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  TreePine,
  Flame,
  UtensilsCrossed,
  Wifi,
  Car,
  Waves,
};

const Accommodation: React.FC = () => (
  <section id="accommodation" className="py-20 md:py-28 bg-white">
    <div className="max-w-7xl mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <span className="block text-[#6E93A6] tracking-[0.24em] uppercase text-[11px] mb-2">
          Accommodation
        </span>
        <p className="font-script text-[#8A9A5B] text-4xl sm:text-5xl leading-none mb-2">Stay</p>
        <h2 className="font-serif text-[#1E4E5C] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl mb-4">
          With Us
        </h2>
        <p className="text-[#3A3A36]/75 leading-relaxed">
          Two distinct ways to stay — our signature Ocean-View Chalets and the
          spacious Whale House retreat — each positioned to make the most of this
          private corner of the Garden Route.
        </p>
      </div>

      <div className="space-y-20 md:space-y-28 mb-20">
        {STAYS.map((stay, i) => (
          <StayCard key={stay.id} stay={stay} reverse={i % 2 === 1} />
        ))}
      </div>

      {/* Shared features */}
      <div className="bg-[#1E4E5C] rounded-[2rem] p-8 sm:p-12">
        <div className="text-center mb-10">
          <span className="block text-[#F2ECDD]/60 tracking-[0.24em] uppercase text-[11px] mb-1">
            Across Every Stay
          </span>
          <h3 className="font-serif text-[#F2ECDD] uppercase tracking-[0.04em] text-xl sm:text-2xl">
            Shared Features
          </h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-8 max-w-4xl mx-auto">
          {SHARED_FEATURES.map((f) => {
            const Icon = ICONS[f.icon] ?? Waves;
            return (
              <div key={f.label} className="flex items-start gap-4">
                <span className="shrink-0 w-11 h-11 rounded-full bg-[#F2ECDD]/10 flex items-center justify-center">
                  <Icon size={20} className="text-[#F2ECDD]" />
                </span>
                <span className="text-[#F2ECDD]/90 text-sm leading-relaxed pt-2.5">
                  {f.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-12">
          <BookButton variant="lightOutline">Book Your Stay</BookButton>
        </div>
      </div>
    </div>
  </section>
);

export default Accommodation;
