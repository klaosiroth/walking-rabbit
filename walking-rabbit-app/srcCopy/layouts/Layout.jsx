import { Outlet } from 'react-router-dom';
import Navbar from 'src/components/Navbar';

function Layout() {
  return (
    <>
      {/* <img className="shape__bg" src={`${process.env.PUBLIC_URL}/images/shape-bg.png`} alt="" /> */}
      {/* A "layout route" is a good place to put markup you want to
          share across all the pages on your site, like navigation. */}
      <Navbar />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <main>
        {/* <div className="shape__small"></div>
        <div className="shape__big"></div> */}
        <Outlet />
      </main>
    </>
  );
}

export default Layout;
