import React, { useState } from 'react';

export default function SIPCalculatorTab({setActiveTab , activeTab}) {
    const tabs = [
        { label: 'SIP', content: 'Content for Tab 1' },
        { label: 'Lumpsum', content: 'Content for Tab 2' },
    ];

    return (
        <div className="w-full">
            <div className="flex bg-[#DEF7ED] w-[297px] rounded-3xl py-1.5 px-2">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.label}
                        className={`p-4 text-xs font-medium focus:outline-none w-[140px] ${activeTab === index ? 'bg-[#844FCF] text-white rounded-3xl' : 'text-[#0E0C1A]'
                            }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            
        </div>
    );
}

