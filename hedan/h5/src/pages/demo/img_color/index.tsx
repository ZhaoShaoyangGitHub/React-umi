import React from "react";
import "./index.scss";
import { getImgColor } from "@/utils/catchColor.ts";
const imgurl_1 = "http://file.hedan.art/FkDYbxfCW8CplZM_0_HXmiota-Jj";
const imgurl_2 = "http://file.hedan.art/FumbjvjlB2SkThLWI2wb13iLvx0e";
const imgurl_3 = "http://file.hedan.art/FumbjvjlB2SkThLWI2wb13iLvx0e";
const imgurl_4 = "http://file.hedan.art/Fm8WmL_O6LWphRge9c0kYgjIb2SQ";
const imgurl_5 = "http://file.hedan.art/FqEp95VzBJGS81HaZA6NwR-QF14t";
const imgurl_6 = "http://file.hedan.art/FqEp95VzBJGS81HaZA6NwR-QF14t";

export default class Demo extends React.Component {
  state = {
    imgUrl: imgurl_1,
    boxBg: "",
  };

  componentDidMount() {
    this.getImgColor();
  }

  getImgColor = async () => {
    const { imgUrl } = this.state;
    const color = await getImgColor(imgUrl);

    this.setState({
      boxBg: color,
    });
  };

  render() {
    const { imgUrl, boxBg } = this.state;

    return (
      <div>
        <h2>这里是取色演示</h2>
        <img className="img" src={imgUrl} alt="" />
        <div
          style={{
            backgroundColor: boxBg,
          }}
          className="div"
        ></div>
      </div>
    );
  }
}
