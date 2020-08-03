export const checkImg = (url: string) => {
  const bodyElm: any = document.getElementsByTagName("body")[0];

  const checkImgElm = document.getElementById("checkImgBox");
  let checkBox: any = null;
  if (checkImgElm) {
    checkBox = checkImgElm;
  } else {
    const Div: any = document.createElement("div");
    Div.id = "checkImgBox";
    bodyElm.appendChild(Div);
    checkBox = Div;
  }

  const checkImg = document.getElementById("checkImg");
  let img: any = null;
  if (checkImg) {
    img = checkImg;
  } else {
    const imgElm: any = document.createElement("img");
    imgElm.id = "checkImg";
    checkBox.appendChild(imgElm);
    img = imgElm;
  }

  img.src = url;

  disBlock();

  checkBox.onclick = () => {
    disBlock();
  };

  function disBlock() {
    if (checkBox.style.display === "block") {
      checkBox.style.display = "none";
    } else {
      checkBox.style.display = "block";
    }
  }
};

export const xxxx = () => {};
