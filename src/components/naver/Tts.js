import axios from "axios";
import React, { useState } from "react";

function Tts() {
    const [text, setText] = useState('');
    const [audioUrl, setAudioUrl] = useState('');

    const handleGetSpeech = () => {
        axios.post(process.env.REACT_APP_BACKEND_SERVER + '/naver/tts', null, {
            params: { message: text },
            responseType: 'blob'
        }).then(res => {
            const blobData = res.data;
            const audioBlob = new Blob([blobData], { type: 'audio/wav' });

            const audioBlobUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioBlobUrl);
        }).catch(err => {
            console.error(err);
        })
    }

    return (
        <div>
            <h1>TTS</h1>
            <input type="text" value={text} onChange={(e)=>setText(e.target.value)} />
            <button className="btn btn-primary" onClick={handleGetSpeech}>Start</button>

            {audioUrl && (
                <audio controls>
                    <source  src={audioUrl} type="audio/wav" />
                </audio>
            )}
        </div>
    );
}

export default Tts;