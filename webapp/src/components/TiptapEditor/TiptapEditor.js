import { useState, useEffect } from 'react';
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

export default function TiptapEditor(props) {

    const { setContent } = props;

    const [editorContent, setEditorContent] = useState('');

    const editor = useEditor({
        extensions: [
            StarterKit,
            Placeholder.configure({
                emptyEditorClass: 'is-editor-empty',
                placeholder: props.placeholder,
            }),
        ],
        onUpdate({ editor }) {
            setEditorContent(editor.getHTML());
            setContent(editor.getHTML());
        },
    });

    return (
        <EditorContent editor={editor} />
    );

}






