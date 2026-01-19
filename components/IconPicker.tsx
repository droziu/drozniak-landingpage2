import React, { useState, useRef, useEffect } from 'react';
import {
  MegaphoneSimple,
  MagnifyingGlass,
  Envelope,
  DeviceMobile,
  Globe,
  FileText,
  CreditCard,
  CheckCircle,
  Notebook,
  PresentationChart,
  ChatCircle,
  Phone,
  Gear,
  Money,
  Wallet,
  ShoppingCart,
  Tag,
  CurrencyDollar,
  Storefront,
  TrendUp,
  TrendDown,
  ChartLine,
  Users,
  User,
  Calendar,
  Clock,
  PaperPlaneTilt,
  VideoCamera,
  Camera,
  Image,
  Link,
  Share,
  Heart,
  Star,
  Bell,
  Warning,
  Info,
  Question,
  Check,
  X,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Download,
  Upload,
  Eye,
  EyeSlash,
  Lock,
  LockOpen,
  Key,
  Shield,
  Trash,
  Pencil,
  Copy,
  Clipboard,
  Folder,
  Database,
  Cloud,
  WifiHigh,
  Broadcast
} from 'phosphor-react';
import * as SimpleIcons from 'simple-icons';

interface IconPickerProps {
  value: string;
  onChange: (iconName: string) => void;
  className?: string;
}

// Funkcja renderująca Simple Icons logotypy marek (monochromatyczne)
const renderSimpleIcon = (slug: string, size: number = 24, className: string = '') => {
  try {
    const iconKey = `si${slug.charAt(0).toUpperCase() + slug.slice(1)}` as keyof typeof SimpleIcons;
    const icon = (SimpleIcons as any)[iconKey];
    if (!icon || !icon.path) return null;
    
    return (
      <svg
        role="img"
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={className}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={icon.path} />
      </svg>
    );
  } catch (e) {
    return null;
  }
};

// Popularne ikony (często używane w marketingu)
const popularIcons = [
  // Simple Icons - logotypy marek (prefiks simple:)
  { name: 'simple:facebook', label: 'Facebook', icon: null, isSimpleIcon: true, slug: 'facebook' },
  { name: 'simple:google', label: 'Google', icon: null, isSimpleIcon: true, slug: 'google' },
  { name: 'simple:instagram', label: 'Instagram', icon: null, isSimpleIcon: true, slug: 'instagram' },
  // Phosphor Icons - narzędzia
  { name: 'MegaphoneSimple', label: 'Megafon', icon: MegaphoneSimple, isSimpleIcon: false },
  { name: 'MagnifyingGlass', label: 'Lupa', icon: MagnifyingGlass, isSimpleIcon: false },
  { name: 'Envelope', label: 'Email', icon: Envelope, isSimpleIcon: false },
  { name: 'DeviceMobile', label: 'Telefon', icon: DeviceMobile, isSimpleIcon: false },
  { name: 'Globe', label: 'Globus', icon: Globe, isSimpleIcon: false },
  { name: 'FileText', label: 'Dokument', icon: FileText, isSimpleIcon: false },
  { name: 'CreditCard', label: 'Karta', icon: CreditCard, isSimpleIcon: false },
  { name: 'CheckCircle', label: 'Zaznacz', icon: CheckCircle, isSimpleIcon: false },
  { name: 'Notebook', label: 'Notatnik', icon: Notebook, isSimpleIcon: false },
  { name: 'PresentationChart', label: 'Wykres', icon: PresentationChart, isSimpleIcon: false },
  { name: 'ChatCircle', label: 'Chat', icon: ChatCircle, isSimpleIcon: false },
  { name: 'Phone', label: 'Telefon', icon: Phone, isSimpleIcon: false },
  { name: 'Money', label: 'Pieniądze', icon: Money, isSimpleIcon: false },
  { name: 'Wallet', label: 'Portfel', icon: Wallet, isSimpleIcon: false },
  { name: 'ShoppingCart', label: 'Koszyk', icon: ShoppingCart, isSimpleIcon: false },
  { name: 'Tag', label: 'Tag', icon: Tag, isSimpleIcon: false },
  { name: 'CurrencyDollar', label: 'Dolar', icon: CurrencyDollar, isSimpleIcon: false },
  { name: 'Storefront', label: 'Sklep', icon: Storefront, isSimpleIcon: false },
  { name: 'TrendUp', label: 'Wzrost', icon: TrendUp, isSimpleIcon: false },
  { name: 'ChartLine', label: 'Wykres liniowy', icon: ChartLine, isSimpleIcon: false },
  { name: 'Users', label: 'Użytkownicy', icon: Users, isSimpleIcon: false },
  { name: 'User', label: 'Użytkownik', icon: User, isSimpleIcon: false },
  { name: 'Calendar', label: 'Kalendarz', icon: Calendar, isSimpleIcon: false },
  { name: 'Clock', label: 'Zegar', icon: Clock, isSimpleIcon: false },
  { name: 'PaperPlaneTilt', label: 'Wiadomość', icon: PaperPlaneTilt, isSimpleIcon: false },
  { name: 'VideoCamera', label: 'Wideo', icon: VideoCamera, isSimpleIcon: false },
  { name: 'Camera', label: 'Aparat', icon: Camera, isSimpleIcon: false },
  { name: 'Image', label: 'Obraz', icon: Image, isSimpleIcon: false },
  { name: 'Link', label: 'Link', icon: Link, isSimpleIcon: false },
  { name: 'Share', label: 'Udostępnij', icon: Share, isSimpleIcon: false },
  { name: 'Heart', label: 'Serce', icon: Heart, isSimpleIcon: false },
  { name: 'Star', label: 'Gwiazda', icon: Star, isSimpleIcon: false },
  { name: 'Bell', label: 'Dzwonek', icon: Bell, isSimpleIcon: false },
  { name: 'Gear', label: 'Ustawienia', icon: Gear, isSimpleIcon: false },
];

