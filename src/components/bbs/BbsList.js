import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './BbsList.css';

const BbsList = () => {
    const [bbslist, setBbslist] = useState([]);

    const getBbslist = () => {
        axios.get(
            "http://localhost:3000/bbslist",
            {
                params: {
                    choice:'',
                    search:'',
                    pageNumber:0
                }
            }
        )
        .then((result) => {
            setBbslist(result.data.bbslist);
        }).catch((error) => {
            console.log(error);
        }); 
    };
    useEffect(() => {
        getBbslist();
    }, []);


    return (
        <div>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bbslist.map((bbs, index) => 
                            (
                                <TableRow key={index+1} num={index+1} bbs={bbs}/>
                            )
                        )
                    }
                </tbody>
            </table>
            <div className='my-5 d-flex justify-content-center'>
                <Link className='btn btn-primary' to="/bbswrite">글쓰기</Link>
            </div>
        </div>
    );
}

export default BbsList;

function TableRow({ bbs, num }) {
    return (
        <tr>
            <td>{num}</td>
            <td className="underline">
                <Link to={`/bbsdetail/${bbs.seq}`}>
                    {bbs.title}
                </Link>
            </td>
            <td>{bbs.id}</td>
        </tr>
    );
}