import { Article } from "./types";

export const sampleArticles: Omit<Article, "id" | "dateAdded">[] = [
  {
    url: "https://learn.microsoft.com/en-us/sharepoint/dev/spfx/sharepoint-framework-overview",
    title: "SharePoint Framework (SPFx) Overview",
    description: "Learn about the SharePoint Framework (SPFx), a page and web part model that provides full support for client-side SharePoint development, easy integration with SharePoint data, and support for open source tooling.",
    category: "SharePoint",
    tags: ["SPFx", "Development", "Web Parts", "Extensions"]
  },
  {
    url: "https://learn.microsoft.com/en-us/sharepoint/enable-auto-acceleration",
    title: "SharePoint Auto-Acceleration for OneDrive",
    description: "Configure auto-acceleration to automatically sign users into SharePoint and OneDrive with their work or school account, improving the user experience and reducing sign-in prompts.",
    category: "SharePoint",
    tags: ["Authentication", "OneDrive", "Configuration", "User Experience"]
  },
  {
    url: "https://learn.microsoft.com/en-us/microsoftteams/platform/messaging-extensions/what-are-messaging-extensions",
    title: "Teams Messaging Extensions",
    description: "Messaging extensions allow users to interact with your web service through buttons and forms in the Microsoft Teams client. They can search or initiate actions in an external system.",
    category: "Teams",
    tags: ["Messaging Extensions", "Development", "Integration", "Bots"]
  },
  {
    url: "https://learn.microsoft.com/en-us/microsoftteams/teams-live-events/what-are-teams-live-events",
    title: "Microsoft Teams Live Events",
    description: "Learn how to create and produce live events in Teams, enabling you to broadcast video and content to large online audiences with interactive Q&A and reporting capabilities.",
    category: "Teams",
    tags: ["Live Events", "Broadcasting", "Meetings", "Communication"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/functions/function-patch",
    title: "Power Apps Patch Function",
    description: "Master the Patch function to modify or create records in your data source. Essential for building data-driven apps with create, update, and delete operations.",
    category: "Power Apps",
    tags: ["Functions", "Data", "Canvas Apps", "CRUD Operations"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-apps/maker/canvas-apps/delegation-overview",
    title: "Understanding Delegation in Power Apps",
    description: "Learn about delegation in Power Apps, how to work with large data sets efficiently, and which functions and data sources support delegation to avoid performance issues.",
    category: "Power Apps",
    tags: ["Delegation", "Performance", "Data Sources", "Best Practices"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-apps/maker/model-driven-apps/create-business-rules",
    title: "Create Business Rules in Model-Driven Apps",
    description: "Apply business logic without writing code using business rules. Set field values, show or hide fields, and validate data based on conditions in model-driven apps.",
    category: "Power Apps",
    tags: ["Business Rules", "Model-Driven Apps", "No-Code", "Validation"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-automate/desktop-flows/introduction",
    title: "Introduction to Power Automate Desktop Flows",
    description: "Automate repetitive desktop tasks with Power Automate Desktop. Record and playback user actions, integrate with web and desktop applications, and build RPA solutions.",
    category: "Power Automate",
    tags: ["Desktop Flows", "RPA", "Automation", "Process Automation"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-automate/error-handling",
    title: "Error Handling in Power Automate",
    description: "Implement robust error handling in your flows using Configure Run After, Try-Catch patterns, and scope actions to build reliable automated processes.",
    category: "Power Automate",
    tags: ["Error Handling", "Best Practices", "Reliability", "Troubleshooting"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-automate/approval-attachments",
    title: "Working with Approvals in Power Automate",
    description: "Build approval workflows with attachments, custom responses, and multiple approvers. Learn best practices for implementing business approval processes.",
    category: "Power Automate",
    tags: ["Approvals", "Workflows", "Business Processes", "Collaboration"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-bi/create-reports/service-dashboards",
    title: "Create Dashboards in Power BI",
    description: "Design effective Power BI dashboards by pinning visualizations from reports. Learn how to create a single-page view of your most important metrics and KPIs.",
    category: "Power BI",
    tags: ["Dashboards", "Visualization", "Reporting", "KPIs"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-bi/transform-model/desktop-query-overview",
    title: "Power Query Editor in Power BI",
    description: "Transform and shape your data using Power Query Editor. Learn M language basics, data transformation techniques, and best practices for data preparation.",
    category: "Power BI",
    tags: ["Power Query", "Data Transformation", "M Language", "ETL"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-bi/create-reports/desktop-conditional-format-visual-titles",
    title: "Dynamic Visual Titles in Power BI",
    description: "Create dynamic, expression-based titles for your Power BI visuals that change based on filters, slicers, or calculations to provide context-aware reporting.",
    category: "Power BI",
    tags: ["Visualization", "Dynamic Content", "DAX", "Formatting"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-pages/getting-started/what-is-power-pages",
    title: "Introduction to Power Pages",
    description: "Build secure, enterprise-grade websites with Power Pages. Create external-facing sites that allow users outside your organization to interact with data stored in Dataverse.",
    category: "Power Pages",
    tags: ["Web Development", "External Sites", "Dataverse", "Low-Code"]
  },
  {
    url: "https://learn.microsoft.com/en-us/power-pages/configure/web-api-overview",
    title: "Power Pages Web API",
    description: "Use the Web API in Power Pages to perform CRUD operations on Dataverse tables. Build interactive web experiences with client-side data access.",
    category: "Power Pages",
    tags: ["Web API", "JavaScript", "Dataverse", "Integration"]
  },
  {
    url: "https://learn.microsoft.com/en-us/exchange/clients-and-mobile-in-exchange-online/outlook-on-the-web/enable-disable-employee-access-new-outlook-web-app",
    title: "Manage Outlook on the Web Access",
    description: "Configure and manage user access to Outlook on the Web (OWA). Control features, policies, and authentication methods for web-based email access.",
    category: "Exchange",
    tags: ["Outlook Web App", "Access Control", "Policies", "Administration"]
  },
  {
    url: "https://learn.microsoft.com/en-us/exchange/security-and-compliance/mail-flow-rules/mail-flow-rules",
    title: "Mail Flow Rules in Exchange Online",
    description: "Create transport rules to automatically process messages based on conditions. Implement DLP, compliance, and routing policies for your organization's email.",
    category: "Exchange",
    tags: ["Mail Flow", "Transport Rules", "Compliance", "Security"]
  },
  {
    url: "https://learn.microsoft.com/en-us/onedrive/use-group-policy",
    title: "OneDrive Group Policy Management",
    description: "Deploy and manage OneDrive sync client settings using Group Policy Objects (GPOs). Configure sync behavior, storage limits, and user experience across your organization.",
    category: "OneDrive",
    tags: ["Group Policy", "Sync Client", "Administration", "Configuration"]
  },
  {
    url: "https://learn.microsoft.com/en-us/onedrive/sync-vdi-support",
    title: "OneDrive Sync in Virtual Desktop Environments",
    description: "Implement OneDrive Files On-Demand in VDI environments like Azure Virtual Desktop, Citrix, and VMware. Optimize performance and user experience in virtual scenarios.",
    category: "OneDrive",
    tags: ["VDI", "Files On-Demand", "Virtual Desktop", "Azure Virtual Desktop"]
  },
  {
    url: "https://learn.microsoft.com/en-us/microsoft-365/admin/activity-reports/microsoft365-apps-usage",
    title: "Microsoft 365 Apps Usage Reports",
    description: "Monitor and analyze Microsoft 365 Apps usage across your organization. Track activation, usage patterns, and version distribution to optimize license management.",
    category: "Microsoft 365",
    tags: ["Reporting", "Analytics", "License Management", "Usage Metrics"]
  },
  {
    url: "https://learn.microsoft.com/en-us/microsoft-365/admin/setup/customize-sign-in-page",
    title: "Customize the Microsoft 365 Sign-in Page",
    description: "Brand your organization's sign-in experience by customizing the Microsoft 365 sign-in page with your logo, background image, and text to create a consistent user experience.",
    category: "Microsoft 365",
    tags: ["Branding", "User Experience", "Authentication", "Customization"]
  },
  {
    url: "https://learn.microsoft.com/en-us/purview/sensitivity-labels",
    title: "Microsoft Purview Sensitivity Labels",
    description: "Protect your organization's data with sensitivity labels. Classify and protect documents and emails based on their sensitivity level with encryption, content marking, and access restrictions.",
    category: "Security & Compliance",
    tags: ["Data Protection", "Classification", "Encryption", "Information Protection"]
  },
  {
    url: "https://learn.microsoft.com/en-us/purview/dlp-learn-about-dlp",
    title: "Data Loss Prevention in Microsoft Purview",
    description: "Prevent accidental sharing of sensitive information with DLP policies. Monitor, protect, and remediate risky activities across Microsoft 365 services and endpoints.",
    category: "Security & Compliance",
    tags: ["DLP", "Data Protection", "Compliance", "Security Policies"]
  },
  {
    url: "https://learn.microsoft.com/en-us/purview/retention",
    title: "Retention Policies and Labels",
    description: "Implement retention policies to automatically retain or delete content based on your organization's requirements. Ensure compliance with legal and regulatory obligations.",
    category: "Security & Compliance",
    tags: ["Retention", "Compliance", "Records Management", "Governance"]
  },
  {
    url: "https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview",
    title: "Microsoft Entra Conditional Access",
    description: "Implement intelligent access policies that analyze signals like user, device, location, and risk to make real-time access decisions and protect your organization's resources.",
    category: "Security & Compliance",
    tags: ["Conditional Access", "Zero Trust", "Identity", "Security"]
  }
];
