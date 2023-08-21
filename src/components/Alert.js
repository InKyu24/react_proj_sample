import Swal from 'sweetalert2'

function Alert() {
    const oneArg = () => {
        Swal.fire("매개변수 한 개 입력")
    }

    const twoArgs = () => {
        Swal.fire("매개변수 두 개 입력", "두 개의 매개변수가 입력되었습니다.")
    }

    const thressArgs = () => {
        Swal.fire(
            "매개변수 세 개 입력",
            "세 번째는 아이콘으로 [success, error, warning, info, question]이 들어갑니다.",
            "success"
        )
    }

    const objArgs = () => {
        Swal.fire({
            title: "객체형태로 매개변수를 입력",
            text: "객체형태로 매개변수를 입력하면 더 다양한 옵션을 사용할 수 있습니다.",
            icon: "warning",
            confirmButtonText: "확인", // 확인 버튼 텍스트
            cancelButtonText: "취소", // 취소 버튼 텍스트
            denyButtonText: "거절", // 거절 버튼 텍스트
            showConfirmButton: true, // 확인 버튼 표시 여부
            showCancelButton: true, // 취소 버튼 표시 여부
            showCloseButton: true, // 닫기 버튼 표시 여부
            showDenyButton: true, // 거절 버튼 표시 여부
            footer: "<h1>Footer 하단에 고정</h1>",
            timer: 3000, // 3초 후 자동 닫힘
            timerProgressBar: true, // 타이머에 진행바 표시
            toast: true, // 토스트 메시지로 표시
            position: "top-end", // 토스트 메시지 위치
            width: 600, // 너비
            padding: "3em", // 패딩 
            background: "url(https://sweetalert2.github.io/images/trees.png)", // 배경 이미지
            input: "text",
            inputPlaceholder: "입력하세요",
            inputValue: "기본값",
            // inputOptions: {
            //     "옵션1": "옵션1",
            //     "옵션2": "옵션2",
            //     "옵션3": "옵션3",
            // },
            inputAutoTrim: true, // 입력값의 앞뒤 공백 제거
            inputAttributes: {
                maxlength: 10, // 최대 길이
                autocapitalize: "off", // 자동 대문자화
                autocorrect: "off" // 자동 수정
            },
            inputValidator: (value) => { // 입력값 검증
                if (!value) {
                    return "값을 입력하세요"
                }
            },
            grow: "row", // 컨테이너가 커질 때 애니메이션 효과 [false, "column", "row"]
            scrollbarPadding: true // 팝업창에 스크롤바가 있을 때 패딩 여부
        }).then((result) => {
            console.log(result);
            if (result.isConfirmed) {
                Swal.fire('확인 버튼이 눌림', result.value, 'success')
            } else if (result.isDenied) {
                Swal.fire('거절 버튼이 눌림', '', 'info')
            } else if (result.isDismissed) {
                if (result.dismiss === Swal.DismissReason.cancel) {
                    Swal.fire('취소 버튼이 눌림', '', 'warning')
                } else if (result.dismiss === Swal.DismissReason.close) {
                    Swal.fire('닫기 버튼이 눌림', '', 'error')
                }
            }
        });
    }

    return (
        <div>
            <div className="alert alert-primary" role="alert">
                <div className="alert-heading">
                    <strong>SweetAlert</strong> 경고창을 더욱 다양하게 사용할 수 있도록 도와주는 라이브러리입니다.</div>
                <div className="alert alert-secondary mt-3" role="alert">
                    <a className="btn btn-dark" href="https://sweetalert2.github.io/" target="_blank" rel="noreferrer">
                        https://sweetalert2.github.io/
                    </a>
                </div>
                <hr />
                <div className="mb-0">
                    <button className='btn btn-primary m-2' onClick={oneArg}>alert1</button>
                    <span>매개변수 한 개를 사용한 Alert</span>
                </div>
                <div className="mb-0">
                    <button className='btn btn-primary m-2' onClick={twoArgs}>alert2</button>
                    <span>매개변수 두 개를 사용한 Alert</span>
                </div>
                <div className="mb-0">
                    <button className='btn btn-primary m-2' onClick={thressArgs}>alert3</button>
                    <span>매개변수 세 개를 사용한 Alert</span>
                </div>
                <div className="mb-0">
                    <button className='btn btn-primary m-2' onClick={objArgs}>alert4</button>
                    <span>객체 형태의 매개변수를 사용해 응용한 Alert</span>
                </div>
            </div>

            
        </div>
    );
}

export default Alert;