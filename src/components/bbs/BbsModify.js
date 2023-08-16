import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ReactSummernote from "react-summernote";

const BbsModify = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [author, setAuthor] = useState('');
    const { seq } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const onContentChange = (e) => {
        setContent(e);
    };

    const onSubmit = async () => {
        setLoading(true);
        let bbs = {
            seq: seq,
            id: author,
            title: title,
            content: content
        };
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
                console.log(result.data);
                setTitle(result.data.title);
                setContent(result.data.content);
                setAuthor(result.data.id);
                
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
                        <td><input type='text' className='form-control' disabled name="id" value={author} /></td>
                    </tr>
                    <tr>
                        <td>제목</td>
                        <td><input type='text' className='form-control' onChange={onTitleChange} disabled={loading} name="title" value={title} /></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td>
                            <td>
                                <ReactSummernote
                                    value={content}
                                    options={{
                                        height: 300,
                                        dialogsInBody: true,
                                        toolbar: [
                                            ["style", ["style"]],
                                            ["font", ["bold", "underline", "clear"]],
                                            ['fontsize', ['fontsize']],
                                            ["fontname", ["fontname"]],
                                            ["para", ["ul", "ol", "paragraph"]],
                                            ["table", ["table"]],
                                            ["insert", ["link", "picture", "video"]],
                                            ["view", ["fullscreen", "codeview"]],
                                        ],
                                    }}
                                    disabled={loading}
                                    name="content"
                                    onChange={onContentChange}
                                />
                            </td>
                        </td>
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