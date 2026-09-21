import React from 'react';
import { WHY_CHOOSE } from '@/data/resort';
import { Eye, Trees, Users, Waves } from 'lucide-react';

const icons = [Eye, Trees, Users, Waves];

const WhyChooseUs: React.FC = () => (
  <section className="py-20 md:py-28 bg-[#F2ECDD]">
    <div className="max-w-7xl mx-auto px-5">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <span className="block text-[#456C80] tracking-[0.24em] uppercase text-[11px] mb-2">
          Why Choose Us
        </span>
        <p className="font-script text-[#5F6E39] text-4xl sm:text-5xl leading-none mb-2">A Retreat</p>
        <h2 className="font-serif text-[#17414D] uppercase tracking-[0.04em] text-2xl sm:text-3xl md:text-4xl">
          Not A Hotel
        </h2>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {WHY_CHOOSE.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={item.title}
              className="bg-white rounded-[1.75rem] p-8 text-center shadow-sm hover:shadow-xl transition-shadow duration-500"
            >
              <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#17414D]/8 flex items-center justify-center">
                <Icon className="text-[#17414D]" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-[#17414D] text-lg leading-snug mb-3">{item.title}</h3>
              <p className="text-[#2E2A25]/85 text-sm leading-relaxed">{item.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export default WhyChooseUs;
