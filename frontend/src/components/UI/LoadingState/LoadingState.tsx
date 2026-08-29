import '../ui.css'

type LoadingStateProps = {
  message?: string
}

function LoadingState({
  message = 'جاري التحميل...',
}: LoadingStateProps) {
  return (
    <div
      className="ui-loading"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <p>{message}</p>
    </div>
  )
}

export default LoadingState