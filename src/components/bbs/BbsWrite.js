import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BbsWrite = () => {
    const navigate = useNavigate();

    const [bbs, setBbs] = useState({
        id: '',
        title: '',
        content: ''
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setBbs({
            ...bbs,
            [name]: value
        });
    };

    const validationCheck = () => {
        if (bbs.id.trim() === '') {
            alert('작성자를 입력하세요');
            return false;
        }
        if (bbs.title.trim() === '') {
            alert('제목을 입력하세요');
            return false;
        }
        if (bbs.content.trim() === '') {
            alert('내용을 입력하세요');
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        setLoading(true);
        if (validationCheck()) {
            try {
                const response = await axios.post("http://localhost:3000/bbswrite", bbs);
                if (response.data === "YES") {
                    navigate("/bbslist");
                } else {
                    alert("글쓰기 실패");
                }
            } catch (error) {
                console.log(error);
                alert("글쓰기 실패");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <h3>게시판 글쓰기</h3>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td>작성자</td>
                        <td><input type='text' className='form-control' onChange={onChange} disabled={loading} name="id" /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onChange} disabled={loading} name="title" /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea className='form-control' rows='5' onChange={onChange} disabled={loading} name="content" /></td>
                    </tr>
                </tbody>
            </table>
            <div className='d-flex justify-content-center'>
                <button className='btn btn-primary' onClick={onSubmit} disabled={loading}>
                    {loading ? "저장 중..." : "저장"}
                </button>
            </div>
        </div>
    );
}
export default BbsWrite;