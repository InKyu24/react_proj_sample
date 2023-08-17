import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from "axios";

function Cfr() {
    const [select, setSelect] = useState('celebrity');
    const [resp, setResp] = useState('');

    const selectHandler = (e) => {
        setSelect(e.target.value);
    }
    const webcamRef = useRef(null);
    
    const showCam = () => {
        setResp('');
    }

    const getPicture = async () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const response = await fetch(imageSrc);
        const blob = await response.blob();
        return blob;
    }
    const onSubmit = (e) => {
        e.preventDefault();
        let formData = new FormData();
        getPicture().then(blob => {
            console.log(blob);
            formData.append('uploadFile', blob, 'captured.jpg');
            formData.append('select', select);
            setResp('결과 : ');
            return formData;
        }).then(formData => {
            axios.post(process.env.REACT_APP_BACKEND_SERVER + '/fileUpload', formData)
                .then(res => {
                    console.log(res);
                    setResp('결과 : ' + res);
                }).catch(err => {
                    console.error(err);
                    alert('error');
                })
        }).catch(err => {
            console.error(err);
        });
    }

    return (
        <div>
            <h1>CFR</h1>
            <br />
            <form name="frm" onSubmit={onSubmit} encType="multipart/form-data">
                <select className="form-control form-select-lg w-25 d-inline" onChange={selectHandler}>
                    <option value="celebrity">유명인 인식</option>
                    <option value="face">얼굴 감지</option>
                </select>
                <button className="btn btn-lg btn-dark ml-5" type='submit'>Capture</button>
                {resp === ''? 
                    <>
                        <br />
                        <Webcam
                            audio={false}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    </>
                    :
                    <button className="btn btn-lg btn-dark ml-5" type='button' onClick={showCam}>카메라 보기</button>
                }
                
            </form>
        </div>
    );
}

export default Cfr;