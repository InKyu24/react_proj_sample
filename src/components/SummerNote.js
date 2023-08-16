import React from 'react';
import ReactSummernote from "react-summernote";

function SummerNote({ showToolBar, onContentChange, disabled, content}) {
    let toolbar = showToolBar ? 
        [
            ["style", ["style"]],
            ["font", ["bold", "underline", "clear"]],
            ['fontsize', ['fontsize']],
            ["fontname", ["fontname"]],
            ["para", ["ul", "ol", "paragraph"]],
            ["table", ["table"]],
            ["insert", ["link", "picture", "video"]],
            ["view", ["fullscreen", "codeview"]],
        ] : 
        [];

    return (
        <ReactSummernote
            value={content}
            options={{
                placeholder: "내용을 입력하세요",
                height: 300,
                dialogsInBody: true,
                toolbar: toolbar,
            }}
            disabled={disabled}
            onChange={onContentChange}
        />
    );
}

export default SummerNote;