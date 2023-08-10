import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BbsDetail= () => {
    const [bbs, setBbs] = useState({});
    const { seq } = useParams();
    const getBbs = () => {
        axios.get(
            "http://localhost:3000/bbsdetail", { params: {seq: seq} }
        ).then((result) => {
            console.log(result);
            setBbs(result.data);
        }).catch((error) => {
            console.log(error);
        });
    };

    useEffect(() => {
        getBbs();
    }, []);

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
                        <td>{bbs.content}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default BbsDetail;