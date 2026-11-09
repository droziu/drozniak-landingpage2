'use client';

import React, { useState, useCallback, useEffect, useMemo, useRef, createContext, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
  ReactFlow,
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  BackgroundVariant,
  Panel,
  NodeTypes,
  EdgeTypes,
  MarkerType,
  getBezierPath,
  getSmoothStepPath,
  EdgeLabelRenderer,
  Handle,
  Position,
  NodeResizer,
  BaseEdge,
  type NodeChange,
  type EdgeChange,
  type ConnectionLineType,
  type ConnectionMode,
  type SelectionMode,
} from '@xyflow/react';
// Style React Flow ładowane tylko tu, a nie w głównym layoucie: publiczne strony ich nie potrzebują
import '@xyflow/react/dist/style.css';
// CSS React Flow jest importowany globalnie w index.tsx
import * as SimpleIcons from 'simple-icons';
import { useAuth } from '@/app/hooks/useAuth';
import { supabase } from '@/lib/supabase-client';
import { AlertModal } from '@/components/AlertModal';
import { LoadingState } from '@/components/LoadingState';
import { CustomSelect } from '@/components/CustomSelect';
import { CustomCheckbox } from '@/components/CustomCheckbox';
import { IconPicker } from '@/components/IconPicker';
import { CommentPanel } from '@/components/CommentPanel';
import { CommentThread } from '@/components/CommentThread';
import { CommentForm } from '@/components/CommentForm';
import { CommentBadge } from '@/components/CommentBadge';
import { useParams, usePathname, useRouter } from 'next/navigation';
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
  DotsThree,
  // Dodatkowe ikony dla marketingu
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
  Broadcast,
  // Ikony dla systemu komentarzy
  ChatCircleDots,
  CheckSquare,
  ClipboardText,
  Funnel,
  CrosshairSimple,
  ArrowSquareOut,
  XCircle,
  Spinner,
  ShieldCheck,
  WarningCircle,
  Hand
} from 'phosphor-react';

// Kontekst trybu zaznaczania: klik = dodaj do zaznaczenia, przytrzymaj = odznacz ten element
const FunnelSelectModeContext = createContext<{
  isSelectMode: boolean;
  onLongPressDeselect: (nodeId: string) => void;
}>({ isSelectMode: false, onLongPressDeselect: () => {} });

// Mapowanie starych emotikonów na nazwy ikon Phosphor
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

// Funkcja renderująca ikonę Phosphor na podstawie nazwy (obsługuje też stare emotikony i Simple Icons)
const renderPhosphorIcon = (iconName: string, size: number = 24, className: string = '') => {
  // Jeśli ikona zaczyna się od "simple:", użyj Simple Icons
  if (iconName.startsWith('simple:')) {
    const slug = iconName.replace('simple:', '');
    return renderSimpleIcon(slug, size, className);
  }
  
  const iconProps = { size, weight: 'regular' as const, className, color: 'currentColor' };
  
  // Jeśli to emotikon, zamień na nazwę ikony Phosphor
  const mappedIcon = iconEmojiMap[iconName] || iconName;
  
  switch (mappedIcon) {
    case 'MegaphoneSimple': return <MegaphoneSimple {...iconProps} />;
    case 'MagnifyingGlass': return <MagnifyingGlass {...iconProps} />;
    case 'Envelope': return <Envelope {...iconProps} />;
    case 'DeviceMobile': return <DeviceMobile {...iconProps} />;
    case 'Globe': return <Globe {...iconProps} />;
    case 'FileText': return <FileText {...iconProps} />;
    case 'CreditCard': return <CreditCard {...iconProps} />;
    case 'CheckCircle': return <CheckCircle {...iconProps} />;
    case 'Notebook': return <Notebook {...iconProps} />;
    case 'PresentationChart': return <PresentationChart {...iconProps} />;
    case 'ChatCircle': return <ChatCircle {...iconProps} />;
    case 'Phone': return <Phone {...iconProps} />;
    case 'Gear': return <Gear {...iconProps} />;
    case 'DotsThree': return <DotsThree {...iconProps} />;
    // Dodatkowe ikony
    case 'Money': return <Money {...iconProps} />;
    case 'Wallet': return <Wallet {...iconProps} />;
    case 'ShoppingCart': return <ShoppingCart {...iconProps} />;
    case 'Tag': return <Tag {...iconProps} />;
    case 'CurrencyDollar': return <CurrencyDollar {...iconProps} />;
    case 'Storefront': return <Storefront {...iconProps} />;
    case 'TrendUp': return <TrendUp {...iconProps} />;
    case 'TrendDown': return <TrendDown {...iconProps} />;
    case 'ChartLine': return <ChartLine {...iconProps} />;
    case 'Users': return <Users {...iconProps} />;
    case 'User': return <User {...iconProps} />;
    case 'Calendar': return <Calendar {...iconProps} />;
    case 'Clock': return <Clock {...iconProps} />;
    case 'PaperPlaneTilt': return <PaperPlaneTilt {...iconProps} />;
    case 'VideoCamera': return <VideoCamera {...iconProps} />;
    case 'Camera': return <Camera {...iconProps} />;
    case 'Image': return <Image {...iconProps} />;
    case 'Link': return <Link {...iconProps} />;
    case 'Share': return <Share {...iconProps} />;
    case 'Heart': return <Heart {...iconProps} />;
    case 'Star': return <Star {...iconProps} />;
    case 'Bell': return <Bell {...iconProps} />;
    case 'Warning': return <Warning {...iconProps} />;
    case 'Info': return <Info {...iconProps} />;
    case 'Question': return <Question {...iconProps} />;
    case 'Check': return <Check {...iconProps} />;
    case 'X': return <X {...iconProps} />;
    case 'Plus': return <Plus {...iconProps} />;
    case 'Minus': return <Minus {...iconProps} />;
    case 'ArrowRight': return <ArrowRight {...iconProps} />;
    case 'ArrowLeft': return <ArrowLeft {...iconProps} />;
    case 'ArrowUp': return <ArrowUp {...iconProps} />;
    case 'ArrowDown': return <ArrowDown {...iconProps} />;
    case 'Download': return <Download {...iconProps} />;
    case 'Upload': return <Upload {...iconProps} />;
    case 'Eye': return <Eye {...iconProps} />;
    case 'EyeSlash': return <EyeSlash {...iconProps} />;
    case 'Lock': return <Lock {...iconProps} />;
    case 'LockOpen': return <LockOpen {...iconProps} />;
    case 'Key': return <Key {...iconProps} />;
    case 'Shield': return <Shield {...iconProps} />;
    case 'Trash': return <Trash {...iconProps} />;
    case 'Pencil': return <Pencil {...iconProps} />;
    case 'Copy': return <Copy {...iconProps} />;
    case 'Clipboard': return <Clipboard {...iconProps} />;
    case 'Folder': return <Folder {...iconProps} />;
    case 'Database': return <Database {...iconProps} />;
    case 'Cloud': return <Cloud {...iconProps} />;
    case 'WifiHigh': return <WifiHigh {...iconProps} />;
    case 'Broadcast': return <Broadcast {...iconProps} />;
    default: return <FileText {...iconProps} />;
  }
};

// Custom Node Types
interface CustomNodeData {
  label: string;
  icon: string;
  color?: string;
  notes?: string;
  link?: string;
  isPinned?: boolean;
  category?: string;
  customFields?: NodeCustomField[];
}

interface NodeCustomField {
  id?: string;
  field_name: string;
  field_type: 'text' | 'date' | 'number' | 'link';
  field_value: string;
  display_order?: number;
}

interface EdgeCustomField {
  id?: string;
  field_name: string;
  field_type: 'text' | 'date' | 'number' | 'link';
  field_value: string;
  display_order?: number;
}

interface TextNodeData {
  text: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold' | 'semibold';
  textAlign?: 'left' | 'center' | 'right';
  verticalAlign?: 'top' | 'middle' | 'bottom';
  showHandles?: boolean;
  width?: number;
  height?: number;
  isPinned?: boolean;
}

// Custom Node Component - DARK PREMIUM (Linear-style). Gradient elev-2 karty z kolorową ikoną.
const CustomNode: React.FC<{ id: string; data: CustomNodeData & { commentCount?: number; commentStatus?: 'warning' | 'pending' | 'neutral' | 'closed' }; selected?: boolean }> = ({ id, data, selected }) => {
  const accentColor = data.color || '#fee715';
  return (
    <div
      className="relative group rounded-xl transition-all duration-150 min-w-[120px] max-w-[180px]"
      style={{
        background: 'linear-gradient(180deg, #1a1d24 0%, #15171c 100%)',
        border: selected ? `1.5px solid ${accentColor}` : '1px solid rgba(255, 255, 255, 0.07)',
        boxShadow: selected
          ? `0 0 0 4px ${accentColor}22, 0 12px 32px rgba(0, 0, 0, 0.55), 0 2px 6px rgba(0, 0, 0, 0.35)`
          : '0 4px 14px rgba(0, 0, 0, 0.35), 0 1px 2px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.025)',
      }}
    >
      {data.commentCount !== undefined && data.commentCount > 0 && (
        <CommentBadge
          count={data.commentCount}
          status={data.commentStatus || 'neutral'}
          onClick={() => {}}
        />
      )}
      {/* Handles - okrągłe, ciemny pierścień scala z node-em */}
      <Handle type="source" position={Position.Top} id="top" className="!w-3 !h-3 !min-w-3 !min-h-3 !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ top: -6, backgroundColor: accentColor }} title="Przeciągnij aby połączyć" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!w-3 !h-3 !min-w-3 !min-h-3 !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ bottom: -6, backgroundColor: accentColor }} title="Przeciągnij aby połączyć" />
      <Handle type="source" position={Position.Left} id="left" className="!w-3 !h-3 !min-w-3 !min-h-3 !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ left: -6, backgroundColor: accentColor }} title="Przeciągnij aby połączyć" />
      <Handle type="source" position={Position.Right} id="right" className="!w-3 !h-3 !min-w-3 !min-h-3 !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ right: -6, backgroundColor: accentColor }} title="Przeciągnij aby połączyć" />

      {/* Ikona u góry - duża, gradient brand */}
      <div className="px-3 pt-3 pb-1 flex justify-center">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
          style={{
            background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}cc 100%)`,
            color: '#0a0b0e',
            boxShadow: `0 6px 16px ${accentColor}33, inset 0 1px 0 rgba(255,255,255,0.35), inset 0 -1px 0 rgba(0,0,0,0.15)`,
          }}
        >
          {renderPhosphorIcon(data.icon, 22)}
        </div>
      </div>

      {/* Label */}
      <div className="px-3 pb-2.5">
        <div className="text-[12px] font-semibold text-white/95 leading-tight text-center tracking-tight line-clamp-2">{data.label}</div>
        {data.notes && (
          <div className="text-[10px] text-white/45 mt-1 text-center line-clamp-1">{data.notes}</div>
        )}
      </div>
      {data.link && (
        <div className="px-3 pb-2.5 -mt-1 flex items-center justify-center gap-1 text-[10px]" style={{ color: accentColor }}>
          <Link size={10} weight="bold" />
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="hover:underline truncate" onClick={(e) => e.stopPropagation()}>
            {data.link.length > 24 ? data.link.substring(0, 24) + '…' : data.link}
          </a>
        </div>
      )}
      {data.customFields && data.customFields.length > 0 && (
        <div className="px-3 pb-2.5 -mt-1 pt-2 border-t border-white/[0.06] space-y-0.5">
          {data.customFields.map((field, index) => (
            <div key={index} className="text-[10px] text-white/65 flex items-center justify-between gap-1.5">
              <span className="text-white/40 font-medium truncate">{field.field_name}:</span>
              {field.field_type === 'link' ? (
                <a
                  href={field.field_value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline truncate"
                  style={{ color: accentColor }}
                  onClick={(e) => e.stopPropagation()}
                >
                  {field.field_value.length > 20 ? field.field_value.substring(0, 20) + '…' : field.field_value}
                </a>
              ) : field.field_type === 'date' ? (
                <span className="truncate">{field.field_value ? new Date(field.field_value).toLocaleDateString('pl-PL') : '—'}</span>
              ) : (
                <span className="truncate">{field.field_value || '—'}</span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Custom Edge: linia od A (source) do B (target), strzałka TYLKO na końcu w B (kierunek A→B)
const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, data, style, markerEnd }: any) => {
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    borderRadius: 20,
  });

  // Oblicz długość ścieżki i pozycję wzdłuż ścieżki
  const pathElementRef = React.useRef<SVGPathElement | null>(null);
  
  React.useEffect(() => {
    if (pathElementRef.current) return;
    const svgPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    svgPath.setAttribute('d', edgePath);
    pathElementRef.current = svgPath;
  }, [edgePath]);

  // Oblicz offset dla etykiety, aby uniknąć kolizji z innymi etykietami
  const [labelOffset, setLabelOffset] = React.useState(0);
  const labelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!data?.notes || !labelRef.current || !pathElementRef.current) return;

    const checkCollisions = () => {
      const currentLabel = labelRef.current;
      if (!currentLabel) return;

      const currentRect = currentLabel.getBoundingClientRect();
      const allLabels = document.querySelectorAll('[data-edge-label]');
      const margin = 15; // margines kolizji dla etykiet edges

      // Sprawdź kolizje z innymi etykietami
      let hasCollision = false;
      for (const otherLabel of allLabels) {
        if (otherLabel === currentLabel) continue;
        const otherRect = otherLabel.getBoundingClientRect();
        const overlapX = !(currentRect.right + margin < otherRect.left || currentRect.left - margin > otherRect.right);
        const overlapY = !(currentRect.bottom + margin < otherRect.top || currentRect.top - margin > otherRect.bottom);
        
        if (overlapX && overlapY) {
          hasCollision = true;
          break;
        }
      }

      // Jeśli jest kolizja, przesuń etykietę wzdłuż ścieżki
      if (hasCollision && pathElementRef.current) {
        try {
          const pathLength = pathElementRef.current.getTotalLength();
          const midPoint = pathLength / 2;
          const offsetStep = 30; // Krok przesunięcia w pikselach
          const maxOffset = pathLength * 0.25; // Maksymalne przesunięcie (25% długości)
          
          // Spróbuj przesunąć w górę i w dół ścieżki
          let bestOffset = 0;
          for (let offset = offsetStep; offset <= maxOffset; offset += offsetStep) {
            // Spróbuj w górę
            const pointUp = pathElementRef.current.getPointAtLength(midPoint - offset);
            const testRectUp = {
              left: pointUp.x - currentRect.width / 2,
              right: pointUp.x + currentRect.width / 2,
              top: pointUp.y - currentRect.height / 2,
              bottom: pointUp.y + currentRect.height / 2,
            };
            
            let collisionUp = false;
            for (const otherLabel of allLabels) {
              if (otherLabel === currentLabel) continue;
              const otherRect = otherLabel.getBoundingClientRect();
              const overlapX = !(testRectUp.right + margin < otherRect.left || testRectUp.left - margin > otherRect.right);
              const overlapY = !(testRectUp.bottom + margin < otherRect.top || testRectUp.top - margin > otherRect.bottom);
              if (overlapX && overlapY) {
                collisionUp = true;
                break;
              }
            }
            
            if (!collisionUp) {
              bestOffset = -offset;
              break;
            }
            
            // Spróbuj w dół
            const pointDown = pathElementRef.current.getPointAtLength(midPoint + offset);
            const testRectDown = {
              left: pointDown.x - currentRect.width / 2,
              right: pointDown.x + currentRect.width / 2,
              top: pointDown.y - currentRect.height / 2,
              bottom: pointDown.y + currentRect.height / 2,
            };
            
            let collisionDown = false;
            for (const otherLabel of allLabels) {
              if (otherLabel === currentLabel) continue;
              const otherRect = otherLabel.getBoundingClientRect();
              const overlapX = !(testRectDown.right + margin < otherRect.left || testRectDown.left - margin > otherRect.right);
              const overlapY = !(testRectDown.bottom + margin < otherRect.top || testRectDown.top - margin > otherRect.bottom);
              if (overlapX && overlapY) {
                collisionDown = true;
                break;
              }
            }
            
            if (!collisionDown) {
              bestOffset = offset;
              break;
            }
          }
          
          setLabelOffset(bestOffset);
        } catch (e) {
          // Ignoruj błędy
        }
      } else {
        setLabelOffset(0);
      }
    };

    // Opóźnij sprawdzenie, aby wszystkie etykiety były już wyrenderowane
    const timeoutId = setTimeout(checkCollisions, 150);
    return () => clearTimeout(timeoutId);
  }, [data?.notes, edgePath, labelX, labelY]);

  // Oblicz finalną pozycję etykiety
  const finalPosition = React.useMemo(() => {
    if (labelOffset === 0 || !pathElementRef.current) {
      return { x: labelX, y: labelY };
    }
    
    try {
      const pathLength = pathElementRef.current.getTotalLength();
      const point = pathElementRef.current.getPointAtLength(pathLength / 2 + labelOffset);
      return { x: point.x, y: point.y };
    } catch (e) {
      return { x: labelX, y: labelY };
    }
  }, [labelX, labelY, labelOffset]);

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        style={style}
        markerEnd={markerEnd}
        markerStart={undefined}
      />
      {/* Comment Badge dla edge */}
      {data?.commentCount !== undefined && data.commentCount > 0 && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY - 20}px)`,
            }}
            className="nodrag nopan"
          >
            <CommentBadge
              count={data.commentCount}
              status={data.commentStatus || 'neutral'}
              onClick={() => {}}
            />
          </div>
        </EdgeLabelRenderer>
      )}
      {data?.notes && (
        <EdgeLabelRenderer>
          <div
            ref={labelRef}
            data-edge-label={id}
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${finalPosition.x}px,${finalPosition.y}px)`,
            }}
            className="nodrag nopan"
          >
            <div className="px-2.5 py-1.5 bg-[#13151a]/95 backdrop-blur-md text-white/90 text-[11px] font-medium rounded-md shadow-2xl shadow-black/50 border border-white/[0.10] max-w-[220px] break-words whitespace-normal leading-snug">
              {data.notes}
              {data?.link && (
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block mt-1 text-[#fee715] underline decoration-[#fee715]/40 hover:decoration-[#fee715]"
                >
                  Link
                </a>
              )}
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
};

// Text Node Component (tekst + handles do łączenia, z możliwością resize)
const TextNode: React.FC<{ id: string; data: TextNodeData & { commentCount?: number; commentStatus?: 'warning' | 'pending' | 'neutral' | 'closed' }; selected?: boolean; width?: number; height?: number }> = ({ id, data, selected, width, height }) => {

  // Użyj width/height z props (React Flow automatycznie je aktualizuje przez NodeResizer) lub z data, lub domyślne
  const nodeWidth = width || data.width || 250;
  const nodeHeight = height || data.height || 100;

  return (
    <div
      className="px-8 py-5 rounded-xl border transition-all duration-200 relative group"
      style={{
        background: selected ? 'linear-gradient(180deg, #1a1d24 0%, #15171c 100%)' : 'linear-gradient(180deg, #15171c 0%, #131519 100%)',
        borderColor: selected ? 'rgba(254, 231, 21, 0.7)' : 'rgba(255, 255, 255, 0.07)',
        boxShadow: selected
          ? '0 0 0 4px rgba(254, 231, 21, 0.16), 0 10px 28px rgba(0, 0, 0, 0.5)'
          : '0 4px 14px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.25)',
        width: nodeWidth,
        height: nodeHeight,
        minWidth: 150,
        minHeight: 60,
      }}
    >
      {/* Comment Badge */}
      {data.commentCount !== undefined && data.commentCount > 0 && (
        <CommentBadge
          count={data.commentCount}
          status={data.commentStatus || 'neutral'}
          onClick={() => {}}
        />
      )}
      {/* Handles tylko jeśli włączone (domyślnie wyłączone dla paneli tekstowych) */}
      {/* Uchwyty są przezroczyste i pojawiają się tylko na hover noda */}
      {data.showHandles && (
        <>
          <Handle type="source" position={Position.Top} id="top" className="!w-3 !h-3 !min-w-3 !min-h-3 !bg-[#fee715] !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ top: -6 }} title="Przeciągnij do drugiego elementu" />
          <Handle type="source" position={Position.Bottom} id="bottom" className="!w-3 !h-3 !min-w-3 !min-h-3 !bg-[#fee715] !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ bottom: -6 }} title="Przeciągnij do drugiego elementu" />
          <Handle type="source" position={Position.Left} id="left" className="!w-3 !h-3 !min-w-3 !min-h-3 !bg-[#fee715] !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ left: -6 }} title="Przeciągnij do drugiego elementu" />
          <Handle type="source" position={Position.Right} id="right" className="!w-3 !h-3 !min-w-3 !min-h-3 !bg-[#fee715] !border-2 !border-[#13151a] hover:!w-4 hover:!h-4 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ right: -6 }} title="Przeciągnij do drugiego elementu" />
        </>
      )}
      <NodeResizer
        color="#fee715"
        isVisible={selected}
        minWidth={150}
        minHeight={60}
        handleStyle={{
          backgroundColor: '#fee715',
          border: '2px solid #13151a',
          borderRadius: '4px',
          width: '10px',
          height: '10px',
        }}
      />
      <div
        className="text-white break-words h-full w-full flex"
        style={{
          fontSize: data.fontSize || 16,
          fontWeight: data.fontWeight || 'normal',
          textAlign: data.textAlign || 'left',
          justifyContent: data.textAlign === 'center' ? 'center' : data.textAlign === 'right' ? 'flex-end' : 'flex-start',
          alignItems: data.verticalAlign === 'top' ? 'flex-start' : data.verticalAlign === 'bottom' ? 'flex-end' : 'center',
          padding: '8px',
        }}
      >
        {data.text || 'Kliknij, aby edytować'}
      </div>
    </div>
  );
};

// ============================================================
// Properties Panel - helper komponenty (Figma/Linear-style)
// ============================================================

interface PropSectionProps {
  title: string;
  children: React.ReactNode;
}

/** Sekcja w properties panel - hairline separator, mono uppercase label */
const PropSection: React.FC<PropSectionProps> = ({ title, children }) => (
  <div className="border-b border-white/[0.06] last:border-b-0">
    <div className="px-3.5 pt-3 pb-1.5 text-[9px] font-mono font-semibold text-white/40 uppercase tracking-[0.18em]">
      {title}
    </div>
    <div className="px-3.5 pb-3 space-y-2">{children}</div>
  </div>
);

interface PropRowProps {
  label: string;
  children: React.ReactNode;
}

/** Wiersz w sekcji - label + control. Label po lewej (fixed), kontrol po prawej. */
const PropRow: React.FC<PropRowProps> = ({ label, children }) => (
  <div>
    <div className="text-[10px] text-white/50 mb-1 font-medium">{label}</div>
    {children}
  </div>
);

interface CollapsibleSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  onAdd?: () => void;
  children: React.ReactNode;
}

/** Zwijana sekcja - tytuł + chevron + opcjonalny + button */
const CollapsibleSection: React.FC<CollapsibleSectionProps> = ({ title, count, defaultOpen = false, onAdd, children }) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <div className="border-b border-white/[0.06] last:border-b-0">
      <div className="px-3.5 pt-3 pb-2 flex items-center justify-between">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-[9px] font-mono font-semibold text-white/40 hover:text-white/65 uppercase tracking-[0.18em] transition-colors"
        >
          <svg className={`w-2.5 h-2.5 transition-transform ${open ? 'rotate-90' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
          </svg>
          {title}
          {typeof count === 'number' && count > 0 && (
            <span className="ml-0.5 text-white/50 font-mono">{count}</span>
          )}
        </button>
        {onAdd && (
          <button
            onClick={onAdd}
            className="p-0.5 hover:bg-white/[0.06] rounded text-white/40 hover:text-white transition-colors"
            title="Dodaj"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
            </svg>
          </button>
        )}
      </div>
      {open && <div className="px-3.5 pb-3 space-y-2">{children}</div>}
    </div>
  );
};

