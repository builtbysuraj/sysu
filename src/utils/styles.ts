export const revealMain = (windowWidth: number): React.CSSProperties => ({
  position: 'absolute',
  top: '0px',
  left: windowWidth > 375 ? '-75px' : windowWidth > 320 ? '-90px' : '-80px',
  width: windowWidth > 320 ? '283px' : '250px',
  height: '257px',
  boxShadow: '1px 1px 0px #000000',
})

export const revealHead: React.CSSProperties = {
  alignSelf: 'center',
  width: '194px',
  marginBottom: '8px',
}

export const revealPara = (reveal: object): React.CSSProperties => ({
  marginTop: 'initial',
  width: '215px',
  overflowY: reveal ? 'auto' : 'hidden',
  maxHeight: '112px',
  fontSize: '0.625rem',
})
