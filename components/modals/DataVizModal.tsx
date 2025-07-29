import { DataVizItem } from "@/types";
import {
  Section,
  MetadataGrid,
  TagList,
  KPIReferenceCard,
} from "./BaseModalComponents";
import {
  DocumentChartBarIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

interface DataVizModalContentProps {
  item: DataVizItem;
}

export const DataVizModalContent = ({ item }: DataVizModalContentProps) => {
  const metadataItems = [
    { label: "Used", value: item.used },
    { label: "Type", value: item.type },
    { label: "Last Updated", value: item.date },
    { label: "Data Source", value: item.dataSource },
  ];

  return (
    <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto px-6 pb-6">
      {/* Header Section with Description and Tags */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <DocumentChartBarIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
        <TagList tags={item.tags} />
      </div>

      {/* Enhanced Metadata Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
        <MetadataGrid items={metadataItems} />
      </div>

      {/* Improved Sample Visualization Section */}
      <Section title="Sample Visualization">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
          <div className="flex justify-center items-center h-[400px]">
            <div className="relative w-full h-full flex items-center justify-center">
              <img
                src={`${item.id}.png`}
                alt={item.name}
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  // Fallback image or placeholder if image fails to load
                  e.currentTarget.src = "/placeholder-chart.png";
                }}
              />
              {/* Optional overlay for loading state */}
              <div className="absolute inset-0 bg-gray-100 animate-pulse hidden">
                <div className="flex items-center justify-center h-full">
                  <span className="text-gray-400">
                    Loading visualization...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Applicable KPIs Section */}
      <Section title="Applicable KPI Favorites">
        <KPIReferenceCard kpiList={item.applicableKpiFavorites} />
      </Section>

      {/* Asset Context Section */}
      <Section title="Asset Information Context">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="p-5 border-b border-gray-200 bg-white">
            <div className="flex items-center gap-2 text-gray-600">
              <InformationCircleIcon className="w-5 h-5" />
              <span className="font-medium">Context Information</span>
            </div>
          </div>
          <div className="p-5">
            <p className="text-gray-600 whitespace-pre-wrap break-words leading-relaxed">
              {item.assetContext}
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
};
