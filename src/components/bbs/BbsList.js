import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import './BbsList.css';
import Pagination from "react-js-pagination";

const BbsList = () => {
    const [bbslist, setBbslist] = useState([]);
    const [searchObj, setSearchObj] = useState({
        choice: 'title',
        search: ''
    });
    const [pageNum, setPageNum] = useState(1);
    const [totalPosts, setTotalPosts] = useState(0);

    const handlePageChange = (pageNumber) => {
        setPageNum(pageNumber);
    };

    const searchBtnHandler = () => {
        console.log(searchObj);
        if (searchObj.choice === '' || searchObj.search.trim() === '') {
            alert('검색 조건을 선택해주세요.');
            return;
        }
        setPageNum(1);
    };

    useEffect(() => {
        const getBbslist = () => {
            axios.get(
                "http://localhost:3000/bbslist",
                {
                    params: {
                        choice: searchObj.choice,
                        search: searchObj.search,
                        pageNumber: pageNum - 1
                    }
                }
            )
                .then((result) => {
                    setBbslist(result.data.bbslist);
                    setTotalPosts(result.data.cnt);
                }).catch((error) => {
                    console.log(error);
                });
        };

        getBbslist();
    }, [pageNum, searchObj]);


    return (
        <div>
            <div className='d-flex justify-content-end'>
                <select className='form-select w-auto' onChange={(e) => {
                    setSearchObj({
                        ...searchObj,
                        choice: e.target.value
                    });
                }}>
                    <option value='title'>제목</option>
                    <option value='content'>내용</option>
                    <option value='writer'>작성자</option>
                </select>
                <input className='form-control w-25' type='text' onChange={(e) => {
                    setSearchObj({
                        ...searchObj,
                        search: e.target.value
                    });
                }} />
                <button className='btn btn-primary' onClick={() => {
                    searchBtnHandler();
                }}>검색</button>
            </div>

            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>제목</th>
                        <th>조회수</th>
                        <th>작성자</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        bbslist.map((bbs, index) =>
                        (
                            <TableRow key={index + 1} num={index + 1} bbs={bbs} />
                        )
                        )
                    }
                </tbody>
            </table>
            <div className='my-5 d-flex justify-content-center'>
                <Link className='btn btn-primary' to="/bbswrite">글쓰기</Link>
            </div>
            <div>
                <Pagination
                    itemClass="page-item"
                    linkClass="page-link"
                    activePage={pageNum}
                    itemsCountPerPage={10}
                    totalItemsCount={totalPosts}
                    pageRangeDisplayed={5}
                    prevPageText={"이전"}
                    nextPageText={"다음"}
                    onChange={handlePageChange}
                />
            </div>
        </div>
    );
}
export default BbsList;

// inner components
function TableRow({ bbs, num }) {
    if (bbs.del === 0) {
        return <NormalTableRow bbs={bbs} num={num} />;
    } else {
        return <RemovedTableRow />;
    }
}

function NormalTableRow({ bbs, num }) {
    const getArrow = (depth) => {
        let arrow = '';
        for (let i = 0; i < depth; i++) {
            arrow += 'ㄴ';
        }
        arrow += ' ';
        return arrow;
    }

    return (
        <tr>
            <td>{num}</td>
            <td className="underline">
                {getArrow(bbs.depth)}
                <Link to={`/bbsdetail/${bbs.seq}`}>
                    {bbs.title}
                </Link>
            </td>
            <td>{bbs.readcount}</td>
            <td>{bbs.id}</td>
        </tr>
    );
}
function RemovedTableRow() {
    return (
        <tr>
            <td colSpan={4} className='text-center'>이 글은 사용자에 의해 삭제되었습니다. </td>
        </tr>
    );
}