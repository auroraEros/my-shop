import Link from "next/link";

function Header() {
  return (
    <header className=" p-4 shadow-md text-secondary-800">
      <nav className="container">
        <ul className=" container flex justify-between items-center [&>li]:hover:text-secondary-600">
          <li >
            <Link href="/">خانه</Link>
          </li>
          <li>
            <Link href="/products">محصولات</Link>
          </li>
          <li>
            <Link href="/auth">ورود</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
