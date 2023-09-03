import Link from "next/link";

function NotFoundPage() {
  return (
    <div className="not-found">
      <h1>404 - 페이지를 찾을 수 없습니다.</h1>
      <p>죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
      <Link href="/">
        <a>홈으로 돌아가기</a>
      </Link>
    </div>
  );
}

export default NotFoundPage;
