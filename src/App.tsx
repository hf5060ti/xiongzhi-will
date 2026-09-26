import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/pages/HomePage/HomePage';
import PlanPage from '@/pages/PlanPage/PlanPage';
import NutritionPage from '@/pages/NutritionPage/NutritionPage';
import BodyDataPage from '@/pages/BodyDataPage';
import CardioPage from '@/pages/CardioPage';
import BodyweightPage from '@/pages/BodyweightPage';
import PhysiquePage from '@/pages/PhysiquePage';
import CoachPage from '@/pages/CoachPage';
import ExerciseLibraryPage from '@/pages/ExerciseLibraryPage';
import TrainingLogPage from '@/pages/TrainingLogPage';
import MindPage from '@/pages/MindPage';
import CareerPage from '@/pages/CareerPage';
import WealthPage from '@/pages/WealthPage';
import RelationPage from '@/pages/RelationPage';
import SkillsPage from '@/pages/SkillsPage';
import WildPage from '@/pages/WildPage';
import StomachPage from '@/pages/StomachPage';
import DietKnowledgePage from '@/pages/DietKnowledgePage';
import LightPage from '@/pages/LightPage';
import PrivacyPage from '@/pages/PrivacyPage';
import SourcesPage from '@/pages/SourcesPage';
import FaqPage from '@/pages/FaqPage';
import CollectPage from '@/pages/CollectPage';
import NotFoundPage from '@/pages/NotFoundPage/NotFoundPage';

export default function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="plan" element={<PlanPage />} />
          <Route path="nutrition" element={<NutritionPage />} />
          <Route path="body" element={<BodyDataPage />} />
          <Route path="cardio" element={<CardioPage />} />
          <Route path="bodyweight" element={<BodyweightPage />} />
          <Route path="physique" element={<PhysiquePage />} />
          <Route path="coach" element={<CoachPage />} />
          <Route path="library" element={<ExerciseLibraryPage />} />
          <Route path="mind" element={<MindPage />} />
          <Route path="career" element={<CareerPage />} />
          <Route path="wealth" element={<WealthPage />} />
          <Route path="relation" element={<RelationPage />} />
          <Route path="skills" element={<SkillsPage />} />
          <Route path="wild" element={<WildPage />} />
          <Route path="stomach" element={<StomachPage />} />
          <Route path="diet-knowledge" element={<DietKnowledgePage />} />
          <Route path="training-logs" element={<TrainingLogPage />} />
          <Route path="light" element={<LightPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="sources" element={<SourcesPage />} />
          <Route path="faq" element={<FaqPage />} />
          <Route path="collect" element={<CollectPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
