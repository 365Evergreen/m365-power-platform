export type Category = 
  | "SharePoint"
  | "Teams"
  | "Power Apps"
  | "Power Automate"
  | "Power BI"
  | "Power Pages"
  | "Exchange"
  | "OneDrive"
  | "Microsoft 365"
  | "Security & Compliance"
  | "Other";

export type ArticleSourceType = "external" | "internal";

export interface Article {
  id: string;
  url: string;
  sourceType?: ArticleSourceType;
  content?: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  dateAdded: string;
}
