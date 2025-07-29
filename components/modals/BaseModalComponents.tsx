import { LibraryItem, MetadataItemProps } from "@/types";
import {
  BuildingOfficeIcon,
  ChartBarIcon,
  DocumentChartBarIcon,
  PresentationChartLineIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";

export const MetadataItem = ({ label, value }: MetadataItemProps) => (
  <div className="flex flex-col">
    <span className="text-sm text-gray-500">{label}</span>
    <span className="font-medium text-gray-900">{value}</span>
  </div>
);

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

export const Section = ({ title, children }: SectionProps) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">{title}</h3>
    {children}
  </div>
);

interface TagListProps {
  tags: string[];
}

export const TagList = ({ tags }: TagListProps) => (
  <div className="flex flex-wrap gap-2 mb-6">
    {tags.map((tag) => (
      <span
        key={tag}
        className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
      >
        #{tag}
      </span>
    ))}
  </div>
);

interface MetadataGridProps {
  items: Array<{ label: string; value: string | number }>;
}

export const MetadataGrid = ({ items }: MetadataGridProps) => (
  <div className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg mb-6">
    {items.map((item) => (
      <MetadataItem key={item.label} {...item} />
    ))}
  </div>
);

export const IconForType = ({
  type,
  h = 6,
  w = 6,
}: {
  type: LibraryItem["type"];
  h?: number;
  w?: number;
}) => {
  const CategoryIconPaths = {
    kpi: <ChartBarIcon className={`w-${w} h-${h} text-blue-600`} />,
    dataviz: (
      <DocumentChartBarIcon className={`w-${w} h-${h} text-purple-600`} />
    ),
    layout: <Squares2X2Icon className={`w-${w} h-${h} text-violet-600`} />,
    storyboard: (
      <PresentationChartLineIcon className={`w-${w} h-${h} text-fuchsia-600`} />
    ),
  };

  return CategoryIconPaths[type];
};

export const KPIReferenceCard = ({ kpiList }: { kpiList: string[] }) => {
  return (
    <div className="grid grid-cols-1 gap-3">
      {kpiList.map((kpi) => (
        <div
          key={kpi}
          className="group p-4 bg-white rounded-xl border border-gray-200 
                       hover:border-indigo-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start gap-4">
            <div className="p-2 bg-indigo-50 rounded-lg shrink-0">
              <ChartBarIcon className="w-5 h-5 text-indigo-600" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-4">
                <span className="text-gray-900 font-medium truncate">
                  {kpi}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const AffiliateReferenceCard = ({
  affiliateList,
}: {
  affiliateList: string[];
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {affiliateList.map((affiliate) => (
        <div
          key={affiliate}
          className="group p-4 bg-white rounded-xl border border-gray-200 
                       hover:border-purple-200 hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <BuildingOfficeIcon className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-gray-700">{affiliate}</span>
          </div>
        </div>
      ))}
    </div>
  );
};
