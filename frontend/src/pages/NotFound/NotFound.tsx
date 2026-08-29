import { Link } from 'react-router-dom'
import './NotFound.css'

function NotFound() {
  return (
    <main className="not-found">
      <div className="not-found-content">
        <h1>404</h1>

        <h2>الصفحة غير موجودة</h2>

        <p>
          عذرًا، الصفحة التي تبحث عنها غير موجودة.
        </p>

        <Link
          to="/"
          className="not-found-link"
        >
          العودة إلى الرئيسية
        </Link>
      </div>
    </main>
  )
}

export default NotFound