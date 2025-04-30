import React, { useCallback } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Youtube from "@tiptap/extension-youtube";
import TextAlign from "@tiptap/extension-text-align";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";

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

import apiClient from "../../service/apiClient"; // как у тебя
import "./CommentsEditorV3.css";

export default function RichTextEditor({
  blogSlug = "ZkCc1u03Q9ewu-dTgUau2e2SzjL87lMSsX4oskaiNP3jyssdWgDKZFE7FbRq9P407CQZI4ZH",
}: {
  blogSlug: string;
}) {
  const lowlight = createLowlight(common);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bulletList: false,
        orderedList: false,
        listItem: false,
        codeBlock: false,
      }),
      Underline,
      Link,
      Image,
      Youtube.configure({
        width: 560,
        height: 315,
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: "<p>Начните писать...</p>",
  });

  const uploadImage = async () => {
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
          const url: string = response.data.image;

          editor?.chain().focus().setImage({ src: url }).run();
        } catch (error) {
          console.error("Ошибка загрузки изображения", error);
        }
      }
    };

    input.click();
  };

  const addYoutubeVideo = () => {
    const url = window.prompt("Введите ссылку на YouTube видео");
    if (!url) return;
    editor?.chain().focus().setYoutubeVideo({ src: url }).run();
  };

  return (
    <div className="editor-container">
      <div className="toolbar">
        <button onClick={() => editor?.chain().focus().undo().run()}>
          <MdUndo size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().redo().run()}>
          <MdRedo size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleBold().run()}>
          <MdFormatBold size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleItalic().run()}>
          <MdFormatItalic size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleUnderline().run()}>
          <MdFormatUnderlined size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleStrike().run()}>
          <MdStrikethroughS size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          <MdFormatListBulleted size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          <MdFormatListNumbered size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("left").run()}
        >
          <MdFormatAlignLeft size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("center").run()}
        >
          <MdFormatAlignCenter size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("right").run()}
        >
          <MdFormatAlignRight size={20} />
        </button>
        <button
          onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
        >
          <MdFormatAlignJustify size={20} />
        </button>
        <button
          onClick={() => {
            const url = window.prompt("Введите ссылку:");
            if (url) {
              editor?.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <MdLink size={20} />
        </button>
        <button onClick={addYoutubeVideo}>
          <FaYoutube size={20} />
        </button>
        <button onClick={uploadImage}>
          <MdImage size={20} />
        </button>
        <button onClick={() => editor?.chain().focus().toggleCodeBlock().run()}>
          <MdCode size={20} />
        </button>
        <button
          onClick={() =>
            editor?.chain().focus().clearNodes().unsetAllMarks().run()
          }
        >
          <MdClear size={20} />
        </button>
      </div>
      <EditorContent editor={editor} className="editor" />
    </div>
  );
}
