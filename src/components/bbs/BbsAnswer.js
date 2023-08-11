import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const BbsAnswer = () => {
    const { seq } = useParams();
    const navigate = useNavigate();

    const [parentBbs, setParentBbs] = useState({});
    const [bbs, setBbs] = useState({
        id: '',
        title: '',
        content: '',
        seq: seq
    });
    const [loading, setLoading] = useState(false);

    const onChange = (e) => {
        const { name, value } = e.target;
        setBbs({
            ...bbs,
            [name]: value
        });
    };
    
    useEffect((seq) => {
        const getParentBbs = (seq) => {
            axios.get(
                "http://localhost:3000/bbsdetail", { params: { seq: seq } }
            ).then((result) => {
                setParentBbs(result.data);
            }).catch((error) => {
                console.log(error);
            });
        };
        getParentBbs(seq);
    }, []);

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
                const response = await axios.get("http://localhost:3000/bbsanswer", { params : bbs });
                if (response.data === "YES") {
                    navigate("/bbslist");
                } else {
                    alert("답변 작성 실패");
                }
            } catch (error) {
                console.log(error);
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
                        <td><input type='text' className='form-control' onChange={onChange} disabled={loading} name="id" /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onChange} disabled={loading} name="title" /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <textarea className='form-control' rows='5' value={parentBbs.content} readOnly></textarea>
                            <textarea className='form-control' rows='5' onChange={onChange} disabled={loading} name="content"></textarea>
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