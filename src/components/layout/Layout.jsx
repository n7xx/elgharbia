import Header from "./Header";
import Footer from "./Footer";
import FloatingCTA from "../common/FloatingCTA";
import PromoBanner from "../common/PromoBanner";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <FloatingCTA />
      <PromoBanner />
    </div>
  );
};

export default Layout;
