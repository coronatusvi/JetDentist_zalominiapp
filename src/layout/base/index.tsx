import Header from "../../components/header";

const BaseLayout = ({ children }: any) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default BaseLayout;
