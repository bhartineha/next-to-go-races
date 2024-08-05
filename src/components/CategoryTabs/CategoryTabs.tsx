import React, { useState } from "react";
import styles from "./CategoryTabs.module.css";
import { Category, CategoryTabsProps } from "./CategoryTabs.types";

const categories: Category[] = [
  { id: null, label: "All", iconSrc: "/images/all.png" },
  {
    id: "4a2788f8-e825-4d36-9894-efd4baf1cfae",
    label: "Horse Racing",
    iconSrc: "/images/horse.png",
  },
  {
    id: "9daef0d7-bf3c-4f50-921d-8e818c60fe61",
    label: "Greyhounds",
    iconSrc: "/images/grayhound.png",
  },
  {
    id: "161d9be2-e909-4326-8c2c-35ed71fb460b",
    label: "Harness",
    iconSrc: "/images/harness.png",
  },
];

const CategoryTabs: React.FC<CategoryTabsProps> = ({ setCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCategory(category);
  };

  return (
    <div className={styles.categoryTabs}>
      {categories.map((category) => (
        <button
          key={category.id}
          className={`${styles.tab} ${
            selectedCategory === category.id ? styles.selected : ""
          }`}
          onClick={() => handleCategoryChange(category.id)}
        >
          <img src={category.iconSrc} alt={category.label} />
          {category.label}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
