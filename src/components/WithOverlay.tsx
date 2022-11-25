type WithOverlayProps = {
  children: JSX.Element;
};

function WithOverlay({ children }: WithOverlayProps) {
  return (
    <>
      <div className='fixed inset-0 bg-slate-800 opacity-60'></div>
      {children}
    </>
  );
}

export default WithOverlay;
