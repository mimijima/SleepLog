import { Link, useLocation, NavLink } from 'react-router-dom'

export default function FooterNav() {
  const location = useLocation()

  return (
    <nav className="footer-navigation" aria-label="画面への移動">
      {location.pathname === '/' ? (
        'test'
      ) : (
        <Link className="text-link" to="/">
          トップ画面を開く
        </Link>
      )}

      <NavLink
        className={({ isActive }) =>
          isActive ? 'text-link current-page-link' : 'text-link'
        }
        end
        to="/privacy"
      >
        プライバシーポリシー画面を開く
      </NavLink>

      <Link className="text-link" to="/practice">
        練習用画面を開く
      </Link>
    </nav>
  )
}
