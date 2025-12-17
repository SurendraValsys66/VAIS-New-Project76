import React from "react";
import { TitleBlock } from "../types";
import { Edit2 } from "lucide-react";

interface TitleBlockComponentProps {
  block: TitleBlock;
  isSelected: boolean;
  isEditing: boolean;
  onEdit: () => void;
  onContentChange: (content: string) => void;
}

export const TitleBlockComponent: React.FC<TitleBlockComponentProps> = ({
  block,
  isSelected,
  isEditing,
  onEdit,
  onContentChange,
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit();
  };

  return (
    <div
      className={`relative p-4 transition-all cursor-pointer user-select-none ${
        isSelected ? "ring-2 ring-valasys-orange" : ""
      }`}
      onClick={handleClick}
      style={{ userSelect: "none" }}
    >
      {isEditing ? (
        <textarea
          value={block.content}
          onChange={(e) => onContentChange(e.target.value)}
          autoFocus
          className="w-full border border-valasys-orange rounded px-2 py-1 font-serif"
          style={{
            fontSize: `${block.fontSize}px`,
            color: block.fontColor,
            backgroundColor: block.backgroundColor,
            textAlign: block.alignment as any,
            fontWeight: block.fontWeight as any,
            userSelect: "text",
          }}
        />
      ) : (
        <h1
          style={{
            fontSize: `${block.fontSize}px`,
            color: block.fontColor,
            backgroundColor: block.backgroundColor,
            textAlign: block.alignment as any,
            fontWeight: block.fontWeight as any,
            margin: 0,
            padding: "8px",
            userSelect: "none",
          }}
        >
          {block.content}
        </h1>
      )}
      {isSelected && !isEditing && (
        <div className="absolute top-1 right-1 bg-valasys-orange text-white p-1 rounded">
          <Edit2 className="w-3 h-3" />
        </div>
      )}
    </div>
  );
};
