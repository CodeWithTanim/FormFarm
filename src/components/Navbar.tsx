'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface UserData {
  userId: string;
  name: string;
  email: string;
}

export default function Navbar() {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUser = async () => {
    try {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [pathname]);

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      router.push('/login');
      router.refresh();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-brand">
          FormFarm
        </Link>

        {/* Mobile toggle button */}
        <button
          className="btn btn-outline-danger btn-sm d-md-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          style={{ display: 'none' }}
        >
          <i className="bi bi-list fs-4"></i>
        </button>

        <ul className="navbar-nav">
          {!loading && user ? (
            <>
              <li>
                <Link
                  href="/dashboard"
                  className={`nav-link ${pathname === '/dashboard' ? 'active' : ''}`}
                  title="Dashboard"
                >
                  <i className="bi bi-speedometer2"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="/forms"
                  className={`nav-link ${pathname.startsWith('/forms') ? 'active' : ''}`}
                  title="My Forms"
                >
                  <i className="bi bi-file-earmark-text"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="/help"
                  className={`nav-link text-danger ${pathname === '/help' ? 'active' : ''}`}
                  title="Help?"
                >
                  <i className="bi bi-question-circle"></i>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="nav-link"
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                  title={`Logout (${user.name.toUpperCase()})`}
                >
                  <i className="bi bi-box-arrow-right"></i>
                </button>
              </li>
            </>
          ) : !loading ? (
            <>
              <li>
                <Link
                  href="/help"
                  className={`nav-link text-danger ${pathname === '/help' ? 'active' : ''}`}
                  title="Help?"
                >
                  <i className="bi bi-question-circle"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className={`nav-link ${pathname === '/login' ? 'active' : ''}`}
                  title="Login"
                >
                  <i className="bi bi-box-arrow-in-right"></i>
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className={`nav-link ${pathname === '/register' ? 'active' : ''}`}
                  title="Register"
                >
                  <i className="bi bi-person-plus"></i>
                </Link>
              </li>
            </>
          ) : null}
        </ul>
      </div>
    </nav>
  );
}
