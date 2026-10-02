import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#20221F] text-[#FAF7EE] text-[11px] tracking-widest uppercase py-2 px-4 text-center font-medium border-b border-[#383A37]">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <span>Baked Fresh Daily in Gbagada, Lagos</span>
        <span aria-hidden="true" className="text-[#A7BFA9]">·</span>
        <span>Nationwide Delivery</span>
      </div>
    </div>
  );
};
