document.addEventListener("DOMContentLoaded", () => {
    if (typeof Html5Qrcode === "undefined") {
        console.error("Html5Qrcode 라이브러리가 로드되지 않았습니다.");
        return;
    }
    const qrReader = new Html5Qrcode("qr-reader");
    const resultElement = document.getElementById("qr-result");
    const errorElement = document.getElementById("qr-error");
    
    // 슬라이드 패널 요소
    const slideUpPanel = document.getElementById("slide-up-panel");
    const panelResult = document.getElementById("panel-result");
    const closePanelButton = document.getElementById("close-panel");
    const simulateScanButton = document.getElementById("simulate-scan");

    // 성공 콜백 함수
    const onScanSuccess = (decodedText) => {
        showScanResult(decodedText);
    };

    // 스캔 결과 표시 함수
    const showScanResult = (decodedText) => {
        resultElement.innerText = `스캔 결과: ${decodedText}`;
        console.log(`Decoded Text: ${decodedText}`);
        
        // QR 코드 데이터를 패널에 표시
        panelResult.innerText = decodedText;

        // 슬라이드 패널 활성화
        const slideUpPanel = document.getElementById("slide-up-panel");
        slideUpPanel.classList.add("active");
        console.log("왜 화면이 안올라와 진짜")
        console.log(slideUpPanel.classList);

        // 스캔 성공 후 카메라 종료 (선택적)
        qrReader.stop().catch(console.error);
    };

    // 에러 콜백 함수
    const onScanError = (errorMessage) => {
        console.warn(`QR Scan Error: ${errorMessage}`);
    };

    // 카메라 시작 함수
    const startScanner = () => {
        qrReader.start(
            { facingMode: "environment" },
            { 
                fps: 10,
                qrbox: { width: 250, height: 250 },
                rememberLastUsedCamera: true
            },
            onScanSuccess,
            onScanError
        ).catch((err) => {
            if (err.name === "NotAllowedError") {
                errorElement.innerText = "카메라 접근 권한이 거부되었습니다. 설정에서 권한을 허용해주세요.";
            } else {
                errorElement.innerText = `카메라 오류: ${err.message}`;
            }
            console.error("QR Reader Error:", err);
        });
    };

    // 권한 요청 및 스캐너 시작
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(startScanner)
        .catch((err) => {
            errorElement.innerText = "카메라에 접근할 수 없습니다.";
            console.error("Media Devices Error:", err);
        });

    // 닫기 버튼 클릭 시 슬라이드 패널 숨김
    closePanelButton.addEventListener("click", () => {
        slideUpPanel.classList.remove("active");
    });

    // 시뮬레이션 버튼 클릭 이벤트
    simulateScanButton.addEventListener("click", () => {
        showScanResult("시뮬레이션된 QR 코드 데이터");
    });
});
