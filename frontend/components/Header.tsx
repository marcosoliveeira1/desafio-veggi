import Link from "next/link";

export function Header() {
  return (
    <header className="navbar navbar-light bg-light shadow-sm p-3 mb-3 rounded">
      <div className="container d-flex justify-content-center">
        <Link href="/">
          <a className="navbar-brand">
            <img src="/favicon.png" width="30" height="30" className="d-inline-block align-top me-3" alt="" />
            Crud Veggi
          </a>
        </Link>
      </div>
    </header>
  );
}
