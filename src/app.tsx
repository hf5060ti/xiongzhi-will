import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import PlanPage from '@/pages/PlanPage/PlanPage';
import NutritionPage from '@/pages/NutritionPage/NutritionPage';
import BodyDataPage from '@/pages/BodyDataPage';
import PhysiquePage from '@/pages/PhysiquePage';
import CoachPage from '@/pages/CoachPage';
import ExerciseLibraryPage from '@/pages/ExerciseLibraryPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="plan" element={<PlanPage />} />
        <Route path="nutrition" element={<NutritionPage />} />
        <Route path="body" element={<BodyDataPage />} />
        <Route path="physique" element={<PhysiquePage />} />
        <Route path="coach" element={<CoachPage />} />
        <Route path="library" element={<ExerciseLibraryPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
