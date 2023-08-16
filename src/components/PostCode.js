import { useState } from "react";
import Post from "./Post";

function PostCode() {
    const [enrollCompany, setEnrollCompany] = useState({ addressDetail: "", zonecode:"" });
    const [popUp, setPopUp] = useState(false);
    const handleInput = (e) => {
        setEnrollCompany({ ...enrollCompany, [e.target.name]: e.target.value });
    };

    const handlePost = () => {
        setPopUp(true);
    };
    const handleClose = (data) => {
        setPopUp(data);
    };

    return (
        <div className="container">
            <input placeholder="상세주소" name="address" value={enrollCompany.addressDetail} onChange={handleInput} />
            <input placeholder="우편번호" name="postalCode" value={enrollCompany.zonecode} onChange={handleInput} />
            <button onClick={handlePost}>우편번호 찾기</button>

            {popUp && <Post onClose={handleClose} company={enrollCompany} setCompany={setEnrollCompany} popUp={popUp} />}
        </div>
    );
}

export default PostCode;