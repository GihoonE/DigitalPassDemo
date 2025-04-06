document.addEventListener("DOMContentLoaded", () => {
  const qrReader = new Html5Qrcode("qr-reader");
  const resultElement = document.getElementById("qr-result");
  const errorElement = document.getElementById("qr-error");

  //Scan Successfully
  const onScanSuccess = (decodedText) => {
    resultElement.innerText = `스캔 결과: ${decodedText}`;
    console.log(`Decoded Text: ${decodedText}`);
    
    //Exit Camera mode
    qrReader.stop().catch(console.error);
  };

  //Error Case
  const onScanError = (errorMessage) => {
    console.warn(`QR Scan Error: ${errorMessage}`);
  };

  //Start Camera
  const startScanner = () => {
    qrReader.start(
      { facingMode: "environment" },
      { 
        fps: 10,
        qrbox: { width: 250, height: 250 },
        rememberLastUsedCamera: true //preference memory
      },
      onScanSuccess,
      onScanError
    ).catch((err) => {
      if (err.name === "NotAllowedError") {
        errorElement.innerText = "Access authorization is denied. Please allow the authorization.";
      } else {
        errorElement.innerText = `System Error: ${err.message}`;
      }
      console.error("QR Reader Error:", err);
    });
  };

  //Request Access and Scanner Start
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(startScanner)
    .catch((err) => {
      errorElement.innerText = "Cannot access to camera.";
      console.error("Media Devices Error:", err);
    });
});
