import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }

        // Get the current path
        const path = location.pathname;

        // Define route access rules
        const jobSeekerRoutes = ['/find-jobs', '/applied-jobs', '/interviews', '/jobseeker/profile'];
        const recruiterRoutes = ['/recruiter', '/admin'];

        // Check if current path is protected
        const isRecruiterRoute = recruiterRoutes.some(route => path.startsWith(route));
        const isJobSeekerRoute = jobSeekerRoutes.includes(path);

        // Handle unauthorized access
        if (isRecruiterRoute && user.role !== 'recruiter') {
            console.log('Unauthorized recruiter access, redirecting to find-jobs');
            navigate("/find-jobs");
            return;
        }

        if (isJobSeekerRoute && user.role !== 'JobSeeker') {
            console.log('Unauthorized jobseeker access, redirecting to recruiter dashboard');
            navigate("/recruiter/dashboard");
            return;
        }

        console.log('Access granted:', {
            path,
            userRole: user.role,
            isJobSeekerRoute,
            isRecruiterRoute
        });
    }, [user, navigate, location]);

    if (!user) {
        return null;
    }

    return children;
}

export default ProtectedRoute;