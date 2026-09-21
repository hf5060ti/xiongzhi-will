import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import HomePage from '@/pages/HomePage/HomePage';
import PlanPage from '@/pages/PlanPage/PlanPage';
import NutritionPage from '@/pages/NutritionPage/NutritionPage';
import BodyDataPage from '@/pages/BodyDataPage';
import PhysiquePage from '@/pages/PhysiquePage';
import CoachPage from '@/pages/CoachPage';
import ExerciseLibraryPage from '@/pages/ExerciseLibraryPage';
import MindPage from '@/pages/MindPage';
import CareerPage from '@/pages/CareerPage';
import WealthPage from '@/pages/WealthPage';
import RelationPage from '@/pages/RelationPage';
import SkillsPage from '@/pages/SkillsPage';
import WildPage from '@/pages/WildPage';
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
        <Route path="mind" element={<MindPage />} />
        <Route path="career" element={<CareerPage />} />
        <Route path="wealth" element={<WealthPage />} />
        <Route path="relation" element={<RelationPage />} />
        <Route path="skills" element={<SkillsPage />} />
        <Route path="wild" element={<WildPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
