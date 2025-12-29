"use client"
import Link from 'next/link';
import React from 'react'
import { useState } from 'react';
 
const page = () => {
  return (
    <div className='w-full h-[100%] max-sm:pb-[28%] py-10 overflow-auto items-center flex flex-col'>
      <Dashboard/>
      <WalletCard/>
      
    </div>
  )
}

export default page



 



 

export   function WalletCard() {
  return (
    <div className="w-full min-sm:hidden max-w-sm bg-[#062f44] mt-3 flex-1 rounded-2xl p-4 text-white space-y-4">
      {/* KYC Notice */}
      <div className="text-xs text-slate-300">
        🔒 Verify KYC for $500+ withdrawals{' '}
        <span className="text-pink-500 cursor-pointer font-medium">
          Submit Now
        </span>
      </div>

      {/* User Header */}
      <div className="flex items-center gap-3 bg-indigo-500 rounded-xl p-3">
        <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
          <i className="fa fa-user text-white text-sm" />
        </div>

        <div className="flex-1">
          <p className="text-sm font-semibold">Hi, David Nwabueze</p>
          <p className="text-xs text-indigo-100">Hype Member – Level 1</p>
        </div>

        <div className="w-6 h-6 bg-orange-600 text-black rounded-full flex items-center justify-center text-xs font-bold">
        🥇
        </div>
      </div>

      {/* Wallet Card */}
      <div className="relative bg-indigo-600 rounded-2xl p-4 overflow-hidden">
        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 text-[120px]">
          $
        </div>

        <p className="text-xs text-indigo-100">All Wallets in USD</p>

        <div className="grid grid-cols-2 gap-4 mt-3 relative z-10">
          <div>
            <p className="text-lg font-bold">$0.00</p>
            <p className="text-xs text-indigo-100">Main Wallet</p>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold">$0.00</p>
            <p className="text-xs text-indigo-100">Profit Wallet</p>
          </div>
        </div>

        <p className="text-[10px] text-indigo-100 mt-3 relative z-10">
          You earned 0 USD This Week
        </p>

        {/* Corner accent */}
        <span className="absolute top-0 right-0 w-10 h-10 bg-yellow-400 rounded-bl-2xl" />
        <span className="absolute bottom-0 left-0 w-10 h-10 bg-yellow-400 rounded-tr-2xl" />
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-3 gap-3">
        <ActionBtn icon="fa-download" label="Deposit" color="bg-lime-400" />
        <ActionBtn icon="fa-chart-line text-black " label="Investment" color="bg-[#ddcbf9] text-black " />
        <ActionBtn icon="fa-paper-plane text-black" label="Withdraw" color="bg-[#f9cea2] text-black" />
      </div>

      <AllNavigations/>
      <AllStatistic/>
      <RecentAndReferral/>
    </div>
  );
}

function ActionBtn({ icon, label, color }) {
  return (
    <button
      className={`flex flex-col items-center justify-center gap-1 py-3 rounded-xl text-xs font-medium ${color} ${
        color.includes('lime')
          ? 'text-black'
          : 'text-white hover:bg-indigo-500'
      } transition`}
    >
      <i className={`fa ${icon} text-sm`} />
      {label}
    </button>
  );
}

 

export   function RecentAndReferral() {
  const referralUrl =
    'https://claritycapitalinvest.com/register?invite=pTmOZyZsV';

  const copyLink = async () => {
    await navigator.clipboard.writeText(referralUrl);
  };

  return (
    <div className="w-full max-w-sm space-y-4">
      {/* RECENT TRANSACTIONS */}
      <div className="bg-[#0b3550] rounded-xl p-4 border border-white/10 text-white">
        <h3 className="text-xs font-semibold text-slate-300 mb-3">
          RECENT TRANSACTIONS
        </h3>

        <div className="bg-[#123f5a] rounded-lg p-3 flex items-center gap-3">
          {/* Icon */}
          <div className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center">
            <i className="fa fa-trophy text-white text-sm" />
          </div>

          {/* Details */}
          <div className="flex-1">
            <p className="text-sm font-medium">
              Ranking Bonus by Level 1
            </p>
            <p className="text-[11px] text-slate-300">
              TRX38U80RYBDX
            </p>
            <p className="text-[10px] text-slate-400">
              Dec 25 2025 05:18
            </p>
          </div>

          {/* Amount + Status */}
          <div className="text-right">
            <p className="text-sm font-semibold text-green-400">
              +0 USD
            </p>
            <p className="text-[10px] text-red-400">-0 USD</p>
            <p className="text-[10px] text-slate-300">SYSTEM</p>
            <span className="inline-block mt-1 text-[10px] px-2 py-[2px] rounded bg-emerald-500 text-black">
              Success
            </span>
          </div>
        </div>
      </div>

      {/* REFERRAL URL */}
      <div className="bg-[#0b3550] rounded-xl p-4 border border-white/10 text-white">
        <h3 className="text-xs font-semibold text-slate-300 mb-3">
          REFERRAL URL
        </h3>

        <div className="flex items-center gap-2 mb-2">
          <input
            readOnly
            value={referralUrl}
            className="flex-1 bg-[#062f44] border border-white/20 rounded px-3 py-2 text-xs text-slate-300"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 text-xs font-semibold rounded bg-pink-600 hover:bg-pink-500 transition"
          >
            COPY
          </button>
        </div>

        <p className="text-[10px] text-slate-400">
          1 peoples are joined by using this URL.
        </p>
      </div>
    </div>
  );
}




  

