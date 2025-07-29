import { LibraryItem } from "@/types";

// We'll organize our mock data by type to make it easier to manage and filter
export const mockData: Record<string, LibraryItem[]> = {
  // KPI Items - Focused on business metrics and performance indicators
  kpi: [
    {
      id: "kpi-1",
      type: "kpi",
      name: "Customer Retention Rate",
      description:
        "Track and analyze the percentage of customers retained over specific time periods, identifying patterns and factors affecting customer loyalty.",
      date: "2024-07-23",
      tags: ["customers", "retention", "loyalty", "quarterly"],
      used: "2156",
      businessQuestions: [
        {
          id: "q1",
          question: "What factors contribute to customer churn?",
          description:
            "Analyze key drivers of customer attrition to develop targeted retention strategies.",
        },
        {
          id: "q2",
          question: "Are loyalty programs effective?",
          description:
            "Evaluate the impact of customer loyalty initiatives on retention rates.",
        },
        {
          id: "q3",
          question: "How can we enhance customer experience?",
          description:
            "Identify opportunities to improve customer satisfaction and loyalty.",
        },
      ],
      kpiMetricIds: [
        {
          id: "CUST_RETAIN_DURING_PERIOD",
          name: "Customers Retained During Period",
        },
        { id: "CUST_START_PERIOD", name: "Customers at Start of Period" },
      ],
      calculation:
        "Retention Rate (%) = (Customers Retained During Period / Customers at Start of Period) × 100",
      visualsAvailable: ["Line Chart", "Bar Chart", "Heat Map", "Funnel Chart"],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Customer Retention Dashboard",
          description: "Comprehensive retention analytics with cohort analysis",
        },
        {
          id: "r2",
          title: "Customer Lifecycle Report",
          description:
            "Detailed analysis of customer journey and retention patterns",
        },
      ],
    },
    {
      id: "kpi-2",
      type: "kpi",
      name: "Sales Growth Rate",
      description:
        "Measure and analyze the rate of sales growth between periods to identify trends and opportunities for improvement.",
      date: "2024-07-23",
      tags: ["sales", "growth", "finance", "quarterly"],
      used: "1985",
      businessQuestions: [
        {
          id: "q1",
          question: "What drives sales growth?",
          description:
            "Identify key factors contributing to sales performance.",
        },
        {
          id: "q2",
          question: "How do sales vary by region?",
          description: "Analyze geographical patterns in sales growth.",
        },
        {
          id: "q3",
          question: "Are we meeting sales targets?",
          description:
            "Compare actual sales growth against forecasts and objectives.",
        },
      ],
      kpiMetricIds: [
        { id: "SALES_CURRENT_PERIOD", name: "Sales (Current Period)" },
        { id: "SALES_PREVIOUS_PERIOD", name: "Sales (Previous Period)" },
      ],
      calculation:
        "Sales Growth Rate (%) = ((Sales(Current Period) - Sales(Previous Period)) / Sales(Previous Period)) × 100",
      visualsAvailable: [
        "Line Chart",
        "Bar Chart",
        "Area Chart",
        "Scatter Plot",
      ],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Sales Performance Dashboard",
          description: "Real-time sales tracking and analysis",
        },
        {
          id: "r2",
          title: "Growth Analysis Report",
          description: "Detailed breakdown of sales growth drivers",
        },
      ],
    },
    {
      id: "kpi-3",
      type: "kpi",
      name: "Revenue Growth Rate",
      description:
        "Monitor and analyze revenue growth trends to assess business performance and identify opportunities for expansion.",
      date: "2024-07-23",
      tags: ["revenue", "growth", "finance", "quarterly"],
      used: "2367",
      businessQuestions: [
        {
          id: "q1",
          question: "What is driving revenue growth?",
          description: "Analyze key contributors to revenue performance.",
        },
        {
          id: "q2",
          question: "How sustainable is our growth?",
          description: "Assess long-term revenue growth sustainability.",
        },
        {
          id: "q3",
          question: "Where are growth opportunities?",
          description: "Identify potential areas for revenue expansion.",
        },
      ],
      kpiMetricIds: [
        { id: "REV_CURRENT_PERIOD", name: "Revenue (Current Period)" },
        { id: "REV_PREVIOUS_PERIOD", name: "Revenue (Previous Period)" },
      ],
      calculation:
        "Revenue Growth Rate (%) = ((Revenue(Current Period) - Revenue(Previous Period)) / Revenue(Previous Period)) × 100",
      visualsAvailable: [
        "Line Chart",
        "Bar Chart",
        "Waterfall Chart",
        "Heat Map",
      ],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Revenue Analytics Dashboard",
          description: "Comprehensive revenue performance tracking",
        },
        {
          id: "r2",
          title: "Financial Growth Report",
          description: "Detailed analysis of revenue growth patterns",
        },
      ],
    },
    {
      id: "kpi-4",
      type: "kpi",
      name: "Net Profit Margin",
      description:
        "Track and analyze profit margins to assess operational efficiency and financial health.",
      date: "2024-07-23",
      tags: ["profit", "finance", "efficiency", "quarterly"],
      used: "2089",
      businessQuestions: [
        {
          id: "q1",
          question: "How efficient are our operations?",
          description:
            "Analyze operational efficiency impact on profit margins.",
        },
        {
          id: "q2",
          question: "Where can we reduce costs?",
          description: "Identify opportunities for cost optimization.",
        },
        {
          id: "q3",
          question: "Are margins improving over time?",
          description: "Track profit margin trends and patterns.",
        },
      ],
      kpiMetricIds: [
        { id: "NET_PROFIT", name: "Net Profit" },
        { id: "REV", name: "Revenue" },
      ],
      calculation: "Net Profit Margin (%) = (Net Profit / Revenue) × 100",
      visualsAvailable: [
        "Line Chart",
        "Bar Chart",
        "Trend Analysis",
        "Scatter Plot",
      ],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Profit Analysis Dashboard",
          description: "Comprehensive profit margin analytics",
        },
        {
          id: "r2",
          title: "Financial Performance Report",
          description: "Detailed margin analysis and trends",
        },
      ],
    },
    {
      id: "kpi-5",
      type: "kpi",
      name: "Customer Satisfaction Score (CSAT)",
      description:
        "Measure and analyze customer satisfaction levels to improve service quality and customer experience.",
      date: "2024-07-23",
      tags: ["customer", "satisfaction", "service", "quarterly"],
      used: "1876",
      businessQuestions: [
        {
          id: "q1",
          question: "What drives customer satisfaction?",
          description: "Identify key factors affecting customer satisfaction.",
        },
        {
          id: "q2",
          question: "How can we improve CSAT?",
          description:
            "Analyze opportunities to enhance customer satisfaction.",
        },
        {
          id: "q3",
          question: "Do satisfied customers stay longer?",
          description: "Correlate satisfaction scores with retention rates.",
        },
      ],
      kpiMetricIds: [
        { id: "SURVEY_POSITIVE", name: "Satisfied Customer Responses" },
        { id: "SURVEY_NEGATIVE", name: "Dissatisfied Customer Responses" },
        { id: "SURVEY_ALL", name: "Total Survey Responses" },
      ],
      calculation:
        "CSAT (%) = (Satisfied Customer Responses / Total Survey Responses) × 100",
      visualsAvailable: ["Gauge Chart", "Trend Line", "Heat Map", "Bar Chart"],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Customer Satisfaction Dashboard",
          description: "Real-time CSAT monitoring and analysis",
        },
        {
          id: "r2",
          title: "Customer Experience Report",
          description: "Comprehensive analysis of satisfaction drivers",
        },
      ],
    },
    {
      id: "kpi-6",
      type: "kpi",
      name: "Repeat Purchase Rate",
      description:
        "Track and analyze customer repeat purchase behavior to assess loyalty and engagement.",
      date: "2024-07-23",
      tags: ["sales", "loyalty", "customers", "quarterly"],
      used: "1945",
      businessQuestions: [
        {
          id: "q1",
          question: "What drives repeat purchases?",
          description:
            "Identify factors influencing customer repeat purchase behavior.",
        },
        {
          id: "q2",
          question: "How effective are retention strategies?",
          description:
            "Evaluate impact of retention initiatives on repeat purchases.",
        },
        {
          id: "q3",
          question: "Which customer segments show loyalty?",
          description:
            "Analyze repeat purchase patterns across customer segments.",
        },
      ],
      kpiMetricIds: [
        { id: "RET_CUST_COUNT", name: "Customers with Multiple Purchases" },
        { id: "TOT_CUST_COUNT", name: "Total Customers" },
      ],
      calculation:
        "Repeat Purchase Rate (%) = (Customers with Multiple Purchases / Total Customers) × 100",
      visualsAvailable: [
        "Line Chart",
        "Bar Chart",
        "Cohort Analysis",
        "Heat Map",
      ],
      applicableAffiliates: ["Global", "Regional"],
      relatedItems: [
        {
          id: "r1",
          title: "Customer Loyalty Dashboard",
          description: "Comprehensive repeat purchase analytics",
        },
        {
          id: "r2",
          title: "Purchase Pattern Analysis",
          description: "Detailed analysis of customer purchase behavior",
        },
      ],
    },
  ],

  // Data Visualization Items - Focused on visual representation of data
  dataviz: [
    {
      id: "viz-pie",
      type: "dataviz",
      name: "Pie Chart",
      description:
        "A pie chart is a circular statistical graphic, which is divided into slices to illustrate numerical proportions.",
      date: "2024-07-23",
      tags: ["chart", "visualization", "data"],
      used: "3256",
      applicableKpiFavorites: ["KPI-1", "KPI-2"],
      assetContext:
        "Used to show percentage or proportional data in a circular graph.",
      dataSource: "Survey Data",
    },
    {
      id: "viz-line",
      type: "dataviz",
      name: "Line Chart",
      description:
        "A line chart is a type of chart which displays information as a series of data points called 'markers' connected by straight line segments.",
      date: "2024-07-23",
      tags: ["chart", "visualization", "data"],
      used: "4123",
      applicableKpiFavorites: ["KPI-3", "KPI-4"],
      assetContext: "Used to show trends over time or categories.",
      dataSource: "Time Series Data",
    },
    {
      id: "viz-bar",
      type: "dataviz",
      name: "Bar Chart",
      description:
        "A bar chart presents categorical data with rectangular bars with heights or lengths proportional to the values that they represent.",
      date: "2024-07-23",
      tags: ["chart", "visualization", "data"],
      used: "2890",
      applicableKpiFavorites: ["KPI-5", "KPI-6"],
      assetContext: "Used to compare different categories of data.",
      dataSource: "Categorical Data",
    },
    {
      id: "viz-donut",
      type: "dataviz",
      name: "Donut Chart",
      description:
        "A donut chart is a variant of the pie chart, with a blank center allowing for additional information about the data as a whole to be included.",
      date: "2024-07-23",
      tags: ["chart", "visualization", "data"],
      used: "2345",
      applicableKpiFavorites: ["KPI-7", "KPI-8"],
      assetContext:
        "Used to show percentage or proportional data with a focus on the whole and its parts.",
      dataSource: "Survey Data",
    },
  ],

  // Layout Items - Focused on page arrangements and presentation formats
  layout: [
    {
      id: "layout-1",
      type: "layout",
      name: "Quarterly Business Review",
      description:
        "Standard layout template for quarterly business review presentations and reports.",
      date: "2024-07-20",
      tags: ["quarterly", "review", "business"],
      used: "1543",
      pageCount: 6,
      kpisUsed: ["REV-001", "CSAT-001", "PERF-001"],
      layoutType: "Executive Presentation",
      dimensions: "16:9 Widescreen",
    },
    {
      id: "layout-2",
      type: "layout",
      name: "Monthly Sales Report",
      description:
        "Comprehensive layout for monthly sales performance reporting and analysis.",
      date: "2024-07-19",
      tags: ["sales", "monthly", "report"],
      used: "2167",
      pageCount: 4,
      kpisUsed: ["SALES-001", "PIPELINE-001"],
      layoutType: "Standard Report",
      dimensions: 'Letter (8.5" x 11")',
    },
  ],

  // Storyboard Items - Focused on presentation flow and narrative structure
  storyboard: [
    {
      id: "story-1",
      type: "storyboard",
      name: "Annual Strategy Review",
      description:
        "Comprehensive storyboard template for annual strategy review and planning sessions.",
      date: "2024-07-18",
      tags: ["strategy", "annual", "planning"],
      used: "892",
      coupledKpis: ["STRAT-001", "GOAL-001"],
      applicableAffiliates: ["Global", "Regional"],
    },
    {
      id: "story-2",
      type: "storyboard",
      name: "Product Launch Overview",
      description:
        "Strategic storyboard for product launch presentations and stakeholder communications.",
      date: "2024-07-17",
      tags: ["product", "launch", "marketing"],
      used: "756",
      coupledKpis: ["PROD-001", "MKT-001"],
      applicableAffiliates: ["Global", "Regional"],
    },
  ],
};
