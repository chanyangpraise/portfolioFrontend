import SideProfile from "../Side/SideProfile";
import "./MainComment.css";

function MainComment({ commentIndex, content, date }) {
  function removeView() {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      console.log("삭제완료");
    }
  }
  return (
    <>
      <div className="main_comment_wrap" key={commentIndex} style={{ borderTop: "1px solid rgb(194, 194, 194)" }}>
        <div>
          <SideProfile />
          <pre style={{ wordBreak: "break-word", whiteSpace: "pre-line", marginBottom: "2rem" }}>{content}</pre>
        </div>
        <div className="main_comment_menu">
          <span style={{ marginRight: "1rem" }}>수정</span>
          <span onClick={() => removeView()}>삭제</span>
        </div>
      </div>
      <span style={{ fontSize: "0.5rem", color: "gray", marginBottom: "1rem" }}>댓글 작성일 : {date}</span>
    </>
  );
}

export default MainComment;
