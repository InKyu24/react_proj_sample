import React from 'react';
import ReactSummernote from "react-summernote";

function SummerNote() {
    return (
        <ReactSummernote
            options={{
                placeholder: "내용을 입력하세요",
                height: 300,
                dialogsInBody: true,
                toolbar: [
                    ["style", ["style"]],
                    ["font", ["bold", "underline", "clear"]],
                    ['fontsize', ['fontsize']],
                    ["fontname", ["fontname"]],
                    ["para", ["ul", "ol", "paragraph"]],
                    ["table", ["table"]],
                    ["insert", ["link", "picture", "video"]],
                    ["view", ["fullscreen", "codeview"]],
                ],
            }}
            onChange={(e) => console.log(e)}
        />
    );
}

export default SummerNote;