import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SummerNote from './../SummerNote';


const BbsWrite = () => {
    const navigate = useNavigate();

    const [author, setAuthor] = useState("");
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
     
    const [loading, setLoading] = useState(false);

    const onAuthorChange = (e) => {
        setAuthor(e.target.value);
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e) => {
        setContent(e);
    }

    const validationCheck = () => {
        if (author.trim() === '') {
            alert('작성자를 입력하세요');
            return false;
        }
        if (title.trim() === '') {
            alert('제목을 입력하세요');
            return false;
        }
        if (content.trim() === '') {
            alert('내용을 입력하세요');
            return false;
        }
        return true;
    };

    const onSubmit = async () => {
        setLoading(true);
        let bbs = {
            id : author,
            title : title,
            content : content
        }
        if (validationCheck()) {
            try {
                const response = await axios.post(process.env.REACT_APP_BACKEND_SERVER+"/bbswrite", bbs);
                if (response.data === "YES") {
                    navigate("/bbslist");
                } else {
                    alert("글쓰기 실패");
                }
            } catch (error) {
                console.error(error);
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
                        <td><input type='text' className='form-control' onChange={onAuthorChange} disabled={loading} name="id" /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onTitleChange} disabled={loading} name="title" /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <SummerNote showToolBar={true} onChange={onContentChange} disabled={loading} />
                        </td>
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