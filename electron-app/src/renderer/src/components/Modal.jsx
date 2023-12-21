import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'

const Modal = ({
  title,
  description,
  titleColor,
  adminModal,
  isOpen,
  onClose,
  onSubmit,
  children
}) => {
  const nodeRef = useRef(null)

  const closeOnEscapeKeyDown = (event) => {
    if ((event.charCode || event.keyCode) === 27) {
      onClose()
    }
  }

  useEffect(() => {
    document.body.addEventListener('keydown', closeOnEscapeKeyDown)

    return function cleanup() {
      document.body.addEventListener('keydown', closeOnEscapeKeyDown)
    }
  })

  return createPortal(
    <CSSTransition nodeRef={nodeRef} in={isOpen} unmountOnExit timeout={{ enter: 300, exit: 0 }}>
      <div className="modal" onClick={onClose} ref={nodeRef}>
        <div
          className="w-2/5 bg-white rounded-xl truncate font-display"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="px-4 py-4 text-left">
            <h3 className={`m-0 text-2xl font-semibold mb-4 ${titleColor}`}>{title}</h3>
            <p className="text-lg whitespace-normal text-black">{description}</p>
          </div>
          <div className="px-4 border-b-2 border-gray-200">{children}</div>
          <div className="flex justify-between items-center">
            {adminModal ? (
              <>
                <button
                  aria-label="Cancel search"
                  className="text-blue-700 font-semibold active:scale-95 w-1/2 py-3 border-r-[1px] border-gray-200"
                  onClick={onClose}
                >
                  CANCEL
                </button>
                <button
                  aria-label="Submit search query"
                  className="text-black font-semibold active:scale-95 w-1/2 py-3 border-l-[1px] border-gray-200"
                  onClick={onSubmit}
                >
                  SUBMIT
                </button>
              </>
            ) : (
              <button
                aria-label="Clear message"
                className="text-black font-semibold active:scale-90 w-full py-4"
                onClick={onClose}
              >
                CLEAR
              </button>
            )}
          </div>
        </div>
      </div>
    </CSSTransition>,
    document.body
  )
}

export default Modal
