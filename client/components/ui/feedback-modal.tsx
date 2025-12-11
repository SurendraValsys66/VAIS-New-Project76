import { useState } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Bold, Italic, Strikethrough, Link, List, ListOrdered, Code } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const ratingEmojis = [
  { value: 1, emoji: "😑", label: "Very Bad" },
  { value: 2, emoji: "😕", label: "Bad" },
  { value: 3, emoji: "😐", label: "Neutral" },
  { value: 4, emoji: "🙂", label: "Good" },
  { value: 5, emoji: "😄", label: "Excellent" },
];

export function FeedbackModal({ open, onOpenChange }: FeedbackModalProps) {
  const [rating, setRating] = useState<number | null>(3);
  const [comment, setComment] = useState("");

  const handleSendFeedback = () => {
    if (!rating || !comment.trim()) {
      alert("Please provide a rating and comment");
      return;
    }

    console.log("Feedback submitted:", { rating, comment });
    setRating(3);
    setComment("");
    onOpenChange(false);
  };

  const insertFormatting = (format: string) => {
    const textarea = document.getElementById("feedback-textarea") as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = comment.substring(start, end);
    let newText = comment;
    let cursorPos = start;

    switch (format) {
      case "bold":
        newText = comment.substring(0, start) + `**${selectedText}**` + comment.substring(end);
        cursorPos = start + 2 + selectedText.length + 2;
        break;
      case "italic":
        newText = comment.substring(0, start) + `*${selectedText}*` + comment.substring(end);
        cursorPos = start + 1 + selectedText.length + 1;
        break;
      case "strikethrough":
        newText = comment.substring(0, start) + `~~${selectedText}~~` + comment.substring(end);
        cursorPos = start + 2 + selectedText.length + 2;
        break;
      case "link":
        newText = comment.substring(0, start) + `[${selectedText || "link"}](url)` + comment.substring(end);
        cursorPos = start + 1 + (selectedText || "link").length + 3;
        break;
      case "list":
        newText = comment.substring(0, start) + `\n- ${selectedText}\n` + comment.substring(end);
        cursorPos = start + 3 + selectedText.length;
        break;
      case "ordered-list":
        newText = comment.substring(0, start) + `\n1. ${selectedText}\n` + comment.substring(end);
        cursorPos = start + 4 + selectedText.length;
        break;
      case "code":
        newText = comment.substring(0, start) + `\`${selectedText}\`` + comment.substring(end);
        cursorPos = start + 1 + selectedText.length + 1;
        break;
    }

    setComment(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
    }, 0);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg bg-white">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 -mx-6 px-6">
          <h2 className="text-xl font-semibold text-gray-900">Feedback</h2>
        </div>

        <div className="space-y-6">
          {/* Rating Section */}
          <div className="space-y-3 text-center">
            <h3 className="text-xl font-bold text-gray-900">
              How do you rate the quality of the swap?
            </h3>
            <p className="text-sm text-gray-600">
              Please rate so we can improve the quality of our service
            </p>

            {/* Emoji Rating */}
            <div className="flex justify-center items-center gap-4 py-4">
              {ratingEmojis.map((item) => (
                <button
                  key={item.value}
                  onClick={() => setRating(item.value)}
                  className={cn(
                    "transition-all duration-200 transform hover:scale-110",
                    rating === item.value
                      ? "scale-150 bg-valasys-orange rounded-full p-2"
                      : "scale-100 hover:scale-120 opacity-70 hover:opacity-100"
                  )}
                  title={item.label}
                >
                  <span className="text-4xl">{item.emoji}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Formatting Toolbar */}
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="flex items-center gap-1 p-2 bg-gray-50 border-b border-gray-200">
              <FormatButton
                icon={Bold}
                onClick={() => insertFormatting("bold")}
                title="Bold"
              />
              <FormatButton
                icon={Italic}
                onClick={() => insertFormatting("italic")}
                title="Italic"
              />
              <FormatButton
                icon={Strikethrough}
                onClick={() => insertFormatting("strikethrough")}
                title="Strikethrough"
              />
              <FormatButton
                icon={Link}
                onClick={() => insertFormatting("link")}
                title="Link"
              />
              <FormatButton
                icon={List}
                onClick={() => insertFormatting("list")}
                title="Bullet List"
              />
              <FormatButton
                icon={ListOrdered}
                onClick={() => insertFormatting("ordered-list")}
                title="Ordered List"
              />
              <FormatButton
                icon={Code}
                onClick={() => insertFormatting("code")}
                title="Code"
              />
            </div>

            {/* Textarea */}
            <textarea
              id="feedback-textarea"
              placeholder="Add a comment..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-4 text-sm text-gray-900 placeholder-gray-400 resize-none focus:outline-none min-h-32"
            />
          </div>

          {/* Send Button */}
          <Button
            onClick={handleSendFeedback}
            className="w-full bg-valasys-orange hover:bg-valasys-orange/90 text-white font-semibold py-2 rounded-lg transition-colors"
          >
            Send Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

interface FormatButtonProps {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  title: string;
}

function FormatButton({ icon: Icon, onClick, title }: FormatButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-200 rounded transition-colors text-gray-700 hover:text-gray-900"
      title={title}
      type="button"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
