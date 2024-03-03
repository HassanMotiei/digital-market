<!DOCTYPE html>
<html lang="en" dir="rtl">
    <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Projects</title>
<link rel="stylesheet" href="./assets/css/main.css">
</head>
<!--  overflow-hidden -->
<body class="font-vazir">
<div id="overlay" class="hidden w-full h-full fixed top-0 right-0 bg-gray-900 bg-opacity-50"></div>

<!-- flex -->
<div class="hidden fixed w-64 md:flex h-full " id="sidebar">
    <button class="hidden absolute z-50 -left-12 top-4" id="sidebar-close-icon">
        <svg class="h-6 w-6 text-white" x-description="Heroicon name: outline/x" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
    </button>
    <div class="bg-indigo-700 overflow-y-auto flex flex-col flex-grow pt-5" id="sidebar-content-layout">
        <div class="px-4">
            <img class="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-logo-indigo-300-mark-white-text.svg" alt="Workflow">
        </div>
        <nav class="space-y-5 px-4 mt-5">
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse bg-indigo-800 py-2 px-2 rounded-lg">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                </div>
                <span>داشبورد</span>
            </a>
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse  px-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span>تیم</span>
            </a>
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse  px-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span>پروژه ها</span>
            </a>
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse  px-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span>تقویم</span>
            </a>
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse  px-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span>مستندات</span>
            </a>
            <a href="#" class="text-gray-200 flex items-center space-x-2 space-x-reverse  px-2">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                </div>
                <span>گزارشات</span>
            </a>
        </nav>
    </div>
</div>

<div class="flex flex-col md:pr-64">
    <!-- Navbar -->
    <div class="flex justify-between shadow h-16 items-center px-4">
        <button class="md:hidden text-gray-500 ml-4 p-2 focus:ring-indigo-200 focus:ring-2" id="sidebar-open-icon">
            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
        </button>
        <div class="w-full">
            <form action="" class="flex w-full items-center">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <input type="text" class="w-full h-14 pr-4 outline-none" placeholder="جستجو">
            </form>
        </div>
        <div class="flex items-center">
            <div class="pl-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
            </div>
            <div class="flex-shrink-0 pl-8">
                <img class="w-8 h-8 rounded-full" src="https://static.roocket.ir/images/avatar/2021/12/22/w5c1X1KSJjw54PCC8iPPTtIuPwiwTYgBEVY2sRYX.png" alt="">
            </div>
        </div>
    </div>

    <main>
        <div class="p-8">
            <div class="max-w-7xl mx-auto">
                <span class="text-2xl font-semibold text-gray-900">داشبورد</span>
            </div>
            <div class="max-w-7xl mx-auto py-4">
                <div class="border-4 border-dashed rounded-lg border-gray-200 h-96"></div>
            </div>
        </div>
    </main>
</div>

<script>
    const sidebar = document.getElementById('sidebar'),
    sidebarCloseIcon = document.getElementById('sidebar-close-icon'),
    sidebarOpenIcon = document.getElementById('sidebar-open-icon'),
    overlay = document.getElementById('overlay');

    function openSidebar() {
    sidebar.classList.add('absolute','z-50', 'flex' , 'flex-row-reverse')
    sidebar.classList.remove('hidden');

    sidebarCloseIcon.classList.remove('hidden')
    sidebarCloseIcon.classList.add('flex')

    document.body.classList.add('overflow-hidden')

    overlay.classList.remove('hidden')
}

    function closeSidebar() {
    sidebar.classList.remove('absolute','z-50' , 'flex' , 'flex-row-reverse')
    sidebar.classList.add('hidden');

    sidebarCloseIcon.classList.add('hidden')
    sidebarCloseIcon.classList.remove('flex')

    document.body.classList.remove('overflow-hidden')

    overlay.classList.add('hidden')
}

    sidebarOpenIcon.addEventListener('click' , () => openSidebar() );
    sidebarCloseIcon.addEventListener('click' , () => closeSidebar())
    overlay.addEventListener('click' , () => closeSidebar())
    window.addEventListener('resize' , () => closeSidebar())
</script>
</body>
</html>