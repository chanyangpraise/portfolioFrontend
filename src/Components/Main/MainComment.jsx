import axios from "axios";
import { useSelector } from "react-redux";
import CmtProfile from "../Side/CmtProfile";
import "./MainComment.css";

function MainComment({ uimg, email, setCmt, cid, commentIndex, content, date, bid }) {
  //redux store 로그인시 userId저장했고 그 값을 받아옴
  const userId = useSelector((store) => {
    return store.loginState.userId;
  });

  //댓글 삭제 요청
  function removeView() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      axios
        .delete(`http://13.125.96.165:3000/comment/delete/${cid}?uid=${userId}`)
        .then((res) => {
          console.log(res);
          if (res.data.status === "success") {
            axios
              .get(`http://13.125.96.165:3000/comment/get/${bid}`)
              .then((res) => {
                console.log(res);
                setCmt(res.data.content);
              })
              .catch((err) => {
                console.log(err);
              });
            alert("삭제완료");
          }
        })
        .catch((err) => {
          alert(err);
        });
    }
  }

  return (
    <>
      <div className="main_comment_wrap" key={commentIndex} style={{ borderTop: "1px solid rgb(194, 194, 194)" }}>
        <div>
          <CmtProfile uimg={uimg} email={email} />
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line", marginBottom: "2rem" }}>{content}</pre>
        </div>
        <div className="main_comment_menu">
          <span onClick={() => removeView()}>삭제</span>
        </div>
      </div>
      <span style={{ fontSize: "0.5rem", color: "gray", marginBottom: "1rem" }}>댓글 작성일 : {date}</span>
    </>
  );
}

export default MainComment;