const stats = [
  { label: 'All Transactions', value: 1, icon: 'fa-arrow-right-arrow-left', bg: 'bg-lime-300' },
  { label: 'Total Deposit', value: '$0', icon: 'fa-download', bg: 'bg-yellow-400' },
  { label: 'Total Investment', value: '$0', icon: 'fa-cube', bg: 'bg-purple-200' },
  { label: 'Total Profit', value: '$0', icon: 'fa-wallet', bg: 'bg-orange-300' },
  { label: 'Total Transfer', value: '$0', icon: 'fa-right-left', bg: 'bg-pink-300' },
  { label: 'Total Withdraw', value: '$0', icon: 'fa-paper-plane', bg: 'bg-lime-200' },
  { label: 'Referral Bonus', value: '$0', icon: 'fa-gift', bg: 'bg-lime-400' },
  { label: 'Deposit Bonus', value: '$0', icon: 'fa-gift', bg: 'bg-pink-400' },
  { label: 'Investment Bonus', value: '$0', icon: 'fa-gift', bg: 'bg-lime-200' },
  { label: 'Total Referral', value: 1, icon: 'fa-users', bg: 'bg-cyan-200' },
  { label: 'Rank Achieved', value: 1, icon: 'fa-trophy', bg: 'bg-white' },
  { label: 'Total Ticket', value: 0, icon: 'fa-triangle-exclamation', bg: 'bg-teal-400' },
];

