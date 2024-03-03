import IndexInfo from './Pages/IndexInfo/IndexInfo';
import CourseInfo from './Pages/CourseInfo/CourseInfo';
import CategoryInfo from './Pages/CategoryInfo/CategoryInfo';
import ArticleInfo from './Pages/ArticleInfo/ArticleInfo';
import Courses from './Pages/Courses/Courses';
import Articles from './Pages/Articles/Articles';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Contact from './Pages/Contact/Contact';
import Search from './Pages/Search/Search';
import Session from './Pages/Session/Session';

import PAdminPrivate from './Components/Privates/PAdminPrivate';
import AdminPanel from './Pages/AdminPanel/IndexAdmin';
import PAdminIndex from './Pages/AdminPanel/PAdminIndex/PAdminIndex';
import UsersAdmin from './Pages/AdminPanel/UsersAdmin/UsersAdmin';
import CoursesAdmin from './Pages/AdminPanel/CoursesAdmin/CoursesAdmin';
import MenusAdmin from './Pages/AdminPanel/MenusAdmin/MenusAdmin';
import ArticlesAdmin from './Pages/AdminPanel/ArticlesAdmin/ArticlesAdmin';
import DraftAdmin from './Pages/AdminPanel/ArticlesAdmin/DraftAdmin';
import CategoryAdmin from './Pages/AdminPanel/CategoryAdmin/CategoryAdmin';
import ContactAdmin from './Pages/AdminPanel/ContactAdmin/ContactAdmin';
import SessionsAdmin from './Pages/AdminPanel/SessionsAdmin/SessionsAdmin';
import CommentsAdmin from './Pages/AdminPanel/CommentsAdmin/CommentsAdmin';
import OffsAdmin from './Pages/AdminPanel/OffsAdmin/OffsAdmin';
import DiscountsAdmin from './Pages/AdminPanel/DiscountsAdmin/DiscountsAdmin';
import TicketsAdmin from './Pages/AdminPanel/TicketsAdmin/TicketsAdmin';

import UserPanel from './Pages/UserPanel/IndexPanel';
import UserPanelIndex from './Pages/UserPanel/UserIndex/UserIndex';
import UserPanelOrder from './Pages/UserPanel/OrdersPanel/OrdersPanel';
import UserPanelCourses from './Pages/UserPanel/CoursesPanel/CoursesPanel';
import SendTicket from './Pages/UserPanel/TicketsPanel/SendTicket';
import UserPanelTickets from './Pages/UserPanel/TicketsPanel/TicketsPanel';
import UserPanelTicketAnswer from './Pages/UserPanel/TicketsPanel/TicketAnswer';
import UserPanelEditAccount from './Pages/UserPanel/EditAccount/EditAccount';

let routes = [
    {path: '/', element: <IndexInfo />},
    {path: '/courses/:page', element: <Courses />},
    {path: '/course-info/:courseName', element: <CourseInfo />},
    {path: '/category-info/:categoryName/:page', element: <CategoryInfo />},
    {path: '/article-info/:articleName', element: <ArticleInfo />},
    {path: '/articles/:page', element: <Articles />},
    {path: '/login', element: <Login />},
    {path: '/register', element: <Register />},
    {path: '/contact', element: <Contact />},
    {path: '/search/:value', element: <Search />},
    {path: '/:courseName/:sessionID', element: <Session />},

    {
        path: '/p-admin/*',
        element: (
            <PAdminPrivate>
                <AdminPanel />
            </PAdminPrivate>
        ),
        children: [
            {path: '', element: <PAdminIndex />},
            {path: 'users', element: <UsersAdmin />},
            {path: 'courses', element: <CoursesAdmin />},
            {path: 'menus', element: <MenusAdmin />},
            {path: 'articles', element: <ArticlesAdmin />},
            {path: 'articles/draft/:shortName', element: <DraftAdmin />},
            {path: 'category', element: <CategoryAdmin />},
            {path: 'contacts', element: <ContactAdmin />},
            {path: 'sessions', element: <SessionsAdmin />},
            {path: 'comments', element: <CommentsAdmin />},
            {path: 'offs', element: <OffsAdmin />},
            {path: 'discounts', element: <DiscountsAdmin />},
            {path: 'tickets', element: <TicketsAdmin />},
        ],
    },
    {
        path: '/my-account/*',
        element: <UserPanel />,
        children: [
            {path: '', element: <UserPanelIndex />},
            {path: 'orders', element: <UserPanelOrder />},
            {path: 'buyed', element: <UserPanelCourses />},
            {path: 'tickets', element: <UserPanelTickets />},
            {path: 'send-ticket', element: <SendTicket />},
            {path: 'tickets/answer/:id', element: <UserPanelTicketAnswer />},
            {path: 'edit-account', element: <UserPanelEditAccount />},
        ],
    },
];

export default routes;