// Node Types Configuration
const nodeTypes: NodeTypes = {
  custom: CustomNode,
  text: TextNode,
};

// Edge Types Configuration
const edgeTypes = {
  custom: CustomEdge,
};

// Stałe propy ReactFlow (wyniesione na poziom modułu, aby zapobiec re-rendererom przez nową referencję).
// Kolor edge: brand yellow z lekko stonowanym wariantem - czytelne ale nie krzykliwe na dark canvas.
const FUNNEL_EDGE_COLOR = '#d4c10f';
const FUNNEL_DEFAULT_EDGE_OPTIONS = {
  type: 'custom',
  animated: false,
  style: { stroke: FUNNEL_EDGE_COLOR, strokeWidth: 1.75, opacity: 0.85 },
  markerStart: undefined,
  markerEnd: {
    type: MarkerType.ArrowClosed,
    color: FUNNEL_EDGE_COLOR,
    orient: 'auto',
  },
} as const;

const FUNNEL_CONNECTION_LINE_STYLE = { stroke: '#fee715', strokeWidth: 2, strokeDasharray: '6,4' } as const;
const FUNNEL_FIT_VIEW_OPTIONS = { padding: 0.2, duration: 0 } as const;
const FUNNEL_FIT_VIEW_OPTIONS_ANIMATED = { padding: 0.2, duration: 300 } as const;
const FUNNEL_DELETE_KEY_CODES = ['Delete', 'Backspace'];
const FUNNEL_SNAP_GRID: [number, number] = [20, 20];
const FUNNEL_PRO_OPTIONS = { hideAttribution: true } as const;

// Available Node Templates (Sidebar)
const nodeTemplates = [
  { type: 'text', icon: 'FileText', label: 'Tekst', category: 'Narzędzia' },
  // Źródła Ruchu
  { type: 'custom', icon: 'simple:facebook', label: 'Facebook Ads', color: '#1877F2', category: 'Źródła Ruchu' },
  { type: 'custom', icon: 'simple:google', label: 'Google Ads', color: '#4285F4', category: 'Źródła Ruchu' },
  { type: 'custom', icon: 'Envelope', label: 'Email', color: '#EA4335', category: 'Źródła Ruchu' },
  { type: 'custom', icon: 'simple:instagram', label: 'Instagram', color: '#E4405F', category: 'Źródła Ruchu' },
  { type: 'custom', icon: 'simple:youtube', label: 'Youtube', color: '#FF0000', category: 'Źródła Ruchu' },
  { type: 'custom', icon: 'Gear', label: 'Inne', color: '#fee715', category: 'Źródła Ruchu', isCustom: true },
  // Typ Strony
  { type: 'custom', icon: 'Globe', label: 'Landing', color: '#00C9A7', category: 'Typ Strony' },
  { type: 'custom', icon: 'FileText', label: 'Sales page', color: '#00C9A7', category: 'Typ Strony' },
  { type: 'custom', icon: 'CreditCard', label: 'Checkout', color: '#00C9A7', category: 'Typ Strony' },
  { type: 'custom', icon: 'CheckCircle', label: 'Thank you', color: '#00C9A7', category: 'Typ Strony' },
  { type: 'custom', icon: 'Gear', label: 'Inne', color: '#00C9A7', category: 'Typ Strony', isCustom: true },
  // Działania
  { type: 'custom', icon: 'Notebook', label: 'Ebook', color: '#fee715', category: 'Działania' },
  { type: 'custom', icon: 'Phone', label: 'Rozmowa', color: '#fee715', category: 'Działania' },
  { type: 'custom', icon: 'FileText', label: 'Formularz', color: '#fee715', category: 'Działania' },
  { type: 'custom', icon: 'PresentationChart', label: 'Webinar', color: '#fee715', category: 'Działania' },
  { type: 'custom', icon: 'Gear', label: 'Inne', color: '#fee715', category: 'Działania', isCustom: true },
  // Cel/Konwersja
  { type: 'custom', icon: 'CheckCircle', label: 'Lead', color: '#10B981', category: 'Cel/Konwersja' },
  { type: 'custom', icon: 'Calendar', label: 'Rezerwacja', color: '#10B981', category: 'Cel/Konwersja' },
  { type: 'custom', icon: 'Phone', label: 'Telefon', color: '#10B981', category: 'Cel/Konwersja' },
  { type: 'custom', icon: 'CurrencyDollar', label: 'Sprzedaż', color: '#10B981', category: 'Cel/Konwersja' },
  { type: 'custom', icon: 'Gear', label: 'Inne', color: '#10B981', category: 'Cel/Konwersja', isCustom: true },
];

interface FunnelDiagram {
  id: string;
  project_name: string;
  client_id: string | null;
  diagram_data: any;
  status: string;
  subtitle?: string | null;
}

