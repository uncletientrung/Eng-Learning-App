import { BrowserRouter, Routes, Route } from "react-router-dom";

import Button1 from "./components/ui/Button1";
import LinkButton from "./components/ui/LinkButton";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <div className="App">
              <Button1
                text="Nhận tư vấn miễn phí"
                textColor="#fff"
                backgroundColor="#f67232"
                icon="➞"
                fullWidth={false}
              />

              <LinkButton to="/cau-chuyen">
                Xem ngay câu chuyện
              </LinkButton>
            </div>
          }
        />

        <Route
          path="/cau-chuyen"
          element={<div>Câu chuyện của The IELTS Dictionary</div>}
        />
      </Routes>
    </BrowserRouter>
  );
  
}

export default App;
