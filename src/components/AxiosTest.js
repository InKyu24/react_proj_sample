import axios from "axios";
import { useState } from "react";

function AxiosTest() {
    const [result, setResult] = useState('');
    const [inputValue, setInputValue] = useState('');
    // axios로 데이터를 요청하는 방식
    
    const a = () => {
        // axios.get('http://localhost:3000/api/getRequest?name=홍길동&age=30')
        axios.get(process.env.REACT_APP_BACKEND_SERVER+"/api/getRequest", 
            {
                params: {
                    name: '홍길동',
                    age: 30
                }
            }
        ).then((response) => {
            console.log(response);
            setResult("버튼1의 결과 : " + response.data);
        });
    }

    const b = () => {
        // axios.post('http://localhost:3000/api/postRequest')
        // 반드시 @RequestBody를 사용해야 한다.
        axios.post(process.env.REACT_APP_BACKEND_SERVER+"/api/postRequest",
            {
                name: '홍길동',
                age: 30
            }
        ).then((response) => {
            console.log(response);
            setResult("버튼2의 결과 : " + response.data);
        });
    }

    const c = () => {
        // axios.get('http://localhost:3000/api/getRequest_jsonResponse')
        // 반드시 @RequestBody를 사용해야 한다.
        axios.get(process.env.REACT_APP_BACKEND_SERVER+"/api/getRequest_jsonResponse")
        .then((response) => {
            console.log(response);
            setResult("버튼3의 결과 : " + JSON.stringify(response.data));
        });
    };

    const d = () => {
        // axios.post('http://localhost:3000/api/postRequest_withFormData')
        const formData = new FormData();
        formData.append('name', '홍길동');
        formData.append('age', 30);
        axios.post(process.env.REACT_APP_BACKEND_SERVER+"/api/postRequest_withFormData",formData)
        .then((response) => {
            console.log(response);
            setResult("버튼4의 결과 : " + response.data);
        });
    };

    const e = () => {
        // axios.post('http://localhost:3000/api/getRequest_ResponseEntity')
        axios.get(process.env.REACT_APP_BACKEND_SERVER+"/api/getRequest_ResponseEntity?msg="+inputValue)
        .then((response) => {
            console.log(response);
            setResult("버튼5의 결과 : " + JSON.stringify(response.data));
        }).catch((error) => {
            console.log(error.response);
            setResult("버튼5의 결과 : " + error.response.data);
        });
    };

    return (
        <div>
            <h1>Axios Test</h1>
            <div class="card my-3">
                <div class="card-body">
                    <h4 class="card-title">URL로 데이터를 전달하는 방식</h4>
                    <button className="btn btn-primary" onClick={a}>버튼1</button>
                </div>
            </div>

            <div class="card my-3">
                <div class="card-body">
                    <h4 class="card-title">BODY에 담아 데이터를 전달하는 방식</h4>
                <button className="btn btn-primary" onClick={b}>버튼2</button>
                </div>
            </div>

            <div class="card my-3">
                <div class="card-body">
                    <h4 class="card-title">BODY에 담아 데이터를 전달하는 방식 + JSON 객체를 반환</h4>
                    <button className="btn btn-primary" onClick={c}>버튼3</button>
                </div>
            </div>

            <div class="card my-3">
                <div class="card-body">
                    <h4 class="card-title">FormData로 데이터를 전달하는 방식(파일전송에 자주 사용된다)</h4>
                    <button className="btn btn-primary" onClick={d}>버튼4</button>
                </div>
            </div>

            <div class="card my-3">
                <div class="card-body">
                    <h4 class="card-title">ResponseEntity의 사용</h4>
                    <input type="text" className="form-control" placeholder="정상 또는 에러라고 써주세요" value={inputValue} onChange={(e)=>setInputValue(e.target.value)} />
                    <button className="btn btn-primary" onClick={e}>버튼5</button>
                </div>
            </div>
            <br/>
            <br/>
            <p>{result}</p>
        </div>
    );
}

export default AxiosTest;
