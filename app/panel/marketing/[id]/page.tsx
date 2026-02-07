'use client';

import React, { useState, useCallback, useEffect, useRef, createContext, useContext } from 'react';
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
} from '@xyflow/react';
// CSS React Flow jest importowany globalnie w index.tsx
import * as SimpleIcons from 'simple-icons';
import { useRouter } from 'next/navigation';
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
  link?: string; // Link do konkretnego elementu
  isPinned?: boolean;
  category?: string; // Kategoria dla wizualnych wskaźników
  customFields?: NodeCustomField[]; // Customowe pola (tekst, data, liczba, link)
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

// Custom Node Component with Handles (connection points)
const CustomNode: React.FC<{ id: string; data: CustomNodeData & { commentCount?: number; commentStatus?: 'warning' | 'pending' | 'neutral' | 'closed' }; selected?: boolean }> = ({ id, data, selected }) => {
  return (
    <div
      className={`px-5 py-4 rounded-xl border-2 transition-all duration-200 min-w-[120px] relative group ${
        selected
          ? 'border-[#fee715] shadow-lg shadow-[#fee715]/30 bg-[#18232F]'
          : 'border-[#fee715]/20 bg-[#0a0f14] hover:border-[#fee715]/50 hover:bg-[#18232F]'
      }`}
      style={{
        boxShadow: selected ? '0 0 20px rgba(254, 231, 21, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      {/* Comment Badge */}
      {data.commentCount !== undefined && data.commentCount > 0 && (
        <CommentBadge
          count={data.commentCount}
          status={(data.commentStatus === 'closed' ? 'neutral' : data.commentStatus) || 'neutral'}
          onClick={() => {}}
        />
      )}
      {/* Jedno kółko na stronę: przeciągnij z kropki do kropki na drugim panelu (tryb loose = source→source). */}
      {/* Uchwyty są przezroczyste i pojawiają się tylko na hover noda */}
      <Handle type="source" position={Position.Top} id="top" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ top: -10 }} title="Przeciągnij do kropki na drugim panelu" />
      <Handle type="source" position={Position.Bottom} id="bottom" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ bottom: -10 }} title="Przeciągnij do kropki na drugim panelu" />
      <Handle type="source" position={Position.Left} id="left" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ left: -10 }} title="Przeciągnij do kropki na drugim panelu" />
      <Handle type="source" position={Position.Right} id="right" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ right: -10 }} title="Przeciągnij do kropki na drugim panelu" />
      

      <div className="flex items-center gap-3 mb-2">
        <div
          className="w-9 h-9 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: data.color || '#fee71520', color: '#101820' }}
        >
          {renderPhosphorIcon(data.icon, 20)}
        </div>
        <div className="flex-1">
          <div className="text-sm font-medium text-white leading-tight">{data.label}</div>
        </div>
      </div>
      {data.notes && (
        <div className="text-xs text-gray-400 mt-1 line-clamp-1">{data.notes}</div>
      )}
      {data.link && (
        <div className="text-xs text-[#fee715] mt-1 line-clamp-1 flex items-center gap-1">
          <Link size={12} weight="bold" />
          <a href={data.link} target="_blank" rel="noopener noreferrer" className="hover:underline" onClick={(e) => e.stopPropagation()}>
            {data.link.length > 30 ? data.link.substring(0, 30) + '...' : data.link}
          </a>
        </div>
      )}
      {data.customFields && data.customFields.length > 0 && (
        <div className="mt-2 pt-2 border-t border-white/5 space-y-1">
          {data.customFields.map((field, index) => (
            <div key={index} className="text-xs text-gray-400 flex items-center gap-2">
              <span className="text-gray-500 font-medium">{field.field_name}:</span>
              {field.field_type === 'link' ? (
                <a 
                  href={field.field_value} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-[#fee715] hover:underline line-clamp-1" 
                  onClick={(e) => e.stopPropagation()}
                >
                  {field.field_value.length > 25 ? field.field_value.substring(0, 25) + '...' : field.field_value}
                </a>
              ) : field.field_type === 'date' ? (
                <span>{field.field_value ? new Date(field.field_value).toLocaleDateString('pl-PL') : '-'}</span>
              ) : (
                <span className="line-clamp-1">{field.field_value || '-'}</span>
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
      
      // Sprawdź kolizje z innymi etykietami
      const margin = 15; // Margines dla wykrywania kolizji
      let hasCollision = false;
      for (const otherLabel of allLabels) {
        if (otherLabel === currentLabel) continue;
        const otherRect = otherLabel.getBoundingClientRect();
        
        // Sprawdź czy prostokąty się nakładają (z marginesem 15px)
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
              status={(data.commentStatus === 'closed' ? 'neutral' : data.commentStatus) || 'neutral'}
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
            <div className="px-2 py-1 bg-[#fee715] text-[#101820] text-xs font-semibold rounded shadow-lg border-2 border-[#101820] max-w-[200px] break-words whitespace-normal leading-tight">
              {data.notes}
              {data?.link && (
                <a
                  href={data.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block mt-1 text-[#101820] underline hover:text-blue-600"
                >
                  🔗 Link
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
      className={`px-8 py-5 rounded-xl border-2 transition-all duration-200 relative group ${
        selected
          ? 'border-[#fee715] shadow-lg shadow-[#fee715]/30 bg-[#18232F]'
          : 'border-[#fee715]/20 bg-[#0a0f14] hover:border-[#fee715]/50 hover:bg-[#18232F]'
      }`}
      style={{
        boxShadow: selected ? '0 0 20px rgba(254, 231, 21, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.1)',
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
          status={(data.commentStatus === 'closed' ? 'neutral' : data.commentStatus) || 'neutral'}
          onClick={() => {}}
        />
      )}
      {/* Handles tylko jeśli włączone (domyślnie wyłączone dla paneli tekstowych) */}
      {/* Uchwyty są przezroczyste i pojawiają się tylko na hover noda */}
      {data.showHandles && (
        <>
          <Handle type="source" position={Position.Top} id="top" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ top: -10 }} title="Przeciągnij do kropki na drugim panelu" />
          <Handle type="source" position={Position.Bottom} id="bottom" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ bottom: -10 }} title="Przeciągnij do kropki na drugim panelu" />
          <Handle type="source" position={Position.Left} id="left" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ left: -10 }} title="Przeciągnij do kropki na drugim panelu" />
          <Handle type="source" position={Position.Right} id="right" className="!w-5 !h-5 !min-w-5 !min-h-5 bg-[#fee715] border-2 border-[#101820] hover:!w-6 hover:!h-6 transition-all cursor-crosshair z-10 opacity-0 group-hover:opacity-100" style={{ right: -10 }} title="Przeciągnij do kropki na drugim panelu" />
        </>
      )}
      <NodeResizer
        color="#fee715"
        isVisible={selected}
        minWidth={150}
        minHeight={60}
        handleStyle={{
          backgroundColor: '#fee715',
          border: '2px solid #101820',
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

// Node Types Configuration
const nodeTypes: NodeTypes = {
  custom: CustomNode,
  text: TextNode,
};

// Edge Types Configuration
const edgeTypes = {
  custom: CustomEdge,
};

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
      const target = event.target as HTMLElement | null;
      if (
        isDatePickerOpen &&
        target &&
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
        className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 flex items-center justify-between"
      >
        <span className={value ? 'text-white' : 'text-gray-500'}>
          {formatDateForDisplay(value)}
        </span>
        <svg className="w-4 h-4 text-white flex-shrink-0 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </button>

      {isDatePickerOpen && createPortal(
        <div
          ref={calendarRef}
          className="fixed bg-[#18232F] border border-white/15 rounded-lg shadow-xl p-4"
          style={Object.keys(calendarStyle).length ? calendarStyle : { zIndex: 99999 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <h3 className="text-white text-sm font-medium">
              {monthNames[calendarData.month]} {calendarData.year}
            </h3>
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 rounded hover:bg-white/10 transition-colors"
            >
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          {/* Dni tygodnia */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((day, idx) => (
              <div key={idx} className="text-center text-[10px] text-gray-400 py-1">
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
                      ? 'bg-[#fee715] text-[#101820] font-bold'
                      : isToday
                      ? 'bg-white/10 text-[#fee715] border border-[#fee715]/50'
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {dayObj.day}
                </button>
              );
            })}
          </div>

          {/* Przyciski */}
          <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
            <button
              type="button"
              onClick={clearDate}
              className="flex-1 px-2 py-1.5 bg-white/5 hover:bg-white/10 border border-white/20 rounded text-white text-[10px] transition-colors"
            >
              Wyczyść
            </button>
            <button
              type="button"
              onClick={selectToday}
              className="flex-1 px-2 py-1.5 bg-[#fee715] text-[#101820] rounded text-[10px] font-bold transition-colors hover:bg-[#fee715]/90"
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

export default function FunnelBuilderPage({ params }: { params: Promise<{ id: string }> }) {
  const [resolvedParams, setResolvedParams] = useState<{ id: string } | null>(null);
  const [id, setId] = useState<string | null>(null);
  
  // Resolve params (Next.js 15+)
  useEffect(() => {
    params.then((p) => {
      setResolvedParams(p);
      setId(p.id);
    });
  }, [params]);

  const { user } = useAuth();
  const router = useRouter();
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
  const [nodeProperties, setNodeProperties] = useState<Omit<CustomNodeData, 'color'>>({
    label: '',
    icon: 'FileText',
    notes: '',
    link: '',
    isPinned: false,
  });
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [showBottomToolbar, setShowBottomToolbar] = useState(true);
  const [showLegend, setShowLegend] = useState(false);
  const [interactionMode, setInteractionMode] = useState<'pan' | 'select' | 'comment'>('pan');
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; title: string; message: string; type: 'success' | 'error' | 'info' | 'warning' }>({
    isOpen: false,
    title: '',
    message: '',
    type: 'info',
  });
  // System komentarzy
  const [commentMode, setCommentMode] = useState(false);
  const [showCommentPanel, setShowCommentPanel] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [commentFormAnchor, setCommentFormAnchor] = useState<{ type: 'node' | 'edge' | 'region'; id?: string; coords?: { x: number; y: number; width: number; height: number } } | null>(null);
  const [nodeCommentCounts, setNodeCommentCounts] = useState<Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>>(new Map());
  const [edgeCommentCounts, setEdgeCommentCounts] = useState<Map<string, { count: number; status: 'warning' | 'pending' | 'neutral' | 'closed' }>>(new Map());
  const [commentPanelRefreshTrigger, setCommentPanelRefreshTrigger] = useState(0);

  // React Flow state
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
  const isManualSelectionRef = useRef(false); // Flaga, że ręcznie zarządzamy selekcją
  const pendingSelectionRef = useRef<{ nodeId: string; shouldSelect: boolean } | null>(null); // Intencja selekcji z onNodeClick
  const previousSelectedNodeIdsRef = useRef<Set<string>>(new Set()); // Poprzednio zaznaczone nody (przed kliknięciem)
  const isRestoringSelectionRef = useRef(false); // Flaga, że przywracamy selekcję (aby uniknąć pętli)
  const isConnectingRef = useRef(false); // Flaga: użytkownik rysuje strzałkę — nie zamykaj panelu właściwości

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
      
      // Debug: sprawdź czy dane są poprawnie załadowane
      const allAnchorsInfo = (data || []).map((t: any) => {
        const anchors = t.comment_anchors;
        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
        return {
          threadId: t.id,
          anchorType: anchor?.anchor_type,
          anchorId: anchor?.anchor_id,
          anchorIdType: typeof anchor?.anchor_id,
          anchorIdValue: anchor?.anchor_id,
          status: t.status,
          isOpen: t.status !== 'Zatwierdzone' && t.status !== 'Odrzucone',
          fullAnchor: anchor
        };
      });
      
      console.log('=== DEBUG: Załadowane liczniki komentarzy ===');
      console.log('Total threads:', data?.length || 0);
      console.log('Node counts:', Array.from(nodeCounts.entries()));
      console.log('Edge counts:', Array.from(edgeCounts.entries()));
      console.log('All anchors info (szczegóły):', JSON.stringify(allAnchorsInfo, null, 2));
      console.log('Nodes with comments:', Array.from(nodeCounts.keys()));
      console.log('Edges with comments:', Array.from(edgeCounts.keys()));
      
      // Sprawdź, które wątki są pomijane i dlaczego
      (data || []).forEach((thread: any) => {
        const anchors = thread.comment_anchors;
        const anchor = Array.isArray(anchors) ? anchors[0] : anchors;
        if (!anchor || !anchor.anchor_type) {
          console.warn('⚠️ Thread bez anchor:', thread.id);
        } else if (anchor.anchor_type === 'region') {
          console.log('ℹ️ Thread dla regionu (pomijany):', thread.id);
        } else if (anchor.anchor_type === 'node' && !anchor.anchor_id) {
          console.warn('⚠️ Thread dla node bez anchor_id:', thread.id, anchor);
        } else if (anchor.anchor_type === 'edge' && !anchor.anchor_id) {
          console.warn('⚠️ Thread dla edge bez anchor_id:', thread.id, anchor);
        } else if (thread.status === 'Zatwierdzone' || thread.status === 'Odrzucone') {
          console.log('ℹ️ Thread zamknięty (pomijany):', thread.id, thread.status);
        }
      });
    } catch (error: any) {
      console.error('Błąd ładowania liczby wątków:', error);
    }
  }, [id]);

  // Load funnel data i szablony/komentarze — tylko przy zmianie id lub user.
  // Dzięki temu wpisywanie w panelu po prawej nie wywołuje ponownego loadFunnel i nie nadpisuje diagramu.
  useEffect(() => {
    if (!id || !user) return;
    loadFunnel();
    loadCustomTemplates();
    loadCommentCounts();
    // Celowo tylko [id, user] — żadne inne zmiany (np. wpisywanie w formularzu) nie mogą wywołać loadFunnel
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, user]);

  // Ustawienie viewportu po załadowaniu danych (tylko raz)
  useEffect(() => {
    if (!reactFlowInstance || !funnel || nodes.length === 0 || hasSetInitialViewportRef.current) return;
    
    // Sprawdź, czy jest przypięty node
    const pinnedNode = nodes.find((n) => {
      if (n.type === 'text') {
        return ((n.data as unknown) as TextNodeData).isPinned === true;
      } else {
        return ((n.data as unknown) as CustomNodeData).isPinned === true;
      }
    });
    
    hasSetInitialViewportRef.current = true;
    
    if (pinnedNode) {
      // Wyśrodkuj przypięty node
      hasCenteredOnPinnedRef.current = true;
      
      // Użyj requestAnimationFrame dla szybszego renderowania (zamiast setTimeout)
      const setViewport = () => {
        if (!reactFlowInstance || !reactFlowWrapper.current) {
          requestAnimationFrame(setViewport);
          return;
        }
        
        // Sprawdź, czy node rzeczywiście istnieje w aktualnych nodes
        const currentPinnedNode = nodes.find((n) => n.id === pinnedNode.id);
        if (!currentPinnedNode) {
          console.warn('Przypięty node nie został znaleziony:', pinnedNode.id);
          // Fallback: ustaw domyślny viewport
          reactFlowInstance.setViewport({ x: 0, y: 0, zoom: 0.48 }, { duration: 0 });
          return;
        }
        
        // Oblicz wymiary noda
        const width = currentPinnedNode.width || currentPinnedNode.measured?.width || (currentPinnedNode.type === 'text' ? 250 : 150);
        const height = currentPinnedNode.height || currentPinnedNode.measured?.height || (currentPinnedNode.type === 'text' ? 100 : 80);
        
        // Oblicz środek noda w przestrzeni flow
        const cx = currentPinnedNode.position.x + width / 2;
        const cy = currentPinnedNode.position.y + height / 2;
        
        // Oblicz wymiary kontenera
        const containerWidth = reactFlowWrapper.current.offsetWidth;
        const containerHeight = reactFlowWrapper.current.offsetHeight;
        const zoom = 0.48;
        
        // Oblicz pozycję viewport tak, aby środek noda był na środku ekranu
        const x = containerWidth / 2 - cx * zoom;
        const y = containerHeight / 2 - cy * zoom;
        
        // Ustaw viewport z wyśrodkowanym nodem i zoomem 0.48
        reactFlowInstance.setViewport({ x, y, zoom }, { duration: 200 });
      };
      
      // Użyj requestAnimationFrame dla natychmiastowego renderowania
      requestAnimationFrame(() => {
        requestAnimationFrame(setViewport);
      });
    } else {
      // Nie ma przypiętego noda - użyj fitView jako domyślny widok
      const setViewport = () => {
        if (!reactFlowInstance) {
          requestAnimationFrame(setViewport);
          return;
        }
        
        // Użyj fitView jako domyślny widok
        reactFlowInstance.fitView({ padding: 0.2, duration: 200 });
      };
      
      // Użyj requestAnimationFrame dla natychmiastowego renderowania
      requestAnimationFrame(() => {
        requestAnimationFrame(setViewport);
      });
    }
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

  // Usuń „osierocone” krawędzie i bardzo krótkie „fragmenty” (source lub target nie istnieje, lub są za blisko siebie)
  useEffect(() => {
    const nodeIds = new Set(nodes.map((n) => n.id));
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    
    const validEdges = edges.filter((e) => {
      // Sprawdź czy edge ma prawidłowy ID
      if (!e.id || typeof e.id !== 'string' || e.id.trim() === '') {
        return false;
      }
      
      // Podstawowe sprawdzenie: source i target muszą istnieć i być różne
      if (!e.source || !e.target || !nodeIds.has(e.source) || !nodeIds.has(e.target) || e.source === e.target) {
        return false;
      }
      
      // Sprawdź czy krawędź nie jest za krótka („fragment”) — jeśli nody są bardzo blisko siebie (< 30px), usuń
      const sourceNode = nodeMap.get(e.source);
      const targetNode = nodeMap.get(e.target);
      if (sourceNode && targetNode) {
        const dx = Math.abs((sourceNode.position?.x || 0) - (targetNode.position?.x || 0));
        const dy = Math.abs((sourceNode.position?.y || 0) - (targetNode.position?.y || 0));
        const distance = Math.sqrt(dx * dx + dy * dy);
        // Jeśli odległość < 30px, to prawdopodobnie „fragment” — usuń
        if (distance < 30) {
          return false;
        }
        
        // Sprawdź czy handle'y istnieją (jeśli są podane) — jeśli edge ma sourceHandle/targetHandle, ale nie istnieją na nodzie, usuń
        const validHandles = ['top', 'bottom', 'left', 'right'];
        if (e.sourceHandle && !validHandles.includes(e.sourceHandle)) {
          return false;
        }
        if (e.targetHandle && !validHandles.includes(e.targetHandle)) {
          return false;
        }
      }
      
      return true;
    });
    
    if (validEdges.length < edges.length) {
      const removed = edges.filter((e) => !validEdges.some((ve) => ve.id === e.id));
      if (removed.length > 0) {
        console.log('Usunięto osierocone/krótkie krawędzie:', removed.map((e) => ({ id: e.id, source: e.source, target: e.target })));
      }
      setEdges(validEdges);
      if (selectedEdge && !validEdges.some((e) => e.id === selectedEdge.id)) {
        setSelectedEdge(null);
        setShowEdgeProperties(false);
      }
    }
  }, [nodes, edges, selectedEdge]);

  // Auto-save z dłuższym debounce — tylko gdy diagram się zmienił i panel właściwości jest zamknięty.
  // Nie zapisuj podczas wpisywania w panelu po prawej, żeby nie nadpisywać i nie powodować „odświeżenia”.
  useEffect(() => {
    if (!funnel || showPropertiesPanel || showEdgeProperties) return;
    if (!hasUnsavedChanges) return;
    const timeoutId = setTimeout(() => {
      saveFunnel();
    }, 4000); // 4 sekundy — użytkownik ma czas dokończyć edycję bez irytującego zapisie

    return () => clearTimeout(timeoutId);
  }, [nodes, edges, funnel, showPropertiesPanel, showEdgeProperties, hasUnsavedChanges]);

  // Funkcja zaznaczania wszystkich elementów (Ctrl+A / Cmd+A)
  const handleSelectAll = useCallback(() => {
    pushUndoHistory();
    setNodes((nds) => nds.map((n) => ({ ...n, selected: true })));
    setEdges((eds) => eds.map((e) => ({ ...e, selected: true })));
  }, [setNodes, setEdges, pushUndoHistory]);

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
      if ((e.metaKey || e.ctrlKey) && e.key === 'z' && !e.shiftKey) {
        e.preventDefault();
        handleUndo();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'c') {
        e.preventDefault();
        handleCopy();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'v') {
        e.preventDefault();
        handlePaste();
        return;
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'a') {
        e.preventDefault();
        handleSelectAll();
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
  }, [handleUndo, handleCopy, handlePaste, handleSelectAll]);

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

      if (error) throw error;

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

      if (deleteError) throw deleteError;

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
    if (!edgeId?.trim() || !funnelId?.trim()) return;
    try {
      const { data, error } = await supabase
        .from('edge_custom_fields')
        .select('*')
        .eq('funnel_id', funnelId)
        .eq('edge_id', edgeId)
        .order('display_order', { ascending: true });

      if (error) throw error;

      const fields: EdgeCustomField[] = (data || []).map(f => ({
        id: f.id,
        field_name: f.field_name,
        field_type: f.field_type as 'text' | 'date' | 'number' | 'link',
        field_value: f.field_value || '',
        display_order: f.display_order || 0,
      }));

      setEdgeCustomFields(fields);
    } catch (error: any) {
      const msg = (error?.message ?? (typeof error === 'object' ? JSON.stringify(error) : String(error))) || 'Nieznany błąd';
      console.error('Błąd ładowania customowych pól dla edge:', msg);
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

      if (deleteError) throw deleteError;

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
                      ...((node.data as unknown) as CustomNodeData),
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
      pushUndoHistory();
      const newEdge: Edge = {
        ...params,
        id: `edge-${params.source}-${params.target}-${Date.now()}`,
        type: 'custom' as const,
        animated: false,
        style: { stroke: '#fee715', strokeWidth: 2 },
        markerStart: undefined,
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#fee715',
          orient: 'auto',
        },
        data: {
          notes: '',
          link: '',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges, pushUndoHistory]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance || !reactFlowWrapper.current) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const templateData = event.dataTransfer.getData('application/reactflow');

      if (!templateData) return;

      const template = JSON.parse(templateData);
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
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
    [reactFlowInstance, setNodes, pushUndoHistory]
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
        text: ((node.data as unknown) as TextNodeData).text || '',
        fontSize: ((node.data as unknown) as TextNodeData).fontSize || 18,
        fontWeight: ((node.data as unknown) as TextNodeData).fontWeight || 'bold',
        textAlign: ((node.data as unknown) as TextNodeData).textAlign || 'left',
        verticalAlign: ((node.data as unknown) as TextNodeData).verticalAlign || 'middle',
        showHandles: ((node.data as unknown) as TextNodeData).showHandles ?? false,
        isPinned: ((node.data as unknown) as TextNodeData).isPinned ?? false,
      };
      setTextNodeProperties(props);
      lastSavedTextNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
      setHasUnsavedTextNodeChanges(false);
    } else {
      const props = {
        label: ((node.data as unknown) as CustomNodeData).label || '',
        icon: ((node.data as unknown) as CustomNodeData).icon || 'FileText',
        notes: ((node.data as unknown) as CustomNodeData).notes || '',
        link: ((node.data as unknown) as CustomNodeData).link || '',
        isPinned: ((node.data as unknown) as CustomNodeData).isPinned ?? false,
        category: ((node.data as unknown) as CustomNodeData).category, // Zachowaj kategorię
      };
      setNodeProperties(props);
      lastSavedNodePropertiesRef.current = JSON.parse(JSON.stringify(props));
      setHasUnsavedNodeChanges(false);
      
      // Załaduj customowe pola dla tego noda (z danych noda lub z bazy)
      const customFieldsFromNode = ((node.data as unknown) as CustomNodeData).customFields;
      if (customFieldsFromNode && customFieldsFromNode.length > 0) {
        setNodeCustomFields(customFieldsFromNode);
      } else if (id) {
        loadNodeCustomFields(node.id, id);
      } else {
        setNodeCustomFields([]);
      }
    }
    setShowEdgeProperties(false);
  }, [interactionMode, selectedNode, setNodes, id, loadNodeCustomFields]);

  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    
    // W trybie komentarzy: otwórz formularz dodawania komentarza
    if (commentMode) {
      setCommentFormAnchor({ type: 'edge', id: edge.id });
      return;
    }
    
    setSelectedEdge(edge);
    setSelectedNode(null);
    const props: { notes: string; link: string } = {
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
  }, [commentMode, id, loadEdgeCustomFields]);

  // Obsługa kliknięcia w pustą przestrzeń (pane) - dla komentarzy i deselekcji
  const onPaneClick = useCallback((event: React.MouseEvent) => {
    // Nie zamykaj panelu podczas rysowania strzałki (klik w uchwyt może bąbelkować do pane)
    if (isConnectingRef.current) return;
    // Klik w uchwyt połączenia (handle) — nie traktuj jak pane, żeby panel właściwości się nie chował
    if (event.target instanceof HTMLElement && event.target.closest('.react-flow__handle')) return;

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
    (changes: NodeChange[] | EdgeChange[]) => {
      if (changes.some((c) => c.type === 'remove')) pushUndoHistory();
      onEdgesChange(changes as EdgeChange[]);
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
  
  const groupedTemplates = allTemplates.reduce((acc, template) => {
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

  if (loading || !resolvedParams) {
    return <LoadingState variant="fullscreen" label="Ładowanie lejka…" />;
  }

  if (!funnel) {
    return (
      <div className="h-screen bg-[#101820] flex items-center justify-center">
        <div className="text-center text-white">
          <p className="text-lg mb-4">Lejek nie został znaleziony</p>
          <button
            onClick={() => router.push('/panel/marketing')}
            className="px-5 py-2.5 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/70 transition-all duration-200"
          >
            Wróć do listy
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-[#101820] flex flex-col relative">
      {/* Mini-przycisk do przywrócenia ukrytego headera */}
      {!showHeader && (
        <button
          onClick={() => setShowHeader(true)}
          className="fixed top-2 left-2 z-50 p-2 bg-[#18232F]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm"
          title="Pokaż nagłówek"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      {/* Header */}
      <div className={`flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#18232F] transition-all duration-300 ${showHeader ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden border-0'}`}>
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/panel/marketing')}
            className="p-2 hover:bg-white/10 rounded-lg transition-all"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <div className="flex-1">
            {!isEditingTitle ? (
              <h1 
                className="font-[Montserrat] text-xl font-bold text-white cursor-pointer hover:text-[#fee715] transition-colors"
                onClick={() => {
                  setIsEditingTitle(true);
                  setEditedTitle(funnel.project_name || '');
                }}
                title="Kliknij, aby edytować tytuł"
              >
                Mapa marketingu - {funnel.project_name || 'Bez nazwy'}
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
                className="font-[Montserrat] text-xl font-bold text-white bg-white/10 border border-[#fee715]/50 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-full max-w-md"
                autoFocus
              />
            )}
            {!isEditingSubtitle ? (
              <div
                className="inline-flex items-center px-3 py-1 rounded-md bg-white/[0.04] border border-white/10 text-xs font-medium text-gray-300 cursor-pointer hover:bg-white/[0.06] hover:border-white/20 hover:text-white transition-all mt-0.5"
                onClick={() => {
                  setIsEditingSubtitle(true);
                  setEditedSubtitle(funnel.subtitle || '');
                  // Ustaw tryb na podstawie aktualnego podtytułu
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
                    className="text-sm bg-white/10 border border-[#fee715]/50 rounded px-2 py-1 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 w-48"
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
                  className="px-2 py-1 text-xs bg-white/10 border border-white/20 text-white/70 rounded hover:bg-white/20 transition-colors"
                  title="Anuluj"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowHeader(false)}
            className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
            title="Ukryj nagłówek"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {saving && user?.email === 'stanislaw@drozniak.com' && (
            <span className="text-sm text-gray-400 flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Zapisuję...
            </span>
          )}
          <button
            onClick={handleUndo}
            disabled={undoHistory.length === 0}
            title="Cofnij ostatnią zmianę (Ctrl+Z)"
            className="px-4 py-2 bg-white/[0.06] border border-white/20 text-white/90 rounded-lg font-medium hover:bg-white/10 hover:border-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-white/[0.06] disabled:hover:border-white/20"
          >
            Wstecz
          </button>
          <button
            onClick={() => {
              setShowCommentPanel(!showCommentPanel);
              if (!showCommentPanel) {
                loadCommentCounts();
              }
            }}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showCommentPanel
                ? 'bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715]'
                : 'bg-white/[0.06] border border-white/20 text-white/90 hover:bg-white/10'
            }`}
            title="Komentarze"
          >
            <ChatCircleDots size={18} className="inline-block mr-1.5" />
            Komentarze
          </button>
          <button
            onClick={saveFunnel}
            className="relative px-5 py-2 bg-[#fee715]/10 border border-[#fee715]/50 text-[#fee715] rounded-lg font-medium hover:bg-[#fee715]/20 hover:border-[#fee715]/70 transition-all duration-200"
          >
            <span className="flex items-center gap-2">
              Zapisz zmiany
              {hasUnsavedChanges && (
                <span className="w-2 h-2 bg-[#fee715] rounded-full animate-pulse" title="Masz niezapisane zmiany"></span>
              )}
            </span>
          </button>
        </div>
      </div>

      {/* Mini-przycisk do przywrócenia ukrytego sidebara */}
      {!showSidebar && (
        <button
          onClick={() => setShowSidebar(true)}
          className={`fixed z-50 p-2 bg-[#0a0f14]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm ${!showHeader ? 'top-14 left-2' : 'top-2 left-2'}`}
          title="Pokaż panel elementów"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <div className="flex-1 flex overflow-hidden relative">
        {/* Sidebar - Node Templates (z-20 żeby linia połączenia nie zasłaniała podczas rysowania strzałki) */}
        <div 
          className={`relative z-20 transition-all duration-300 overflow-hidden funnel-builder-sidebar ${
            showSidebar ? 'w-64 opacity-100' : 'w-0 opacity-0'
          }`}
          style={{ 
            backgroundColor: '#0a0f14',
            background: '#0a0f14',
          }}
        >
          <div className="w-64 h-full border-r-2 border-[#fee715]/30 overflow-y-auto p-4 shadow-2xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-[Montserrat] font-medium text-[#fee715] text-base tracking-tight border-b border-[#fee715]/20 pb-2.5 flex-1">Elementy</h3>
              <button
                onClick={() => setShowSidebar(false)}
                className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white ml-2"
                title="Ukryj panel elementów"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          <div className="space-y-6">
            {Object.entries(groupedTemplates).map(([category, templates]) => (
              <div key={category}>
                <h4 className="text-xs font-medium text-[#fee715] uppercase mb-3 tracking-wider px-2">{category}</h4>
                <div className="space-y-2">
                  {templates.map((template, idx) => (
                    <div
                      key={idx}
                      draggable
                      onDragStart={(event) => {
                        event.dataTransfer.setData('application/reactflow', JSON.stringify(template));
                      }}
                      className="p-3 bg-[#18232F]/90 rounded-lg border border-white/10 hover:border-[#fee715]/40 cursor-move transition-all duration-200 shadow-sm hover:shadow-lg hover:shadow-[#fee715]/10 backdrop-blur-sm relative overflow-hidden group"
                      style={{
                        background: 'linear-gradient(to bottom, rgba(24, 35, 47, 0.9), rgba(24, 35, 47, 0.9))',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(254, 231, 21, 0.08) 0%, rgba(24, 35, 47, 0.95) 50%, rgba(254, 231, 21, 0.05) 100%)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(to bottom, rgba(24, 35, 47, 0.9), rgba(24, 35, 47, 0.9))';
                      }}
                    >
                      <div className="flex items-center gap-2 relative z-10">
                        <div className="text-white">
                          {renderPhosphorIcon(template.icon, 18)}
                        </div>
                        <span className="text-sm text-white/95 font-medium tracking-tight">{template.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>

        {/* Main Canvas (z-0 żeby panele z-20 były zawsze nad linią połączenia) */}
        <div className="flex-1 relative z-0" ref={reactFlowWrapper}>
          {/* Legenda */}
          {showLegend && (
            <div className="absolute top-4 right-4 z-20 bg-[#0a0f14]/98 border border-white/10 rounded-lg shadow-xl backdrop-blur-sm p-4 min-w-[200px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-xs font-medium text-white/90 tracking-tight">Legenda</h3>
                <button
                  onClick={() => setShowLegend(false)}
                  className="p-1 hover:bg-white/10 rounded transition-all text-gray-400 hover:text-white"
                  title="Ukryj legendę"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#4285F420' }}>
                      {renderPhosphorIcon('MegaphoneSimple', 14)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]" style={{ backgroundColor: '#4285F4' }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 font-medium">Źródła Ruchu</div>
                    <div className="text-white/50 text-[10px] mt-0.5">Facebook Ads, Google Ads, Email</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#00C9A720' }}>
                      {renderPhosphorIcon('Globe', 14)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]" style={{ backgroundColor: '#00C9A7' }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 font-medium">Typ Strony</div>
                    <div className="text-white/50 text-[10px] mt-0.5">Landing, Sprzedażowa, Checkout</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#fee71520' }}>
                      {renderPhosphorIcon('Notebook', 14)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]" style={{ backgroundColor: '#fee715' }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 font-medium">Działania</div>
                    <div className="text-white/50 text-[10px] mt-0.5">Lead magnet, Webinar, Chatbot</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white" style={{ backgroundColor: '#10B98120' }}>
                      {renderPhosphorIcon('CheckCircle', 14)}
                    </div>
                    <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full border-2 border-[#0a0f14]" style={{ backgroundColor: '#10B981' }}></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 font-medium">Cel/Konwersja</div>
                    <div className="text-white/50 text-[10px] mt-0.5">Lead, Rezerwacja, Telefon, Sprzedaż</div>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="relative shrink-0 mt-0.5">
                    <div className="w-6 h-6 rounded-lg flex items-center justify-center text-white bg-white/5 border border-white/10">
                      {renderPhosphorIcon('FileText', 14)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white/90 font-medium">Narzędzia</div>
                    <div className="text-white/50 text-[10px] mt-0.5">Pola tekstowe, notatki</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {!showLegend && (
            <button
              onClick={() => setShowLegend(true)}
              className="absolute top-4 right-4 z-20 p-2 bg-[#0a0f14]/95 border border-white/10 text-white/70 rounded-lg hover:bg-white/10 hover:text-white transition-all duration-200 shadow-lg backdrop-blur-sm"
              title="Pokaż legendę"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
          )}
          <FunnelSelectModeContext.Provider value={{ isSelectMode: interactionMode === 'select', onLongPressDeselect }}>
          <ReactFlow
            nodes={nodes.map(node => {
              const commentInfo = nodeCommentCounts.get(node.id);
              if (commentInfo && commentInfo.count > 0) {
                const updatedNode = {
                  ...node,
                  data: {
                    ...node.data,
                    commentCount: commentInfo.count,
                    commentStatus: commentInfo.status,
                  },
                };
                // Debug: sprawdź czy dane są poprawnie przypisane
                if (node.id === nodes[0]?.id) {
                  console.log('Przykładowy node z komentarzami:', {
                    nodeId: updatedNode.id,
                    commentCount: updatedNode.data.commentCount,
                    commentStatus: updatedNode.data.commentStatus,
                    hasBadge: updatedNode.data.commentCount !== undefined && updatedNode.data.commentCount > 0
                  });
                }
                return updatedNode;
              }
              // Upewnij się, że commentCount jest undefined jeśli nie ma komentarzy
              return {
                ...node,
                data: {
                  ...node.data,
                  commentCount: undefined,
                  commentStatus: undefined,
                },
              };
            })}
            edges={edges.map(edge => {
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
              // Upewnij się, że commentCount jest undefined jeśli nie ma komentarzy
              return {
                ...edge,
                data: {
                  ...edge.data,
                  commentCount: undefined,
                  commentStatus: undefined,
                },
              };
            })}
            onNodesChange={wrappedOnNodesChange}
            onEdgesChange={wrappedOnEdgesChange}
            onConnect={onConnect}
            onConnectStart={() => { isConnectingRef.current = true; }}
            onConnectEnd={() => { isConnectingRef.current = false; }}
            onNodeDragStart={(_, node) => {
              isDraggingNodeRef.current = true;
              pushUndoHistory();
            }}
            isValidConnection={() => true}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={onNodeClick}
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
            onNodeDrag={(_, node, allNodes) => {
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
            }}
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
            fitView={false}
            fitViewOptions={{ padding: 0.2, duration: 0 }}
            className={`bg-[#101820] ${interactionMode === 'select' ? 'funnel-select-mode' : ''}`}
            connectionLineType={"smoothstep" as any}
            snapToGrid={true}
            snapGrid={[20, 20]}
            connectionLineStyle={{ stroke: '#fee715', strokeWidth: 2, strokeDasharray: '5,5' }}
            connectionLineContainerStyle={{ pointerEvents: 'none' }}
            defaultEdgeOptions={{
              type: 'custom',
              animated: false,
              style: { stroke: '#fee715', strokeWidth: 2 },
              markerStart: undefined,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: '#fee715',
                orient: 'auto',
              },
            }}
            nodesDraggable={true}
            nodesConnectable={true}
            nodesFocusable={true}
            elementsSelectable={interactionMode !== 'select'} // W trybie select wyłączamy domyślne zaznaczanie - zarządzamy ręcznie
            selectNodesOnDrag={false}
            panOnDrag={interactionMode === 'pan' ? true : (isSpacePressed ? [1, 2] : false)}
            panOnScroll={true}
            zoomOnScroll={true}
            zoomOnPinch={true}
            zoomOnDoubleClick={false}
            preventScrolling={false}
            selectionOnDrag={interactionMode === 'select'}
            selectionMode={"full" as any}
            multiSelectionKeyCode={null} // W trybie select box selection działa bez Ctrl
            deleteKeyCode={['Delete', 'Backspace']}
            connectionMode={"loose" as any}
            connectionRadius={80}
            minZoom={0.01}
            maxZoom={10}
            onlyRenderVisibleElements={false}
            proOptions={{ hideAttribution: true }}
          >
            <Background 
              variant={BackgroundVariant.Dots} 
              gap={20} 
              size={1.5} 
              color="#ffffff25"
              style={{ opacity: 0.6 }}
              offset={1}
            />
            {/* Mini-przycisk do przywrócenia ukrytego dolnego toolbara */}
            {!showBottomToolbar && (
              <Panel position="bottom-left">
                <button
                  onClick={() => setShowBottomToolbar(true)}
                  className="p-2 bg-[#0a0f14]/95 border border-[#fee715]/30 text-[#fee715] rounded-lg hover:bg-[#fee715]/10 hover:border-[#fee715]/50 transition-all duration-200 shadow-lg backdrop-blur-sm"
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
              <Panel position="bottom-left" className="bg-[#0a0f14]/95 border border-amber-500/20 rounded-lg p-2 shadow-xl backdrop-blur-sm">
                <div className="flex items-center gap-2">
                  {/* Przycisk ukrycia toolbara */}
                  <button
                    onClick={() => setShowBottomToolbar(false)}
                    className="p-1.5 hover:bg-white/10 rounded-lg transition-all text-gray-400 hover:text-white"
                    title="Ukryj narzędzia"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  {/* Tryby interakcji */}
                  <div className="flex items-center gap-1 border-r border-[#fee715]/20 pr-2 mr-2">
                    <span className="text-xs text-amber-400/90 font-medium mr-1">Tryb:</span>
                  <button
                    onClick={() => setInteractionMode('pan')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      interactionMode === 'pan'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20'
                        : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'
                    }`}
                    title="Przesuwanie (Space + drag lub środkowy przycisk myszy)"
                  >
                    <Hand size={16} />
                  </button>
                  <button
                    onClick={() => setInteractionMode('select')}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      interactionMode === 'select'
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20'
                        : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'
                    }`}
                    title="Zaznaczanie elementów: Klikaj elementy lub przeciągnij po pustym tle (box selection)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </button>
                  <button
                    onClick={() => {
                      setCommentMode(!commentMode);
                      setInteractionMode(commentMode ? 'pan' : 'comment');
                    }}
                    className={`p-2 rounded-lg transition-all duration-200 ${
                      commentMode
                        ? 'bg-gradient-to-r from-amber-600 to-amber-500 text-white shadow-md shadow-amber-900/20'
                        : 'bg-[#18232F]/80 text-white/80 hover:bg-amber-500/10 hover:text-white border border-white/10 hover:border-amber-500/50 backdrop-blur-sm'
                    }`}
                    title="Dodaj komentarz (kliknij na element)"
                  >
                    <ChatCircleDots size={16} />
                  </button>
                </div>
                
                {/* Kontrolki zoom */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => reactFlowInstance?.zoomOut({ duration: 300 })}
                    className="p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm"
                    title="Oddal (Zoom Out)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => reactFlowInstance?.zoomIn({ duration: 300 })}
                    className="p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm"
                    title="Przybliż (Zoom In)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => reactFlowInstance?.fitView({ duration: 300, padding: 0.2 })}
                    className="p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm"
                    title="Dopasuj do widoku (Fit View)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>
                  <button
                    onClick={handleSelectAll}
                    className="p-2 bg-[#18232F]/80 border border-white/10 hover:border-amber-500/50 hover:bg-amber-500/10 rounded-lg transition-all duration-200 text-white/80 hover:text-white backdrop-blur-sm"
                    title="Zaznacz wszystko (Ctrl+A / Cmd+A)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </button>
                  <div className="px-2 text-xs text-amber-400/90 font-medium border-l border-amber-500/20 ml-2 pl-2">
                    {(currentZoom * 100).toFixed(0)}%
                  </div>
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
                    className="bg-[#18232F] border-2 border-[#fee715] rounded-lg shadow-2xl"
                    nodeColor="#fee715"
                    nodeStrokeColor="#101820"
                    nodeStrokeWidth={2}
                    maskColor="rgba(16, 24, 32, 0.9)"
                    style={{
                      backgroundColor: '#18232F',
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
                <div className="flex items-center gap-1.5 bg-[#0a0f14]/95 border border-white/10 rounded-lg p-1.5 shadow-xl backdrop-blur-sm">
                  <button
                    onClick={() => alignNodes('center-y')}
                    className="p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/80 hover:text-white"
                    title="Wyrównaj w pionie (ta sama wysokość Y)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16M4 12l4-4m-4 4l4 4m12-4l-4-4m4 4l-4 4" />
                    </svg>
                  </button>
                  <button
                    onClick={() => alignNodes('center-x')}
                    className="p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-[#fee715]/50 hover:bg-[#fee715]/10 rounded transition-all duration-200 text-white/80 hover:text-white"
                    title="Wyrównaj w poziomie (ta sama pozycja X)"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16M12 4l-4 4m4-4l4 4m-4 12l-4-4m4 4l4-4" />
                    </svg>
                  </button>
                  <div className="w-px h-4 bg-white/10 mx-0.5"></div>
                  <button
                    onClick={() => setShowAlignToolbar(false)}
                    className="p-1.5 bg-[#18232F]/80 border border-white/10 hover:border-white/30 hover:bg-white/10 rounded transition-all duration-200 text-white/60 hover:text-white"
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
                  className="p-2 bg-[#0a0f14]/95 border border-white/10 text-white/60 rounded-lg hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-200 shadow-lg backdrop-blur-sm"
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
                  return <line key={`v-${x}`} x1={sx} y1={0} x2={sx} y2={flowContainerSize.h} stroke="#fee715" strokeOpacity={0.8} strokeWidth={1} />;
                })}
                {alignmentGuides.horizontal.map((y) => {
                  const sy = y * viewport.zoom + viewport.y;
                  return <line key={`h-${y}`} x1={0} y1={sy} x2={flowContainerSize.w} y2={sy} stroke="#fee715" strokeOpacity={0.8} strokeWidth={1} />;
                })}
              </svg>
            </div>
          )}
        </div>

        {/* Edge Properties Panel (z-20 żeby linia połączenia nie zasłaniała podczas rysowania) */}
        {showEdgeProperties && selectedEdge && (
          <div 
            className="relative z-20 w-72 border-l border-white/10 p-4 overflow-y-auto bg-[#0a0f14]/98 nodrag nopan"
            onKeyDown={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
            onKeyUp={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white text-sm tracking-tight">Właściwości linii</h3>
              <button
                onClick={() => {
                  setShowEdgeProperties(false);
                  setSelectedEdge(null);
                }}
                className="p-0.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Notatki</label>
                <textarea
                  value={edgeProperties.notes}
                  onChange={(e) => setEdgeProperties({ ...edgeProperties, notes: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]"
                  placeholder="Notatki do linii..."
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Link (opcjonalnie)</label>
                <input
                  type="url"
                  value={edgeProperties.link}
                  onChange={(e) => setEdgeProperties({ ...edgeProperties, link: e.target.value })}
                  className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                  placeholder="https://..."
                />
              </div>

              {/* Customowe pola dla edge */}
              <div className="pt-3 mt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-medium text-gray-400">Dodatkowe pola</label>
                  <button
                    onClick={() => {
                      setEdgeCustomFields([...edgeCustomFields, { field_name: '', field_type: 'text', field_value: '', display_order: edgeCustomFields.length }]);
                    }}
                    className="px-2 py-1 text-xs bg-white/[0.06] border border-white/20 text-white/90 rounded hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    + Dodaj pole
                  </button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {edgeCustomFields.map((field, index) => (
                    <div key={index} className="p-2 bg-white/[0.02] border border-white/5 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <input
                          type="text"
                          value={field.field_name}
                          onChange={(e) => {
                            const updated = [...edgeCustomFields];
                            updated[index].field_name = e.target.value;
                            setEdgeCustomFields(updated);
                          }}
                          placeholder="Nazwa pola"
                          className="flex-1 bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                        />
                        <CustomSelect
                          size="sm"
                          value={field.field_type}
                          onChange={(value) => {
                            const updated = [...edgeCustomFields];
                            updated[index].field_type = value as 'text' | 'date' | 'number' | 'link';
                            updated[index].field_value = ''; // Reset value przy zmianie typu
                            setEdgeCustomFields(updated);
                          }}
                          options={[
                            { value: 'text', label: 'Tekst' },
                            { value: 'date', label: 'Data' },
                            { value: 'number', label: 'Liczba' },
                            { value: 'link', label: 'Link' },
                          ]}
                          className="w-24"
                        />
                        <button
                          onClick={() => {
                            const updated = edgeCustomFields.filter((_, i) => i !== index);
                            setEdgeCustomFields(updated);
                          }}
                          className="p-1 text-gray-400 hover:text-red-400 transition-colors"
                          title="Usuń pole"
                        >
                          <Trash size={14} />
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
                          placeholder="Wartość tekstowa"
                          className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
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
                        <div className="relative w-full">
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
                            placeholder="Wartość liczbowa"
                            className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                          />
                          <div className="absolute right-0.5 top-0 bottom-0 w-11 flex flex-col">
                            <button
                              type="button"
                              onClick={() => {
                                const current = parseFloat(field.field_value) || 0;
                                const updated = [...edgeCustomFields];
                                updated[index].field_value = String(current + 1);
                                setEdgeCustomFields(updated);
                              }}
                              className="flex-1 flex items-center justify-center text-gray-400 hover:text-white border-b border-white/10 hover:bg-white/5 rounded-t"
                            >
                              <Plus size={10} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const current = parseFloat(field.field_value) || 0;
                                const updated = [...edgeCustomFields];
                                updated[index].field_value = String(Math.max(0, current - 1));
                                setEdgeCustomFields(updated);
                              }}
                              className="flex-1 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/5 rounded-b"
                            >
                              <Minus size={10} />
                            </button>
                          </div>
                        </div>
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
                          placeholder="https://example.com"
                          className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                        />
                      )}
                    </div>
                  ))}
                  {edgeCustomFields.length === 0 && (
                    <div className="text-xs text-gray-500 py-2 text-center">Brak dodatkowych pól</div>
                  )}
                </div>
              </div>

              <div>
                <button
                  onClick={() => {
                    if (selectedEdge) {
                      // Odwróć kierunek strzałki
                      const newSource = selectedEdge.target;
                      const newTarget = selectedEdge.source;
                      setEdges((eds) =>
                        eds.map((edge) =>
                          edge.id === selectedEdge.id
                            ? {
                                ...edge,
                                source: newSource,
                                target: newTarget,
                              }
                            : edge
                        )
                      );
                      // Zaktualizuj selectedEdge
                      setSelectedEdge({
                        ...selectedEdge,
                        source: newSource,
                        target: newTarget,
                      });
                    }
                  }}
                  className="w-full px-3 py-1.5 bg-white/[0.04] border border-white/10 text-gray-300 rounded text-sm font-medium hover:bg-white/5 hover:border-[#fee715]/30 hover:text-[#fee715] transition-colors flex items-center justify-center gap-1.5"
                  title="Odwróć kierunek strzałki"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                  Odwróć kierunek
                </button>
              </div>

              <div className="flex gap-2 pt-3 mt-3 border-t border-white/10">
                <button
                  onClick={updateEdgeProperties}
                  className="relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors"
                >
                  <span className="flex items-center justify-center gap-2">
                    Zapisz zmiany
                    {hasUnsavedEdgeChanges && (
                      <span className="w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse" title="Masz niezapisane zmiany"></span>
                    )}
                  </span>
                </button>
                <button
                  onClick={deleteSelectedEdge}
                  title="Delete / Backspace"
                  className="px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors"
                >
                  Usuń
                </button>
              </div>
              <p className="text-[11px] text-gray-500 mt-2">Delete / Backspace — usuwa strzałkę.</p>
            </div>
          </div>
        )}

        {/* Node Properties Panel (z-20 żeby linia połączenia nie zasłaniała podczas rysowania) */}
        {showPropertiesPanel && selectedNode && (
          <div 
            className="relative z-20 w-72 border-l border-white/10 p-4 overflow-y-auto overflow-x-visible bg-[#0a0f14]/98 nodrag nopan"
            onKeyDown={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
            onKeyUp={(e) => { if (['INPUT','TEXTAREA','SELECT'].includes((e.target as HTMLElement)?.tagName)) e.stopPropagation(); }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-white text-sm tracking-tight">
                {selectedNode.type === 'text' ? 'Właściwości tekstu' : 'Właściwości'}
              </h3>
              <button
                onClick={() => {
                  setShowPropertiesPanel(false);
                  setSelectedNode(null);
                }}
                className="p-0.5 hover:bg-white/5 rounded text-gray-500 hover:text-gray-300 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {selectedNode.type === 'text' ? (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Tekst</label>
                  <textarea
                    value={textNodeProperties.text}
                    onChange={(e) => setTextNodeProperties({ ...textNodeProperties, text: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]"
                    placeholder="Wpisz tekst..."
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Rozmiar czcionki</label>
                  <input
                    type="number"
                    min="10"
                    max="72"
                    value={textNodeProperties.fontSize}
                    onChange={(e) => setTextNodeProperties({ ...textNodeProperties, fontSize: parseInt(e.target.value) || 18 })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Waga czcionki</label>
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
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Wyrównanie poziome</label>
                  <CustomSelect
                    size="sm"
                    value={textNodeProperties.textAlign || 'left'}
                    onChange={(value) => setTextNodeProperties({ ...textNodeProperties, textAlign: value as 'left' | 'center' | 'right' })}
                    options={[
                      { value: 'left', label: 'Lewo' },
                      { value: 'center', label: 'Środek' },
                      { value: 'right', label: 'Prawo' },
                    ]}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Wyrównanie pionowe</label>
                  <CustomSelect
                    size="sm"
                    value={textNodeProperties.verticalAlign || 'middle'}
                    onChange={(value) => setTextNodeProperties({ ...textNodeProperties, verticalAlign: value as 'top' | 'middle' | 'bottom' })}
                    options={[
                      { value: 'top', label: 'Góra' },
                      { value: 'middle', label: 'Środek' },
                      { value: 'bottom', label: 'Dół' },
                    ]}
                    className="w-full"
                  />
                </div>

                <div className="pt-0.5">
                  <CustomCheckbox
                    id="showHandles"
                    checked={textNodeProperties.showHandles ?? false}
                    onChange={(v) => setTextNodeProperties({ ...textNodeProperties, showHandles: v })}
                    label="Punkty połączenia"
                    size="sm"
                    labelClassName="text-xs font-medium text-gray-400"
                  />
                </div>

                <div className="flex gap-2 pt-3 mt-3 border-t border-white/10">
                  <button
                    onClick={updateNodeProperties}
                    className="relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Zapisz zmiany
                      {hasUnsavedTextNodeChanges && (
                        <span className="w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse" title="Masz niezapisane zmiany"></span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={deleteSelectedNode}
                    className="px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Nazwa</label>
                  <input
                    type="text"
                    value={nodeProperties.label}
                    onChange={(e) => setNodeProperties({ ...nodeProperties, label: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                    placeholder="Nazwa elementu"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Ikona</label>
                  <IconPicker
                    value={nodeProperties.icon}
                    onChange={(iconName) => setNodeProperties({ ...nodeProperties, icon: iconName })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Notatki</label>
                  <textarea
                    value={nodeProperties.notes}
                    onChange={(e) => setNodeProperties({ ...nodeProperties, notes: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30 min-h-[72px]"
                    placeholder="Notatki (np. CPC: 2 PLN)"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Link</label>
                  <input
                    type="url"
                    value={nodeProperties.link || ''}
                    onChange={(e) => setNodeProperties({ ...nodeProperties, link: e.target.value })}
                    className="w-full bg-white/[0.04] border border-white/10 rounded px-3 py-1.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                    placeholder="https://example.com"
                  />
                </div>

                {/* Customowe pola */}
                <div className="pt-3 mt-3 border-t border-white/10">
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-medium text-gray-400">Dodatkowe pola</label>
                    <button
                      onClick={() => {
                        setNodeCustomFields([...nodeCustomFields, { field_name: '', field_type: 'text', field_value: '', display_order: nodeCustomFields.length }]);
                      }}
                      className="px-2 py-1 text-xs bg-white/[0.06] border border-white/20 text-white/90 rounded hover:bg-white/10 hover:border-white/30 transition-colors"
                    >
                      + Dodaj pole
                    </button>
                  </div>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {nodeCustomFields.map((field, index) => (
                      <div key={index} className="p-2 bg-white/[0.02] border border-white/5 rounded">
                        <div className="flex items-center gap-2 mb-2">
                          <input
                            type="text"
                            value={field.field_name}
                            onChange={(e) => {
                              const updated = [...nodeCustomFields];
                              updated[index].field_name = e.target.value;
                              setNodeCustomFields(updated);
                            }}
                            placeholder="Nazwa pola"
                            className="flex-1 bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                          />
                          <CustomSelect
                            size="sm"
                            value={field.field_type}
                            onChange={(value) => {
                              const updated = [...nodeCustomFields];
                              updated[index].field_type = value as 'text' | 'date' | 'number' | 'link';
                              updated[index].field_value = ''; // Reset value przy zmianie typu
                              setNodeCustomFields(updated);
                            }}
                            options={[
                              { value: 'text', label: 'Tekst' },
                              { value: 'date', label: 'Data' },
                              { value: 'number', label: 'Liczba' },
                              { value: 'link', label: 'Link' },
                            ]}
                            className="w-24"
                          />
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
                            placeholder="Wartość tekstowa"
                            className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
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
                          <div className="relative w-full">
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
                              placeholder="Wartość liczbowa"
                              className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 pr-12 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                            />
                            <div className="absolute right-0.5 top-0 bottom-0 w-11 flex flex-col">
                              <button
                                type="button"
                                onClick={() => {
                                  const currentValue = parseFloat(field.field_value) || 0;
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = String(currentValue + 1);
                                  setNodeCustomFields(updated);
                                }}
                                className="flex-1 px-1 bg-white/[0.08] hover:bg-white/[0.15] border-l border-white/20 rounded-tl text-white/70 hover:text-white transition-colors flex items-center justify-center"
                                title="Zwiększ"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                              </button>
                              <div className="h-px bg-white/20"></div>
                              <button
                                type="button"
                                onClick={() => {
                                  const currentValue = parseFloat(field.field_value) || 0;
                                  const updated = [...nodeCustomFields];
                                  updated[index].field_value = String(Math.max(0, currentValue - 1));
                                  setNodeCustomFields(updated);
                                }}
                                className="flex-1 px-1 bg-white/[0.08] hover:bg-white/[0.15] border-l border-white/20 rounded-bl text-white/70 hover:text-white transition-colors flex items-center justify-center"
                                title="Zmniejsz"
                              >
                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                              </button>
                            </div>
                          </div>
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
                            placeholder="https://example.com"
                            className="w-full bg-white/[0.04] border border-white/10 rounded px-2 py-1 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#fee715]/40 focus:border-[#fee715]/30"
                          />
                        )}
                        <div className="flex justify-end mt-2">
                          <button
                            onClick={() => {
                              setNodeCustomFields(nodeCustomFields.filter((_, i) => i !== index));
                            }}
                            className="px-2 py-1 text-xs text-gray-400 hover:text-red-400 transition-colors flex items-center gap-1"
                            title="Usuń pole"
                          >
                            <Trash size={14} weight="regular" />
                            <span>Usuń</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Zapisz jako szablon */}
                <div className="pt-3 mt-3 border-t border-white/10">
                  <label className="block text-xs font-medium text-gray-400 mb-2">Zapisz jako własny szablon</label>
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
                      className="w-full px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors"
                    >
                      Zapisz jako szablon
                    </button>
                  </div>
                </div>

                <div className="flex gap-2 pt-3 mt-3 border-t border-white/10">
                  <button
                    onClick={updateNodeProperties}
                    className="relative flex-1 px-3 py-1.5 bg-[#fee715]/10 border border-[#fee715]/40 text-[#fee715] rounded text-sm font-medium hover:bg-[#fee715]/15 hover:border-[#fee715]/50 transition-colors"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Zapisz zmiany
                      {hasUnsavedNodeChanges && (
                        <span className="w-1.5 h-1.5 bg-[#fee715] rounded-full animate-pulse" title="Masz niezapisane zmiany"></span>
                      )}
                    </span>
                  </button>
                  <button
                    onClick={deleteSelectedNode}
                    className="px-3 py-1.5 bg-white/[0.06] border border-white/20 text-white/90 rounded text-sm font-medium hover:bg-white/10 hover:border-white/30 transition-colors"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            )}
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

      {/* System komentarzy */}
      {showCommentPanel && id && (
        <CommentPanel
          funnelId={id}
          isOpen={showCommentPanel}
          onClose={() => {
            setShowCommentPanel(false);
            setSelectedThreadId(null);
          }}
          onJumpToAnchor={(anchorType, anchorId, regionCoords) => {
            if (anchorType === 'node' && anchorId) {
              const node = nodes.find(n => n.id === anchorId);
              if (node && reactFlowInstance) {
                reactFlowInstance.setCenter(node.position.x, node.position.y, { zoom: 1, duration: 500 });
                setSelectedNode(node);
                setShowPropertiesPanel(true);
              }
            } else if (anchorType === 'edge' && anchorId) {
              const edge = edges.find(e => e.id === anchorId);
              if (edge && reactFlowInstance) {
                const sourceNode = nodes.find(n => n.id === edge.source);
                if (sourceNode) {
                  reactFlowInstance.setCenter(sourceNode.position.x, sourceNode.position.y, { zoom: 1, duration: 500 });
                  setSelectedEdge(edge);
                  setShowEdgeProperties(true);
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
