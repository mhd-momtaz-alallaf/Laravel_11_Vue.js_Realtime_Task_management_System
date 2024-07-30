import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/register",
        name: "register",
        component: () => import("../pages/auth/AuthPage.vue"),
        children: [
            {
                path: "/register",
                name: "register",
                component: () => import("../pages/auth/RegisterPage.vue"),
            },
            {
                path: "/login",
                name: "login",
                component: () => import("../pages/auth/LoginPage.vue"),
            },
        ],
    },
    {
        path: "/admin",
        name: "admin",
        component: () => import("../pages/admin/AdminPage.vue"),
        meta: { requiresAuth: true },
        children: [
            {
                path: "/admin",
                name: "admin",
                component: () => import("../pages/admin/dashboard/DashboardPage.vue"),
            },
            {
                path: "/members",
                name: "members",
                component: () => import("../pages/admin/member/MemberPage.vue"),
            },
            {
                path: "/create-members",
                name: "create-members",
                component: () => import("../pages/admin/member/CreateMember.vue"),
            },
            {
                path: "/projects",
                name: "projects",
                component: () => import("../pages/admin/project/ProjectPage.vue"),
            },
            {
                path: "/create-projects",
                name: "create-projects",
                component: () => import("../pages/admin/project/CreateProject.vue"),
            },
            {
                path: "/kaban",
                name: "kaban",
                component: () => import("../pages/admin/kabanBoard/KabanBoard.vue"),
            },
        ],
    },
];

const router = createRouter({
    history: createWebHistory("/app"),
    routes,
});

// Function to check if the user is authenticated
function isAuthenticated() {
    const userData = localStorage.getItem("userData");
    return !!userData;
}

// Add navigation guard
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth) && !isAuthenticated()) {
        // If the route requires authentication and the user is not authenticated, redirect to the login page
        next({ name: "login" });
    } else {
        // Otherwise, proceed to the route
        next();
    }
});

export default router;
