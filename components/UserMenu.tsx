import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface UserMenuProps {
  onPasswordChange: () => void;
  onProfileClick: () => void;
}

export const UserMenu: React.FC<UserMenuProps> = ({ onPasswordChange, onProfileClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { signOut } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:scale-110"
        aria-label="Menu użytkownika"
      >
        <svg
          className="w-5 h-5 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-[#18232F] border border-white/20 rounded-xl shadow-2xl overflow-hidden z-50">
          <div className="py-2">
            <button
              onClick={() => {
                onProfileClick();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 text-[#00C9A7]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>Mój profil</span>
            </button>
            <div className="border-t border-white/10 my-1"></div>
            <button
              onClick={() => {
                onPasswordChange();
                setIsOpen(false);
              }}
              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 text-[#fee715]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
              <span>Zmień hasło</span>
            </button>
            <div className="border-t border-white/10 my-1"></div>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-3 text-left text-gray-200 hover:bg-white/10 transition-colors duration-200 flex items-center gap-3"
            >
              <svg
                className="w-5 h-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
              <span>Wyloguj</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