// DatePickerField component for custom fields
export interface DatePickerFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const DatePickerField: React.FC<DatePickerFieldProps> = ({ value, onChange }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const [calendarStyle, setCalendarStyle] = useState<React.CSSProperties>({});

  const formatDateForDisplay = (dateStr: string) => {
    if (!dateStr) return 'dd.mm.rrrr';
    const date = new Date(dateStr + 'T00:00:00');
    return date.toLocaleDateString('pl-PL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCalendarDays = () => {
    const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1;

    const days = [];

    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthLastDay - i)
      });
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        date: new Date(year, month, day)
      });
    }

    const remainingDays = 42 - days.length;
    for (let day = 1; day <= remainingDays; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        date: new Date(year, month + 1, day)
      });
    }

    return { days, year, month };
  };

  const calendarData = getCalendarDays();
  const monthNames = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'];
  const dayNames = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];

  const handleDateSelect = (date: Date) => {
    const dateStr = formatDateForInput(date);
    onChange(dateStr);
    setIsDatePickerOpen(false);
  };

  const navigateMonth = (direction: number) => {
    const currentDate = value ? new Date(value + 'T00:00:00') : new Date();
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1);
    onChange(formatDateForInput(newDate));
  };

  const selectToday = () => {
    handleDateSelect(new Date());
  };

  const clearDate = () => {
    onChange('');
    setIsDatePickerOpen(false);
  };

  // Pozycjonowanie kalendarza
  useEffect(() => {
    if (!isDatePickerOpen) return;

    const updatePosition = () => {
      const anchor = datePickerRef.current;
      const popover = calendarRef.current;
      if (!anchor || !popover) return;

      const anchorRect = anchor.getBoundingClientRect();
      const popRect = popover.getBoundingClientRect();

      const margin = 8;
      const padding = 12;
      const calendarWidth = 280; // Stała szerokość kalendarza

      let top = anchorRect.bottom + margin;
      if (top + popRect.height > window.innerHeight - padding) {
        top = anchorRect.top - popRect.height - margin;
      }
      top = Math.max(padding, Math.min(top, window.innerHeight - popRect.height - padding));

      // Pozycjonowanie poziome: wyrównaj lewą krawędź kalendarza do lewej krawędzi pola input
      let left = anchorRect.left;
      
      // Sprawdź czy kalendarz mieści się w viewport
      // Jeśli nie mieści się po prawej stronie, przesuń w lewo
      if (left + calendarWidth > window.innerWidth - padding) {
        left = window.innerWidth - calendarWidth - padding;
      }
      
      // Jeśli przesunięty w lewo, upewnij się że nie wychodzi poza lewą krawędź
      if (left < padding) {
        left = padding;
      }

      setCalendarStyle({
        position: 'fixed',
        zIndex: 99999,
        top: `${top}px`,
        left: `${left}px`,
        width: `${calendarWidth}px`,
      });
    };

    const raf = requestAnimationFrame(updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    window.addEventListener('resize', updatePosition);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', updatePosition, true);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isDatePickerOpen]);

  // Zamknij po kliknięciu poza
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Uwaga: `Node` w tym pliku to React Flow Node (z @xyflow/react),
      // a contains() oczekuje DOM Node - stąd jawne globalThis.Node.
      const target = event.target as unknown as globalThis.Node;
      if (
        isDatePickerOpen &&
        datePickerRef.current &&
        !datePickerRef.current.contains(target) &&
        calendarRef.current &&
        !calendarRef.current.contains(target)
      ) {
        setIsDatePickerOpen(false);
      }
    };

    if (isDatePickerOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          setIsDatePickerOpen(false);
        }
      });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isDatePickerOpen]);

  return (
    <div className="relative" ref={datePickerRef}>
      <button
        type="button"
        onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}
        className="w-full bg-white/[0.06] border border-white/[0.08] rounded px-2 py-1 text-xs text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-white/40'}>
          {formatDateForDisplay(value)}
        </span>
        <svg className="w-4 h-4 text-white/50 flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isDatePickerOpen && createPortal(
        <div
          ref={calendarRef}
          className="fixed bg-[#1a1d24] border border-white/15 rounded-lg shadow-xl p-4"
          style={Object.keys(calendarStyle).length ? calendarStyle : { zIndex: 99999 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-white/[0.06] transition-colors"
            >
              <svg className="w-4 h-4 text-white/65" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-white text-sm font-medium">
              {monthNames[calendarData.month]} {calendarData.year}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-white/[0.06] transition-colors"
            >
              <svg className="w-4 h-4 text-white/65" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dni tygodnia */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-center text-[10px] text-white/50 py-1">
                {day}
              </div>
            ))}
          </div>

          {/* Kalendarz */}
          <div className="grid grid-cols-7 gap-1">
            {calendarData.days.map((dayObj, idx) => {
              const isSelected = value && formatDateForInput(dayObj.date) === value;
              const isToday = formatDateForInput(dayObj.date) === formatDateForInput(new Date());

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => dayObj.isCurrentMonth && handleDateSelect(dayObj.date)}
                  disabled={!dayObj.isCurrentMonth}
                  className={`aspect-square rounded text-[11px] font-medium transition-all ${
                    !dayObj.isCurrentMonth
                      ? 'text-gray-600 cursor-not-allowed'
                      : isSelected
                      ? 'bg-[#fee715] text-[#050714] font-bold'
                      : isToday
                      ? 'bg-white/[0.06] text-[#fee715] border border-[#fee715]/50'
                      : 'text-white/80 hover:bg-white/[0.06]'
                  }`}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Przyciski */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={clearDate}
              className="flex-1 px-2 py-1.5 bg-[#1a1d24] hover:bg-white/[0.06] border border-white/[0.12] rounded text-white text-[10px] transition-colors"
            >
              Wyczyść
            </button>
            <button
              type="button"
              onClick={selectToday}
              className="flex-1 px-2 py-1.5 bg-[#fee715] text-[#050714] rounded text-[10px] font-bold transition-colors hover:bg-[#fee715]/90"
            >
              Dzisiaj
            </button>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export const FunnelBuilder: React.FC = () => {
  const rawParams = useParams<{ id: string | string[] }>();
  const id = typeof rawParams?.id === 'string' ? rawParams.id : Array.isArray(rawParams?.id) ? rawParams.id[0] : undefined;
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname() || '';
  // Tryb wejścia: klient otwiera /panel/marketing/:id (tylko podgląd + komentarze)
  // Admin otwiera /admin/marketing/:id (pełna edycja).
  // RLS w Supabase to drugi mur - UI to pierwszy. Nie ufamy klientowi nawet jeśli zrobi sztuczki w DOM.
  const isReadOnly = pathname.startsWith('/panel/marketing/');
  const [funnel, setFunnel] = useState<FunnelDiagram | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');
  const [editedSubtitle, setEditedSubtitle] = useState('');
  const [subtitleMode, setSubtitleMode] = useState<'select' | 'custom'>('select');
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(false);
  const [customTemplates, setCustomTemplates] = useState<Array<{ type: string; icon: string; label: string; color: string; category: string; isCustom?: boolean }>>([]);
  const [nodeProperties, setNodeProperties] = useState<CustomNodeData>({
    label: '',
    icon: 'FileText',
    color: '#fee715',
    notes: '',
    link: '',
    isPinned: false,
  });
  // P4: ostatnio użyte kolory (max 5, persisted w localStorage)
  const [recentColors, setRecentColors] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    try {
      const stored = window.localStorage.getItem('funnel-recent-colors');
      if (!stored) return [];
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? parsed.slice(0, 5) : [];
    } catch {
      return [];
    }
  });
  const addRecentColor = useCallback((color: string) => {
    setRecentColors((prev) => {
      const next = [color, ...prev.filter((c) => c !== color)].slice(0, 5);
      try {
        window.localStorage.setItem('funnel-recent-colors', JSON.stringify(next));
      } catch {}
      return next;
    });
  }, []);
  const [nodeCustomFields, setNodeCustomFields] = useState<NodeCustomField[]>([]);
  const [textNodeProperties, setTextNodeProperties] = useState<TextNodeData>({
    text: '',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    verticalAlign: 'middle',
    showHandles: false,
    isPinned: false,
  });
  const [selectedEdge, setSelectedEdge] = useState<Edge | null>(null);
  const [edgeProperties, setEdgeProperties] = useState({ notes: '', link: '' });
  const [edgeCustomFields, setEdgeCustomFields] = useState<EdgeCustomField[]>([]);
  const [showEdgeProperties, setShowEdgeProperties] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [showAlignToolbar, setShowAlignToolbar] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  // Klient nie widzi panelu Add (nic by tam nie zrobił - nie może dodawać nodów).
  // showAddDrawer = overlay z templates, wyświetlany nad canvas po kliknięciu "+" w left rail.
  const [showAddDrawer, setShowAddDrawer] = useState(false);
  const [showBottomToolbar, setShowBottomToolbar] = useState(true);
  const [showShortcutsModal, setShowShortcutsModal] = useState(false);
  // P3: czy user "zgubił się" w canvasie - żaden node nie jest w widoku
  // (gdy true, pokażemy pulsujący Center button)
  const [isLostInCanvas, setIsLostInCanvas] = useState(false);
  // P5: wyszukiwanie templateów w sidebar
  const [templateSearchQuery, setTemplateSearchQuery] = useState('');
  // Szerokość Properties Panel - resizable z localStorage (288 = w-72 default)
  const [propertiesPanelWidth, setPropertiesPanelWidth] = useState<number>(() => {
    if (typeof window === 'undefined') return 288;
    const stored = window.localStorage.getItem('funnel-prop-panel-w');
    const n = stored ? parseInt(stored, 10) : NaN;
    return !isNaN(n) && n >= 240 && n <= 640 ? n : 288;
  });
  const isResizingPanelRef = useRef(false);
  const handlePanelResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingPanelRef.current = true;
    const startX = e.clientX;
    const startWidth = propertiesPanelWidth;
    const onMove = (ev: MouseEvent) => {
      if (!isResizingPanelRef.current) return;
      const delta = startX - ev.clientX; // przeciąganie w lewo = szerszy panel
      const next = Math.max(240, Math.min(640, startWidth + delta));
      setPropertiesPanelWidth(next);
    };
    const onUp = () => {
      isResizingPanelRef.current = false;
      try {
        window.localStorage.setItem('funnel-prop-panel-w', String(propertiesPanelWidth));
      } catch {}
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [propertiesPanelWidth]);
  // Persist szerokość po każdej zmianie (debounce by localStorage write)
  useEffect(() => {
    const t = window.setTimeout(() => {
      try { window.localStorage.setItem('funnel-prop-panel-w', String(propertiesPanelWidth)); } catch {}
    }, 200);
    return () => window.clearTimeout(t);
  }, [propertiesPanelWidth]);
  // Klient startuje w trybie pan (z możliwością przełączenia na comment dolnym toolbarem).
  // Admin też - tryb wybiera użytkownik.
  const [interactionMode, setInteractionMode] = useState<'pan' | 'select' | 'comment'>('pan');
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  // System komentarzy
  // Klient po wejściu automatycznie widzi panel komentarzy otwarty (jak Figma w trybie review)
  const [commentMode, setCommentMode] = useState(false);
  const [showCommentPanel, setShowCommentPanel] = useState(isReadOnly);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [commentFormAnchor, setCommentFormAnchor] = useState<{ type: 'node' | 'edge' | 'region'; id?: string; coords?: { x: number; y: number; width: number; height: number } } | null>(null);
  const [nodeCommentCounts, setNodeCommentCounts] = useState<Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>>(new Map());
  const [edgeCommentCounts, setEdgeCommentCounts] = useState<Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>>(new Map());
  const [commentPanelRefreshTrigger, setCommentPanelRefreshTrigger] = useState(0);

  // React Flow state - inicjalizujemy z jawnym typem by TS nie wnioskował never[].
  // Używamy Node/Edge jako luźnego kontenera (data: Record<string, unknown>) - specyficzne
  // typy (CustomNodeData/TextNodeData) rzutujemy w miejscach użycia.
  const [nodes, setNodes, onNodesChange] = useNodesState([] as Node[]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([] as Edge[]);
  
  // Ref do aktualnych nodów dla wrappedOnNodesChange (aby uniknąć stale closure)
  const nodesRef = useRef<Node[]>([]);
  
  // Aktualizuj ref przy każdej zmianie nodów
  useEffect(() => {
    nodesRef.current = nodes;
  }, [nodes]);

  // Historia do Cofnij (Wstecz) — max 50 kroków
  const HISTORY_MAX = 50;
  const [undoHistory, setUndoHistory] = useState<{ nodes: Node[]; edges: Edge[] }[]>([]);

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const hasCenteredOnPinnedRef = useRef(false);
  const hasSetInitialViewportRef = useRef(false);
  const lastSavedStateRef = useRef<{ nodes: Node[]; edges: Edge[] } | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const lastSavedNodePropertiesRef = useRef<Omit<CustomNodeData, 'color'> | null>(null);
  const lastSavedTextNodePropertiesRef = useRef<TextNodeData | null>(null);
  const lastSavedEdgePropertiesRef = useRef<{ notes: string; link: string } | null>(null);
  const [hasUnsavedNodeChanges, setHasUnsavedNodeChanges] = useState(false);
  const [hasUnsavedTextNodeChanges, setHasUnsavedTextNodeChanges] = useState(false);
  const [hasUnsavedEdgeChanges, setHasUnsavedEdgeChanges] = useState(false);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);
  const [copiedNodes, setCopiedNodes] = useState<Node[]>([]);
  const [copiedEdges, setCopiedEdges] = useState<Edge[]>([]);
  const [isSpacePressed, setIsSpacePressed] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(1);
  const [alignmentGuides, setAlignmentGuides] = useState<{ vertical: number[]; horizontal: number[] }>({ vertical: [], horizontal: [] });
  const [viewport, setViewport] = useState({ x: 0, y: 0, zoom: 1 });
  const [flowContainerSize, setFlowContainerSize] = useState({ w: 0, h: 0 });
  const nodeLabelInputRef = useRef<HTMLInputElement>(null);
  const focusLabelOnOpenRef = useRef(false);
  const isManualSelectionRef = useRef(false); // Flaga, że ręcznie zarządzamy selekcją
  const pendingSelectionRef = useRef<{ nodeId: string; shouldSelect: boolean } | null>(null); // Intencja selekcji z onNodeClick
  const previousSelectedNodeIdsRef = useRef<Set<string>>(new Set()); // Poprzednio zaznaczone nody (przed kliknięciem)
  const isRestoringSelectionRef = useRef(false); // Flaga, że przywracamy selekcję (aby uniknąć pętli)

  // Zapisz bieżący stan do historii (przed zmianą) — do Cofnij
  const pushUndoHistory = useCallback(() => {
    const snap = {
      nodes: JSON.parse(JSON.stringify(nodes)) as Node[],
      edges: JSON.parse(JSON.stringify(edges)) as Edge[],
    };
    setUndoHistory((h) => {
      const next = [...h, snap];
      return next.length > HISTORY_MAX ? next.slice(1) : next;
    });
  }, [nodes, edges]);

  const handleUndo = useCallback(() => {
    if (undoHistory.length === 0) return;
    const prev = undoHistory[undoHistory.length - 1];
    setNodes(prev.nodes);
    setEdges(prev.edges);
    setUndoHistory((h) => h.slice(0, -1));
    setSelectedNode(null);
    setSelectedEdge(null);
    setShowPropertiesPanel(false);
    setShowEdgeProperties(false);
  }, [undoHistory, setNodes, setEdges]);

  // Rozmiar kontenera flow (do linii pomocniczych)
  useEffect(() => {
    const el = reactFlowWrapper.current;
    if (!el) return;
    const update = () => {
      if (el) setFlowContainerSize({ w: el.offsetWidth, h: el.offsetHeight });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Ładowanie własnych szablonów z bazy
  const loadCustomTemplates = useCallback(async () => {
    if (!user) return;
    try {
      const { data, error } = await supabase
        .from('custom_node_templates')
        .select('*')
        .eq('created_by', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const templates = (data || []).map(template => ({
        type: 'custom' as const,
        icon: template.icon,
        label: template.label,
        color: template.color,
        category: template.category,
        isCustom: true,
      }));

      setCustomTemplates(templates);
    } catch (error: any) {
      console.error('Błąd ładowania własnych szablonów:', error);
    }
  }, [user]);

  // Ładowanie liczby wątków dla nodów/edges
  const loadCommentCounts = useCallback(async () => {
    if (!id) return;
    try {
      const { data, error } = await supabase
        .from('comment_threads')
        .select(`
          id,
          status,
          comment_anchors (
            anchor_type,
            anchor_id,
            region_x,
            region_y,
            region_width,
            region_height
          )
        `)
        .eq('funnel_id', id);

      if (error) {
        console.error('Błąd pobierania wątków:', error);
        throw error;
      }

      // Debug: sprawdź co faktycznie wraca z bazy
      console.log('=== RAW DATA FROM DB ===');
      console.log('Threads count:', data?.length || 0);
      if (data && data.length > 0) {
        console.log('First thread raw data:', JSON.stringify(data[0], null, 2));
        console.log('All threads anchors:', data.map((t: any) => {
          const anchors = t.comment_anchors;
          const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
          return {
            threadId: t.id,
            anchors: anchors,
            isArray: Array.isArray(anchors),
            anchorsLength: Array.isArray(anchors) ? anchors.length : (anchors ? 1 : 0),
            firstAnchor: anchor
          };
        }));
      }

      const nodeCounts = new Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>();
      const edgeCounts = new Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>();

      (data || []).forEach((thread: any) => {
        // Supabase może zwrócić comment_anchors jako obiekt (gdy jest jeden) lub tablicę (gdy jest wiele)
        const anchors = thread.comment_anchors;
        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
        if (!anchor || !anchor.anchor_type) return;

        const isOpen = thread.status !== 'Zatwierdzone' && thread.status !== 'Odrzucone';
        if (!isOpen) return; // Tylko otwarte wątki

        let status: 'warning' | 'pending' | 'neutral' | 'closed' = 'neutral';
        if (thread.status === 'Otwarte') status = 'warning';
        else if (thread.status === 'Do akceptacji') status = 'pending';
        else if (thread.status === 'W toku') status = 'neutral';

        if (anchor.anchor_type === 'node' && anchor.anchor_id) {
          const existing = nodeCounts.get(anchor.anchor_id) || { count: 0, status: 'neutral' };
          nodeCounts.set(anchor.anchor_id, {
            count: existing.count + 1,
            status: status === 'warning' || existing.status === 'warning' ? 'warning' : status === 'pending' || existing.status === 'pending' ? 'pending' : 'neutral',
          });
        } else if (anchor.anchor_type === 'edge' && anchor.anchor_id) {
          const existing = edgeCounts.get(anchor.anchor_id) || { count: 0, status: 'neutral' };
          edgeCounts.set(anchor.anchor_id, {
            count: existing.count + 1,
            status: status === 'warning' || existing.status === 'warning' ? 'warning' : status === 'pending' || existing.status === 'pending' ? 'pending' : 'neutral',
          });
        }
      });

      setNodeCommentCounts(nodeCounts);
      setEdgeCommentCounts(edgeCounts);
    } catch (error: any) {
      console.error('Błąd ładowania liczby wątków:', error);
    }
  }, [id]);

  // Load funnel data and custom templates
  useEffect(() => {
    if (id && user) {
      loadFunnel();
      loadCustomTemplates();
      loadCommentCounts();
    }
  }, [id, user, loadCustomTemplates, loadCommentCounts]);

  // Initial viewport - priorytety:
  // 1) Ostatni zapisany viewport z diagram_data.viewport (klient/admin wraca tam gdzie skończył)
  // 2) Pinned node - centruj na nim z zoom 0.48
  // 3) fitView jako fallback
  // Uruchamia się raz po załadowaniu, hasSetInitialViewportRef blokuje powtórki.
  useEffect(() => {
    if (!reactFlowInstance || !funnel || hasSetInitialViewportRef.current) return;

    hasSetInitialViewportRef.current = true;

    // Helper: czy viewport z bazy jest sensowny? (guard przeciw NaN, zepsutym danym, default {0,0,1})
    const isValidViewport = (vp: { x: number; y: number; zoom: number } | undefined | null): boolean => {
      if (!vp) return false;
      if (typeof vp.x !== 'number' || typeof vp.y !== 'number' || typeof vp.zoom !== 'number') return false;
      if (Number.isNaN(vp.x) || Number.isNaN(vp.y) || Number.isNaN(vp.zoom)) return false;
      if (vp.zoom < 0.05 || vp.zoom > 5) return false;
      // Default {0,0,1} potraktuj jako "brak zapisanego viewportu" - inaczej każdy nowy diagram by tu padał
      if (vp.x === 0 && vp.y === 0 && vp.zoom === 1) return false;
      return true;
    };

    // Priorytet 1: ostatni zapisany viewport
    if (isValidViewport(viewport)) {
      requestAnimationFrame(() => {
        reactFlowInstance.setViewport(viewport, { duration: 0 });
      });
      return;
    }

    // Bez nodów - nic do pokazania, zostaw default
    if (nodes.length === 0) return;

    // Priorytet 2: pinned node
    const pinnedNode = nodes.find((n) => {
      if (n.type === 'text') {
        return (n.data as unknown as TextNodeData).isPinned === true;
      } else {
        return (n.data as unknown as CustomNodeData).isPinned === true;
      }
    });

    if (pinnedNode && reactFlowWrapper.current) {
      hasCenteredOnPinnedRef.current = true;
      const width = pinnedNode.width || pinnedNode.measured?.width || (pinnedNode.type === 'text' ? 250 : 150);
      const height = pinnedNode.height || pinnedNode.measured?.height || (pinnedNode.type === 'text' ? 100 : 80);
      const cx = pinnedNode.position.x + width / 2;
      const cy = pinnedNode.position.y + height / 2;
      const containerWidth = reactFlowWrapper.current.offsetWidth;
      const containerHeight = reactFlowWrapper.current.offsetHeight;
      const zoom = 0.48;
      const x = containerWidth / 2 - cx * zoom;
      const y = containerHeight / 2 - cy * zoom;
      requestAnimationFrame(() => {
        reactFlowInstance.setViewport({ x, y, zoom }, { duration: 0 });
      });
      return;
    }

    // Priorytet 3: fitView całego diagramu
    requestAnimationFrame(() => {
      reactFlowInstance.fitView({ padding: 0.15, duration: 0 });
    });
  }, [reactFlowInstance, funnel, nodes, viewport]);

  // Reset flagi przy załadowaniu nowego lejka
  useEffect(() => {
    if (id) {
      hasCenteredOnPinnedRef.current = false;
      hasSetInitialViewportRef.current = false;
    }
  }, [id]);

  // Sprawdź, czy są niezapisane zmiany (dirty state)
  useEffect(() => {
    if (!lastSavedStateRef.current) {
      // Pierwsze załadowanie - zapisz stan jako "zapisany"
      lastSavedStateRef.current = {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      };
      setHasUnsavedChanges(false);
      return;
    }

    // Porównaj aktualny stan z ostatnio zapisanym
    const currentState = JSON.stringify({ nodes, edges });
    const savedState = JSON.stringify(lastSavedStateRef.current);
    
    setHasUnsavedChanges(currentState !== savedState);
  }, [nodes, edges]);

  // Auto-save - 2s debounce po każdej zmianie nodes/edges.
  // Działa też z otwartym properties panelem dzięki live-preview useEffect (P4):
  // zmiany w nodeProperties trafiają od razu do `nodes`, więc autosave je złapie.
  useEffect(() => {
    if (isReadOnly || !funnel) return;
    if (!hasUnsavedChanges) return; // nic do zapisania
    const timeoutId = setTimeout(() => {
      saveFunnel();
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [hasUnsavedChanges, funnel, isReadOnly]);

  // Funkcja kopiowania zaznaczonych nodów i edges
  const handleCopy = useCallback(() => {
    const selectedNodes = nodes.filter((n) => n.selected);
    if (selectedNodes.length === 0) return;

    // Znajdź edges między zaznaczonymi nodami
    const selectedNodeIds = new Set(selectedNodes.map((n) => n.id));
    const selectedEdges = edges.filter(
      (e) => selectedNodeIds.has(e.source) && selectedNodeIds.has(e.target)
    );

    setCopiedNodes(JSON.parse(JSON.stringify(selectedNodes)));
    setCopiedEdges(JSON.parse(JSON.stringify(selectedEdges)));
  }, [nodes, edges]);

  // Funkcja wklejania skopiowanych nodów i edges
  const handlePaste = useCallback(() => {
    if (copiedNodes.length === 0 || !reactFlowInstance) return;

    pushUndoHistory();

    // Oblicz offset dla nowych nodów (przesuń o 50px w prawo i w dół)
    const offset = { x: 50, y: 50 };
    const newNodes: Node[] = copiedNodes.map((node) => {
      const newId = `${node.type === 'text' ? 'text-node' : 'node'}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...node,
        id: newId,
        selected: false,
        position: {
          x: node.position.x + offset.x,
          y: node.position.y + offset.y,
        },
      };
    });

    // Utwórz mapę starych ID -> nowych ID
    const idMap = new Map<string, string>();
    copiedNodes.forEach((oldNode, index) => {
      idMap.set(oldNode.id, newNodes[index].id);
    });

    // Utwórz nowe edges z nowymi ID
    const newEdges: Edge[] = copiedEdges.map((edge) => {
      const newId = `edge-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      return {
        ...edge,
        id: newId,
        source: idMap.get(edge.source) || edge.source,
        target: idMap.get(edge.target) || edge.target,
        selected: false,
      };
    });

    // Dodaj nowe nody i edges
    setNodes((nds) => [...nds, ...newNodes]);
    setEdges((eds) => [...eds, ...newEdges]);
  }, [copiedNodes, copiedEdges, reactFlowInstance, setNodes, setEdges, pushUndoHistory]);

  // Obsługa Space (pan), Ctrl/Cmd+Z (cofnij), Ctrl/Cmd+C (kopiuj), Ctrl/Cmd+V (wklej) — pomijamy w polach formularza
  useEffect(() => {
    const isFormElement = (el: EventTarget | null): boolean => {
      if (!el || !(el instanceof HTMLElement)) return false;
      return el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable === true;
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isFormElement(e.target) || isFormElement(document.activeElement)) return;
      // ESC zamyka Add drawer
      if (e.key === 'Escape' && showAddDrawer) {
        e.preventDefault();
        setShowAddDrawer(false);
        return;
      }
      // A - toggle Add drawer (Miro-style)
      if ((e.key === 'a' || e.key === 'A') && !e.metaKey && !e.ctrlKey && !e.altKey && !isReadOnly) {
        e.preventDefault();
        setShowAddDrawer((s) => !s);
        return;
      }
      // V - Pan tool (Miro-style)
      if ((e.key === 'v' || e.key === 'V') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setInteractionMode('pan');
        setCommentMode(false);
        return;
      }
      // S - Select tool
      if ((e.key === 's' || e.key === 'S') && !e.metaKey && !e.ctrlKey && !e.altKey && !isReadOnly) {
        e.preventDefault();
        setInteractionMode('select');
        setCommentMode(false);
        return;
      }
      // C - Comment tool
      if ((e.key === 'c' || e.key === 'C') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        setCommentMode((m) => !m);
        setInteractionMode(commentMode ? 'pan' : 'comment');
        return;
      }
      // ? otwiera modal pomocy (Shift + /)
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setShowShortcutsModal((s) => !s);
        return;
      }
      // F lub Home - smart return (wycentruj na nodach)
      if ((e.key === 'f' || e.key === 'F' || e.key === 'Home') && !e.metaKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        if (nodes.length > 0) {
          reactFlowInstance?.fitView({ duration: 400, padding: 0.15 });
        }
        return;
      }
      if (!isReadOnly && (e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }
      if (!isReadOnly && (e.metaKey || e.ctrlKey) && e.key === 'c') {
        e.preventDefault();
        handleCopy();
        return;
      }
      if (!isReadOnly && (e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault();
        handlePaste();
        return;
      }
      if (e.code === 'Space' && !e.repeat) {
        e.preventDefault();
        setIsSpacePressed(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (isFormElement(e.target) || isFormElement(document.activeElement)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        setIsSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [handleUndo, handleCopy, handlePaste, isReadOnly, reactFlowInstance, nodes.length, showAddDrawer, commentMode]);

  // Zapisywanie własnego szablonu
  const saveCustomTemplate = useCallback(async (label: string, icon: string, color: string, category: string) => {
    if (!user) return;
    try {
      const { error } = await supabase
        .from('custom_node_templates')
        .insert({
          created_by: user.id,
          label,
          icon,
          color,
          category,
        });

      if (error) throw error;

      // Przeładuj szablony
      await loadCustomTemplates();

      setAlertModal({
        isOpen: true,
        title: 'Sukces',
        message: 'Szablon został zapisany i dodany do sidebaru!',
        type: 'success',
      });
    } catch (error: any) {
      console.error('Błąd zapisywania szablonu:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się zapisać szablonu: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    }
  }, [user, loadCustomTemplates]);

  // Ładowanie customowych pól dla wybranego noda
  const loadNodeCustomFields = useCallback(async (nodeId: string, funnelId: string) => {
    try {
      const { data, error } = await supabase
        .from('node_custom_fields')
        .select('*')
        .eq('funnel_id', funnelId)
        .eq('node_id', nodeId)
        .order('display_order', { ascending: true });

      if (error) {
        if (error.code === '42P01' || (error.message || '').includes('Could not find the table')) {
          setNodeCustomFields([]);
          return;
        }
        throw error;
      }

      const fields: NodeCustomField[] = (data || []).map(f => ({
        id: f.id,
        field_name: f.field_name,
        field_type: f.field_type as 'text' | 'date' | 'number' | 'link',
        field_value: f.field_value || '',
        display_order: f.display_order || 0,
      }));

      setNodeCustomFields(fields);
    } catch (error: any) {
      console.error('Błąd ładowania customowych pól:', error);
      setNodeCustomFields([]);
    }
  }, []);

  // Zapisywanie customowych pól dla wybranego noda
  const saveNodeCustomFields = useCallback(async (nodeId: string, funnelId: string, fields: NodeCustomField[]) => {
    try {
      // Najpierw usuń wszystkie istniejące pola dla tego noda
      const { error: deleteError } = await supabase
        .from('node_custom_fields')
        .delete()
        .eq('funnel_id', funnelId)
        .eq('node_id', nodeId);

      if (deleteError) {
        if (deleteError.code === '42P01' || (deleteError.message || '').includes('Could not find the table')) {
          console.warn('Tabela node_custom_fields nie istnieje - uruchom migrację supabase_migration_node_custom_fields.sql');
          return;
        }
        throw deleteError;
      }

      // Następnie dodaj nowe pola
      if (fields.length > 0) {
        const fieldsToInsert = fields.map((f, index) => ({
          funnel_id: funnelId,
          node_id: nodeId,
          field_name: f.field_name,
          field_type: f.field_type,
          field_value: f.field_value || '',
          display_order: index,
        }));

        const { error: insertError } = await supabase
          .from('node_custom_fields')
          .insert(fieldsToInsert);

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error('Błąd zapisywania customowych pól:', error);
      throw error;
    }
  }, []);

  // Ładowanie customowych pól dla wybranego edge'a
  const loadEdgeCustomFields = useCallback(async (edgeId: string, funnelId: string) => {
    try {
      const { data, error } = await supabase
        .from('edge_custom_fields')
        .select('*')
        .eq('funnel_id', funnelId)
        .eq('edge_id', edgeId)
        .order('display_order', { ascending: true });

      if (error) {
        if (error.code === '42P01' || (error.message || '').includes('Could not find the table')) {
          setEdgeCustomFields([]);
          return;
        }
        throw error;
      }

      const fields: EdgeCustomField[] = (data || []).map(f => ({
        id: f.id,
        field_name: f.field_name,
        field_type: f.field_type as 'text' | 'date' | 'number' | 'link',
        field_value: f.field_value || '',
        display_order: f.display_order || 0,
      }));

      setEdgeCustomFields(fields);
    } catch (error: any) {
      console.error('Błąd ładowania customowych pól dla edge:', error);
      setEdgeCustomFields([]);
    }
  }, []);

  // Zapisywanie customowych pól dla wybranego edge'a
  const saveEdgeCustomFields = useCallback(async (edgeId: string, funnelId: string, fields: EdgeCustomField[]) => {
    try {
      // Najpierw usuń wszystkie istniejące pola dla tego edge'a
      const { error: deleteError } = await supabase
        .from('edge_custom_fields')
        .delete()
        .eq('funnel_id', funnelId)
        .eq('edge_id', edgeId);

      if (deleteError) {
        if (deleteError.code === '42P01' || (deleteError.message || '').includes('Could not find the table')) {
          console.warn('Tabela edge_custom_fields nie istnieje - uruchom migrację supabase_migration_edge_custom_fields.sql');
          return;
        }
        throw deleteError;
      }

      // Następnie dodaj nowe pola
      if (fields.length > 0) {
        const fieldsToInsert = fields.map((f, index) => ({
          funnel_id: funnelId,
          edge_id: edgeId,
          field_name: f.field_name,
          field_type: f.field_type,
          field_value: f.field_value || '',
          display_order: index,
        }));

        const { error: insertError } = await supabase
          .from('edge_custom_fields')
          .insert(fieldsToInsert);

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error('Błąd zapisywania customowych pól dla edge:', error);
      throw error;
    }
  }, []);

  const loadFunnel = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('funnel_diagrams')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;

      setFunnel(data);
      // Inicjalizuj editedTitle i editedSubtitle po załadowaniu lejka
      setEditedTitle(data.project_name || '');
      setEditedSubtitle(data.subtitle || '');
      // Jeśli subtitle nie jest jedną z standardowych opcji, ustaw tryb na 'custom'
      const standardSubtitles = ['stan obecny', 'docelowy', 'Plan 90 dni'];
      if (data.subtitle && !standardSubtitles.includes(data.subtitle)) {
        setSubtitleMode('custom');
      } else {
        setSubtitleMode('select');
      }

      // Load diagram data
      if (data.diagram_data) {
        const diagramData = data.diagram_data;
        
        // Załaduj customowe pola dla wszystkich nodów
        let loadedNodes = diagramData.nodes || [];
        if (loadedNodes.length > 0 && id) {
          try {
            const { data: customFieldsData, error: customFieldsError } = await supabase
              .from('node_custom_fields')
              .select('*')
              .eq('funnel_id', id)
              .order('display_order', { ascending: true });

            if (!customFieldsError && customFieldsData) {
              // Grupuj customowe pola według node_id
              const customFieldsByNodeId: Record<string, NodeCustomField[]> = {};
              customFieldsData.forEach((field) => {
                if (!customFieldsByNodeId[field.node_id]) {
                  customFieldsByNodeId[field.node_id] = [];
                }
                customFieldsByNodeId[field.node_id].push({
                  id: field.id,
                  field_name: field.field_name,
                  field_type: field.field_type as 'text' | 'date' | 'number' | 'link',
                  field_value: field.field_value || '',
                  display_order: field.display_order || 0,
                });
              });

              // Dodaj customowe pola do danych każdego noda
              loadedNodes = loadedNodes.map((node: Node) => {
                if (node.type === 'custom' && customFieldsByNodeId[node.id]) {
                  return {
                    ...node,
                    data: {
                      ...(node.data as unknown as CustomNodeData),
                      customFields: customFieldsByNodeId[node.id],
                    },
                  };
                }
                return node;
              });
            }
          } catch (error: any) {
            console.error('Błąd ładowania customowych pól:', error);
          }
        }

        if (loadedNodes && Array.isArray(loadedNodes)) {
          setNodes(loadedNodes);
        }
        if (diagramData.edges && Array.isArray(diagramData.edges)) {
          setEdges(diagramData.edges);
        }
        // Zapisz viewport z bazy do stanu, żeby użyć go później w useEffect
        if (diagramData.viewport) {
          setViewport(diagramData.viewport);
        }
        setUndoHistory([]);
        hasSetInitialViewportRef.current = false; // Reset flag przy załadowaniu nowego lejka
        
        // Zapisz początkowy stan jako "zapisany"
        lastSavedStateRef.current = {
          nodes: JSON.parse(JSON.stringify(loadedNodes || [])),
          edges: JSON.parse(JSON.stringify(diagramData.edges || [])),
        };
        setHasUnsavedChanges(false);
      }
    } catch (error: any) {
      console.error('Błąd ładowania lejka:', error);
      setAlertModal({
        isOpen: true,
        title: 'Błąd',
        message: 'Nie udało się załadować lejka: ' + (error.message || 'Nieznany błąd'),
        type: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveFunnel = async () => {
    if (!funnel || !reactFlowInstance) return;
    if (isReadOnly) return; // Klient nigdy nie zapisuje (UI + RLS)

    try {
      setSaving(true);
      const viewport = reactFlowInstance.getViewport();

      const diagramData = {
        nodes,
        edges,
        viewport,
      };

      const { error } = await supabase
        .from('funnel_diagrams')
        .update({
          diagram_data: diagramData,
          project_name: editedTitle,
          subtitle: editedSubtitle,
          updated_at: new Date().toISOString(),
        })
        .eq('id', funnel.id);

      if (error) throw error;
      
      // Po udanym zapisie, zaktualizuj ostatnio zapisany stan
      lastSavedStateRef.current = {
        nodes: JSON.parse(JSON.stringify(nodes)),
        edges: JSON.parse(JSON.stringify(edges)),
      };
      setHasUnsavedChanges(false);
    } catch (error: any) {
      console.error('Błąd zapisywania lejka:', error);
      // Don't show error modal for auto-save failures
    } finally {
      setSaving(false);
    }
  };

  const onConnect = useCallback(
    (params: Connection) => {
      if (isReadOnly) return; // Klient nie tworzy nowych połączeń
      pushUndoHistory();
      const newEdge: Edge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: 'custom',
        animated: false,
        style: { stroke: FUNNEL_EDGE_COLOR, strokeWidth: 2 },
        markerStart: undefined,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: FUNNEL_EDGE_COLOR,
          orient: 'auto',
        },
        data: {
          notes: '',
          link: '',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, pushUndoHistory, isReadOnly]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (isReadOnly) return; // Klient nie wrzuca nowych nodów
      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const templateData = event.dataTransfer.getData('application/reactflow');

      if (!templateData) return;

      const template = JSON.parse(templateData);
      // screenToFlowPosition w xyflow/react v12 oczekuje współrzędnych okna (clientX/Y),
      // nie offsetu względem kontenera - inaczej node ląduje w innym miejscu niż kursor.
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      let newNode: Node;
      
      if (template.type === 'text') {
        // Text node
        newNode = {
          id: `text-node-${Date.now()}`,
          type: 'text',
          position,
          data: {
            text: 'Kliknij, aby edytować',
            fontSize: 18,
            fontWeight: 'bold' as const,
            textAlign: 'left' as const,
            verticalAlign: 'middle' as const,
            showHandles: false,
            width: 250,
            height: 100,
          },
          style: {
            width: 250,
            height: 100,
          },
        };
      } else {
        // Custom node
        newNode = {
          id: `node-${Date.now()}`,
          type: template.type || 'custom',
          position,
          data: {
            label: template.isCustom ? 'Własny element' : template.label,
            icon: template.icon,
            color: template.color || '#fee71520',
            notes: '',
            category: template.category, // Zapisz kategorię dla wizualnych wskaźników
          },
        };
      }

      pushUndoHistory();
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes, pushUndoHistory, isReadOnly]
  );

  // Ref do śledzenia czy to jest przeciąganie (drag noda) - box selection działa tylko na pustym tle
  const isDraggingNodeRef = useRef(false);

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    // W trybie komentarzy: otwórz formularz dodawania komentarza
    if (commentMode) {
      event.preventDefault();
      event.stopPropagation();
      setCommentFormAnchor({ type: 'node', id: node.id });
      return;
    }
    // Klient w trybie read-only: kliknięcie elementu = pokaż istniejące komentarze (otwórz panel)
    // i ustaw selectedThreadId na pierwszy thread tego noda (jeśli istnieje)
    if (isReadOnly) {
      event.preventDefault();
      event.stopPropagation();
      setShowCommentPanel(true);
      return;
    }
    
    // W trybie zaznaczania: obsługuj tylko pojedyncze kliknięcia (nie przeciąganie noda)
    // Box selection jest obsługiwane przez React Flow automatycznie poprzez selectionOnDrag
    // Box selection działa TYLKO gdy klikasz na pustym tle (pane), więc onNodeClick nie jest wywoływane podczas box selection
    if (interactionMode === 'select') {
      // Jeśli to było przeciąganie noda (nie box selection), pozwól React Flow obsłużyć to
      if (isDraggingNodeRef.current) {
        isDraggingNodeRef.current = false;
        return;
      }
      
      // Dla pojedynczych kliknięć: ręcznie zarządzaj selekcją (zachowaj poprzednie selekcje)
      event.preventDefault();
      event.stopPropagation();
      
      // Zapamiętaj poprzednio zaznaczone nody (przed kliknięciem)
      const currentSelectedNodeIds = new Set(
        nodes.filter(n => n.selected).map(n => n.id)
      );
      previousSelectedNodeIdsRef.current = currentSelectedNodeIds;
      
      // Ustaw flagę i intencję selekcji
      isManualSelectionRef.current = true;
      const wasSelected = node.selected;
      pendingSelectionRef.current = { nodeId: node.id, shouldSelect: !wasSelected };
      
      // Zastosuj selekcję natychmiast, zachowując inne selekcje
      setNodes((nds) => {
        return nds.map((n) => {
          if (n.id === node.id) {
            return { ...n, selected: !wasSelected };
          }
          // Zachowaj selekcję innych nodów
          return n;
        });
      });
      
      // Reset flagi po krótkim czasie
      setTimeout(() => {
        isManualSelectionRef.current = false;
        pendingSelectionRef.current = null;
        previousSelectedNodeIdsRef.current = new Set();
      }, 150);
      
      // Jeśli odznaczamy node, zamknij panel właściwości jeśli był otwarty
      if (wasSelected && selectedNode?.id === node.id) {
        setSelectedNode(null);
        setShowPropertiesPanel(false);
      }
      
      return;
    }
    
    setSelectedNode(node);
    setSelectedEdge(null);
    setShowPropertiesPanel(true);
    
    if (node.type === 'text') {
      const props = {
        text: (node.data as unknown as TextNodeData).text || '',
        fontSize: (node.data as unknown as TextNodeData).fontSize || 18,
        fontWeight: (node.data as unknown as TextNodeData).fontWeight || 'bold',
        textAlign: (node.data as unknown as TextNodeData).textAlign || 'left',
        verticalAlign: (node.data as unknown as TextNodeData).verticalAlign || 'middle',
        showHandles: (node.data as unknown as TextNodeData).showHandles ?? false,
        isPinned: (node.data as unknown as TextNodeData).isPinned ?? false,
      };
      setTextNodeProperties(props);
      lastSavedTextNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
      setHasUnsavedTextNodeChanges(false);
    } else {
      const props: CustomNodeData = {
        label: (node.data as unknown as CustomNodeData).label || '',
        icon: (node.data as unknown as CustomNodeData).icon || 'FileText',
        color: (node.data as unknown as CustomNodeData).color || '#fee715',
        notes: (node.data as unknown as CustomNodeData).notes || '',
        link: (node.data as unknown as CustomNodeData).link || '',
        isPinned: (node.data as unknown as CustomNodeData).isPinned ?? false,
        category: (node.data as unknown as CustomNodeData).category,
      };
      setNodeProperties(props);
      lastSavedNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
      setHasUnsavedNodeChanges(false);
      
      // Załaduj customowe pola dla tego noda (z danych noda lub z bazy)
      const customFieldsFromNode = (node.data as unknown as CustomNodeData).customFields;
      if (customFieldsFromNode && customFieldsFromNode.length > 0) {
        setNodeCustomFields(customFieldsFromNode);
      } else if (id) {
        loadNodeCustomFields(node.id, id);
      } else {
        setNodeCustomFields([]);
      }
    }
    setShowEdgeProperties(false);
  }, [interactionMode, selectedNode, setNodes, id, loadNodeCustomFields, isReadOnly, commentMode]);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();

    // W trybie komentarzy: otwórz formularz dodawania komentarza
    if (commentMode) {
      setCommentFormAnchor({ type: 'edge', id: edge.id });
      return;
    }
    // Klient w trybie read-only: kliknięcie krawędzi otwiera panel komentarzy
    if (isReadOnly) {
      setShowCommentPanel(true);
      return;
    }

    setSelectedEdge(edge);
    setSelectedNode(null);
    const props = {
      notes: (edge.data?.notes as string) || '',
      link: (edge.data?.link as string) || '',
    };
    setEdgeProperties(props);
    lastSavedEdgePropertiesRef.current = JSON.parse(JSON.stringify(props));
    setHasUnsavedEdgeChanges(false);
    setShowEdgeProperties(true);
    setShowPropertiesPanel(false);
    // Załaduj customowe pola dla edge'a
    if (id) {
      loadEdgeCustomFields(edge.id, id);
    }
  }, [commentMode, id, loadEdgeCustomFields, isReadOnly]);

  // Obsługa kliknięcia w pustą przestrzeń (pane) - dla komentarzy i deselekcji
  const onPaneClick = useCallback((event: React.MouseEvent) => {
    // W trybie komentarzy: otwórz formularz dodawania komentarza w regionie
    if (commentMode && reactFlowInstance) {
      const point = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });
      // Utwórz mały region (50x50px) wokół klikniętego punktu
      setCommentFormAnchor({
        type: 'region',
        coords: {
          x: point.x,
          y: point.y,
          width: 50,
          height: 50,
        },
      });
      return;
    }
    
    // W trybie select: deselekcja wszystkich elementów przy kliknięciu w pustą przestrzeń
    if (interactionMode === 'select') {
      setNodes((nds) => nds.map((n) => ({ ...n, selected: false })));
      setEdges((eds) => eds.map((e) => ({ ...e, selected: false })));
      setSelectedNode(null);
      setSelectedEdge(null);
      setShowPropertiesPanel(false);
      setShowEdgeProperties(false);
    }
  }, [commentMode, interactionMode, reactFlowInstance, setNodes, setEdges]);

  const onLongPressDeselect = useCallback((nodeId: string) => {
    // Nie używamy już long press - funkcja pozostaje dla kompatybilności, ale nie jest używana
    // Toggle odbywa się przez onNodeClick
  }, []);

  const wrappedOnNodesChange = useCallback(
    (changes: NodeChange[]) => {
      if (changes.some((c) => c.type === 'remove')) pushUndoHistory();
      
      // W trybie select: obsłuż selekcję specjalnie
      if (interactionMode === 'select') {
        const selectChanges = changes.filter((c) => c.type === 'select');
        
        // Jeśli ręcznie zarządzamy selekcją (pojedyncze kliknięcie w onNodeClick), CAŁKOWICIE zablokuj zmiany selekcji z React Flow
        if (isManualSelectionRef.current && selectChanges.length > 0) {
          // onNodeClick już obsłużył selekcję ręcznie - CAŁKOWICIE zignoruj zmiany selekcji z React Flow
          const otherChanges = changes.filter((c) => c.type !== 'select');
          if (otherChanges.length > 0) {
            onNodesChange(otherChanges);
          }
          // Nie pozwalaj React Flow zmieniać selekcji - całkowicie zablokuj
          return;
        }
        
        // Box selection: wiele zmian selekcji jednocześnie - ręcznie zastosuj selekcję
        // (React Flow nie zastosuje selekcji automatycznie, gdy elementsSelectable=false)
        if (selectChanges.length > 1) {
          isManualSelectionRef.current = false; // Box selection nie jest ręcznym zarządzaniem
          pendingSelectionRef.current = null;
          previousSelectedNodeIdsRef.current = new Set();
          
          // Zastosuj inne zmiany (pozycja, rozmiar itp.)
          const otherChanges = changes.filter((c) => c.type !== 'select');
          if (otherChanges.length > 0) {
            onNodesChange(otherChanges);
          }
          
          // Ręcznie zastosuj selekcję dla wszystkich nodów w zmianach
          setNodes((nds) => {
            return nds.map((n) => {
              const selectChange = selectChanges.find((c) => 'id' in c && c.id === n.id);
              if (selectChange && 'selected' in selectChange) {
                return { ...n, selected: selectChange.selected };
              }
              return n;
            });
          });
          return;
        }
      }
      
      // Dla wszystkich innych przypadków: normalne przetwarzanie
      onNodesChange(changes);
    },
    [interactionMode, onNodesChange, pushUndoHistory, setNodes]
  );

  const wrappedOnEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      if (changes.some((c) => c.type === 'remove')) pushUndoHistory();
      onEdgesChange(changes);
    },
    [onEdgesChange, pushUndoHistory]
  );

  // W trybie select: obserwuj zmiany selekcji i przywracaj poprzednie selekcje, jeśli React Flow je zresetował
  useEffect(() => {
    if (interactionMode !== 'select' || isRestoringSelectionRef.current || !isManualSelectionRef.current || !pendingSelectionRef.current) {
      return;
    }

    const pending = pendingSelectionRef.current;
    const previousSelected = previousSelectedNodeIdsRef.current;
    
    // Sprawdź, czy selekcja została nieprawidłowo zresetowana
    const currentSelectedNodeIds = new Set(nodes.filter(n => n.selected).map(n => n.id));
    const clickedNode = nodes.find(n => n.id === pending.nodeId);
    
    // Jeśli kliknięty node nie ma poprawnej selekcji lub inne nody zostały odznaczone
    const shouldRestore = 
      (clickedNode && clickedNode.selected !== pending.shouldSelect) ||
      (previousSelected.size > 0 && Array.from(previousSelected).some(id => id !== pending.nodeId && !currentSelectedNodeIds.has(id)));
    
    if (shouldRestore) {
      isRestoringSelectionRef.current = true;
      
      setNodes((nds) => {
        return nds.map((n) => {
          // Zastosuj intencję dla klikniętego noda
          if (n.id === pending.nodeId) {
            return { ...n, selected: pending.shouldSelect };
          }
          // Przywróć selekcję innych nodów, które były wcześniej zaznaczone
          if (previousSelected.has(n.id)) {
            return { ...n, selected: true };
          }
          return n;
        });
      });
      
      // Reset flagi po krótkim czasie
      setTimeout(() => {
        isRestoringSelectionRef.current = false;
      }, 50);
    }
  }, [nodes, interactionMode, setNodes]);

  // Podgląd dynamiczny: aktualizuj selectedNode na żywo podczas edycji właściwości tekstu
  useEffect(() => {
    if (selectedNode && selectedNode.type === 'text' && showPropertiesPanel) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === selectedNode.id) {
            return {
              ...node,
              data: {
                ...node.data,
                ...textNodeProperties,
              },
            };
          }
          return node;
        })
      );
    }
  }, [textNodeProperties, selectedNode, showPropertiesPanel, setNodes]);

  // Zapisz width i height do data dla text nodes po zmianie rozmiaru (używamy setTimeout, żeby uniknąć pętli)
  const prevNodesRef = useRef(nodes);
  useEffect(() => {
    const hasChanged = nodes.some((node, idx) => {
      if (node.type === 'text') {
        const prevNode = prevNodesRef.current[idx];
        if (!prevNode || prevNode.id !== node.id) return false;
        const widthChanged = node.width !== prevNode.width;
        const heightChanged = node.height !== prevNode.height;
        if (widthChanged || heightChanged) {
          return true;
        }
      }
      return false;
    });

    if (hasChanged) {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.type === 'text' && (node.width || node.height)) {
            const currentWidth = node.width || node.data.width;
            const currentHeight = node.height || node.data.height;
            if (currentWidth !== node.data.width || currentHeight !== node.data.height) {
              return {
                ...node,
                data: {
                  ...node.data,
                  width: currentWidth,
                  height: currentHeight,
                },
              };
            }
          }
          return node;
        })
      );
    }
    prevNodesRef.current = nodes;
  }, [nodes, setNodes]);

  // Sprawdź, czy są niezapisane zmiany w panelach właściwości
  useEffect(() => {
    if (!selectedNode) {
      setHasUnsavedNodeChanges(false);
      setHasUnsavedTextNodeChanges(false);
      return;
    }
    
    if (selectedNode.type === 'text') {
      if (!lastSavedTextNodePropertiesRef.current) {
        setHasUnsavedTextNodeChanges(false);
        return;
      }
      const current = JSON.stringify(textNodeProperties);
      const saved = JSON.stringify(lastSavedTextNodePropertiesRef.current);
      setHasUnsavedTextNodeChanges(current !== saved);
    } else {
      if (!lastSavedNodePropertiesRef.current) {
        setHasUnsavedNodeChanges(false);
        return;
      }
      const current = JSON.stringify(nodeProperties);
      const saved = JSON.stringify(lastSavedNodePropertiesRef.current);
      setHasUnsavedNodeChanges(current !== saved);
    }
  }, [nodeProperties, textNodeProperties, selectedNode]);

  useEffect(() => {
    if (!selectedEdge) {
      setHasUnsavedEdgeChanges(false);
      return;
    }
    if (!lastSavedEdgePropertiesRef.current) {
      setHasUnsavedEdgeChanges(false);
      return;
    }
    const current = JSON.stringify(edgeProperties);
    const saved = JSON.stringify(lastSavedEdgePropertiesRef.current);
    setHasUnsavedEdgeChanges(current !== saved);
  }, [edgeProperties, selectedEdge]);

  const updateNodeProperties = async () => {
    if (!selectedNode || !id) return;
    pushUndoHistory();
    
    // Jeśli zaznaczamy isPinned: true, ustaw isPinned: false dla wszystkich innych nodów
    const isPinning = (selectedNode.type === 'text' 
      ? textNodeProperties.isPinned 
      : nodeProperties.isPinned) === true;
    
    setNodes((nds) =>
      nds.map((node) => {
        if (node.id === selectedNode.id) {
          if (node.type === 'text') {
            return {
              ...node,
              data: {
                ...node.data,
                ...textNodeProperties,
              },
            };
          } else {
            return {
              ...node,
              data: {
                ...node.data,
                ...nodeProperties,
                customFields: nodeCustomFields.length > 0 ? nodeCustomFields : undefined,
              },
            };
          }
        } else if (isPinning) {
          // Odznacz wszystkie inne nody, jeśli przypinamy ten
          return {
            ...node,
            data: {
              ...node.data,
              isPinned: false,
            },
          };
        }
        return node;
      })
    );

    // Zapisz customowe pola do bazy (tylko dla custom nodes) - zawsze, nawet jeśli puste (żeby usunąć stare)
    if (selectedNode.type === 'custom') {
      try {
        await saveNodeCustomFields(selectedNode.id, id, nodeCustomFields);
      } catch (error: any) {
        console.error('Błąd zapisywania customowych pól:', error);
      }
    }

    // Reset dirty state po zapisaniu
    if (selectedNode.type === 'text') {
      lastSavedTextNodePropertiesRef.current = JSON.parse(JSON.stringify(textNodeProperties));
      setHasUnsavedTextNodeChanges(false);
    } else {
      lastSavedNodePropertiesRef.current = JSON.parse(JSON.stringify(nodeProperties));
      setHasUnsavedNodeChanges(false);
    }

    setSelectedNode(null);
    setShowPropertiesPanel(false);
  };

  const deleteSelectedNode = () => {
    if (!selectedNode) return;
    pushUndoHistory();
    setNodes((nds) => nds.filter((node) => node.id !== selectedNode.id));
    setEdges((eds) => eds.filter((edge) => edge.source !== selectedNode.id && edge.target !== selectedNode.id));
    setSelectedNode(null);
    setShowPropertiesPanel(false);
  };

  const updateEdgeProperties = async () => {
    if (!selectedEdge || !id) return;
    pushUndoHistory();
    
    // Zapisz customowe pola do bazy - zawsze, nawet jeśli puste (żeby usunąć stare)
    try {
      await saveEdgeCustomFields(selectedEdge.id, id, edgeCustomFields);
    } catch (error: any) {
      console.error('Błąd zapisywania customowych pól dla edge:', error);
    }

    setEdges((eds) =>
      eds.map((edge) =>
        edge.id === selectedEdge.id
          ? {
              ...edge,
              data: {
                ...edge.data,
                ...edgeProperties,
                customFields: edgeCustomFields.length > 0 ? edgeCustomFields : undefined,
              },
              label: edgeProperties.notes ? edgeProperties.notes : undefined,
            }
          : edge
      )
    );

    setSelectedEdge(null);
    setShowEdgeProperties(false);
  };

  const deleteSelectedEdge = () => {
    if (!selectedEdge) return;
    pushUndoHistory();
    setEdges((eds) => eds.filter((edge) => edge.id !== selectedEdge.id));
    setSelectedEdge(null);
    setShowEdgeProperties(false);
  };

  // Wymiary nodów (używane w alignNodes i liniach pomocniczych)
  const getNodeDimensions = useCallback((node: Node) => {
    const width = node.width || node.measured?.width || 150;
    const height = node.height || node.measured?.height || 80;
    return { width, height };
  }, []);

  // P3: czy bounding box któregokolwiek noda przecina się z viewportem.
  // Używane przez debounce w onViewportChange + Center button do auto-pulsowania.
  const areAnyNodesVisible = useCallback((vp: { x: number; y: number; zoom: number }, ns: Node[]): boolean => {
    if (ns.length === 0) return true; // brak nodów = nic do pokazania, nie alarmuj
    if (!reactFlowWrapper.current) return true;
    const cw = reactFlowWrapper.current.offsetWidth;
    const ch = reactFlowWrapper.current.offsetHeight;
    // Viewport w przestrzeni flow (NIE screen)
    const viewLeft = -vp.x / vp.zoom;
    const viewTop = -vp.y / vp.zoom;
    const viewRight = viewLeft + cw / vp.zoom;
    const viewBottom = viewTop + ch / vp.zoom;
    for (const n of ns) {
      const { width: w, height: h } = getNodeDimensions(n);
      const nl = n.position.x, nt = n.position.y, nr = n.position.x + w, nb = n.position.y + h;
      // Przecięcie AABB (Axis-Aligned Bounding Box)
      if (nl < viewRight && nr > viewLeft && nt < viewBottom && nb > viewTop) return true;
    }
    return false;
  }, [getNodeDimensions]);

  // Debounced update isLostInCanvas - aktualizujemy 150ms po ostatnim ruchu kamery
  const lostCheckTimerRef = useRef<number | null>(null);
  useEffect(() => {
    if (lostCheckTimerRef.current !== null) {
      window.clearTimeout(lostCheckTimerRef.current);
    }
    lostCheckTimerRef.current = window.setTimeout(() => {
      setIsLostInCanvas(!areAnyNodesVisible(viewport, nodes));
    }, 150);
    return () => {
      if (lostCheckTimerRef.current !== null) window.clearTimeout(lostCheckTimerRef.current);
    };
  }, [viewport, nodes, areAnyNodesVisible]);

  // Smart return - klik / hotkey Home → fitView z animacją
  // Auto-layout LR (left-to-right) - prosty BFS po grafie połączeń.
  // Wyznacza kolumny (poziomy) i równo rozmieszcza nody. Niepodłączone nody w 1. kolumnie.
  const handleAutoLayoutLR = useCallback(() => {
    if (nodes.length === 0) return;
    const COL_WIDTH = 240;
    const ROW_HEIGHT = 180;
    // Buduj mapę: targetId -> [sourceId...]
    const incoming = new Map<string, string[]>();
    const outgoing = new Map<string, string[]>();
    nodes.forEach((n) => { incoming.set(n.id, []); outgoing.set(n.id, []); });
    edges.forEach((e) => {
      incoming.get(e.target)?.push(e.source);
      outgoing.get(e.source)?.push(e.target);
    });
    // Roots: brak incoming (najlepiej traktować jako pierwsza kolumna)
    const roots = nodes.filter((n) => (incoming.get(n.id) || []).length === 0).map((n) => n.id);
    if (roots.length === 0) roots.push(nodes[0].id); // edge case: cycle
    // BFS - przypisz każdemu nodowi level (kolumnę)
    const level = new Map<string, number>();
    roots.forEach((r) => level.set(r, 0));
    const queue = [...roots];
    while (queue.length > 0) {
      const id = queue.shift()!;
      const myLevel = level.get(id)!;
      (outgoing.get(id) || []).forEach((next) => {
        const nextLevel = Math.max(level.get(next) ?? -1, myLevel + 1);
        if (nextLevel !== level.get(next)) {
          level.set(next, nextLevel);
          queue.push(next);
        }
      });
    }
    // Dla nodów które nie były dotknięte BFS (np. izolowane) - przypisz level 0
    nodes.forEach((n) => { if (!level.has(n.id)) level.set(n.id, 0); });
    // Pogrupuj po levelach
    const byLevel = new Map<number, string[]>();
    level.forEach((lvl, id) => {
      if (!byLevel.has(lvl)) byLevel.set(lvl, []);
      byLevel.get(lvl)!.push(id);
    });
    // Ustaw pozycje
    const newPositions = new Map<string, { x: number; y: number }>();
    Array.from(byLevel.entries())
      .sort(([a], [b]) => a - b)
      .forEach(([lvl, ids]) => {
        const startY = -((ids.length - 1) * ROW_HEIGHT) / 2;
        ids.forEach((id, idx) => {
          newPositions.set(id, { x: lvl * COL_WIDTH, y: startY + idx * ROW_HEIGHT });
        });
      });
    pushUndoHistory();
    setNodes((nds) =>
      nds.map((n) => {
        const pos = newPositions.get(n.id);
        return pos ? { ...n, position: pos } : n;
      })
    );
    // FitView po krótkiej chwili
    setTimeout(() => {
      reactFlowInstance?.fitView({ padding: 0.15, duration: 400 });
    }, 50);
  }, [nodes, edges, setNodes, pushUndoHistory, reactFlowInstance]);

  const handleSmartReturn = useCallback(() => {
    if (!reactFlowInstance || nodes.length === 0) return;
    reactFlowInstance.fitView({ padding: 0.15, duration: 400 });
  }, [reactFlowInstance, nodes.length]);

  // rAF throttle dla alignment guides - bez tego setState leciał na każdy piksel ruchu kursora
  // i przy >50 nodach FPS spadało do 30. Teraz max 60Hz updateów.
  const alignmentRafRef = useRef<number | null>(null);
  const handleNodeDrag = useCallback((_: React.MouseEvent, node: Node, allNodes: Node[]) => {
    if (alignmentRafRef.current !== null) return;
    alignmentRafRef.current = requestAnimationFrame(() => {
      alignmentRafRef.current = null;
      const others = allNodes.filter((n) => n.id !== node.id);
      if (others.length === 0) { setAlignmentGuides({ vertical: [], horizontal: [] }); return; }
      const d = getNodeDimensions(node);
      const left = node.position.x, cX = node.position.x + d.width / 2, right = node.position.x + d.width;
      const top = node.position.y, cY = node.position.y + d.height / 2, bottom = node.position.y + d.height;
      const vSet = new Set<number>(), hSet = new Set<number>();
      const T = 5;
      others.forEach((o) => {
        const od = getNodeDimensions(o);
        const oL = o.position.x, oCX = o.position.x + od.width / 2, oR = o.position.x + od.width;
        const oT = o.position.y, oCY = o.position.y + od.height / 2, oB = o.position.y + od.height;
        if (Math.abs(left - oL) <= T || Math.abs(cX - oL) <= T || Math.abs(right - oL) <= T) vSet.add(oL);
        if (Math.abs(left - oCX) <= T || Math.abs(cX - oCX) <= T || Math.abs(right - oCX) <= T) vSet.add(oCX);
        if (Math.abs(left - oR) <= T || Math.abs(cX - oR) <= T || Math.abs(right - oR) <= T) vSet.add(oR);
        if (Math.abs(top - oT) <= T || Math.abs(cY - oT) <= T || Math.abs(bottom - oT) <= T) hSet.add(oT);
        if (Math.abs(top - oCY) <= T || Math.abs(cY - oCY) <= T || Math.abs(bottom - oCY) <= T) hSet.add(oCY);
        if (Math.abs(top - oB) <= T || Math.abs(cY - oB) <= T || Math.abs(bottom - oB) <= T) hSet.add(oB);
      });
      setAlignmentGuides({ vertical: Array.from(vSet), horizontal: Array.from(hSet) });
    });
  }, [getNodeDimensions]);

  useEffect(() => () => {
    if (alignmentRafRef.current !== null) cancelAnimationFrame(alignmentRafRef.current);
  }, []);

  // Po otwarciu panelu właściwości via dwuklik - autofocus na pole "Nazwa" i select tekstu.
  // Jak Figma: dwuklik = inline edit nazwy. Tu otwieramy panel i od razu skupiamy pole.
  useEffect(() => {
    if (showPropertiesPanel && focusLabelOnOpenRef.current && nodeLabelInputRef.current) {
      nodeLabelInputRef.current.focus();
      nodeLabelInputRef.current.select();
      focusLabelOnOpenRef.current = false;
    }
  }, [showPropertiesPanel]);

  // Live preview - custom node: zmiany w nodeProperties natychmiast w nodes (bez "Zapisz")
  useEffect(() => {
    if (!showPropertiesPanel || !selectedNode || selectedNode.type === 'text') return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? {
              ...n,
              data: {
                ...n.data,
                label: nodeProperties.label,
                icon: nodeProperties.icon,
                color: nodeProperties.color,
                notes: nodeProperties.notes,
                link: nodeProperties.link,
                isPinned: nodeProperties.isPinned,
                category: nodeProperties.category,
              },
            }
          : n
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodeProperties, showPropertiesPanel]);

  // Live preview - text node: zmiany w textNodeProperties → nodes natychmiast
  useEffect(() => {
    if (!showPropertiesPanel || !selectedNode || selectedNode.type !== 'text') return;
    setNodes((nds) =>
      nds.map((n) =>
        n.id === selectedNode.id
          ? {
              ...n,
              data: {
                ...n.data,
                text: textNodeProperties.text,
                fontSize: textNodeProperties.fontSize,
                fontWeight: textNodeProperties.fontWeight,
                textAlign: textNodeProperties.textAlign,
                verticalAlign: textNodeProperties.verticalAlign,
                showHandles: textNodeProperties.showHandles,
                isPinned: textNodeProperties.isPinned,
              },
            }
          : n
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textNodeProperties, showPropertiesPanel]);

  // Live preview - edge: zmiany w edgeProperties → edges natychmiast
  useEffect(() => {
    if (!showEdgeProperties || !selectedEdge) return;
    setEdges((eds) =>
      eds.map((e) =>
        e.id === selectedEdge.id
          ? {
              ...e,
              data: {
                ...e.data,
                notes: edgeProperties.notes,
                link: edgeProperties.link,
              },
            }
          : e
      )
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edgeProperties, showEdgeProperties]);

  // Memoizacja propsów ReactFlow: bez tego każdy render tworzył nową tablicę nodes/edges
  // i wymuszał re-renderowanie WSZYSTKICH węzłów/krawędzi (lag przy drag/zoom).
  const nodesWithComments = useMemo(() => {
    return nodes.map((node) => {
      const commentInfo = nodeCommentCounts.get(node.id);
      if (commentInfo && commentInfo.count > 0) {
        return {
          ...node,
          data: {
            ...node.data,
            commentCount: commentInfo.count,
            commentStatus: commentInfo.status,
          },
        };
      }
      return {
        ...node,
        data: {
          ...node.data,
          commentCount: undefined,
          commentStatus: undefined,
        },
      };
    });
  }, [nodes, nodeCommentCounts]);

  const edgesWithComments = useMemo(() => {
    return edges.map((edge) => {
      const commentInfo = edgeCommentCounts.get(edge.id);
      if (commentInfo && commentInfo.count > 0) {
        return {
          ...edge,
          data: {
            ...edge.data,
            commentCount: commentInfo.count,
            commentStatus: commentInfo.status,
          },
        };
      }
      return {
        ...edge,
        data: {
          ...edge.data,
          commentCount: undefined,
          commentStatus: undefined,
        },
      };
    });
  }, [edges, edgeCommentCounts]);

  // Mapy ID → czytelna etykieta używane przez CommentPanel, by zamiast surowych UUID
  // pokazywać "Facebook Ads" / "Lead → Sprzedaż". Aktualizujemy gdy zmieni się diagram.
  const nodeLabelMap = useMemo(() => {
    const m = new Map<string, string>();
    nodes.forEach((node) => {
      const d: any = node.data;
      if (node.type === 'text') {
        const t = typeof d?.text === 'string' ? d.text.trim() : '';
        m.set(node.id, t ? `Tekst: ${t.slice(0, 40)}` : 'Pole tekstowe');
      } else {
        const label = d?.label ?? 'Element';
        m.set(node.id, label);
      }
    });
    return m;
  }, [nodes]);

  const edgeLabelMap = useMemo(() => {
    const m = new Map<string, string>();
    edges.forEach((edge) => {
      const src = nodeLabelMap.get(edge.source) || 'Element';
      const tgt = nodeLabelMap.get(edge.target) || 'Element';
      m.set(edge.id, `${src} → ${tgt}`);
    });
    return m;
  }, [edges, nodeLabelMap]);

  // Funkcje wyrównywania — np. "top" = wszystkie górne krawędzie na tej samej wysokości (min Y)
  const alignNodes = (direction: 'left' | 'right' | 'top' | 'bottom' | 'center-x' | 'center-y' | 'distribute-x' | 'distribute-y') => {
    const selectedNodes = nodes.filter((node) => node.selected);
    if (selectedNodes.length < 2) {
      setAlertModal({
        isOpen: true,
        title: 'Wymagane zaznaczenie',
        message: 'Zaznacz co najmniej 2 elementy (Ctrl+Click lub przeciągnij myszką), aby je wyrównać.',
        type: 'info',
      });
      return;
    }

    let updatedNodes = [...nodes];

    if (direction === 'left') {
      const minX = Math.min(...selectedNodes.map((n) => n.position.x));
      updatedNodes = updatedNodes.map((node) =>
        selectedNodes.find((sn) => sn.id === node.id)
          ? { ...node, position: { ...node.position, x: minX } }
          : node
      );
    } else if (direction === 'right') {
      const maxX = Math.max(...selectedNodes.map((n) => {
        const dims = getNodeDimensions(n);
        return n.position.x + dims.width;
      }));
      updatedNodes = updatedNodes.map((node) => {
        const selected = selectedNodes.find((sn) => sn.id === node.id);
        if (selected) {
          const dims = getNodeDimensions(node);
          return { ...node, position: { ...node.position, x: maxX - dims.width } };
        }
        return node;
      });
    } else if (direction === 'top') {
      const minY = Math.min(...selectedNodes.map((n) => n.position.y));
      updatedNodes = updatedNodes.map((node) =>
        selectedNodes.find((sn) => sn.id === node.id)
          ? { ...node, position: { ...node.position, y: minY } }
          : node
      );
    } else if (direction === 'bottom') {
      const maxY = Math.max(...selectedNodes.map((n) => {
        const dims = getNodeDimensions(n);
        return n.position.y + dims.height;
      }));
      updatedNodes = updatedNodes.map((node) => {
        const selected = selectedNodes.find((sn) => sn.id === node.id);
        if (selected) {
          const dims = getNodeDimensions(node);
          return { ...node, position: { ...node.position, y: maxY - dims.height } };
        }
        return node;
      });
    } else if (direction === 'center-x') {
      const centerX = selectedNodes.reduce((sum, n) => {
        const dims = getNodeDimensions(n);
        return sum + n.position.x + dims.width / 2;
      }, 0) / selectedNodes.length;
      updatedNodes = updatedNodes.map((node) => {
        const selected = selectedNodes.find((sn) => sn.id === node.id);
        if (selected) {
          const dims = getNodeDimensions(node);
          return { ...node, position: { ...node.position, x: centerX - dims.width / 2 } };
        }
        return node;
      });
    } else if (direction === 'center-y') {
      const centerY = selectedNodes.reduce((sum, n) => {
        const dims = getNodeDimensions(n);
        return sum + n.position.y + dims.height / 2;
      }, 0) / selectedNodes.length;
      updatedNodes = updatedNodes.map((node) => {
        const selected = selectedNodes.find((sn) => sn.id === node.id);
        if (selected) {
          const dims = getNodeDimensions(node);
          return { ...node, position: { ...node.position, y: centerY - dims.height / 2 } };
        }
        return node;
      });
    } else if (direction === 'distribute-x') {
      const sorted = [...selectedNodes].sort((a, b) => a.position.x - b.position.x);
      const firstDims = getNodeDimensions(sorted[0]);
      const lastDims = getNodeDimensions(sorted[sorted.length - 1]);
      const totalWidth = (sorted[sorted.length - 1].position.x + lastDims.width) - sorted[0].position.x;
      const step = totalWidth / (sorted.length - 1);
      sorted.forEach((node, idx) => {
        if (idx > 0 && idx < sorted.length - 1) {
          const nodeIndex = updatedNodes.findIndex((n) => n.id === node.id);
          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: { ...updatedNodes[nodeIndex].position, x: sorted[0].position.x + step * idx },
            };
          }
        }
      });
    } else if (direction === 'distribute-y') {
      const sorted = [...selectedNodes].sort((a, b) => a.position.y - b.position.y);
      const firstDims = getNodeDimensions(sorted[0]);
      const lastDims = getNodeDimensions(sorted[sorted.length - 1]);
      const totalHeight = (sorted[sorted.length - 1].position.y + lastDims.height) - sorted[0].position.y;
      const step = totalHeight / (sorted.length - 1);
      sorted.forEach((node, idx) => {
        if (idx > 0 && idx < sorted.length - 1) {
          const nodeIndex = updatedNodes.findIndex((n) => n.id === node.id);
          if (nodeIndex !== -1) {
            updatedNodes[nodeIndex] = {
              ...updatedNodes[nodeIndex],
              position: { ...updatedNodes[nodeIndex].position, y: sorted[0].position.y + step * idx },
            };
          }
        }
      });
    }

    pushUndoHistory();
    setNodes(updatedNodes);
  };

  // Połącz standardowe szablony z własnymi
  const allTemplates = [...nodeTemplates, ...customTemplates];

  // P5: filtrowanie po wyszukiwaniu (case-insensitive, label + category)
  const filteredTemplates = useMemo(() => {
    const q = templateSearchQuery.trim().toLowerCase();
    if (!q) return allTemplates;
    return allTemplates.filter(
      (t) => t.label.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [allTemplates, templateSearchQuery]);

  const groupedTemplates = filteredTemplates.reduce((acc, template) => {
    if (!acc[template.category]) {
      acc[template.category] = [];
    }
    acc[template.category].push(template);
    return acc;
  }, {} as Record<string, typeof allTemplates>);

  // Sortuj elementy w każdej kategorii - "Inne" na końcu
  Object.keys(groupedTemplates).forEach((category) => {
    groupedTemplates[category].sort((a, b) => {
      if (a.label === 'Inne') return 1;
      if (b.label === 'Inne') return -1;
      return 0;
    });
  });

  if (loading) {
    return <LoadingState variant="fullscreen" label="Ładowanie lejka…" />;
  }

  if (!funnel) {
    return (
      <div className="h-screen bg-[#13151a] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg mb-4">Lejek nie został znaleziony</p>
          <button
            onClick={() => router.push(isReadOnly ? '/panel' : '/admin/marketing')}
            className="px-5 py-2.5 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/70 transition-all duration-200"
          >
            Wróć
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#13151a] flex flex-col relative">
      {/* Mini-przycisk do przywrócenia ukrytego headera */}
      {!showHeader && (
        <button
          onClick={() => setShowHeader(true)}
          className="fixed top-2 left-2 z-50 p-2 bg-[#13151a]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm"
          title="Pokaż nagłówek"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Header - minimal Linear/Figma style, h-10 */}
      <div className={`flex items-center justify-between px-3 h-10 border-b border-white/[0.08] bg-[#13151a] border-white/[0.08] transition-all duration-300 ${showHeader ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden border-0'}`}>
        <div className="flex items-center gap-1.5 min-w-0 flex-1">
          <button
            onClick={() => router.push(isReadOnly ? '/panel' : '/admin/marketing')}
            className="p-1 hover:bg-white/[0.06] rounded transition-colors text-white/50 hover:text-white shrink-0"
            title={isReadOnly ? 'Powrót do panelu (Esc)' : 'Powrót do listy lejków'}
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <div className="flex-1">
            {isReadOnly ? (
              <h1 className="font-sans text-[13px] font-medium text-white tracking-tight truncate">
                {funnel.project_name || 'Bez nazwy'}
              </h1>
            ) : !isEditingTitle ? (
              <h1
                className="group font-sans text-[13px] font-medium text-white tracking-tight cursor-pointer transition-colors truncate inline-flex items-center gap-1.5 hover:bg-[#1a1d24] rounded px-1.5 py-0.5 -mx-1.5 -my-0.5"
                onClick={() => {
                  setIsEditingTitle(true);
                  setEditedTitle(funnel.project_name || '');
                }}
                title="Kliknij, aby edytować nazwę"
              >
                <span className="text-white/40 group-hover:text-white/50 transition-colors">Lejek /</span>
                <span className="truncate">{funnel.project_name || 'Bez nazwy'}</span>
                <svg className="w-3 h-3 text-white/0 group-hover:text-white/40 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </h1>
            ) : (
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                onBlur={async () => {
                  setIsEditingTitle(false);
                  if (editedTitle !== funnel.project_name && funnel) {
                    try {
                      const { error } = await supabase
                        .from('funnel_diagrams')
                        .update({ project_name: editedTitle })
                        .eq('id', funnel.id);
                      if (error) throw error;
                      setFunnel({ ...funnel, project_name: editedTitle });
                    } catch (error: any) {
                      console.error('Błąd zapisywania tytułu:', error);
                      setEditedTitle(funnel.project_name || '');
                    }
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.currentTarget.blur();
                  }
                  if (e.key === 'Escape') {
                    setEditedTitle(funnel.project_name || '');
                    setIsEditingTitle(false);
                  }
                }}
                className="font-sans text-base font-semibold text-white tracking-tight bg-white/[0.06] border border-[#fee715]/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-full max-w-md"
                autoFocus
              />
            )}
            {isReadOnly ? (
              funnel.subtitle ? (
                <div className="inline-flex items-center px-3 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white/65 mt-0.5">
                  {funnel.subtitle}
                </div>
              ) : null
            ) : !isEditingSubtitle ? (
              <div
                className="inline-flex items-center px-3 py-1 rounded-md bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-white/65 cursor-pointer hover:bg-white/[0.06] hover:border-white/[0.12] hover:text-white transition-all mt-0.5"
                onClick={() => {
                  setIsEditingSubtitle(true);
                  setEditedSubtitle(funnel.subtitle || '');
                  const standardSubtitles = ['stan obecny', 'docelowy', 'Plan 90 dni'];
                  if (funnel.subtitle && standardSubtitles.includes(funnel.subtitle)) {
                    setSubtitleMode('select');
                  } else {
                    setSubtitleMode('custom');
                  }
                }}
                title="Kliknij, aby edytować podtytuł"
              >
                {funnel.subtitle || 'Kliknij, aby dodać podtytuł'}
              </div>
            ) : (
              <div className="mt-1 flex items-center gap-2">
                {subtitleMode === 'select' ? (
                  <CustomSelect
                    value={editedSubtitle || ''}
                    onChange={async (value) => {
                      if (value === 'custom') {
                        setSubtitleMode('custom');
                        setEditedSubtitle('');
                      } else {
                        setEditedSubtitle(value);
                        // Automatycznie zapisz gdy wybierzesz opcję z listy
                        if (funnel && value !== funnel.subtitle) {
                          try {
                            const { error } = await supabase
                              .from('funnel_diagrams')
                              .update({ subtitle: value })
                              .eq('id', funnel.id);
                            if (error) throw error;
                            setFunnel({ ...funnel, subtitle: value });
                            setIsEditingSubtitle(false);
                          } catch (error: any) {
                            console.error('Błąd zapisywania podtytułu:', error);
                          }
                        } else {
                          setIsEditingSubtitle(false);
                        }
                      }
                    }}
                    options={[
                      { value: 'stan obecny', label: 'stan obecny' },
                      { value: 'docelowy', label: 'docelowy' },
                      { value: 'Plan 90 dni', label: 'Plan 90 dni' },
                      { value: 'custom', label: 'Własny tekst...' },
                    ]}
                    placeholder="Wybierz podtytuł"
                    className="w-48"
                    size="sm"
                  />
                ) : (
                  <input
                    type="text"
                    value={editedSubtitle}
                    onChange={(e) => setEditedSubtitle(e.target.value)}
                    placeholder="Wpisz własny podtytuł"
                    className="text-sm bg-[#13151a] border border-[#fee715]/50 rounded px-2 py-1 text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-48"
                    autoFocus
                  />
                )}
                <button
                  onClick={async () => {
                    if (funnel) {
                      const subtitleToSave = editedSubtitle.trim() || null;
                      try {
                        const { error } = await supabase
                          .from('funnel_diagrams')
                          .update({ subtitle: subtitleToSave })
                          .eq('id', funnel.id);
                        if (error) throw error;
                        // Zaktualizuj stan funnel z zapisanym podtytułem
                        setFunnel({ ...funnel, subtitle: subtitleToSave });
                        // Jeśli wpisany tekst jest standardowy, wróć do trybu select
                        const standardSubtitles = ['stan obecny', 'docelowy', 'Plan 90 dni'];
                        if (subtitleToSave && standardSubtitles.includes(subtitleToSave)) {
                          setSubtitleMode('select');
                        }
                        setIsEditingSubtitle(false);
                      } catch (error: any) {
                        console.error('Błąd zapisywania podtytułu:', error);
                        // W przypadku błędu, przywróć poprzednią wartość
                        setEditedSubtitle(funnel.subtitle || '');
                        setIsEditingSubtitle(false);
                      }
                    } else {
                      setIsEditingSubtitle(false);
                    }
                  }}
                  className="px-2 py-1 text-xs bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded hover:bg-[#fee715]/20 transition-colors"
                >
                  ✓
                </button>
                <button
                  onClick={() => {
                    setEditedSubtitle(funnel.subtitle || '');
                    setIsEditingSubtitle(false);
                    const standardSubtitles = ['stan obecny', 'docelowy', 'Plan 90 dni'];
                    if (funnel.subtitle && standardSubtitles.includes(funnel.subtitle)) {
                      setSubtitleMode('select');
                    } else if (funnel.subtitle) {
                      setSubtitleMode('custom');
                    }
                  }}
                  className="px-2 py-1 text-xs bg-white/[0.06] border border-white/[0.12] text-white/65 rounded hover:bg-white/[0.10] transition-colors"
                  title="Anuluj"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          {/* Status zapisu jako mała kropka + tooltip (oszczędność miejsca jak Figma) */}
          {!isReadOnly && (
            <span
              className="flex items-center gap-1.5 px-1.5 mr-1 text-[10px] font-mono text-white/40"
              title={saving ? 'Zapisywanie…' : hasUnsavedChanges ? 'Niezapisane (autosave za 2s)' : 'Wszystko zapisane'}
            >
              <span
                className={`inline-block w-1.5 h-1.5 rounded-full ${
                  saving ? 'bg-[#fee715] animate-pulse' : hasUnsavedChanges ? 'bg-amber-400' : 'bg-emerald-500'
                }`}
              />
              <span className="hidden lg:inline">
                {saving ? 'Zapisywanie' : hasUnsavedChanges ? 'Niezapisane' : 'Zapisano'}
              </span>
            </span>
          )}

          {!isReadOnly && (
            <button
              onClick={handleUndo}
              disabled={undoHistory.length === 0}
              title="Cofnij (⌘Z)"
              className="p-1.5 hover:bg-white/[0.06] rounded text-white/50 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-transparent"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
              </svg>
            </button>
          )}

          <button
            onClick={() => {
              setShowCommentPanel(!showCommentPanel);
              if (!showCommentPanel) loadCommentCounts();
            }}
            className={`flex items-center gap-1.5 px-2 py-1 rounded text-[12px] font-medium transition-colors ${
              showCommentPanel
                ? 'bg-[#fee715]/10 text-[#fee715]'
                : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
            }`}
            title="Komentarze (C)"
          >
            <ChatCircleDots size={14} />
            <span className="hidden md:inline">Komentarze</span>
          </button>

          {!isReadOnly && (
            <button
              onClick={saveFunnel}
              disabled={!hasUnsavedChanges || saving}
              className="ml-1 px-2.5 py-1 bg-[#fee715] text-[#050714] rounded text-[12px] font-semibold hover:brightness-110 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-sm shadow-[#fee715]/20"
              title="Zapisz teraz (⌘S)"
            >
              Zapisz
            </button>
          )}

          <button
            onClick={() => setShowHeader(false)}
            className="ml-1 p-1.5 hover:bg-white/[0.06] rounded text-white/40 hover:text-white transition-colors"
            title="Ukryj pasek"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden relative">
        {/* Left Rail (Miro-style) - tylko dla admina, zawsze widoczny */}
        {!isReadOnly && (
          <aside className="w-12 shrink-0 border-r border-white/[0.08] bg-[#13151a] flex flex-col items-center py-2 gap-1 z-20">
            {/* Add element */}
            <button
              onClick={() => setShowAddDrawer((s) => !s)}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                showAddDrawer
                  ? 'bg-[#fee715] text-[#050714]'
                  : 'bg-white/[0.06] text-white/65 hover:bg-white/[0.06] hover:text-white'
              }`}
              title="Dodaj element (A)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <div className="w-7 h-px bg-white/[0.06] my-1" />

            {/* Pan tool */}
            <button
              onClick={() => setInteractionMode('pan')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                interactionMode === 'pan'
                  ? 'bg-[#fee715] text-[#050714]'
                  : 'text-white/50 hover:bg-[#1a1d24] hover:text-white'
              }`}
              title="Przesuwanie (V / Space+drag)"
            >
              <Hand size={16} weight="regular" />
            </button>

            {/* Select tool */}
            <button
              onClick={() => setInteractionMode('select')}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                interactionMode === 'select'
                  ? 'bg-[#fee715] text-[#050714]'
                  : 'text-white/50 hover:bg-[#1a1d24] hover:text-white'
              }`}
              title="Zaznaczanie (S)"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5" />
              </svg>
            </button>

            {/* Comment tool */}
            <button
              onClick={() => {
                setCommentMode(!commentMode);
                setInteractionMode(commentMode ? 'pan' : 'comment');
              }}
              className={`w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                commentMode
                  ? 'bg-[#fee715] text-[#050714]'
                  : 'text-white/50 hover:bg-[#1a1d24] hover:text-white'
              }`}
              title="Komentowanie (C)"
            >
              <ChatCircleDots size={16} weight="regular" />
            </button>
          </aside>
        )}

        {/* Main Canvas */}
        <div className="flex-1 relative" ref={reactFlowWrapper}>
          {/* Add element drawer - overlay nad canvas, slide-in z lewej */}
          {!isReadOnly && showAddDrawer && (
            <>
              {/* Backdrop - klik zamyka */}
              <div
                className="absolute inset-0 z-30 bg-black/20 backdrop-blur-[2px]"
                onClick={() => setShowAddDrawer(false)}
              />
              {/* Drawer */}
              <div
                className="absolute top-0 left-0 h-full w-72 z-40 bg-[#13151a] border-r border-white/[0.08] shadow-2xl flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="px-3.5 py-3 border-b border-white/[0.08] flex items-center justify-between shrink-0">
                  <h3 className="font-sans font-semibold text-white text-sm tracking-tight">Dodaj element</h3>
                  <button
                    onClick={() => setShowAddDrawer(false)}
                    className="p-1 hover:bg-white/[0.06] rounded-md transition-colors text-white/40 hover:text-white"
                    title="Zamknij (Esc)"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Search */}
                <div className="px-3.5 py-2.5 border-b border-white/[0.08] shrink-0">
                  <div className="relative">
                    <svg className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/30 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    <input
                      type="text"
                      value={templateSearchQuery}
                      onChange={(e) => setTemplateSearchQuery(e.target.value)}
                      placeholder="Szukaj elementu…"
                      autoFocus
                      className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md pl-8 pr-7 py-1.5 text-[12px] text-white/80 placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                    />
                    {templateSearchQuery && (
                      <button
                        onClick={() => setTemplateSearchQuery('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white/[0.06] hover:bg-white/[0.10] text-white/50 hover:text-white text-[10px] flex items-center justify-center transition-colors"
                        title="Wyczyść"
                      >×</button>
                    )}
                  </div>
                </div>

                {/* Templates */}
                <div className="flex-1 overflow-y-auto px-3.5 py-3 space-y-4">
                  {Object.keys(groupedTemplates).length === 0 && (
                    <div className="py-6 text-center text-[12px] text-white/40">
                      Brak wyników dla "{templateSearchQuery}"
                    </div>
                  )}
                  {Object.entries(groupedTemplates).map(([category, templates]) => (
                    <div key={category}>
                      <h4 className="text-[10px] font-mono font-semibold text-white/40 uppercase mb-2 tracking-[0.16em] px-0.5">{category}</h4>
                      <div className="grid grid-cols-2 gap-1">
                        {templates.map((template, idx) => {
                          const color = 'color' in template ? template.color : undefined;
                          return (
                            <div
                              key={idx}
                              draggable
                              onDragStart={(event) => {
                                event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
                                event.dataTransfer.effectAllowed = 'move';
                                const original = event.currentTarget as HTMLElement;
                                const ghost = original.cloneNode(true) as HTMLElement;
                                ghost.style.position = 'absolute';
                                ghost.style.top = '-1000px';
                                ghost.style.left = '-1000px';
                                ghost.style.width = `${original.offsetWidth}px`;
                                ghost.style.backgroundColor = '#0f1428';
                                ghost.style.border = '1px solid rgba(254, 231, 21, 0.3)';
                                ghost.style.borderRadius = '6px';
                                ghost.style.opacity = '0.95';
                                ghost.style.pointerEvents = 'none';
                                ghost.style.boxShadow = '0 8px 24px rgba(0,0,0,0.5)';
                                document.body.appendChild(ghost);
                                event.dataTransfer.setDragImage(ghost, original.offsetWidth / 2, original.offsetHeight / 2);
                                requestAnimationFrame(() => {
                                  if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
                                });
                              }}
                              className="group flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 rounded-md bg-[#1a1d24] border border-white/[0.06] hover:bg-white/[0.06] hover:border-white/[0.12] cursor-grab active:cursor-grabbing transition-colors duration-150"
                              title={`${template.label} · ${template.category}`}
                            >
                              <div
                                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                                style={color ? { backgroundColor: `${color}1f`, color } : { color: '#FAFAFA' }}
                              >
                                {renderPhosphorIcon(template.icon, 16)}
                              </div>
                              <span className="text-[10.5px] text-white/65 group-hover:text-white text-center leading-tight font-medium line-clamp-2">
                                {template.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer hint */}
                <div className="px-3.5 py-2 border-t border-white/[0.08] shrink-0">
                  <p className="text-[10px] font-mono text-white/30 tracking-wide">PRZECIĄGNIJ NA CANVAS</p>
                </div>
              </div>
            </>
          )}

          {/* P3: Smart return - widoczny zawsze gdy są nody, pulsuje gdy zgubiony */}
          {nodes.length > 0 && (
            <button
              onClick={handleSmartReturn}
              className={`absolute top-4 right-4 z-30 flex items-center gap-2 px-3 py-1.5 bg-[#13151a] border rounded-lg backdrop-blur-xl shadow-lg shadow-black/40 transition-all duration-200 ${
                isLostInCanvas
                  ? 'border-[#fee715]/60 text-[#fee715] animate-pulse hover:bg-[#fee715]/10'
                  : 'border-white/[0.08] text-white/65 hover:text-white hover:border-white/[0.12] hover:bg-[#1a1d24]'
              }`}
              title={isLostInCanvas ? 'Diagram poza widokiem — kliknij aby wrócić (Home)' : 'Wyśrodkuj diagram (Home / F)'}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              <span className="text-[12px] font-medium tracking-tight">{isLostInCanvas ? 'Wróć do diagramu' : 'Wyśrodkuj'}</span>
            </button>
          )}

          {/* Legenda usunięta - kategorie widoczne w sidebar templates */}
          <FunnelSelectModeContext.Provider value={{ isSelectMode: interactionMode === 'select', onLongPressDeselect }}>
          <ReactFlow
            nodes={nodesWithComments}
            edges={edgesWithComments}
            onNodesChange={wrappedOnNodesChange}
            onEdgesChange={wrappedOnEdgesChange}
            onConnect={onConnect}
            onNodeDragStart={(_, node) => {
              if (isReadOnly) return;
              isDraggingNodeRef.current = true;
              pushUndoHistory();
            }}
            isValidConnection={() => true}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
            onNodeDoubleClick={(event, node) => {
              // Klient nie edytuje - dwuklik tylko dla admina
              if (isReadOnly) return;
              // Dwuklik na tekstowy node nie ma sensu (edytuje się go inline)
              if (node.type === 'text') return;
              event.preventDefault();
              event.stopPropagation();
              focusLabelOnOpenRef.current = true;
              // Wywołaj normalny click logic by ustawić selectedNode + załadować właściwości
              onNodeClick(event as any, node);
            }}
            onEdgeClick={onEdgeClick}
            onPaneClick={onPaneClick}
            onSelectionChange={(params) => {
              // W trybie select: ręcznie zarządzamy selekcją, więc ignorujemy ten callback
              // Box selection jest obsługiwane przez wrappedOnNodesChange
              if (interactionMode === 'select' && isManualSelectionRef.current) {
                return;
              }
            }}
            onViewportChange={(vp) => { setViewport(vp); setCurrentZoom(vp.zoom); }}
            onNodeDrag={handleNodeDrag}
            onNodeDragStop={(_, node) => {
              const d = getNodeDimensions(node);
              const T = 5;
              let newX = node.position.x, newY = node.position.y;
              for (const g of alignmentGuides.vertical) {
                const dl = Math.abs(node.position.x - g), dc = Math.abs(node.position.x + d.width / 2 - g), dr = Math.abs(node.position.x + d.width - g);
                if (dl <= T) { newX = g; break; }
                if (dc <= T) { newX = g - d.width / 2; break; }
                if (dr <= T) { newX = g - d.width; break; }
              }
              for (const g of alignmentGuides.horizontal) {
                const dt = Math.abs(node.position.y - g), dc = Math.abs(node.position.y + d.height / 2 - g), db = Math.abs(node.position.y + d.height - g);
                if (dt <= T) { newY = g; break; }
                if (dc <= T) { newY = g - d.height / 2; break; }
                if (db <= T) { newY = g - d.height; break; }
              }
              if (newX !== node.position.x || newY !== node.position.y) {
                setNodes((nds) => nds.map((n) => n.id === node.id ? { ...n, position: { x: newX, y: newY } } : n));
              }
              setAlignmentGuides({ vertical: [], horizontal: [] });
            }}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            fitView={true}
            fitViewOptions={FUNNEL_FIT_VIEW_OPTIONS}
            className={`bg-[#f5f7fa] funnel-mode-${interactionMode} ${interactionMode === 'select' ? 'funnel-select-mode' : ''} ${isReadOnly ? 'funnel-readonly' : ''}`}
            connectionLineType={'smoothstep' as ConnectionLineType}
            snapToGrid={false}
            snapGrid={FUNNEL_SNAP_GRID}
            connectionLineStyle={FUNNEL_CONNECTION_LINE_STYLE}
            defaultEdgeOptions={FUNNEL_DEFAULT_EDGE_OPTIONS}
            nodesDraggable={!isReadOnly}
            nodesConnectable={!isReadOnly}
            nodesFocusable={true}
            edgesFocusable={!isReadOnly}
            edgesReconnectable={!isReadOnly}
            elementsSelectable={isReadOnly ? true : interactionMode !== 'select'}
            selectNodesOnDrag={false}
            panOnDrag={interactionMode === 'pan' ? true : (isSpacePressed ? [1, 2] : false)}
            panOnScroll={true}
            panOnScrollSpeed={0.8}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            selectionOnDrag={!isReadOnly && interactionMode === 'select'}
            selectionMode={'full' as SelectionMode}
            multiSelectionKeyCode={null}
            deleteKeyCode={isReadOnly ? null : FUNNEL_DELETE_KEY_CODES}
            connectionMode={'loose' as ConnectionMode}
            connectionRadius={80}
            minZoom={0.05}
            maxZoom={5}
            proOptions={FUNNEL_PRO_OPTIONS}
          >
            <Background
              variant={BackgroundVariant.Dots}
              gap={28}
              size={1}
              color="rgba(255, 255, 255, 0.08)"
            />
            {/* Mini-przycisk do przywrócenia ukrytego dolnego toolbara */}
            {!showBottomToolbar && (
              <Panel position="bottom-left">
                <button
                  onClick={() => setShowBottomToolbar(true)}
                  className="p-2 bg-[#13151a] border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm"
                  title="Pokaż narzędzia"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </button>
              </Panel>
            )}

            {/* Custom Controls Toolbar */}
            {showBottomToolbar && (
              <Panel position="bottom-left" className="bg-[#13151a] border border-white/[0.08] rounded-xl p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl">
                <div className="flex items-center gap-2">
                  {/* Przycisk ukrycia toolbara */}
                  <button
                    onClick={() => setShowBottomToolbar(false)}
                    className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-all text-white/50 hover:text-white"
                    title="Ukryj narzędzia"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Tools usunięte z bottom - są teraz w left rail (Miro-style).
                      Dla klienta (read-only) pokazujemy tylko Pan + Comment w bottom toolbar. */}
                  {isReadOnly && (
                    <div className="flex items-center gap-1 border-r border-white/[0.08] pr-1.5 mr-1.5">
                      <button
                        onClick={() => setInteractionMode('pan')}
                        className={`p-1.5 rounded-lg transition-all duration-150 ${
                          interactionMode === 'pan'
                            ? 'bg-[#fee715] text-[#050714]'
                            : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                        }`}
                        title="Przesuwanie"
                      >
                        <Hand size={16} />
                      </button>
                      <button
                        onClick={() => {
                          setCommentMode(!commentMode);
                          setInteractionMode(commentMode ? 'pan' : 'comment');
                        }}
                        className={`p-1.5 rounded-lg transition-all duration-150 ${
                          commentMode
                            ? 'bg-[#fee715] text-[#050714]'
                            : 'text-white/50 hover:bg-white/[0.06] hover:text-white'
                        }`}
                        title="Dodaj komentarz"
                      >
                        <ChatCircleDots size={16} />
                      </button>
                    </div>
                  )}

                  {/* Kontrolki zoom */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => reactFlowInstance?.zoomOut({ duration: 300 })}
                    className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-all duration-150 text-white/50 hover:text-white"
                    title="Oddal (Zoom Out)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => reactFlowInstance?.zoomIn({ duration: 300 })}
                    className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-all duration-150 text-white/50 hover:text-white"
                    title="Przybliż (Zoom In)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => reactFlowInstance?.fitView({ duration: 300, padding: 0.2 })}
                    className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-all duration-150 text-white/50 hover:text-white"
                    title="Dopasuj do widoku (F)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                  {/* Auto-layout LR - ułóż diagram od lewej do prawej */}
                  {!isReadOnly && nodes.length > 1 && (
                    <button
                      onClick={handleAutoLayoutLR}
                      className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-all duration-150 text-white/50 hover:text-white"
                      title="Auto-layout: ułóż diagram od lewej do prawej"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h4m0 6h4m0 6h4M8 6v12M16 12v6" />
                      </svg>
                    </button>
                  )}
                  <div className="px-2 text-xs text-white/50 font-medium border-l border-white/[0.08] ml-1.5 pl-2.5">
                    {(currentZoom * 100).toFixed(0)}%
                  </div>
                  {/* Skróty klawiaturowe - pomocnik dla użytkownika */}
                  <button
                    onClick={() => setShowShortcutsModal(true)}
                    className="p-1.5 ml-1 hover:bg-white/[0.06] rounded-lg transition-all duration-150 text-white/50 hover:text-white"
                    title="Skróty klawiaturowe (?)"
                  >
                    <span className="text-xs font-bold">?</span>
                  </button>
                </div>
              </div>
            </Panel>
            )}
            {showMinimap && (
              <div className="absolute bottom-4 right-4 z-10">
                <div className="relative">
                  <button
                    onClick={() => setShowMinimap(false)}
                    className="absolute -top-2 -right-2 z-20 w-6 h-6 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg transition-all"
                    title="Zamknij podgląd"
                  >
                    ×
                  </button>
                  <MiniMap
                    className="rounded-lg overflow-hidden"
                    nodeColor="#fee715"
                    nodeStrokeColor="#fee715"
                    nodeStrokeWidth={1.5}
                    nodeBorderRadius={4}
                    maskColor="rgba(10, 11, 14, 0.55)"
                    maskStrokeColor="rgba(255,255,255,0.06)"
                    style={{
                      backgroundColor: '#13151a',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.25)',
                      width: 180,
                      height: 130,
                    }}
                    pannable
                    zoomable
                  />
                </div>
              </div>
            )}
            {!showMinimap && (
              <button
                onClick={() => setShowMinimap(true)}
                className="absolute bottom-4 right-4 z-10 px-4 py-2 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/60 transition-all duration-200"
                title="Pokaż podgląd"
              >
                ↑ Podgląd
              </button>
            )}
            {/* Toolbar z opcjami wyrównywania - kompaktowy, tylko ikony */}
            {showAlignToolbar && (
              <Panel position="top-center" className="bg-transparent">
                <div className="flex items-center gap-1.5 bg-[#13151a] border border-white/[0.08] rounded-lg p-1.5 shadow-xl backdrop-blur-sm">
                  <button
                    onClick={() => alignNodes('center-y')}
                    className="p-1.5 bg-[#13151a]/80 border border-white/[0.08] hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/65 hover:text-white"
                    title="Wyrównaj w pionie (ta sama wysokość Y)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 12l4-4m-4 4l4 4m12-4l-4-4m4 4l-4 4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => alignNodes('center-x')}
                    className="p-1.5 bg-[#13151a]/80 border border-white/[0.08] hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/65 hover:text-white"
                    title="Wyrównaj w poziomie (ta sama pozycja X)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M12 4l-4 4m4-4l4 4m-4 12l-4-4m4 4l4-4" />
                    </svg>
                  </button>
                  <div className="w-px h-4 bg-white/[0.06] mx-0.5"></div>
                  <button
                    onClick={() => setShowAlignToolbar(false)}
                    className="p-1.5 bg-[#13151a]/80 border border-white/[0.08] hover:border-white/30 hover:bg-white/[0.06] rounded transition-all duration-200 text-white/50 hover:text-white"
                    title="Ukryj panel"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </Panel>
            )}

            {!showAlignToolbar && (
              <Panel position="top-center" className="bg-transparent">
                <button
                  onClick={() => setShowAlignToolbar(true)}
                  className="p-2 bg-[#13151a] border border-white/[0.08] text-white/50 rounded-lg hover:bg-white/[0.06] hover:text-white hover:border-white/[0.12] transition-all duration-200 shadow-lg backdrop-blur-sm"
                  title="Pokaż wyrównywanie"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </Panel>
            )}
          </ReactFlow>
          </FunnelSelectModeContext.Provider>
          {/* Linie pomocnicze (jak w Photoshopie/Canvie) — widać przy przeciąganiu, gdy element jest na tej samej wysokości/poziomie co inny */}
          {(alignmentGuides.vertical.length > 0 || alignmentGuides.horizontal.length > 0) && flowContainerSize.w > 0 && flowContainerSize.h > 0 && (
            <div style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}>
              <svg width="100%" height="100%" viewBox={`0 0 ${flowContainerSize.w} ${flowContainerSize.h}`} preserveAspectRatio="none">
                {alignmentGuides.vertical.map((x) => {
                  const sx = x * viewport.zoom + viewport.x;
                  return <line key={`v-${x}`} x1={sx} y1={0} x2={sx} y2={flowContainerSize.h} stroke="#fee715" strokeOpacity={0.9} strokeWidth={1} strokeDasharray="6 3" />;
                })}
                {alignmentGuides.horizontal.map((y) => {
                  const sy = y * viewport.zoom + viewport.y;
                  return <line key={`h-${y}`} x1={0} y1={sy} x2={flowContainerSize.w} y2={sy} stroke="#fee715" strokeOpacity={0.9} strokeWidth={1} strokeDasharray="6 3" />;
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Edge Properties Panel - tylko admin. Spójny z Node Properties (sekcje, sticky footer). */}
        {!isReadOnly && showEdgeProperties && selectedEdge && (
          <div
            className="shrink-0 border-l border-white/[0.08] bg-[#13151a] flex flex-col nodrag nopan relative"
            style={{ width: `${propertiesPanelWidth}px` }}
            onKeyDown={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
            onKeyUp={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
          >
            {/* Resize handle - lewa krawędź panelu */}
            <div
              onMouseDown={handlePanelResizeStart}
              className="absolute -left-1 top-0 bottom-0 w-2 cursor-col-resize hover:bg-[#fee715]/20 transition-colors z-20"
              title="Przeciągnij aby zmienić szerokość"
            />

            {/* Sticky header */}
            <div className="shrink-0 border-b border-white/[0.08] px-4 py-3 flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md flex items-center justify-center shrink-0 bg-[#fee715]/12 text-[#fee715]">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.16em]">Połączenie</div>
                <div className="text-[13px] font-semibold text-white truncate tracking-tight">Strzałka</div>
              </div>
              <button
                onClick={() => {
                  setShowEdgeProperties(false);
                  setSelectedEdge(null);
                }}
                className="shrink-0 p-1 hover:bg-white/[0.06] rounded-md text-white/40 hover:text-white transition-colors"
                title="Zamknij (Esc)"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto">
              <PropSection title="Szczegóły">
                <PropRow label="Notatki">
                  <textarea
                    value={edgeProperties.notes}
                    onChange={(e) => setEdgeProperties({ ...edgeProperties, notes: e.target.value })}
                    className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[60px] resize-none"
                    placeholder="Opis przejścia…"
                  />
                </PropRow>
                <PropRow label="Link">
                  <input
                    type="url"
                    value={edgeProperties.link}
                    onChange={(e) => setEdgeProperties({ ...edgeProperties, link: e.target.value })}
                    className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                    placeholder="https://…"
                  />
                </PropRow>
              </PropSection>

              <PropSection title="Kierunek">
                <button
                  onClick={() => {
                    if (selectedEdge) {
                      const newSource = selectedEdge.target;
                      const newTarget = selectedEdge.source;
                      setEdges((eds) =>
                        eds.map((edge) =>
                          edge.id === selectedEdge.id
                            ? { ...edge, source: newSource, target: newTarget }
                            : edge
                        )
                      );
                      setSelectedEdge({ ...selectedEdge, source: newSource, target: newTarget });
                    }
                  }}
                  className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/65 rounded-md text-[12px] font-medium hover:bg-white/[0.06] hover:text-white transition-colors"
                  title="Odwróć kierunek strzałki"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Odwróć kierunek
                </button>
              </PropSection>

              <CollapsibleSection
                title="Pola dodatkowe"
                count={edgeCustomFields.length}
                defaultOpen={edgeCustomFields.length > 0}
                onAdd={() => {
                  setEdgeCustomFields([...edgeCustomFields, { field_name: '', field_type: 'text', field_value: '', display_order: edgeCustomFields.length }]);
                }}
              >
                {edgeCustomFields.length === 0 ? (
                  <p className="text-[11px] text-white/40 italic">Brak pól. Kliknij + aby dodać.</p>
                ) : (
                  <div className="space-y-2">
              <div>
                <label className="block text-[10px] font-mono font-semibold text-white/45 uppercase tracking-[0.14em] mb-1.5">Notatki</label>
                <textarea
                  value={edgeProperties.notes}
                  onChange={(e) => setEdgeProperties({ ...edgeProperties, notes: e.target.value })}
                  className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-3 py-1.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[72px]"
                  placeholder="Notatki do linii..."
                />
              </div>

                    {edgeCustomFields.map((field, index) => (
                      <div key={index} className="bg-[#1a1d24] border border-white/[0.08] rounded-md p-2 space-y-1.5">
                        <div className="flex items-center gap-1.5">
                          <input
                            type="text"
                            value={field.field_name}
                            onChange={(e) => {
                              const updated = [...edgeCustomFields];
                              updated[index].field_name = e.target.value;
                              setEdgeCustomFields(updated);
                            }}
                            placeholder="Nazwa"
                            className="flex-1 bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                          />
                          <CustomSelect
                            size="sm"
                            value={field.field_type}
                            onChange={(value) => {
                              const updated = [...edgeCustomFields];
                              updated[index].field_type = value as 'text' | 'date' | 'number' | 'link';
                              updated[index].field_value = '';
                              setEdgeCustomFields(updated);
                            }}
                            options={[
                              { value: 'text', label: 'Tekst' },
                              { value: 'date', label: 'Data' },
                              { value: 'number', label: 'Liczba' },
                              { value: 'link', label: 'Link' },
                            ]}
                            className="w-20"
                          />
                          <button
                            onClick={() => {
                              setEdgeCustomFields(edgeCustomFields.filter((_, i) => i !== index));
                            }}
                            className="p-1 hover:bg-red-500/15 rounded text-white/40 hover:text-red-300 transition-colors"
                            title="Usuń pole"
                          >
                            <Trash size={12} weight="regular" />
                          </button>
                        </div>
                        {field.field_type === 'text' && (
                          <input
                            type="text"
                            value={field.field_value}
                            onChange={(e) => {
                              const updated = [...edgeCustomFields];
                              updated[index].field_value = e.target.value;
                              setEdgeCustomFields(updated);
                            }}
                            placeholder="Wartość"
                            className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                          />
                        )}
                        {field.field_type === 'date' && (
                          <DatePickerField
                            value={field.field_value}
                            onChange={(value) => {
                              const updated = [...edgeCustomFields];
                              updated[index].field_value = value;
                              setEdgeCustomFields(updated);
                            }}
                          />
                        )}
                        {field.field_type === 'number' && (
                          <input
                            type="text"
                            inputMode="numeric"
                            value={field.field_value}
                            onChange={(e) => {
                              const value = e.target.value.replace(/[^0-9.-]/g, '');
                              const updated = [...edgeCustomFields];
                              updated[index].field_value = value;
                              setEdgeCustomFields(updated);
                            }}
                            placeholder="0"
                            className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                          />
                        )}
                        {field.field_type === 'link' && (
                          <input
                            type="url"
                            value={field.field_value}
                            onChange={(e) => {
                              const updated = [...edgeCustomFields];
                              updated[index].field_value = e.target.value;
                              setEdgeCustomFields(updated);
                            }}
                            placeholder="https://…"
                            className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CollapsibleSection>
            </div>

            {/* Sticky footer z akcjami */}
            <div className="shrink-0 border-t border-white/[0.08] bg-[#13151a] px-3 py-2.5 flex items-center gap-2">
              <button
                onClick={deleteSelectedEdge}
                className="p-1.5 hover:bg-red-500/15 rounded-md text-white/50 hover:text-red-300 transition-colors"
                title="Usuń strzałkę (Del)"
              >
                <Trash size={14} weight="regular" />
              </button>
              <div className="flex-1" />
              <span className="text-[10px] font-mono text-white/30" title="Live preview - zmiany od razu na canvas, autosave po 2s">
                LIVE
              </span>
            </div>
          </div>
        )}

        {/* Node Properties Panel - tylko admin. Figma/Linear-style sekcje z hairline separators.
            Live preview działa - zmiany od razu widoczne na canvas, autosave po 2s.
            Szerokość resizable przez drag uchwyt na lewej krawędzi (240-640px). */}
        {!isReadOnly && showPropertiesPanel && selectedNode && (
          <div
            className="shrink-0 border-l border-white/[0.08] bg-[#13151a] flex flex-col nodrag nopan relative"
            style={{ width: `${propertiesPanelWidth}px`, zIndex: 10 }}
            onKeyDown={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
            onKeyUp={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
          >
            {/* Resize handle - lewa krawędź panelu */}
            <div
              onMouseDown={handlePanelResizeStart}
              className="absolute -left-1 top-0 bottom-0 w-2 cursor-col-resize hover:bg-[#fee715]/20 transition-colors z-20"
              title="Przeciągnij aby zmienić szerokość"
            />

            {/* Sticky header z preview ikony */}
            <div className="shrink-0 border-b border-white/[0.08] px-4 py-3 flex items-center gap-2.5">
              {selectedNode.type !== 'text' && (
                <div
                  className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                  style={{
                    backgroundColor: nodeProperties.color ? `${nodeProperties.color}1f` : 'rgba(254, 231, 21, 0.12)',
                    color: nodeProperties.color || '#fee715',
                  }}
                >
                  {renderPhosphorIcon(nodeProperties.icon, 14)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-mono text-white/40 uppercase tracking-[0.16em]">
                  {selectedNode.type === 'text' ? 'Tekst' : 'Element'}
                </div>
                <div className="text-[13px] font-semibold text-white truncate tracking-tight">
                  {selectedNode.type === 'text'
                    ? (textNodeProperties.text || 'Bez treści').slice(0, 28)
                    : (nodeProperties.label || 'Bez nazwy')}
                </div>
              </div>
              <button
                onClick={() => {
                  setShowPropertiesPanel(false);
                  setSelectedNode(null);
                }}
                className="shrink-0 p-1 hover:bg-white/[0.06] rounded-md text-white/40 hover:text-white transition-colors"
                title="Zamknij (Esc)"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Body - scroll, sekcje hairline */}
            <div className="flex-1 overflow-y-auto">
              {selectedNode.type === 'text' ? (
                <>
                  {/* SEKCJA: TREŚĆ */}
                  <PropSection title="Treść">
                    <textarea
                      value={textNodeProperties.text}
                      onChange={(e) => setTextNodeProperties({ ...textNodeProperties, text: e.target.value })}
                      className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[13px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[72px] resize-none"
                      placeholder="Wpisz tekst…"
                    />
                  </PropSection>

                  {/* SEKCJA: TYPOGRAFIA */}
                  <PropSection title="Typografia">
                    <PropRow label="Rozmiar">
                      <input
                        type="number"
                        min="10"
                        max="72"
                        value={textNodeProperties.fontSize}
                        onChange={(e) => setTextNodeProperties({ ...textNodeProperties, fontSize: parseInt(e.target.value) || 18 })}
                        className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2 py-1 text-[12px] text-white focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                      />
                    </PropRow>
                    <PropRow label="Waga">
                      <CustomSelect
                        size="sm"
                        value={textNodeProperties.fontWeight || 'bold'}
                        onChange={(value) => setTextNodeProperties({ ...textNodeProperties, fontWeight: value as 'normal' | 'bold' | 'semibold' })}
                        options={[
                          { value: 'normal', label: 'Normal' },
                          { value: 'semibold', label: 'Semibold' },
                          { value: 'bold', label: 'Bold' },
                        ]}
                        className="w-full"
                      />
                    </PropRow>
                  </PropSection>

                  {/* SEKCJA: WYRÓWNANIE - ikony z czytelnym tooltip i text label pod ikoną */}
                  <PropSection title="Wyrównanie">
                    <PropRow label="Poziome">
                      <div className="grid grid-cols-3 gap-1">
                        {([
                          { val: 'left', label: 'Lewo', icon: 'M4 6h16M4 12h10M4 18h16' },
                          { val: 'center', label: 'Środek', icon: 'M4 6h16M7 12h10M4 18h16' },
                          { val: 'right', label: 'Prawo', icon: 'M4 6h16M10 12h10M4 18h16' },
                        ] as const).map(({ val, label, icon }) => {
                          const active = (textNodeProperties.textAlign || 'left') === val;
                          return (
                            <button
                              key={val}
                              onClick={() => setTextNodeProperties({ ...textNodeProperties, textAlign: val })}
                              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-md transition-colors ${
                                active
                                  ? 'bg-[#fee715]/12 text-[#fee715] border border-[#fee715]/30'
                                  : 'bg-[#1a1d24] border border-white/[0.08] text-white/50 hover:text-white hover:bg-[#1a1d24]'
                              }`}
                              title={`Wyrównanie poziome: ${label}`}
                              aria-label={label}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                              </svg>
                              <span className="text-[9px] font-medium leading-none">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </PropRow>
                    <PropRow label="Pionowe">
                      <div className="grid grid-cols-3 gap-1">
                        {([
                          { val: 'top', label: 'Góra', icon: 'M5 4h14M5 8h14M5 12h14' },
                          { val: 'middle', label: 'Środek', icon: 'M5 8h14M5 12h14M5 16h14' },
                          { val: 'bottom', label: 'Dół', icon: 'M5 12h14M5 16h14M5 20h14' },
                        ] as const).map(({ val, label, icon }) => {
                          const active = (textNodeProperties.verticalAlign || 'middle') === val;
                          return (
                            <button
                              key={val}
                              onClick={() => setTextNodeProperties({ ...textNodeProperties, verticalAlign: val })}
                              className={`flex flex-col items-center justify-center gap-0.5 py-1.5 rounded-md transition-colors ${
                                active
                                  ? 'bg-[#fee715]/12 text-[#fee715] border border-[#fee715]/30'
                                  : 'bg-[#1a1d24] border border-white/[0.08] text-white/50 hover:text-white hover:bg-[#1a1d24]'
                              }`}
                              title={`Wyrównanie pionowe: ${label}`}
                              aria-label={label}
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={icon} />
                              </svg>
                              <span className="text-[9px] font-medium leading-none">{label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </PropRow>
                  </PropSection>

                  {/* SEKCJA: OPCJE */}
                  <PropSection title="Opcje">
                    <CustomCheckbox
                      id="showHandles"
                      checked={textNodeProperties.showHandles ?? false}
                      onChange={(v) => setTextNodeProperties({ ...textNodeProperties, showHandles: v })}
                      label="Pokaż punkty połączeń"
                      size="sm"
                      labelClassName="text-[12px] text-white/65"
                    />
                  </PropSection>
                </>
              ) : (
                <>
                  {/* SEKCJA: IDENTYFIKACJA */}
                  <PropSection title="Identyfikacja">
                    <PropRow label="Nazwa">
                      <input
                        ref={nodeLabelInputRef}
                        type="text"
                        value={nodeProperties.label}
                        onChange={(e) => setNodeProperties({ ...nodeProperties, label: e.target.value })}
                        className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                        placeholder="Nazwa elementu"
                      />
                    </PropRow>
                    <PropRow label="Ikona">
                      <IconPicker
                        value={nodeProperties.icon}
                        onChange={(iconName) => setNodeProperties({ ...nodeProperties, icon: iconName })}
                        className="w-full"
                      />
                    </PropRow>
                  </PropSection>

                  {/* SEKCJA: KOLOR (compact) */}
                  <PropSection title="Kolor">
                    <div className="flex items-center gap-1.5">
                      {['#1877F2', '#FF0000', '#00C9A7', '#fee715', '#10B981', '#E4405F'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => {
                            setNodeProperties({ ...nodeProperties, color: c });
                            addRecentColor(c);
                          }}
                          className={`w-6 h-6 rounded transition-all ${
                            nodeProperties.color === c
                              ? 'ring-2 ring-white/90'
                              : 'ring-1 ring-white/[0.08] hover:ring-white/30'
                          }`}
                          style={{ backgroundColor: c }}
                          title={c}
                        />
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <label className="relative w-7 h-7 rounded cursor-pointer overflow-hidden ring-1 ring-white/[0.08] hover:ring-white/30 transition-all flex items-center justify-center" title="Wybierz dowolny kolor">
                        <input
                          type="color"
                          value={nodeProperties.color || '#fee715'}
                          onChange={(e) => setNodeProperties({ ...nodeProperties, color: e.target.value })}
                          onBlur={(e) => addRecentColor(e.target.value)}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <div className="w-full h-full" style={{ backgroundColor: nodeProperties.color || '#fee715' }} />
                      </label>
                      <input
                        type="text"
                        value={nodeProperties.color || ''}
                        onChange={(e) => {
                          const v = e.target.value;
                          if (/^#[0-9a-fA-F]{0,6}$/.test(v) || v === '') {
                            setNodeProperties({ ...nodeProperties, color: v });
                          }
                        }}
                        onBlur={(e) => {
                          if (/^#[0-9a-fA-F]{6}$/.test(e.target.value)) addRecentColor(e.target.value);
                        }}
                        className="flex-1 bg-[#1a1d24] border border-white/[0.08] rounded-md px-2 py-1 text-[11px] font-mono text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 uppercase"
                        placeholder="#FEE715"
                        maxLength={7}
                      />
                    </div>
                    {recentColors.length > 0 && (
                      <div className="mt-2.5 pt-2 border-t border-white/[0.06]">
                        <div className="text-[9px] font-mono text-white/30 uppercase tracking-[0.16em] mb-1.5">Ostatnio</div>
                        <div className="flex items-center gap-1.5">
                          {recentColors.map((c) => (
                            <button
                              key={c}
                              type="button"
                              onClick={() => setNodeProperties({ ...nodeProperties, color: c })}
                              className={`w-5 h-5 rounded transition-all ${
                                nodeProperties.color === c ? 'ring-2 ring-white/90' : 'ring-1 ring-white/[0.08] hover:ring-white/30'
                              }`}
                              style={{ backgroundColor: c }}
                              title={c}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </PropSection>

                  {/* SEKCJA: SZCZEGÓŁY */}
                  <PropSection title="Szczegóły">
                    <PropRow label="Notatki">
                      <textarea
                        value={nodeProperties.notes}
                        onChange={(e) => setNodeProperties({ ...nodeProperties, notes: e.target.value })}
                        className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors min-h-[60px] resize-none"
                        placeholder="np. CPC: 2 PLN, CTR: 3%…"
                      />
                    </PropRow>
                    <PropRow label="Link">
                      <input
                        type="url"
                        value={nodeProperties.link || ''}
                        onChange={(e) => setNodeProperties({ ...nodeProperties, link: e.target.value })}
                        className="w-full bg-[#1a1d24] border border-white/[0.08] rounded-md px-2.5 py-1.5 text-[12px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                        placeholder="https://example.com"
                      />
                    </PropRow>
                  </PropSection>

                  {/* SEKCJA: POLA DODATKOWE (collapsible) */}
                  <CollapsibleSection
                    title="Pola dodatkowe"
                    count={nodeCustomFields.length}
                    defaultOpen={nodeCustomFields.length > 0}
                    onAdd={() => {
                      setNodeCustomFields([...nodeCustomFields, { field_name: '', field_type: 'text', field_value: '', display_order: nodeCustomFields.length }]);
                    }}
                  >
                    {nodeCustomFields.length === 0 ? (
                      <p className="text-[11px] text-white/40 italic">Brak pól. Kliknij + aby dodać własne (np. CPC, budżet).</p>
                    ) : (
                      <div className="space-y-2">
                        {nodeCustomFields.map((field, index) => (
                          <div key={index} className="bg-[#1a1d24] border border-white/[0.08] rounded-md p-2 space-y-1.5">
                            <div className="flex items-center gap-1.5">
                              <input
                                type="text"
                                value={field.field_name}
                                onChange={(e) => {
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_name = e.target.value;
                                  setNodeCustomFields(updated);
                                }}
                                placeholder="Nazwa pola"
                                className="flex-1 bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                              />
                              <CustomSelect
                                size="sm"
                                value={field.field_type}
                                onChange={(value) => {
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_type = value as 'text' | 'date' | 'number' | 'link';
                                  updated[index].field_value = '';
                                  setNodeCustomFields(updated);
                                }}
                                options={[
                                  { value: 'text', label: 'Tekst' },
                                  { value: 'date', label: 'Data' },
                                  { value: 'number', label: 'Liczba' },
                                  { value: 'link', label: 'Link' },
                                ]}
                                className="w-20"
                              />
                              <button
                                onClick={() => {
                                  setNodeCustomFields(nodeCustomFields.filter((_, i) => i !== index));
                                }}
                                className="p-1 hover:bg-red-500/15 rounded text-white/40 hover:text-red-300 transition-colors"
                                title="Usuń pole"
                              >
                                <Trash size={12} weight="regular" />
                              </button>
                            </div>
                            {field.field_type === 'text' && (
                              <input
                                type="text"
                                value={field.field_value}
                                onChange={(e) => {
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = e.target.value;
                                  setNodeCustomFields(updated);
                                }}
                                placeholder="Wartość"
                                className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                              />
                            )}
                            {field.field_type === 'date' && (
                              <DatePickerField
                                value={field.field_value}
                                onChange={(value) => {
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = value;
                                  setNodeCustomFields(updated);
                                }}
                              />
                            )}
                            {field.field_type === 'number' && (
                              <input
                                type="text"
                                inputMode="numeric"
                                value={field.field_value}
                                onChange={(e) => {
                                  const value = e.target.value.replace(/[^0-9.-]/g, '');
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = value;
                                  setNodeCustomFields(updated);
                                }}
                                placeholder="0"
                                className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                              />
                            )}
                            {field.field_type === 'link' && (
                              <input
                                type="url"
                                value={field.field_value}
                                onChange={(e) => {
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = e.target.value;
                                  setNodeCustomFields(updated);
                                }}
                                placeholder="https://…"
                                className="w-full bg-[#1a1d24] border border-white/[0.08] rounded px-2 py-1 text-[11px] text-white placeholder-white/30 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 transition-colors"
                              />
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </CollapsibleSection>

                  {/* SEKCJA: ZAPISZ JAKO SZABLON (collapsible) */}
                  <CollapsibleSection title="Zapisz jako szablon">
                    <div className="space-y-2">
                      <CustomSelect
                        size="sm"
                        value={nodeProperties.category || 'Działania'}
                        onChange={(value) => setNodeProperties({ ...nodeProperties, category: value })}
                        options={[
                          { value: 'Źródła Ruchu', label: 'Źródła Ruchu' },
                          { value: 'Typ Strony', label: 'Typ Strony' },
                          { value: 'Działania', label: 'Działania' },
                          { value: 'Cel/Konwersja', label: 'Cel/Konwersja' },
                          { value: 'Narzędzia', label: 'Narzędzia' },
                        ]}
                        className="w-full"
                      />
                      <button
                        onClick={async () => {
                          if (!nodeProperties.label || !nodeProperties.icon) {
                            setAlertModal({
                              isOpen: true,
                              title: 'Błąd',
                              message: 'Wypełnij nazwę i wybierz ikonę przed zapisaniem szablonu.',
                              type: 'error',
                            });
                            return;
                          }
                          const nodeColor = (selectedNode?.data?.color as string) || '#fee715';
                          await saveCustomTemplate(
                            nodeProperties.label,
                            nodeProperties.icon,
                            nodeColor,
                            nodeProperties.category || 'Działania'
                          );
                        }}
                        className="w-full px-2.5 py-1.5 bg-white/[0.06] border border-white/[0.08] text-white/65 rounded-md text-[12px] font-medium hover:bg-white/[0.06] hover:text-white transition-colors"
                      >
                        Zapisz szablon
                      </button>
                    </div>
                  </CollapsibleSection>
                </>
              )}
            </div>

            {/* Sticky footer z akcjami */}
            <div className="shrink-0 border-t border-white/[0.08] bg-[#13151a] px-3 py-2.5 flex items-center gap-2">
              <button
                onClick={deleteSelectedNode}
                className="p-1.5 hover:bg-red-500/15 rounded-md text-white/50 hover:text-red-300 transition-colors"
                title="Usuń element (Del)"
              >
                <Trash size={14} weight="regular" />
              </button>
              <div className="flex-1" />
              <span className="text-[10px] font-mono text-white/30" title="Live preview - zmiany od razu na canvas, autosave po 2s">
                LIVE
              </span>
            </div>
          </div>
        )}
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onClose={() => setAlertModal(prev => ({ ...prev, isOpen: false }))}
      />

      {/* Modal: skróty klawiaturowe */}
      {showShortcutsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          onClick={() => setShowShortcutsModal(false)}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative bg-gradient-to-br from-[#18232F] to-[#0a0f14] rounded-2xl p-6 border border-[#fee715]/30 max-w-md w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-sans text-lg font-semibold text-white tracking-tight">Skróty klawiaturowe</h3>
              <button
                onClick={() => setShowShortcutsModal(false)}
                className="p-1.5 hover:bg-white/[0.06] rounded-lg text-white/65 hover:text-white transition-colors"
                aria-label="Zamknij"
              >
                <X size={18} />
              </button>
            </div>
            <div className="space-y-2.5 text-sm">
              {[
                // Narzędzia (Miro-style single keys)
                ...(!isReadOnly ? [
                  { keys: ['A'], label: 'Dodaj element (otwórz panel)' },
                ] : []),
                { keys: ['V'], label: 'Przesuwanie (pan)' },
                ...(!isReadOnly ? [
                  { keys: ['S'], label: 'Zaznaczanie' },
                ] : []),
                { keys: ['C'], label: 'Komentowanie' },
                // Nawigacja
                { keys: ['F'], label: 'Dopasuj cały lejek do widoku' },
                { keys: ['Space', '+', 'drag'], label: 'Przesuwanie z dowolnego trybu' },
                { keys: ['Scroll'], label: 'Zoom in/out' },
                // Edycja (admin)
                ...(!isReadOnly ? [
                  { keys: ['Shift', '+', 'Click'], label: 'Dodaj/odejmij z zaznaczenia' },
                  { keys: ['⌘/Ctrl', '+', 'C'], label: 'Skopiuj zaznaczone' },
                  { keys: ['⌘/Ctrl', '+', 'V'], label: 'Wklej' },
                  { keys: ['⌘/Ctrl', '+', 'Z'], label: 'Cofnij' },
                  { keys: ['Delete'], label: 'Usuń zaznaczone' },
                  { keys: ['Dwuklik'], label: 'Edytuj właściwości elementu' },
                ] : []),
                { keys: ['ESC'], label: 'Zamknij panel/modal' },
              ].map((row, idx) => (
                <div key={idx} className="flex items-center justify-between gap-4 py-1.5 border-b border-white/[0.06] last:border-b-0">
                  <span className="text-white/65">{row.label}</span>
                  <div className="flex items-center gap-1 shrink-0">
                    {row.keys.map((k, i) => (
                      k === '+' || k === '/' ? (
                        <span key={i} className="text-white/40 text-xs">{k}</span>
                      ) : (
                        <kbd key={i} className="px-2 py-0.5 bg-white/[0.06] border border-white/15 rounded text-xs text-white/80 font-mono">{k}</kbd>
                      )
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/40 mt-4 text-center">
              Naciśnij <kbd className="px-1.5 py-0.5 bg-white/[0.06] border border-white/15 rounded text-xs text-white/80 font-mono">ESC</kbd> aby zamknąć
            </p>
          </div>
        </div>
      )}

      {/* System komentarzy */}
      {showCommentPanel && id && (
        <CommentPanel
          funnelId={id}
          isOpen={showCommentPanel}
          refreshTrigger={commentPanelRefreshTrigger}
          nodeLabels={nodeLabelMap}
          edgeLabels={edgeLabelMap}
          onClose={() => {
            setShowCommentPanel(false);
            setSelectedThreadId(null);
          }}
          onJumpToAnchor={(anchorType, anchorId, regionCoords) => {
            if (anchorType === 'node' && anchorId) {
              const node = nodes.find(n => n.id === anchorId);
              if (node && reactFlowInstance) {
                reactFlowInstance.setCenter(node.position.x, node.position.y, { zoom: 1, duration: 500 });
                // W trybie klienta nie otwieramy panelu właściwości - to byłaby edycja
                if (!isReadOnly) {
                  setSelectedNode(node);
                  setShowPropertiesPanel(true);
                }
              }
            } else if (anchorType === 'edge' && anchorId) {
              const edge = edges.find(e => e.id === anchorId);
              if (edge && reactFlowInstance) {
                const sourceNode = nodes.find(n => n.id === edge.source);
                if (sourceNode) {
                  reactFlowInstance.setCenter(sourceNode.position.x, sourceNode.position.y, { zoom: 1, duration: 500 });
                  if (!isReadOnly) {
                    setSelectedEdge(edge);
                    setShowEdgeProperties(true);
                  }
                }
              }
            } else if (anchorType === 'region' && regionCoords) {
              if (reactFlowInstance) {
                reactFlowInstance.setCenter(regionCoords.x, regionCoords.y, { zoom: 1, duration: 500 });
              }
            }
          }}
          onThreadClick={(threadId) => {
            setSelectedThreadId(threadId);
          }}
        />
      )}

      {selectedThreadId && id && (
        <CommentThread
          threadId={selectedThreadId}
          funnelId={id}
          onClose={() => {
            setSelectedThreadId(null);
            loadCommentCounts();
          }}
          onUpdate={() => {
            loadCommentCounts();
          }}
        />
      )}

      {commentFormAnchor && id && (
        <CommentForm
          funnelId={id}
          anchorType={commentFormAnchor.type}
          anchorId={commentFormAnchor.id}
          regionCoords={commentFormAnchor.coords}
          onClose={() => {
            setCommentFormAnchor(null);
          }}
          onSuccess={() => {
            setCommentFormAnchor(null);
            loadCommentCounts();
            // Wymuś odświeżenie panelu komentarzy
            setCommentPanelRefreshTrigger(prev => prev + 1);
            if (!showCommentPanel) {
              setShowCommentPanel(true);
            }
          }}
        />
      )}
    </div>
  );
};
