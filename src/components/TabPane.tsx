export type TabPaneProps = {
  children?: React.ReactNode;
};

function TabPane({ children }: TabPaneProps) {
  return <div>{children}</div>;
}

export default TabPane;
