import DaumPostcode from "react-daum-postcode";

function Post({ onClose, setCompany, company, popUp }) {

    const postCodeStyle = {
        display: popUp ? "block" : "none",
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "500px",
        height: "500px",
        padding: "7px",
        border: "1px solid #000",
        overflow: "hidden",
    };

    const complete = (data) => {
        let fullAddr = data.address;
        let zonecode = data.zonecode;
        let extraAddr = "";
        if (data.addressType === "R") {
            if (data.bname !== "") {
                extraAddr += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddr +=
                    extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== "" ? ` (${extraAddr})` : "";

            setCompany({ ...company, zonecode: zonecode, addressDetail: fullAddr });
        } else {
            if (data.bname !== "") {
                extraAddr += data.bname;
            }
            if (data.buildingName !== "") {
                extraAddr +=
                    extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
            }
            if (extraAddr !== "") {
                extraAddr = ` (${extraAddr})`;
            }
            fullAddr += extraAddr !== "" ? ` ${extraAddr}` : "";
        }
    }
    const btnClose = () => {
        onClose(false);
    }

    return (
        <div style={{ postCodeStyle }}>
            <DaumPostcode
                onClose={btnClose}
                onComplete={complete}
                height={700}
            />
            <button onClick={btnClose}>닫기</button>
        </div>
    );
}

export default Post;