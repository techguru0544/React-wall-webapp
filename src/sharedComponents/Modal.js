import React from 'react'
import styled from 'styled-components'

import useOutsideClickHook from '../sharedComponents/useOutsideClickHook'

export default function Modal(props) {
  const { ModalComponent, displayModal, handleClose } = props

  const ref = React.useRef(null)

  useOutsideClickHook(handleClose, ref)

  return (
    <span>
      {displayModal && (
        <MainContainer>
          <ModalContainer ref={ref}>{ModalComponent}</ModalContainer>
        </MainContainer>
      )}
    </span>
  )
}

const MainContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  height: 100%;
  left: 0;
  overflow: auto;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 11;
`

const ModalContainer = styled.div`
  margin: 0 32px;

  @media (max-width: 600px) {
    margin: 0 16px;
  }
`