// Pełna lista wszystkich dostępnych ikon
const allIcons = [
  // Simple Icons - logotypy marek (prefiks simple:)
  { name: 'simple:facebook', label: 'Facebook', icon: null, isSimpleIcon: true, slug: 'facebook' },
  { name: 'simple:google', label: 'Google', icon: null, isSimpleIcon: true, slug: 'google' },
  { name: 'simple:instagram', label: 'Instagram', icon: null, isSimpleIcon: true, slug: 'instagram' },
  // Phosphor Icons - narzędzia
  { name: 'MegaphoneSimple', label: 'Megafon', icon: MegaphoneSimple, isSimpleIcon: false },
  { name: 'MagnifyingGlass', label: 'Lupa', icon: MagnifyingGlass, isSimpleIcon: false },
  { name: 'Envelope', label: 'Email', icon: Envelope, isSimpleIcon: false },
  { name: 'DeviceMobile', label: 'Telefon', icon: DeviceMobile, isSimpleIcon: false },
  { name: 'Globe', label: 'Globus', icon: Globe, isSimpleIcon: false },
  { name: 'FileText', label: 'Dokument', icon: FileText, isSimpleIcon: false },
  { name: 'CreditCard', label: 'Karta', icon: CreditCard, isSimpleIcon: false },
  { name: 'CheckCircle', label: 'Zaznacz', icon: CheckCircle, isSimpleIcon: false },
  { name: 'Notebook', label: 'Notatnik', icon: Notebook, isSimpleIcon: false },
  { name: 'PresentationChart', label: 'Wykres', icon: PresentationChart, isSimpleIcon: false },
  { name: 'ChatCircle', label: 'Chat', icon: ChatCircle, isSimpleIcon: false },
  { name: 'Phone', label: 'Telefon', icon: Phone, isSimpleIcon: false },
  { name: 'Money', label: 'Pieniądze', icon: Money, isSimpleIcon: false },
  { name: 'Wallet', label: 'Portfel', icon: Wallet, isSimpleIcon: false },
  { name: 'ShoppingCart', label: 'Koszyk', icon: ShoppingCart, isSimpleIcon: false },
  { name: 'Tag', label: 'Tag', icon: Tag, isSimpleIcon: false },
  { name: 'CurrencyDollar', label: 'Dolar', icon: CurrencyDollar, isSimpleIcon: false },
  { name: 'Storefront', label: 'Sklep', icon: Storefront, isSimpleIcon: false },
  { name: 'TrendUp', label: 'Wzrost', icon: TrendUp, isSimpleIcon: false },
  { name: 'TrendDown', label: 'Spadek', icon: TrendDown, isSimpleIcon: false },
  { name: 'ChartLine', label: 'Wykres liniowy', icon: ChartLine, isSimpleIcon: false },
  { name: 'Users', label: 'Użytkownicy', icon: Users, isSimpleIcon: false },
  { name: 'User', label: 'Użytkownik', icon: User, isSimpleIcon: false },
  { name: 'Calendar', label: 'Kalendarz', icon: Calendar, isSimpleIcon: false },
  { name: 'Clock', label: 'Zegar', icon: Clock, isSimpleIcon: false },
  { name: 'PaperPlaneTilt', label: 'Wiadomość', icon: PaperPlaneTilt, isSimpleIcon: false },
  { name: 'VideoCamera', label: 'Wideo', icon: VideoCamera, isSimpleIcon: false },
  { name: 'Camera', label: 'Aparat', icon: Camera, isSimpleIcon: false },
  { name: 'Image', label: 'Obraz', icon: Image, isSimpleIcon: false },
  { name: 'Link', label: 'Link', icon: Link, isSimpleIcon: false },
  { name: 'Share', label: 'Udostępnij', icon: Share, isSimpleIcon: false },
  { name: 'Heart', label: 'Serce', icon: Heart, isSimpleIcon: false },
  { name: 'Star', label: 'Gwiazda', icon: Star, isSimpleIcon: false },
  { name: 'Bell', label: 'Dzwonek', icon: Bell, isSimpleIcon: false },
  { name: 'Warning', label: 'Ostrzeżenie', icon: Warning, isSimpleIcon: false },
  { name: 'Info', label: 'Informacja', icon: Info, isSimpleIcon: false },
  { name: 'Question', label: 'Pytanie', icon: Question, isSimpleIcon: false },
  { name: 'Check', label: 'Zaznacz', icon: Check, isSimpleIcon: false },
  { name: 'X', label: 'Zamknij', icon: X, isSimpleIcon: false },
  { name: 'Plus', label: 'Dodaj', icon: Plus, isSimpleIcon: false },
  { name: 'Minus', label: 'Usuń', icon: Minus, isSimpleIcon: false },
  { name: 'ArrowRight', label: 'Strzałka w prawo', icon: ArrowRight, isSimpleIcon: false },
  { name: 'ArrowLeft', label: 'Strzałka w lewo', icon: ArrowLeft, isSimpleIcon: false },
  { name: 'ArrowUp', label: 'Strzałka w górę', icon: ArrowUp, isSimpleIcon: false },
  { name: 'ArrowDown', label: 'Strzałka w dół', icon: ArrowDown, isSimpleIcon: false },
  { name: 'Download', label: 'Pobierz', icon: Download, isSimpleIcon: false },
  { name: 'Upload', label: 'Wyślij', icon: Upload, isSimpleIcon: false },
  { name: 'Eye', label: 'Widok', icon: Eye, isSimpleIcon: false },
  { name: 'EyeSlash', label: 'Ukryj', icon: EyeSlash, isSimpleIcon: false },
  { name: 'Lock', label: 'Zablokuj', icon: Lock, isSimpleIcon: false },
  { name: 'LockOpen', label: 'Odblokuj', icon: LockOpen, isSimpleIcon: false },
  { name: 'Key', label: 'Klucz', icon: Key, isSimpleIcon: false },
  { name: 'Shield', label: 'Tarcza', icon: Shield, isSimpleIcon: false },
  { name: 'Trash', label: 'Kosz', icon: Trash, isSimpleIcon: false },
  { name: 'Pencil', label: 'Ołówek', icon: Pencil, isSimpleIcon: false },
  { name: 'Copy', label: 'Kopiuj', icon: Copy, isSimpleIcon: false },
  { name: 'Clipboard', label: 'Schowek', icon: Clipboard, isSimpleIcon: false },
  { name: 'Folder', label: 'Folder', icon: Folder, isSimpleIcon: false },
  { name: 'Database', label: 'Baza danych', icon: Database, isSimpleIcon: false },
  { name: 'Cloud', label: 'Chmura', icon: Cloud, isSimpleIcon: false },
  { name: 'WifiHigh', label: 'WiFi', icon: WifiHigh, isSimpleIcon: false },
  { name: 'Broadcast', label: 'Nadawanie', icon: Broadcast, isSimpleIcon: false },
  { name: 'Gear', label: 'Ustawienia', icon: Gear, isSimpleIcon: false },
];

