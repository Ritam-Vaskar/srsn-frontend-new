import { createBrowserRouter } from 'react-router-dom';
import App from '../App';

//Ashram Pages
import Ashram from '../Ashram';
import Home from './../Ashrampages/Home/Home';
import About from './../Ashrampages/About/About';
import Activities from './../Ashrampages/Activities/Activities';
import NewsEvent from './../Ashrampages/NewsEvent/NewsEvent';
import Media from './../Ashrampages/Media/Media';
import Contact from './../Ashrampages/Contact/Contact';
import Donate from './../Ashrampages/Donate/Donate';


//School Pages
import School from '../School';


const router = createBrowserRouter([
    {
        path:'/',
        element: <App/>,
        children:[
            {
                index: true,
                element: <School/>
            },
            
            //school page
            {
                path:'school',
                element:<School/>
            }

            ,
            //ashram page
            {
                path:'ashram',
                element:<Ashram/>,
                children:[
                    {
                        index: true,
                        element: <Home/>
                    },
                    {
                        path:'home',
                        element: <Home/>
                    },
                    {
                        path:'about',
                        element: <About/>
                    },
                    {
                        path:'activities',
                        element: <Activities/>
                    },
                    {
                        path:'news_event',
                        element: <NewsEvent/>
                    },
                    {
                        path:'media',
                        element: <Media/>
                    },
                    {
                        path:'contact',
                        element: <Contact/>
                    },
                    {
                        path:'donate',
                        element: <Donate/>
                    }
                ]
            }
        ]
    }
]);


export default router