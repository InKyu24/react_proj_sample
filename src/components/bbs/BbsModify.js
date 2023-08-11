import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BbsModify = () => {
    const [bbs, setBbs] = useState({
        id: '',
        title: '',
        content: ''
    });
    const { seq } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setBbs({
            ...bbs,
            [name]: value
        });
    };

    const onSubmit = async () => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:3000/bbsupdate", bbs);
            if (response.data === "YES") {
                navigate("/bbslist");
            } else {
                alert("글수정 실패");
            }
        } catch (error) {
            console.log(error);
            alert("글수정 실패");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        const getBbs = (seq) => {
            axios.get(
                "http://localhost:3000/bbsdetail", { params: { seq: seq } }
            ).then((result) => {
                setBbs(result.data);
            }).catch((error) => {
                console.log(error);
            });
        };
        getBbs(seq);
    }, [seq]);

    return (
        <div>
            <h3>게시판 글수정</h3>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td>작성자</td>
                        <td><input type='text' className='form-control' onChange={onChange} disabled name="id" value={bbs.id} /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onChange} disabled={loading} name="title" value={bbs.title} /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea className='form-control' rows='5' onChange={onChange} disabled={loading} name="content" value={bbs.content} /></td>
                    </tr>
                </tbody>
            </table>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary' onClick={onSubmit} disabled={loading}>저장</button>
                <button className='btn btn-primary ms-2' onClick={() => navigate("/bbslist")}>취소</button>
            </div>
        </div>
    );
}

export default BbsModify;