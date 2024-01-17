import { Link } from '@tanstack/react-router';

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link
              to="/tasks/$taskId"
              params={{
                taskId: '123',
              }}
            >
              Task123
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
