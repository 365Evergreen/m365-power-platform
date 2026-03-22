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

export interface Article {
  id: string;
  url: string;
  title: string;
  description: string;
  category: Category;
  tags: string[];
  dateAdded: string;
}
