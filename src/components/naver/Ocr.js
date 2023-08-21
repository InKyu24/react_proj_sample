import { useState } from "react";
import axios from "axios";

function Ocr() {
    const [result, setResult] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('uploadFile', document.frm.uploadFile.files[0]);

        //send
        axios.post(process.env.REACT_APP_BACKEND_SERVER + '/naver/ocr', formData)
            .then(res => {
                console.log(res);
                setResult(res.data);
            }).catch(err => {
                console.error(err);
            })
    }
    
    return ( 
        <div>
            <h1>OCR</h1>
            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                <input type="file" name="uploadFile" accept="*" />
                <button type="submit" className="btn btn-primary">파일 전송</button>
            </form>
            <br />
            결과 : {result}
        </div>
    );
}

export default Ocr;