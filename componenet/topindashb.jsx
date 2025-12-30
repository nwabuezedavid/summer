'use client';

import { logoutAction } from '@/action/authaction';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'es', label: 'Español' },
];

export default function TopBar(data) {
   
    const {tog,settog} =data.value
  const [profileOpen, setProfileOpen] = useState(false);
  const [language, setLanguage] = useState('en');
  const profileRef = useRef(null);

  // Load saved language
  useEffect(() => {
    const savedLang = localStorage.getItem('lang') || 'en';
    setLanguage(savedLang);
  }, []);

  // Close profile dropdown on outside click
  useEffect(() => {
    const close = (e) => {
      if (!profileRef.current?.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  // Load Google Translate
  useEffect(() => {
    const addScript = document.createElement('script');
    addScript.src =
      '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(addScript);

    // Initialize Google Translate
    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr,es',
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );

      // After Google Translate is ready, set saved language
      const interval = setInterval(() => {
        const select = document.querySelector('.goog-te-combo');
        if (select) {
          select.value = localStorage.getItem('lang') || 'en';
          select.dispatchEvent(new Event('change'));
          clearInterval(interval);
        }
      }, 500);
    };
  }, []);

  const changeLanguage = (code) => {
    setLanguage(code);
    localStorage.setItem('lang', code);

    // Change Google Translate language
    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
        clearInterval(interval);
      }
    }, 200);
  };

  return (
    <header className="w-full h-[73px] border-b border-l border-white/30 bg-[#062f44] flex items-center justify-between px-4">
      {/* Back Button */}
      <button onClick={()=>settog(!tog)} className="w-9 h-9  bg-indigo-500 max-sm:hidden rounded flex items-center justify-center text-white">
        <i className="fa fa-arrow-left  "></i>
      </button>
<h1 className='max-sm:flex'> </h1>
      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Theme */}
        <button className="text-white">
          <i className="fa fa-sun"></i>
        </button>

        {/* Notification */}
        <button className="relative text-white">
          <i className="fa fa-bell"></i>
          <span className="absolute -top-1 -right-1 bg-red-500 text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
            1
          </span>
        </button>

        {/* Language Selector */}
        <div className="relative">
          <select
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-indigo-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
          >
            {languages.map((l) => (
              <option key={l.code} value={l.code}>
                {l.label}
              </option>
            ))}
          </select>
          <div id="google_translate_element" className="hidden"></div>
        </div>

        {/* Profile */}
        <div ref={profileRef} className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="w-9 h-9 bg-indigo-500 rounded-full flex items-center justify-center text-white"
          >
            <i className="fa fa-user"></i>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-[#062f44] border border-white/10 rounded shadow-lg z-50">
              <MenuItem href={'/settings'} icon="fa fa-gear" label="Settings" />
              <MenuItem href={'/change-password'}  icon="fa fa-lock" label="Change Password" />
              <MenuItem href={'/support-tickets'} icon="fa fa-headset" label="Support Tickets" />
              <hr className="border-white/10 my-1" />
              <button onClick={logoutAction}   className="fa fa-right-from-bracket text-xs text-center flex items-center w-full text-red-500 p-3">logout</button>           </div>
          )}
        </div>
      </div>
    </header>
  );
}

function MenuItem({ icon, label, danger ,href}) {
  return (
    <Link href={href}
      className={`w-full flex items-center gap-3 px-4 py-2 text-sm ${
        danger ? 'text-red-500 hover:bg-red-500/10' : 'text-white hover:bg-indigo-500'
      }`}
    >
      <i className={icon}></i>
      {label}
    </Link>
  );
}
