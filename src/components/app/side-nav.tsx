"use client";

import React from 'react';
import Link from 'next/link';

type Props = {
    active?: 'dashboard' | 'profile' | 'payments' | 'post' | 'find';
};

export default function SideNav({ active }: Props) {
    return (
        <nav className="main-nav">
            <Link href="/hire-dashboard" className={`nav-link ${active === 'dashboard' ? 'active' : ''}`}>
                <span className="nav-icon">📊</span> Dashboard
            </Link>
            <Link href="/hire-Myprofile" className={`nav-link ${active === 'profile' ? 'active' : ''}`}>
                <span className="nav-icon">👤</span> My Profile
            </Link>
            <Link href="/payment-history" className={`nav-link ${active === 'payments' ? 'active' : ''}`}>
                <span className="nav-icon">💼</span> Payment History
            </Link>
            <Link href="/post-job" className={`nav-link ${active === 'post' ? 'active' : ''}`}>
                <span className="nav-icon">✉️</span> Post a job
            </Link>
            <Link href="/find-job" className={`nav-link ${active === 'find' ? 'active' : ''}`}>
                <span className="nav-icon">➡️</span> Find job
            </Link>
        </nav>
    );
}
