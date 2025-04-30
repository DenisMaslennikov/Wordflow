import React, { useCallback, useMemo, useState } from "react";
import {
  createEditor,
  Descendant,
  Transforms,
  Editor,
  Element as SlateElement,
  BaseEditor,
} from "slate";
import {
  Slate,
  Editable,
  withReact,
  useSlate,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { withHistory, HistoryEditor } from "slate-history";
import apiClient from "../../service/apiClient.ts";

import {
  MdFormatBold,
  MdFormatItalic,
  MdFormatUnderlined,
  MdStrikethroughS,
  MdFormatListBulleted,
  MdFormatListNumbered,
  MdFormatAlignLeft,
  MdFormatAlignCenter,
  MdFormatAlignRight,
  MdFormatAlignJustify,
  MdUndo,
  MdRedo,
  MdLink,
  MdCode,
  MdClear,
  MdImage,
} from "react-icons/md";

import { FaYoutube } from "react-icons/fa";
import "./CommentsEditorV1.css";

// Типизация Slate редактора
type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
};

type CustomElement =
  | { type: "paragraph"; align?: string; children: CustomText[] }
  | { type: "heading-one"; align?: string; children: CustomText[] }
  | { type: "heading-two"; align?: string; children: CustomText[] }
  | { type: "bulleted-list"; align?: string; children: CustomElement[] }
  | { type: "numbered-list"; align?: string; children: CustomElement[] }
  | { type: "list-item"; children: CustomText[] }
  | { type: "code-block"; children: CustomText[] }
  | { type: "link"; url: string; children: CustomText[] }
  | { type: "youtube-embed"; videoId: string; children: CustomText[] }
  | { type: "image"; url: string; children: CustomText[] };

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor & HistoryEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

const LIST_TYPES = ["numbered-list", "bulleted-list"];

