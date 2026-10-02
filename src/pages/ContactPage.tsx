import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState('custom-cake');
  const [eventDate, setEventDate] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    setSubmitted(true);
  };

  return (
    <div className="bg-[#FAF7EE] min-h-screen py-12 md:py-20 text-[#20221F]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="max-w-2xl space-y-3">
          <p className="text-xs uppercase tracking-widest text-[#5C7461] font-semibold">
            Get In Touch · Gbagada Kitchen
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#20221F]">
            We’d love to hear from you.
          </h1>
          <p className="text-sm sm:text-base text-[#4B4E4A] leading-relaxed">
            Have a question about nationwide dispatch, corporate treat boxes, or planning a bespoke celebration cake? Send us a message or reach out on WhatsApp.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Contact Details Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xs">
              <h3 className="font-serif text-xl font-bold text-[#20221F]">
                Bakery Information
              </h3>

              <div className="space-y-4 text-xs text-[#4B4E4A]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20221F] block text-sm">Location</strong>
                    <span>14 Alhaja Kofoworola Crescent, off Diya Street, Gbagada Phase 2, Lagos, Nigeria</span>
                    <span className="block text-[11px] text-[#717670] mt-0.5">
                      (Delivery-only commercial kitchen · No walk-in storefront)
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20221F] block text-sm">WhatsApp & Calls</strong>
                    <span>+234 812 345 6789</span>
                    <span className="block text-[11px] text-[#717670] mt-0.5">
                      Available Mon – Sun: 8:00 AM – 7:00 PM
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20221F] block text-sm">Email</strong>
                    <span>hello@shortnsweet.ng</span>
                    <span className="block text-[11px] text-[#717670] mt-0.5">
                      We usually reply within 2 hours
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#5C7461] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#20221F] block text-sm">Delivery Policy</strong>
                    <span>Flat ₦2,500 nationwide delivery. Cakes booked at least 2 days in advance.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp helper box */}
            <div className="p-6 bg-[#E7EDE8] border border-[#D1D5CE] rounded-3xl space-y-3 text-xs text-[#3E5142]">
              <div className="flex items-center gap-2 font-bold text-sm text-[#20221F]">
                <MessageSquare className="w-4 h-4 text-[#5C7461]" />
                <span>Need an urgent treat box today?</span>
              </div>
              <p>
                Our Gbagada dispatch riders pull batches all day. Reach us directly on WhatsApp for same-day pastry availability.
              </p>
            </div>
          </div>

          {/* Inquiry Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-white border border-[#EAE4CE] rounded-3xl p-6 sm:p-10 shadow-xs">
              {submitted ? (
                <div className="text-center py-12 space-y-4">
                  <div className="w-14 h-14 bg-[#E7EDE8] text-[#5C7461] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#20221F]">
                    Message Sent!
                  </h3>
                  <p className="text-xs text-[#5A5E59] max-w-sm mx-auto leading-relaxed">
                    Thank you {name}. Our Gbagada pastry team has received your note and will reach out to <strong>{email}</strong> shortly.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setMessage('');
                    }}
                    className="px-6 py-2.5 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#383A37] transition-all"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-serif text-2xl font-bold text-[#20221F]">
                    Send us a message
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="e.g. Feranmi Adesegun"
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Phone (WhatsApp)
                      </label>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="+234 812 345 6789"
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Inquiry Reason
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      >
                        <option value="custom-cake">Custom Celebration Cake (2-day notice)</option>
                        <option value="corporate-box">Corporate / Event Treat Boxes</option>
                        <option value="delivery-question">Nationwide Delivery Inquiry</option>
                        <option value="general">General Question</option>
                      </select>
                    </div>
                  </div>

                  {inquiryType === 'custom-cake' && (
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                        Target Event Date (Min. 2 days ahead)
                      </label>
                      <input
                        type="date"
                        value={eventDate}
                        onChange={(e) => setEventDate(e.target.value)}
                        className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#383A37] mb-1">
                      Tell us what you have in mind *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Flavor preferences, number of guests, delivery address in Lagos, or custom message piping..."
                      className="w-full px-4 py-3 bg-[#FAF7EE] border border-[#D1D5CE] rounded-xl text-xs text-[#20221F] focus:outline-none focus:ring-2 focus:ring-[#383A37]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 bg-[#20221F] text-[#FAF7EE] rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#383A37] transition-all flex items-center justify-center gap-2 shadow-md"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
