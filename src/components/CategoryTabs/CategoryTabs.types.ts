export interface Category {
  id: string | null;
  label: string;
  iconSrc: string;
}

export interface CategoryTabsProps {
  setCategory: (category: string | null) => void;
}
