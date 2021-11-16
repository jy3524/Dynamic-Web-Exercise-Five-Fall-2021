import React from "react";

function Header() {
  return (
    <header className="Header">
      <div className="Logo">Exercise Five</div>
      <nav>
        <a href="/login">Login</a>
        <a href="/create">Create</a>
        <a href="/user/id">User</a>
      </nav>
    </header>
  );
}

export default Header;