// Mapowanie starych emotikonów na nazwy ikon Phosphor (jak w FunnelBuilder)
const iconEmojiMap: Record<string, string> = {
  '📢': 'MegaphoneSimple',
  '🔍': 'MagnifyingGlass',
  '📧': 'Envelope',
  '📱': 'DeviceMobile',
  '⚙️': 'Gear',
  '🌐': 'Globe',
  '📄': 'FileText',
  '💳': 'CreditCard',
  '✅': 'CheckCircle',
  '📝': 'Notebook',
  '📊': 'PresentationChart',
  '💬': 'ChatCircle',
  '📞': 'Phone',
};

export const IconPicker: React.FC<IconPickerProps> = ({ value, onChange, className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFullList, setShowFullList] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setShowFullList(false);
        setSearchQuery('');
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Mapuj emotikony na nazwy ikon Phosphor
  const mappedValue = iconEmojiMap[value] || value;
  
  const selectedIcon = allIcons.find(icon => icon.name === mappedValue || icon.name === value) || popularIcons.find(icon => icon.name === mappedValue || icon.name === value);
  
  // Renderuj ikonę - Simple Icons lub Phosphor Icons
  const renderIcon = () => {
    if (selectedIcon?.isSimpleIcon && selectedIcon.slug) {
      return renderSimpleIcon(selectedIcon.slug, 18, 'text-white');
    }
    if (value && value.startsWith('simple:')) {
      const slug = value.replace('simple:', '');
      return renderSimpleIcon(slug, 18, 'text-white');
    }
    const IconComponent = selectedIcon?.icon || FileText;
    return <IconComponent size={18} weight="regular" className="text-white" />;
  };

  // Etykieta - pokaż label ikony lub "Wybierz ikonę" jeśli nie mamy value
  const displayLabel = selectedIcon?.label || (value && value.startsWith('simple:') ? value.replace('simple:', '').charAt(0).toUpperCase() + value.replace('simple:', '').slice(1) : value ? mappedValue : 'Wybierz ikonę');

  const iconsToShow = showFullList ? allIcons : popularIcons;
  const filteredIcons = searchQuery
    ? iconsToShow.filter(icon =>
        icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.label.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : iconsToShow;

  return (
    <div ref={pickerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 hover:border-white/20 transition-colors flex items-center justify-between"
      >
        <div className="flex items-center gap-2">
          {renderIcon()}
          <span className="text-white">{displayLabel}</span>
        </div>
        <svg
          className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} w-4 h-4`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full bg-[#101820] border border-white/15 mt-2 rounded-lg shadow-xl max-h-96 overflow-hidden">
          {/* Wyszukiwarka */}
          <div className="p-3 border-b border-white/10">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Szukaj ikony..."
              className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
              autoFocus
            />
          </div>

          {/* Lista ikon */}
          <div className="max-h-64 overflow-y-auto p-3">
            <div className="grid grid-cols-4 gap-2">
              {filteredIcons.map((iconItem) => {
                const isSelected = value === iconItem.name;
                const renderIconItem = () => {
                  if (iconItem.isSimpleIcon && iconItem.slug) {
                    return renderSimpleIcon(iconItem.slug, 20, '');
                  }
                  const Icon = iconItem.icon || FileText;
                  return <Icon size={20} weight="regular" className="mx-auto" />;
                };
                return (
                  <button
                    key={iconItem.name}
                    type="button"
                    onClick={() => {
                      onChange(iconItem.name);
                      setIsOpen(false);
                      setSearchQuery('');
                    }}
                    className={`p-2 rounded-lg border transition-all ${
                      isSelected
                        ? 'bg-[#fee715]/10 border-[#fee715]/50 text-[#fee715]'
                        : 'bg-white/[0.02] border-white/10 text-white/70 hover:bg-white/5 hover:border-white/20 hover:text-white'
                    }`}
                    title={iconItem.label}
                  >
                    {renderIconItem()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Przycisk "Pokaż pełną listę" / "Pokaż popularne" */}
          <div className="p-3 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setShowFullList(!showFullList);
                setSearchQuery('');
              }}
              className="w-full px-3 py-2 bg-white/[0.04] border border-white/10 rounded text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
            >
              {showFullList ? 'Pokaż tylko popularne' : 'Pokaż pełną listę'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
