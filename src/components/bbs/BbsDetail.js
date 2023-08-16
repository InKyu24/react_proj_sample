import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SummerNote from "../SummerNote";

const BbsDetail= () => {
    const [bbs, setBbs] = useState({});
    const { seq } = useParams();
    const navigate = useNavigate();
    useEffect(() => {  
        const getBbs = (seq) => {
            axios.get(
                "http://localhost:3000/bbsdetail", { params: { seq: seq } }
            ).then((result) => {
                setBbs(result.data);
            }).catch((error) => {
                console.error(error);
            });
        };
        getBbs(seq);
    }, [seq]);

    const handleAnswerBtn = () => {
        navigate(`/bbsanswer/${seq}`);
    };

    const handleModifyBtn = () => {
        navigate(`/bbsmodify/${seq}`);
    };

    const handleRemoveBtn = () => {
        const confirmResult = window.confirm('삭제하시겠습니까?');
        if(confirmResult)  {
            const removedBbs = { ...bbs, del: 1 };
            axios.post("http://localhost:3000/bbsupdate", removedBbs)
                .then((response) => {
                if (response.data === "YES") {
                    navigate("/bbslist");
                } else {
                    alert("글쓰기 실패");
                }
            }).catch((error) => {
                console.error(error);
                alert("글쓰기 실패");
            });
        }
    };

    return (
        <div>
            <h1>BbsDetail</h1>
            <p>조회할 게시물 번호: {seq}</p>

            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td>작성자</td>
                        <td>{bbs.id}</td>
                    </tr>
                    <tr>
                        <td>작성일</td>
                        <td>{bbs.wdate}</td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td>{bbs.title}</td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <SummerNote showToolBar={false} disabled={true} content={bbs.content} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary mx-1' onClick={handleAnswerBtn}>답변</button>
                <button className='btn btn-primary mx-1' onClick={handleModifyBtn}>수정</button>
                <button className='btn btn-primary mx-1' onClick={handleRemoveBtn}>삭제</button>
            </div>

        </div>
    );
}

export default BbsDetail;