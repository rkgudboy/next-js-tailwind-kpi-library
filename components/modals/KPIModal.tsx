import { KPIItem, KPIMetricID, BusinessQuestion } from "@/types";
import {
  AffiliateReferenceCard,
  Section,
  MetadataGrid,
  TagList,
} from "./BaseModalComponents";
import {
  ChartBarIcon,
  ChartPieIcon,
  PresentationChartLineIcon,
  CircleStackIcon,
} from "@heroicons/react/24/outline";

interface KPIModalContentProps {
  item: KPIItem;
}

// Business Questions Component
const BusinessQuestions = ({
  questions,
}: {
  questions: BusinessQuestion[];
}) => (
  <Section title="Business Questions">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {questions.map((q) => (
        <div
          key={q.id}
          className="p-5 bg-gradient-to-br from-white to-gray-50 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <CircleStackIcon className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">{q.question}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {q.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

const MetricsIDs = ({
  title,
  items,
}: {
  title: string;
  items: KPIMetricID[];
}) => (
  <Section title={title}>
    <div className="grid grid-cols-1 gap-4">
      {items.map((metricData) => (
        <div
          key={metricData?.id}
          className="p-5 bg-white rounded-xl border border-gray-200 hover:border-blue-200 
                   hover:shadow-md transition-all duration-200"
        >
          <div className="flex flex-col gap-4">
            {/* Metric Name */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-500">
                Metric Name
              </span>
              <span className="text-gray-900 font-medium">
                {metricData?.name}
              </span>
            </div>

            {/* Metric ID */}
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-medium text-gray-500">
                Metric ID
              </span>
              <code
                className="text-sm bg-gray-50 px-4 py-2.5 rounded-lg border border-gray-200 
                           font-mono text-gray-800 break-all"
              >
                {metricData?.id}
              </code>
            </div>
          </div>
        </div>
      ))}
    </div>
  </Section>
);

// Chart options with consistent styling
const CHART_OPTIONS = [
  {
    id: "line",
    icon: PresentationChartLineIcon,
    title: "Line Chart",
    description: "View time-based trends",
    gradient: "from-blue-50 to-indigo-50",
    hover: "hover:border-indigo-200",
    iconColor: "text-indigo-600",
  },
  {
    id: "bar",
    icon: ChartBarIcon,
    title: "Bar Chart",
    description: "Compare categories",
    gradient: "from-purple-50 to-violet-50",
    hover: "hover:border-purple-200",
    iconColor: "text-purple-600",
  },
  {
    id: "pie",
    icon: ChartPieIcon,
    title: "Pie Chart",
    description: "Show proportions",
    gradient: "from-pink-50 to-rose-50",
    hover: "hover:border-pink-200",
    iconColor: "text-pink-600",
  },
  {
    id: "donut",
    icon: ChartPieIcon,
    title: "Donut Chart",
    description: "Display parts of a whole",
    gradient: "from-rose-50 to-red-50",
    hover: "hover:border-rose-200",
    iconColor: "text-rose-600",
  },
];

const VisualsList = ({ title, items }: { title: string; items: string[] }) => (
  <Section title={title}>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {CHART_OPTIONS.map((chart) => {
        const Icon = chart.icon;
        return (
          <button
            key={chart.id}
            className={`
              flex items-center p-4 rounded-xl border border-gray-200 
              bg-gradient-to-br ${chart.gradient}
              ${chart.hover} hover:shadow-md 
              transition-all duration-200 group
            `}
            onClick={() => console.log(chart.id)}
          >
            <div
              className={`
              w-12 h-12 mr-4 flex items-center justify-center rounded-xl 
              bg-white shadow-sm group-hover:shadow transition-shadow
            `}
            >
              <Icon className={`w-6 h-6 ${chart.iconColor}`} />
            </div>
            <div className="flex flex-col items-start">
              <span className="font-medium text-gray-900 group-hover:text-gray-800">
                {chart.title}
              </span>
              <span className="text-sm text-gray-600">{chart.description}</span>
            </div>
          </button>
        );
      })}
    </div>
  </Section>
);

export const KPIModalContent = ({ item }: KPIModalContentProps) => {
  const metadataItems = [
    { label: "Used", value: item.used },
    { label: "Type", value: item.type },
    { label: "Last Updated", value: item.date },
    { label: "Metrics Count", value: item.kpiMetricIds.length },
  ];

  return (
    <div className="space-y-8 max-h-[calc(100vh-12rem)] overflow-y-auto px-6 pb-6">
      {/* Description and Tags */}
      <div className="space-y-4">
        <p className="text-gray-600 text-lg leading-relaxed">
          {item.description}
        </p>
        <TagList tags={item.tags} />
      </div>

      {/* Metadata Grid */}
      <MetadataGrid items={metadataItems} />

      {/* Business Questions Section */}
      <BusinessQuestions questions={item.businessQuestions} />

      {/* KPI Metrics Section */}
      <MetricsIDs title="KPI Metric IDs" items={item.kpiMetricIds} />

      {/* Calculation Section */}
      <Section title="Calculation">
        <div className="bg-gradient-to-br from-gray-50 to-gray-100/50 rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <pre className="p-5 text-sm font-mono text-gray-800 whitespace-pre-wrap break-words">
              {item.calculation}
            </pre>
          </div>
        </div>
      </Section>

      {/* Visuals Section */}
      <VisualsList title="Visuals Available" items={item.visualsAvailable} />

      {/* Affiliate Availability Section */}

      <Section title="Affiliate Availability">
        <AffiliateReferenceCard affiliateList={item.applicableAffiliates} />
      </Section>
    </div>
  );
};
