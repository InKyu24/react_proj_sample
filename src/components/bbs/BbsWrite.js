import { useState } from "react";
import axios from "axios";

const BbsWrite = () => {
    const [bbs, setBbs] = useState({
        id: '',
        title: '',
        content: ''
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setBbs({
            ...bbs,
            [name]: value
        });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(bbs);
        axios.post("http://localhost:3000/bbswrite", bbs)
            .then((result) => {
                console.log(result);
                alert('저장되었습니다.');
            }).catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <h3>게시판 글쓰기</h3>
            <form>
                <table className='table table-bordered'>
                    <tbody>
                        <tr>
                            <td>작성자</td>
                            <td><input type='text' className='form-control' onChange={onChange} name="id" /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td><input type='text' className='form-control' onChange={onChange} name="title" /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><textarea className='form-control' rows='5' onChange={onChange} name="content" /></td>
                        </tr>
                    </tbody>
                </table>
                <div className='d-flex justify-content-center'>
                    <button className='btn btn-primary' onClick={onSubmit}>저장</button>
                </div>
            </form>
        </div>
    );
}
export default BbsWrite;