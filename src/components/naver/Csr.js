import axios from "axios";
import React, { useState } from "react";
import { ReactMediaRecorder } from 'react-media-recorder';

function Csr() {
    const [resp, setResp] = useState('');
    const onSubmit = (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('uploadFile', document.frm.uploadFile.files[0]);

        //send
        axios.post(process.env.REACT_APP_BACKEND_SERVER +'/naver/csr', formData)
            .then(res => {
                console.log(res);
                setResp(res.data.text);
            }).catch(err => {
                alert('error');
            })
    }

    return (
        <div>
            <h1>STT</h1>
            <ReactMediaRecorder
                audio
                render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
                    <div>
                        <p>{status === 'idle' || status === 'stopped' ? <button className="btn btn-primary" onClick={startRecording}>Start Recording</button> : <button className="btn btn-warning" onClick={stopRecording}>Stop Recording</button>}</p>
                        <br/>
                        {
                            status === 'stopped' && 
                            <>
                                <a href={mediaBlobUrl} download="my_audio.wav">Download</a>
                                <br/>
                                <audio src={mediaBlobUrl} controls />
                            </>
                        }
                    </div>
                )}
            />
            <hr/>
            <h1>음성파일 upload</h1>
            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                <input type="file" name="uploadFile" accept="*" />
                <button type="submit" className="btn btn-primary">파일 전송</button>
            </form>
            <br />
            결과 : {resp}
            <hr />
        </div>
    );
}

export default Csr;
