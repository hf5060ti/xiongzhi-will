import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import ErrorBoundary from '@/components/ErrorBoundary';
import PageFallback from '@/components/PageFallback';

// 路由级代码分割：每个页面独立 chunk，按需加载，减小首屏体积
const HomePage = lazy(() => import('@/pages/HomePage/HomePage'));
const PlanPage = lazy(() => import('@/pages/PlanPage/PlanPage'));
const NutritionPage = lazy(() => import('@/pages/NutritionPage/NutritionPage'));
const BodyDataPage = lazy(() => import('@/pages/BodyDataPage'));
const CardioPage = lazy(() => import('@/pages/CardioPage'));
const BodyweightPage = lazy(() => import('@/pages/BodyweightPage'));
const PhysiquePage = lazy(() => import('@/pages/PhysiquePage'));
const CoachPage = lazy(() => import('@/pages/CoachPage'));
const ExerciseLibraryPage = lazy(() => import('@/pages/ExerciseLibraryPage'));
const TrainingLogPage = lazy(() => import('@/pages/TrainingLogPage'));
const MindPage = lazy(() => import('@/pages/MindPage'));
const CareerPage = lazy(() => import('@/pages/CareerPage'));
const WealthPage = lazy(() => import('@/pages/WealthPage'));
const RelationPage = lazy(() => import('@/pages/RelationPage'));
const SkillsPage = lazy(() => import('@/pages/SkillsPage'));
const WildPage = lazy(() => import('@/pages/WildPage'));
const StomachPage = lazy(() => import('@/pages/StomachPage'));
const DietKnowledgePage = lazy(() => import('@/pages/DietKnowledgePage'));
const LightPage = lazy(() => import('@/pages/LightPage'));
const PrivacyPage = lazy(() => import('@/pages/PrivacyPage'));
const SourcesPage = lazy(() => import('@/pages/SourcesPage'));
const FaqPage = lazy(() => import('@/pages/FaqPage'));
const CollectPage = lazy(() => import('@/pages/CollectPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage/NotFoundPage'));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
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
      </Suspense>
    </ErrorBoundary>
  );
}
