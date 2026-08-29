import '../ui.css'

type ErrorStateProps = {
  message?: string
  onRetry?: () => void
}

function ErrorState({
  message = 'حدث خطأ أثناء تحميل البيانات.',
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="ui-error"
      role="alert"
      aria-live="assertive"
    >
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
        >
          إعادة المحاولة
        </button>
      )}
    </div>
  )
}

export default ErrorState