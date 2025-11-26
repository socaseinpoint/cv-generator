import { Routes, Route } from 'react-router-dom';
import CvListPage from './pages/CvListPage';
import CvEditorPage from './pages/CvEditorPage';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<CvListPage />} />
        <Route path="/cv/new" element={<CvEditorPage />} />
        <Route path="/cv/:id/edit" element={<CvEditorPage />} />
      </Routes>
    </div>
  );
}

export default App;





