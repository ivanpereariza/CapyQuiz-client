import { Route, Routes } from "react-router-dom"
import Error404 from "../components/Error404/Error404"
import CreateQuizPage from "../pages/CreateQuizPage/CreateQuizPage"
import EditQuizPage from "../pages/EditQuizPage/EditQuizPage"
import EditUserPage from "../pages/EditUserPage/EditUserPage"
import HomePage from "../pages/HomePage/HomePage"
import LoginPage from "../pages/LoginPage/LoginPage"
import PlayQuizPage from "../pages/PlayQuizPage/PlayQuizPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import QuizListPage from "../pages/QuizListPage/QuizListPage"
import QuizResultPage from "../pages/QuizResultPage/QuizResultPage"
import RankingPage from "../pages/RankingPage/RankingPage"
import SignupPage from "../pages/SignupPage/SignupPage"
import PrivateUserRoutes from "./PrivateUserRoutes"


const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/quizzes" element={<QuizListPage />} />
            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/quizzes/play/:id" element={<PlayQuizPage />} />

            <Route element={<PrivateUserRoutes />}>
                <Route path="/profile/:id" element={<ProfilePage />} />
                <Route path="/quizzes/create" element={<CreateQuizPage />} />
                <Route path="/profile/edit/:id" element={<EditUserPage />} />
                <Route path="/quizzes/edit/:id" element={<EditQuizPage />} />
                <Route path="/quizzes/results/:id" element={<QuizResultPage />} />
            </Route>

            <Route path="*" element={<Error404 />}></Route>
        </Routes>
    )
}
export default AppRoutes