import { StoryboardItem } from "@/types";
import {
  AffiliateReferenceCard,
  Section,
  MetadataGrid,
  TagList,
  KPIReferenceCard,
} from "./BaseModalComponents";
import {
  PresentationChartLineIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

interface StoryboardModalContentProps {
  item: StoryboardItem;
}

export const StoryboardModalContent = ({
  item,
}: StoryboardModalContentProps) => {
  const metadataItems = [
    { label: "Used", value: item.used },
    { label: "Type", value: item.type },
    { label: "Last Updated", value: item.date },
    { label: "Affiliates", value: item.applicableAffiliates.length },
  ];

  return (
    <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto px-6 pb-6">
      {/* Description and Tags */}
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-indigo-50 rounded-xl">
            <PresentationChartLineIcon className="w-6 h-6 text-indigo-600" />
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {item.description}
          </p>
        </div>
        <TagList tags={item.tags} />
      </div>

      {/* Metadata Grid */}
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-200 p-6">
        <MetadataGrid items={metadataItems} />
      </div>

      {/* Coupled KPIs Section */}
      <Section title="Coupled KPIs/Filters">
        <KPIReferenceCard kpiList={item.coupledKpis} />
      </Section>

      {/* Applicable Affiliates Section */}
      <Section title="Applicable Affiliates">
        <AffiliateReferenceCard affiliateList={item.applicableAffiliates} />
      </Section>

      {/* Request Access Section */}
      <Section title="Request Access">
        <div className="space-y-3">
          <textarea
            className="w-full p-3 border rounded-lg"
            placeholder="Provide reason for access request..."
            rows={4}
          />
          <button
            className="w-full py-3 px-4 bg-blue-600
                       text-white rounded-xl font-medium
                      shadow-sm hover:shadow flex items-center justify-center gap-2"
          >
            {/* <button className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 justify-center gap-2"> */}
            <PaperAirplaneIcon className="w-5 h-5" />
            Submit Request
          </button>
        </div>
      </Section>
    </div>
  );
};
