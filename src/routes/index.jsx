import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Headroom from "react-headroom";

//Ashram Pages
import Ashram from '../Ashram';
import Home from './../Ashrampages/Home/Home';
import About from './../Ashrampages/About/About';
import Activities from './../Ashrampages/Activities/Activities';
import NewsEvent from './../Ashrampages/NewsEvent/NewsEvent';
import Media from './../Ashrampages/Media/Media';
import Contact from './../Ashrampages/Contact/Contact';
import Donate from './../Ashrampages/Donate/Donate';
import Admission from './../Schoolpages/Admission/Admission';


//School Pages
import School from '../School';
import SchoolNavbar from '../layouts/Navbar/SchoolNavbar';
import SchoolFooter from '../layouts/Footer/Footer';
import SchoolHome from './../Schoolpages/Home/Home';
import Alumni from './../Schoolpages/Alumini/Alumini';
import Academic from '../Schoolpages/Academic/Academic';
import AdmissionForm from '../Schoolpages/AdmissionForm/AdmissionForm';
import Profile from './../Schoolpages/Profile/Profile'
import Teacher from '../Schoolpages/Teachers/Teachers'
import AlumniProfile from '../Schoolpages/Alumini/AlumniProfile/AlumniProfile';

//Dashboard
import Login from './../Authentication/Login/Login';

import ScrollToTop from '../helper/ScrollToTop';

import SourceCode from './../Schoolpages/SourceCode/Source';

import UserPolicy from '../Policy/UserPolicy/UserPolicy';
import Terms from './../Policy/TermsAndConditions/TermsAndConditions';




const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <ScrollToTop> 
                <App />
            </ScrollToTop>
        ),
        children: [
            {
                index: true,
                element: <>
                    <Headroom>
                        <SchoolNavbar />
                    </Headroom>
                    <SchoolHome />
                    <SchoolFooter />
                </>
            },
            {
                path: 'privacyPolicy',
                element: <UserPolicy/>
            },
            {
                path: 'terms',
                element: <Terms />
            },
            {
                path:'source',
                element:<SourceCode/>
            },

            //school page
            {
                path: 'school',
                element: <School />,
                children: [
                    {
                        index: true,
                        element: <SchoolHome />
                    },
                    {
                        path: 'home',
                        element: <SchoolHome />
                    },
                    {
                        path: 'admission',
                        element: <Admission />
                    },
                    {
                        path: 'academic',
                        element: <Academic />
                    },
                    {
                        path: 'alumni',
                        element: <Alumni />,
                    },
                    {
                        path:'alumni/profile',
                        element:<AlumniProfile/>
                    },
                    {
                        path: 'admission_form',
                        element: <AdmissionForm />
                    },
                    {
                        path:'profile',
                        element:<Profile/>
                    },
                    {
                        path:'login',
                        element:<Login/>
                    },
                    {
                        path:'teacher',
                        element:<Teacher/>
                    }
                ]
            }

            ,
            //ashram page
            {
                path: 'ashram',
                element: <Ashram />,
                children: [
                    {
                        index: true,
                        element: <Home />
                    },
                    {
                        path: 'home',
                        element: <Home />
                    },
                    {
                        path: 'about',
                        element: <About />
                    },
                    {
                        path: 'activities',
                        element: <Activities />
                    },
                    {
                        path: 'news_event',
                        element: <NewsEvent />
                    },
                    {
                        path: 'media',
                        element: <Media />
                    },
                    {
                        path: 'contact',
                        element: <Contact />
                    },
                    {
                        path: 'donate',
                        element: <Donate />
                    }
                ]
            }
        ]
    }
]);


export default router