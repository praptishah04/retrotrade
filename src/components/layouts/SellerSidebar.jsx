import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import { SellerNavbar } from './SellerNavbar'

export const SellerSidebar = () => {
  return (
    <>
    <SellerNavbar></SellerNavbar>
    <aside
        className="app-sidebar bg-body-secondary shadow"
        data-bs-theme="dark"
      >
        <div className="sidebar-brand">
          
          <a href="./index.html" className="brand-link">
            
            {/* <img
              src="../../dist/assets/img/AdminLTELogo.png"
              alt="AdminLTE Logo"
              className="brand-image opacity-75 shadow"
            /> */}
            
            {/* <span className="brand-text fw-light">AdminLTE 4</span> */}
            <span className='brand-text fw-900' style={{textAlign:"center", marginRight:"50px"}}>RetroTrade</span>
            
          </a>
          
        </div>

        <div
          className=""
          data-overlayscrollbars-viewport="scrollbarHidden overflowXHidden overflowYScroll"
          tabIndex={-1}
          style={{
            marginRight: "-16px",
            marginBottom: "-16px",
            marginLeft: 0,
            top: "-8px",
            right: "auto",
            left: "-8px",
            width: "calc(100% + 16px)",
            padding: 8,
          }}
        >
          <nav className="mt-2">
            
            <ul
              className="nav sidebar-menu flex-column"
              data-lte-toggle="treeview"
              role="menu"
              data-accordion="false"
            >
              <li className="nav-item menu-open">
                <Link to="addproduct"  className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    Add Product
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>

                <Link to="addproduct"  className="nav-link active">
                  <i className="nav-icon bi bi-speedometer" />
                  <p>
                    View Products
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </Link>
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./index.html" className="nav-link active">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v1</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index2.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v2</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./index3.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Dashboard v3</p>
                    </a>
                  </li>
                </ul>
              </li> */}
              {/* <li className="nav-item">
                <a href="./generate/theme.html" className="nav-link">
                  <i className="nav-icon bi bi-palette" />
                  <p>Theme Generate</p>
                </a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link">
                  <i className="nav-icon bi bi-box-seam-fill" />
                  <p>
                    Widgets
                    <i className="nav-arrow bi bi-chevron-right" />
                  </p>
                </a> */}
                {/* <ul className="nav nav-treeview">
                  <li className="nav-item">
                    <a href="./widgets/small-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Small Box</p>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="./widgets/info-box.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>info Box</p>
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                    <a href="./widgets/cards.html" className="nav-link">
                      <i className="nav-icon bi bi-circle" />
                      <p>Cards</p>
                    </a>
                  </li> */}
                {/* </ul> */}
              </li>
            </ul>
            
          </nav>
        </div>
      </aside>
      <main class="app-main">
        <Outlet></Outlet>
      </main>
    </>
  )
}
