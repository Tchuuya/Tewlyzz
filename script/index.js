const textInput = document.getElementById("textInput");
const colorInput = document.getElementById("colorInput");
const backgroundInput = document.getElementById("backgroundInput");
const logoInput = document.getElementById("logoInput");
const removeLogo = document.getElementById("removeLogo");
const genBT = document.getElementById("genBT");
const downloadBT = document.getElementById("downloadBT");
const Preview = document.getElementById("qrPreview");
const logoPreview = document.getElementById("logoPreview");
const background = document.getElementById("bc");
const name = document.getElementById("nameInput");

let logoFile = null;
let qrCode = null;

function fileToBase64(file, callback) {
  const reader = new FileReader();
  reader.onload = () => callback(reader.result);
  reader.readAsDataURL(file);
}

logoInput.addEventListener("change", () => {
  const file = logoInput.files[0];
  if (file) {
    fileToBase64(file, (base64) => {
      logoFile = base64;
      logoPreview.src = base64;
      logoPreview.style.display = "inline-block";
      removeLogo.style.display = "inline-block";
    });
  }
});

removeLogo.addEventListener("click", () => {
  logoFile = null;
  logoInput.value = "";
  removeLogo.style.display = "none";
  logoPreview.style.display = "none";
});

function genQR(text) {
  if (text !== "") {
    try {
      Preview.innerHTML = "";

      background.style.backgroundColor = backgroundInput.value;

      qrCode = new QRCodeStyling({
        width: 270,
        height: 270,
        type: "png",
        data: text,
        image: logoFile || undefined,
        qrOptions: {
          errorCorrectionLevel: "H",
        },
        dotsOptions: {
          color: colorInput.value,
          type: "square",
        },
        backgroundOptions: {
          color: "transparent",
        },
        imageOptions: {
          crossOrigin: "anonymous",
          hideBackgroundDots: false,
          imageSize: 0.5,
          margin: 0,
        },
      });

      qrCode.append(Preview);
      background.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      background.classList.remove("qrreload");
      void background.offsetWidth;
      background.classList.add("qrreload");
    } catch (error) {
      alert(error);
    }
  }
}

genBT.addEventListener("click", () => {
  if (textInput.value !== "") {
    const text = textInput.value.trim();
    genQR(text);
  } else {
    alert("กรุณาใส่ข้อมูลให้ครบ");
  }
});

downloadBT.addEventListener("click", () => {
  if (qrCode) {
    html2canvas(background, {
      scale: 2,
      backgroundColor: null
    }).then((canvas) => {
      const link = document.createElement("a");
      link.download = name.value || "QrCode";
      link.href = canvas.toDataURL("image/png");
      link.click();
    });
  }
});

window.addEventListener("load", () => {
  logoFile = "./image.png";
  logoPreview.src = logoFile;
  genQR("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
});
