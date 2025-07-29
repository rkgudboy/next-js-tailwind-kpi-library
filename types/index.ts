import { LIBRARY_TABS } from "@/utils/contants";

export type AssetType = "kpi" | "dataviz" | "layout" | "storyboard";

export type AccessStatus = "granted" | "pending" | "none";

export interface RelatedItem {
  id: string;
  title: string;
  description: string;
}

// Base interface for all modal items
interface BaseItem {
  id: string;
  name: string;
  description: string;
  date: string;
  tags: string[];
  used: string;
  type: AssetType;
  relatedItems?: RelatedItem[];
}

// Business Question interface used in KPI items
export interface BusinessQuestion {
  id: string;
  question: string;
  description: string;
}

export interface KPIMetricID {
  id: string;
  name: string;
}
// KPI specific interface
export interface KPIItem extends BaseItem {
  type: "kpi";
  businessQuestions: BusinessQuestion[];
  kpiMetricIds: KPIMetricID[];
  calculation: string;
  visualsAvailable: string[];
  applicableAffiliates: string[];
}

// Data Visualization specific interface
export interface DataVizItem extends BaseItem {
  type: "dataviz";
  applicableKpiFavorites: string[];
  assetContext: string;
  dataSource: string;
}

// Layout specific interface
export interface LayoutItem extends BaseItem {
  type: "layout";
  pageCount: number;
  kpisUsed: string[];
  layoutType: string;
  dimensions: string;
}

// Storyboard specific interface
export interface StoryboardItem extends BaseItem {
  type: "storyboard";
  coupledKpis: string[];
  applicableAffiliates: string[];
}

export type LibraryItem = KPIItem | DataVizItem | LayoutItem | StoryboardItem;

// export interface LibraryItem {
//   id: string;
//   name: string;
//   description: string;
//   date?: string;
//   type: 'featured' | 'trending' | 'kpi' | 'layout' | 'storyboard';
// }

export interface BaseAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  tags?: string[];
  id?: string;
  type?: string;
  lastUpdated?: string;
}

export interface BusinessQuestion {
  id: string;
  question: string;
  description: string;
}

export interface KPIModalProps extends BaseAssetModalProps {
  businessQuestions: BusinessQuestion[];
  kpiMetricIds: string[];
  calculation?: string;
  visualsAvailable: string[];
  applicableAffiliates: string[];
}

export interface DataVizModalProps extends BaseAssetModalProps {
  applicableKpiFavorites: string[];
  assetContext: string;
}

export interface LayoutModalProps extends BaseAssetModalProps {
  pageCount: number;
  kpisUsed: string[];
}

export interface StoryboardModalProps extends BaseAssetModalProps {
  coupledKpis: string[];
  applicableAffiliates: string[];
}

export interface MetadataItemProps {
  label: string;
  value: string | number;
}

// Navigation Prop Types
export type LibraryTab = (typeof LIBRARY_TABS)[number];

export interface NavigationProps {
  activeTab: LibraryTab;
  onTabChange: (tab: LibraryTab) => void;
  className?: string;
}

export interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStart: () => void;
}

export interface CoachStep {
  target: string;
  title: string;
  description: string;
}

export interface CoachMarkProps {
  target: string;
  title: string;
  description: string;
  step: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onClose: () => void;
}
