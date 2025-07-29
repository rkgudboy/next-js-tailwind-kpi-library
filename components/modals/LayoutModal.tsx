import { LayoutItem } from "@/types";
import {
  Section,
  MetadataGrid,
  TagList,
  KPIReferenceCard,
} from "./BaseModalComponents";
import { DocumentIcon, EyeIcon } from "@heroicons/react/24/outline";

interface LayoutModalContentProps {
  item: LayoutItem;
}

export const LayoutModalContent = ({ item }: LayoutModalContentProps) => {
  const metadataItems = [
    { label: "Used", value: item.used },
    { label: "Type", value: item.layoutType },
    { label: "Pages", value: item.pageCount },
    { label: "Last Updated", value: item.date },
  ];

  return (
    <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto px-6 pb-6">
      {/* Description and Tags */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-violet-50 rounded-xl">
            <DocumentIcon className="w-6 h-6 text-violet-600" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
        <TagList tags={item.tags} />
      </div>

      {/* Metadata overview */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
        <MetadataGrid items={metadataItems} />
      </div>

      {/* Layout Preview Section */}
      <Section title="Layout Preview">
        <div className="relative group">
          {/* Image Container with gradient overlay */}
          <div className="relative rounded-xl overflow-hidden bg-gray-100">
            <div className="aspect-w-16 aspect-h-9 relative">
              <img
                src="/layout-mockup.png"
                alt="Layout Mockup"
                className="transition-all duration-300 group-hover:scale-[1.02]"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Preview Button - Centered Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                className="inline-flex items-center px-6 py-3 bg-white/90 backdrop-blur-sm 
                               text-gray-900 rounded-xl border border-white/20 
                               hover:bg-white hover:shadow-lg 
                               transition-all duration-200 transform scale-95 hover:scale-100"
              >
                <EyeIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Preview Layout</span>
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* KPIs Section */}
      <Section title="KPIs Being Used">
        <KPIReferenceCard kpiList={item.kpisUsed} />
      </Section>
    </div>
  );
};
