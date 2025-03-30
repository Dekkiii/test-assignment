import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
function App() {

  const MySwal = withReactContent(Swal);
  const [allPages, setAllPages] = useState(false);
  const [pages, setPages] = useState([false, false, false, false]);

  const handleAllPagesChange = () => {
    const newState = !allPages;
    setAllPages(newState);
    setPages(pages.map(() => newState));
  };

  const handlePageChange = (index) => {
    const newPages = [...pages];
    newPages[index] = !newPages[index];
    setPages(newPages);
    setAllPages(newPages.every(Boolean));
  };



  const handleDone = () => {
    const selectedPages = pages.map((v, i) => (v ? i + 1 : null)).filter(Boolean).join(", ");

    if (selectedPages) {
        MySwal.fire({
            title: 'Pages Selected',
            text: `You selected pages: ${selectedPages}`,
            icon: 'success',
            confirmButtonText: 'OK'
        });
    } else {
        MySwal.fire({
            title: 'No Pages Selected',
            text: `Please select at least one page.`,
            icon: 'warning',
            confirmButtonText: 'OK'
        });
    }
  };
  return (
    <div className="container">
      <div className="checkbox-container">
      <div>
          <div className="checkbox-header">
            <label className="checkbox-label">
              
              <span className="span-title">All pages</span>
              <input type="checkbox" checked={allPages} onChange={handleAllPagesChange} className="checkbox" />
            </label>
          </div>
          <div className="checkbox-list">
            {[1, 2, 3, 4].map((num, index) => (
              <div key={num} className="checkbox-item">
                <label className="checkbox-label">
                  
                  <span className="span-title">Page {num}</span>
                  <input type="checkbox" checked={pages[index]} onChange={() => handlePageChange(index)} className="checkbox" />
                  
                </label>
              </div>
            ))}
          </div>
   </div>
        <button className="done-button" onClick={handleDone}>Done</button>
      </div>
    </div>
  );
}

export default App;