const Element = ({ attributes, children, element }: RenderElementProps) => {
  const style = { textAlign: (element as any).align || "left" };
  switch (element.type) {
    case "heading-one":
      return (
        <h1 style={style} {...attributes}>
          {children}
        </h1>
      );
    case "heading-two":
      return (
        <h2 style={style} {...attributes}>
          {children}
        </h2>
      );
    case "bulleted-list":
      return (
        <ul style={style} {...attributes}>
          {children}
        </ul>
      );
    case "numbered-list":
      return (
        <ol style={style} {...attributes}>
          {children}
        </ol>
      );
    case "list-item":
      return <li {...attributes}>{children}</li>;
    case "code-block":
      return (
        <pre style={{ background: "#eee", padding: "8px" }} {...attributes}>
          <code>{children}</code>
        </pre>
      );
    case "link":
      return (
        <a
          {...attributes}
          href={(element as any).url}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    case "youtube-embed":
      return (
        <div {...attributes}>
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${(element as any).videoId}`}
            title="YouTube Video"
            frameBorder="0"
            allowFullScreen
          />
          {children}
        </div>
      );
    case "image":
      return (
        <div {...attributes}>
          <img
            src={(element as any).url}
            alt="Uploaded"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          {children}
        </div>
      );
    default:
      return (
        <p style={style} {...attributes}>
          {children}
        </p>
      );
  }
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  if (leaf.bold) children = <strong>{children}</strong>;
  if (leaf.italic) children = <em>{children}</em>;
  if (leaf.underline) children = <u>{children}</u>;
  if (leaf.strikethrough) children = <s>{children}</s>;

  return <span {...attributes}>{children}</span>;
};

type ToolbarButtonProps = {
  icon: React.ElementType;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const ToolbarButton = ({ icon: Icon, onClick }: ToolbarButtonProps) => {
  return (
    <button className="toolbar-button" onMouseDown={onClick}>
      <Icon size={20} />
    </button>
  );
};

type ToolbarProps = {
  blogSlug: string;
};

const Toolbar = ({ blogSlug }: ToolbarProps) => {
  const editor = useSlate();

  const toggleMark = (format: string) => {
    const isActive = isMarkActive(editor, format);
    if (isActive) {
      Editor.removeMark(editor, format);
    } else {
      Editor.addMark(editor, format, true);
    }
  };

  const toggleBlock = (format: string) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
      match: (n) =>
        !Editor.isEditor(n) &&
        SlateElement.isElement(n) &&
        LIST_TYPES.includes(n.type),
      split: true,
    });

    const newType = isActive ? "paragraph" : isList ? "list-item" : format;
    Transforms.setNodes(editor, { type: newType });

    if (!isActive && isList) {
      const block = { type: format, children: [] };
      Transforms.wrapNodes(editor, block);
    }
  };

  const isMarkActive = (editor: Editor, format: string) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
  };

  const isBlockActive = (editor: Editor, format: string) => {
    const [match] = Editor.nodes(editor, {
      match: (n) => SlateElement.isElement(n) && n.type === format,
    });
    return !!match;
  };

  const insertLink = () => {
    const url = window.prompt("Введите URL ссылки");
    if (!url) return;
    const { selection } = editor;
    const link = {
      type: "link",
      url,
      children: [{ text: selection ? Editor.string(editor, selection) : url }],
    };
    Transforms.insertNodes(editor, link);
  };

  const insertYouTube = () => {
    const url = window.prompt("Введите ссылку на YouTube видео");
    if (!url) return;
    let videoId = "";
    if (url.includes("v=")) {
      videoId = url.split("v=")[1].split("&")[0];
    } else if (url.includes("youtu.be/")) {
      videoId = url.split("youtu.be/")[1].split("?")[0];
    }
    if (!videoId) {
      alert("Неверная ссылка на видео");
      return;
    }
    const video = {
      type: "youtube-embed",
      videoId,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, video);
  };

  const insertImage = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = async () => {
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
          const response = await apiClient.post(
            `blog_images/${blogSlug}/images/`,
            formData,
            {
              headers: { "Content-Type": "multipart/form-data" },
            },
          );
          const url = response.data.image;
          const image = {
            type: "image",
            url,
            children: [{ text: "" }],
          };
          Transforms.insertNodes(editor, image);
        } catch (error) {
          console.error("Ошибка загрузки изображения", error);
        }
      }
    };

    input.click();
  };

  const clearFormatting = () => {
    Editor.removeMark(editor, "bold");
    Editor.removeMark(editor, "italic");
    Editor.removeMark(editor, "underline");
    Editor.removeMark(editor, "strikethrough");
  };

  return (
    <div className="toolbar">
      <ToolbarButton icon={MdUndo} onClick={() => editor.undo()} />
      <ToolbarButton icon={MdRedo} onClick={() => editor.redo()} />
      <ToolbarButton icon={MdFormatBold} onClick={() => toggleMark("bold")} />
      <ToolbarButton
        icon={MdFormatItalic}
        onClick={() => toggleMark("italic")}
      />
      <ToolbarButton
        icon={MdFormatUnderlined}
        onClick={() => toggleMark("underline")}
      />
      <ToolbarButton
        icon={MdStrikethroughS}
        onClick={() => toggleMark("strikethrough")}
      />
      <ToolbarButton
        icon={MdFormatListBulleted}
        onClick={() => toggleBlock("bulleted-list")}
      />
      <ToolbarButton
        icon={MdFormatListNumbered}
        onClick={() => toggleBlock("numbered-list")}
      />
      <ToolbarButton
        icon={MdFormatAlignLeft}
        onClick={() => Transforms.setNodes(editor, { align: "left" })}
      />
      <ToolbarButton
        icon={MdFormatAlignCenter}
        onClick={() => Transforms.setNodes(editor, { align: "center" })}
      />
      <ToolbarButton
        icon={MdFormatAlignRight}
        onClick={() => Transforms.setNodes(editor, { align: "right" })}
      />
      <ToolbarButton
        icon={MdFormatAlignJustify}
        onClick={() => Transforms.setNodes(editor, { align: "justify" })}
      />
      <ToolbarButton icon={MdLink} onClick={insertLink} />
      <ToolbarButton icon={FaYoutube} onClick={insertYouTube} />
      <ToolbarButton icon={MdImage} onClick={insertImage} />
      <ToolbarButton icon={MdCode} onClick={() => toggleBlock("code-block")} />
      <ToolbarButton icon={MdClear} onClick={clearFormatting} />
    </div>
  );
};

type RichTextEditorProps = {
  blogSlug?: string;
};

export default function RichTextEditor({ blogSlug = "" }: RichTextEditorProps) {
  const editor = useMemo(() => withHistory(withReact(createEditor())), []);
  const [value, setValue] = useState<Descendant[]>([
    { type: "paragraph", children: [{ text: "Начните писать..." }] },
  ]);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData("text/plain");
    Transforms.insertText(editor, text);
  };

  return (
    <Slate editor={editor} initialValue={value} onChange={setValue}>
      <Toolbar blogSlug={blogSlug} />
      <Editable
        renderElement={(props) => <Element {...props} />}
        renderLeaf={(props) => <Leaf {...props} />}
        placeholder="Введите текст..."
        spellCheck
        autoFocus
        onPaste={handlePaste}
        className="editor"
        style={{ width: "100%" }}
      />
    </Slate>
  );
}
