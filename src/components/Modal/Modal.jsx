import React from 'react'

const MODAL_STYLES = {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  backgroundColor: '#fff',
  padding: '50px',
  zIndex: 10,
}

const OVERLAY_STYLES = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  zIndex: 9,
}

const BUTTON_DIV_STYLES = {
  width: '150px',
  margin: '0 auto',
  marginTop: '30px',
  display: 'flex',
  justifyContent: 'space-between',
}

export const Modal = ({ open, closeModal, deleteHandler, children }) => {
  if (!open) return null
  return (
    <>
      <div style={OVERLAY_STYLES}></div>
      <div style={MODAL_STYLES}>
        <div>
          <h3>Are you sure you want to delete this user?</h3>
          <div style={BUTTON_DIV_STYLES}>
            <button onClick={deleteHandler} className='btn btn-danger'>
              Yes
            </button>
            <button onClick={closeModal} className='btn btn-warning'>
              No
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