export   function AllStatistic() {
  const [expanded, setExpanded] = useState(false);

  // show first 8 by default (matches screenshot)
  const visibleStats = expanded ? stats : stats.slice(0, 8);

  return (
    <div className="w-full max-w-sm bg-[#0b3550] rounded-xl p-4 text-white border border-white/10">
      {/* Header */}
      <h3 className="text-xs font-semibold text-slate-300 mb-3">
        ALL STATISTIC
      </h3>

      {/* List */}
      <div className="space-y-2">
        {visibleStats.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 p-3 rounded-lg ${item.bg}`}
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white">
              <i className={`fa ${item.icon} text-sm`} />
            </div>

            {/* Text */}
            <div className="flex-1 text-black">
              <p className="text-sm font-bold">{item.value}</p>
              <p className="text-[11px] opacity-70">{item.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="px-6 py-2 text-xs font-semibold rounded-full bg-pink-600 hover:bg-pink-500 transition"
        >
          {expanded ? 'LOAD LESS' : 'LOAD MORE'}
        </button>
      </div>
    </div>
  );
}



const navItems = [
  { label: 'Schema', icon: 'fa-diagram-project', href: '/schema' },
  { label: 'Investment', icon: 'fa-chart-line', href: '/investment' },
  { label: 'Transactions', icon: 'fa-list', href: '/transactions' },

  { label: 'Deposit', icon: 'fa-download', href: '/deposit' },
  { label: 'Deposit Log', icon: 'fa-file-lines', href: '/deposit-log' },
  { label: 'Wallet Exch.', icon: 'fa-wallet', href: '/wallet-exchange' },

  { label: 'Transfer', icon: 'fa-right-left', href: '/transfer' },
  { label: 'Transfer Log', icon: 'fa-clock-rotate-left', href: '/transfer-log' },
  { label: 'Withdraw', icon: 'fa-paper-plane', href: '/withdraw' },

  { label: 'Withdraw Log', icon: 'fa-file-arrow-down', href: '/withdraw-log' },
  { label: 'Ranking Badge', icon: 'fa-trophy', href: '/ranking' },
  { label: 'Referral', icon: 'fa-users', href: '/referral' },

  { label: 'Settings', icon: 'fa-gear', href: '/settings' },
  { label: 'Support Ticket', icon: 'fa-headset', href: '/support' },
  { label: 'Notifications', icon: 'fa-bell', href: '/notifications' },
];

export   function AllNavigations() {
  const [expanded, setExpanded] = useState(false);

  // 3 rows × 3 columns = 9 items
  const visibleItems = expanded ? navItems : navItems.slice(0, 9);

  return (
    <div className="w-full max-w-sm bg-[#0b3550] rounded-xl p-4 text-white border border-white/10">
      {/* Header */}
      <h3 className="text-xs font-semibold text-slate-300 mb-4">
        ALL NAVIGATIONS
      </h3>

      {/* Grid */}
      <div className="grid grid-cols-3 gap-y-6 gap-x-4 mb-4">
        {visibleItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex flex-col items-center gap-2 text-center group"
          >
            {/* Icon */}
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-[#062f44] flex items-center justify-center group-hover:bg-indigo-500 transition">
                <i className={`fa ${item.icon} text-teal-400 text-sm`} />
              </div>

              {/* Dot */}
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-yellow-400 rounded-full" />
            </div>

            {/* Label */}
            <span className="text-[11px] text-slate-300 group-hover:text-white">
              {item.label}
            </span>
          </Link>
        ))}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full py-2 text-xs font-semibold rounded-full bg-pink-600 hover:bg-pink-500 transition"
      >
        {expanded ? 'LOAD LESS' : 'LOAD MORE'}
      </button>
    </div>
  );
}



export   function Dashboard() {
  const referralUrl =
    'https://claritycapitalinvest.com/register?invite=pTmOZyZsV';

  const stats = [
    'All Transactions',
    'Total Deposit',
    'Total Investment',
    'Total Profit',
    'Total Transfer',
    'Total Withdraw',
    'Referral Bonus',
    'Deposit Bonus',
    'Investment Bonus',
    'Total Referral',
    'Rank Achieved',
    'Total Ticket',
  ];

  return (
    <div className="min-h-screen bg-[#062f44]   max-sm:hidden p-6 text-white">
      {/* Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Level Card */}
        <div className="flex items-center gap-6">
          <div className="relative w-32 h-32 rounded-full border-4 border-yellow-400 flex flex-col items-center justify-center">
            <span className="text-sm text-yellow-300">Level 1</span>
            <span className="text-xs text-slate-300">Hype Member</span>

            <span className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-xs">
              🏅
            </span>
          </div>
        </div>

        {/* Referral URL */}
        <div className="lg:col-span-2 bg-[#083b52] rounded-lg p-4 border border-white/10">
          <p className="text-sm text-slate-300 mb-2">Referral URL</p>

          <div className="flex items-center gap-2">
            <input
              readOnly
              value={referralUrl}
              className="flex-1 bg-[#062f44] border border-white/20 rounded px-3 py-2 text-sm"
            />
            <button
              onClick={() => navigator.clipboard.writeText(referralUrl)}
              className="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-sm"
            >
              Copy
            </button>
          </div>

          <p className="text-xs text-slate-400 mt-2">
            1 people are joined by using this URL
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((title, i) => (
          <div
            key={i}
            className="relative bg-indigo-500 rounded-lg p-4 border-2 border-yellow-700/40 overflow-hidden"
          >
            <span className="absolute top-0 right-0 w-6 h-6 bg-yellow-700/40 rounded-bl-lg" />

            <p className="text-xl font-semibold">$0</p>
            <p className="text-xs text-indigo-100 mt-1">{title}</p>
          </div>
        ))}
      </div>

      {/* Recent Transactions */}
      <div className="bg-[#083b52] rounded-lg border border-white/10">
        <div className="p-4 border-b border-white/10">
          <h3 className="text-sm font-semibold">Recent Transactions</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#062f44] text-slate-300">
              <tr>
                <th className="text-left px-4 py-3">Description</th>
                <th className="text-left px-4 py-3">Transactions ID</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Fee</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-left px-4 py-3">Gateway</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-white/10">
                <td className="px-4 py-3">
                  Ranking Bonus by Level 1
                  <div className="text-xs text-slate-400">
                    Dec 25 2025 05:18
                  </div>
                </td>
                <td className="px-4 py-3">TRX3U80RYBDX</td>
                <td className="px-4 py-3">
                  <span className="bg-pink-500 text-xs px-2 py-1 rounded">
                    Bonus
                  </span>
                </td>
                <td className="px-4 py-3 text-green-400">+0 USD</td>
                <td className="px-4 py-3">0 USD</td>
                <td className="px-4 py-3">
                  <span className="bg-emerald-500 text-xs px-2 py-1 rounded">
                    Success
                  </span>
                </td>
                <td className="px-4 py-3">System</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
