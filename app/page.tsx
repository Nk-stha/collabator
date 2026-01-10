"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-background-dark text-white font-sans antialiased overflow-x-hidden min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-background-dark/70 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src="/ChargeGharLogo.webp" alt="Charge Ghar Logo" width={100} height={100} className="h-12 md:h-20 w-auto object-contain drop-shadow-[0_0_15px_rgba(84,188,40,0.6)]" />
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
            <Link className="hover:text-primary transition-colors" href="#">Franchise</Link>
            <Link className="hover:text-primary transition-colors" href="#">Vendors</Link>
            <Link className="hover:text-primary transition-colors" href="#">Technology</Link>
            <button className="bg-primary text-background-dark px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-white transition-all">Partner Now</button>
            <Link href="/login" className="bg-white/10 text-white px-6 py-2 rounded-full font-bold text-xs uppercase hover:bg-white/20 transition-all">Login</Link>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-white hover:text-primary transition-colors relative z-50"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="material-symbols-outlined text-3xl">
              {isMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full glass-card border-x-0 border-b border-primary/20 p-6 flex flex-col gap-6 animate-in slide-in-from-top-5 fade-in duration-300">
            <Link className="text-xl font-bold hover:text-primary transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Franchise</Link>
            <Link className="text-xl font-bold hover:text-primary transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Vendors</Link>
            <Link className="text-xl font-bold hover:text-primary transition-colors" href="#" onClick={() => setIsMenuOpen(false)}>Technology</Link>
            <div className="flex flex-col gap-4 mt-4">
              <button className="bg-primary text-background-dark px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-white transition-all w-full">Partner Now</button>
              <Link href="/login" className="bg-white/10 text-white px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-white/20 transition-all w-full text-center" onClick={() => setIsMenuOpen(false)}>Login</Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-20 animate-pulse"></div>
            <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-primary rounded-full blur-[120px] opacity-10"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Next-Gen Charging
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[0.9] text-glow">
                Powering the <br />
                <span className="text-primary italic">Future</span> of <br />
                Mobility.
              </h1>
              <p className="text-lg text-gray-400 max-w-lg leading-relaxed">
                Join Nepal's fastest growing powerbank rental network. Scalable hardware meets cutting-edge software.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-primary hover:bg-white text-background-dark font-black py-5 px-10 rounded-2xl transition-all duration-300 shadow-[0_10px_30px_rgba(84,188,40,0.3)] hover:shadow-primary/50 flex items-center gap-3 group">
                  START YOUR CHARGING EMPIRE
                  <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </button>
              </div>
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full scale-75 group-hover:scale-100 transition-transform duration-700"></div>
              <div className="relative glass-card rounded-[2.5rem] p-4 aspect-square flex items-center justify-center overflow-hidden border-white/10 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
                <Image 
                  alt="Station" 
                  className="w-full h-full object-cover rounded-[2rem] opacity-80 mix-blend-overlay" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDr3Z50MsZUyPgudRtopiWlWFbfa_h_rVVN1DpDftKRPO2GG5188MoC92M9lM7F2PWIfDD2_7xkqP7Fef5uDc-ELOn80Ix3hXglkVpjD4gV1YjRZ5rta4MpTEPYH8UXRKCOoxMmUN4H-3-PywwFTbegIs_KKll9QEFIMLnxlCzXE0L0walejCK_Vz9xKGf9t5_8PlDt0IevkiKXJtaNpCwsjqsOEqeuYfRh2pB-PLaJ0KqkLBRGx0T0A21iqA6FdyxkWv0qJTmyasuI" 
                  width={800}
                  height={800}
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <span className="material-symbols-outlined text-8xl text-primary mb-4">ev_station</span>
                  <h3 className="text-2xl font-bold">SMART STATION 2.0</h3>
                  <p className="text-gray-400 text-sm mt-2">Equipped with AI-powered ejection logic</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Marquee Section */}
        <section className="py-12 bg-primary text-background-dark overflow-hidden">
          <div className="mb-8 text-center px-6">
            <h3 className="text-xl md:text-2xl font-black uppercase italic tracking-tighter">Your Station Anywhere</h3>
          </div>
          <div className="flex overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 pr-12 text-3xl md:text-5xl font-black uppercase italic opacity-80 whitespace-nowrap">
              <span>Malls</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Airports</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Cafes</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Hospitals</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Gyms</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Metro Stations</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
            </div>
            <div className="animate-marquee flex items-center gap-12 pr-12 text-3xl md:text-5xl font-black uppercase italic opacity-80 whitespace-nowrap" aria-hidden="true">
              <span>Malls</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Airports</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Cafes</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Hospitals</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Gyms</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
              <span>Metro Stations</span>
              <span className="material-symbols-outlined text-4xl md:text-6xl">bolt</span>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 bg-background-dark/50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black">Choose Your Path</h2>
              <p className="text-gray-500">Flexible models designed for scale and efficiency.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="glass-card p-10 rounded-[2rem] border-primary/20 hover:border-primary/50 transition-all group">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center text-background-dark mb-8 shadow-lg shadow-primary/20">
                  <span className="material-symbols-outlined text-3xl font-bold">account_tree</span>
                </div>
                <h3 className="text-3xl font-extrabold mb-4">Franchise Partner</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">The master control. Manage multiple locations and sub-vendors from a single glassmorphic dashboard.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Unlimited Bulk Ejection
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Sub-Vendor Management
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Regional Exclusive Rights
                  </li>
                </ul>
              </div>
              <div className="glass-card p-10 rounded-[2rem] border-white/5 hover:border-white/20 transition-all group">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-8">
                  <span className="material-symbols-outlined text-3xl font-bold">store</span>
                </div>
                <h3 className="text-3xl font-extrabold mb-4">Single Vendor</h3>
                <p className="text-gray-400 mb-8 leading-relaxed">Perfect for cafes and retail. Plug and play hardware with zero-effort revenue sharing.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Single Eject Efficiency
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Automated Weekly Payouts
                  </li>
                  <li className="flex items-center gap-3 text-gray-300">
                    <span className="material-symbols-outlined text-primary">check_circle</span>
                    Compact Station Design
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="space-y-4">
                <span className="text-primary font-bold tracking-widest text-sm uppercase">Engineered for Reliability</span>
                <h2 className="text-4xl md:text-6xl font-black">The Tech Inside</h2>
              </div>
              <p className="text-gray-500 max-w-sm">Every Charge Ghar station is a marvel of IoT engineering and durability.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-3xl space-y-6 hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-5xl">monitoring</span>
                <h4 className="text-xl font-bold">Real-time Tracking</h4>
                <p className="text-gray-400 text-sm">Monitor every transaction and battery health status in real-time through our encrypted cloud.</p>
              </div>
              <div className="glass-card p-8 rounded-3xl space-y-6 hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-5xl">shield</span>
                <h4 className="text-xl font-bold">Military Durability</h4>
                <p className="text-gray-400 text-sm">Hardware tested to survive extreme conditions and heavy public usage with anti-theft sensors.</p>
              </div>
              <div className="glass-card p-8 rounded-3xl space-y-6 hover:-translate-y-2 transition-transform">
                <span className="material-symbols-outlined text-primary text-5xl">payments</span>
                <h4 className="text-xl font-bold">Smart Payouts</h4>
                <p className="text-gray-400 text-sm">Automated settlement engine that splits revenue instantly between platform and partners.</p>
              </div>
            </div>
          </div>
        </section>



        {/* CTA Section */}
        <section className="py-32 relative">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
            <h2 className="text-5xl md:text-7xl font-black leading-none">Ready to <span className="text-primary italic">Charge Up</span> Your Revenue?</h2>
            <div className="glass-card p-12 rounded-[3rem] border-primary/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>
              <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">Join the elite network of partners building the future of shared energy infrastructure.</p>
              <button className="bg-primary hover:bg-white text-background-dark font-black py-6 px-16 rounded-2xl text-xl transition-all duration-300 shadow-[0_20px_50px_rgba(84,188,40,0.3)] hover:scale-105">
                START YOUR CHARGING EMPIRE
              </button>
              <div className="mt-8 flex justify-center gap-8 text-sm font-bold text-primary">
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">verified</span> Verified Business
                </span>
                <span className="flex items-center gap-2">
                  <span className="material-symbols-outlined">support_agent</span> 24/7 Support
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 relative overflow-hidden border-t border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-primary rounded-full blur-[160px] opacity-10"></div>
          </div>
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-10 rounded-[2.5rem] text-center border-primary/10 hover:border-primary/40 transition-all group">
                <div className="text-6xl md:text-7xl font-black text-primary mb-2 stat-glow group-hover:scale-110 transition-transform duration-500">500+</div>
                <div className="text-gray-400 uppercase tracking-widest font-bold text-sm">Stations Installed</div>
              </div>
              <div className="glass-card p-10 rounded-[2.5rem] text-center border-primary/10 hover:border-primary/40 transition-all group">
                <div className="text-6xl md:text-7xl font-black text-primary mb-2 stat-glow group-hover:scale-110 transition-transform duration-500">150+</div>
                <div className="text-gray-400 uppercase tracking-widest font-bold text-sm">Franchise Partners</div>
              </div>
              <div className="glass-card p-10 rounded-[2.5rem] text-center border-primary/10 hover:border-primary/40 transition-all group">
                <div className="text-6xl md:text-7xl font-black text-primary mb-2 stat-glow group-hover:scale-110 transition-transform duration-500">2000+</div>
                <div className="text-gray-400 uppercase tracking-widest font-bold text-sm">Active Vendors</div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-background-dark/30">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
              <div className="text-center md:text-left">
                <span className="text-primary font-bold tracking-widest text-sm uppercase">Success Stories</span>
                <h2 className="text-4xl md:text-5xl font-black mt-2">Partner Voice</h2>
              </div>
              <div className="flex gap-4">
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                  <span className="material-symbols-outlined">chevron_left</span>
                </button>
                <button className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:bg-primary hover:text-background-dark transition-all">
                  <span className="material-symbols-outlined">chevron_right</span>
                </button>
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between hover:border-primary/30 transition-all">
                <div className="space-y-6">
                  <div className="flex text-primary gap-1">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed text-lg">
                    &quot;The Bulk Eject feature is a game-changer for my high-traffic mall location. Managing 50 units simultaneously has never been this fluid.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <Image alt="Avatar" width={48} height={48} className="rounded-full border-2 border-primary/20 bg-primary/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDsaVr8nzBDwkPozA6k5Mc7tbJzW3WXTDxps6vXhSaGK5xccEHoT7m4LJjw10C_u5RiUCT_BKLdomBkR9uk71hfN7oMJgfkMFEiJuxPc0g6vQ9PO8XEE4o5QC7ZwhIcMG3kF-Voei_Mb01SNpHcDjId477Eu2PGUlWMQgihKgUzoHaMqRGwDBz18GomZrcG98W5mezd2ghBhz3lk8Ky0r-oMW5Wbc2h8IEJSq4l69WPx4uZSf7CQcz8-B0L5BzkVbK7jbzM2333U72e" />
                  <div>
                    <h5 className="font-bold text-white">Rahul Sharma</h5>
                    <p className="text-xs text-primary font-semibold uppercase">Franchise Partner</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between hover:border-primary/30 transition-all border-primary/20 bg-primary/5">
                <div className="space-y-6">
                  <div className="flex text-primary gap-1">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed text-lg">
                    &quot;Payout reliability was my biggest concern, but Charge Ghar settles every Tuesday like clockwork. The automation is flawless.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <Image alt="Avatar" width={48} height={48} className="rounded-full border-2 border-primary/20 bg-primary/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCZXR4x-gG3SZcRqPFl9gNhyJIcj6WxQoUCIiZl4CM-Cj6IuwLuolwUhEeUx3XEMyePn9afz9rh_gPKJoY0gIbtezyFLNhRNP4POLkVBwZCUkHRbJsV-JiUPQNvYvLvYzhF1ZelDIYjKc1YnbOa7vVNezq3K3UKN0qNAGRylYRhtLBd7158-GgvURMGwfTkEBQvxpC6peDF82gyYPq4TpZ2lhY1BUpjOL514J8_eDrA9DT18B7dm-IGSh6MHGqL-1jXfh7KMvH5p_g9" />
                  <div>
                    <h5 className="font-bold text-white">Priya Kapoor</h5>
                    <p className="text-xs text-primary font-semibold uppercase">Cafe Vendor</p>
                  </div>
                </div>
              </div>
              <div className="glass-card p-8 rounded-[2rem] flex flex-col justify-between hover:border-primary/30 transition-all">
                <div className="space-y-6">
                  <div className="flex text-primary gap-1">
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                    <span className="material-symbols-outlined fill-1">star</span>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed text-lg">
                    &quot;Setting up my gym with a single-eject station was effortless. My members love it, and I&apos;ve seen a steady passive income stream.&quot;
                  </p>
                </div>
                <div className="flex items-center gap-4 mt-8">
                  <Image alt="Avatar" width={48} height={48} className="rounded-full border-2 border-primary/20 bg-primary/5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMN1KnDSL8SOI5I6eoSt_rzrZGcQlj7TAvHJJ1Y7e2ehHfzpjKy7czQBmKtpnZUdkuqo13bY13UsrIgyT4U_sWeO8cHTPeAJxc5u5fQuxyrJcHCMxo2wCGMq_gM6Ggnl60A-PRFXhysFhjAqWCDLlvgI539Fb9sFoCMyixIXdToAyGePaI8D32m17bWOg8CXGDLmZ4jYyqUUXvlAilDcT9ZX6kdxDWsYFll3dx9LKTsohN8xoHroq_6eYbO-6yekpEpInUe7dHov0j" />
                  <div>
                    <h5 className="font-bold text-white">Vikram Mehta</h5>
                    <p className="text-xs text-primary font-semibold uppercase">Active Vendor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

        {/* Contact Section */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="glass-card rounded-[3rem] p-8 md:p-16 border-primary/20 bg-gradient-to-br from-background-dark to-primary/5">
              <div className="grid md:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest">
                    <span className="material-symbols-outlined text-sm">mail</span>
                    Get in Touch
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black leading-tight">
                    Have questions? <br />
                    <span className="text-primary italic">Let&apos;s talk.</span>
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    Whether you&apos;re interested in franchising, becoming a vendor, or just curious about our technology, our team is ready to help.
                  </p>
                  
                  <div className="space-y-6 pt-4">
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                        <span className="material-symbols-outlined">call</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Call Us</p>
                        <p className="text-lg font-bold group-hover:text-primary transition-colors">+977 9800000000</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                        <span className="material-symbols-outlined">mail</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Email Us</p>
                        <p className="text-lg font-bold group-hover:text-primary transition-colors">hello@chargeghar.com</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 group cursor-pointer">
                      <div className="h-12 w-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-primary group-hover:text-background-dark transition-all duration-300">
                        <span className="material-symbols-outlined">location_on</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Visit HQ</p>
                        <p className="text-lg font-bold group-hover:text-primary transition-colors">Kathmandu, Nepal</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="glass-card p-8 rounded-[2rem] border-white/10 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary blur-[80px] opacity-20 pointer-events-none"></div>
                  <form className="space-y-6 relative z-10">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-all font-medium" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                        <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-all font-medium" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Email Address</label>
                      <input type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-all font-medium" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-gray-400 uppercase tracking-wider">Message</label>
                      <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-primary/50 text-white placeholder-gray-600 transition-all font-medium resize-none" placeholder="Tell us about yourself..."></textarea>
                    </div>
                    <button className="w-full bg-primary hover:bg-white text-background-dark font-black py-4 rounded-xl transition-all shadow-[0_10px_30px_rgba(84,188,40,0.2)] hover:shadow-primary/40 flex items-center justify-center gap-2 group">
                      SEND MESSAGE
                      <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">send</span>
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 glass-card bg-transparent">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center">
              <Image src="/ChargeGharLogo.webp" alt="Charge Ghar Logo" width={100} height={100} className="h-12 w-auto object-contain" />
            </div>    
          </div>
          <p className="text-gray-500 text-sm">© 2024 CHARGE GHAR SYSTEMS. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6 text-gray-400">
            <Link className="hover:text-primary transition-colors" href="#">Privacy</Link>
            <Link className="hover:text-primary transition-colors" href="#">Terms</Link>
            <Link className="hover:text-primary transition-colors" href="#">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
