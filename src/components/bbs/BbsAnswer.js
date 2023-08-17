import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import SummerNote from "../SummerNote";

const BbsAnswer = () => {
    const { seq } = useParams();
    const navigate = useNavigate();

    const [parentBbs, setParentBbs] = useState({});
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const [loading, setLoading] = useState(false);

    const onAutherChange = (e) => {
        setAuthor(e.target.value);
    };

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e) => {
        setContent(e);
    };
    useEffect(() => {
        const getParentBbs = (seq) => {
            axios.get(
                process.env.REACT_APP_BACKEND_SERVER+"/bbsdetail", { params: { seq: seq } }
            ).then((result) => {
                setParentBbs(result.data);
            }).catch((error) => {
                console.error(error);
            });
        };
        getParentBbs(seq);
    }, [seq]);

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
        if (validationCheck()) {
            let bbs = {
                id: author,
                title: title,
                content: content,
                seq: seq
            };
            try {
                const response = await axios.get(process.env.REACT_APP_BACKEND_SERVER +"/bbsanswer", { params : bbs });
                if (response.data === "YES") {
                    navigate("/bbslist");
                } else {
                    alert("답변 작성 실패");
                }
            } catch (error) {
                console.error(error);
                alert("답변 작성 실패");
            } finally {
                setLoading(false);
            }
        }
    }

    return (
        <div>
            <h1>BbsAnswer</h1>
            <h3>답변 작성</h3>
            <table className='table table-bordered'>
                <tbody>
                    <tr>
                        <td>작성자</td>
                        <td><input type='text' className='form-control' onChange={onAutherChange} disabled={loading} name="id" /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onTitleChange} disabled={loading} name="title" /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <SummerNote showToolBar={false} disabled={true} content={parentBbs.content} />
                            <SummerNote showToolBar={true} disabled={loading} onContentChange={onContentChange}/>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div className='d-flex justify-content-end'>
                <button className='btn btn-primary' onClick={onSubmit} disabled={loading}>
                    {loading ? "저장 중..." : "저장"}
                </button>
            </div>
        </div>
    );
}

export default BbsAnswer;