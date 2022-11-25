type CenterScreenProps = {
  children: React.ReactNode;
};

function CenterScreen({ children }: CenterScreenProps) {
  return (
    <div
      className='fixed 
  top-0 left-0 right-0 bottom-0
  flex items-center justify-center'
    >
      {children}
    </div>
  );
}

export default CenterScreen;
