<!-- a Breadcrumb Bar from Bootstrap Documentation -->
<template>
    <div class="row">
        <nav
            aria-label="breadcrumb"
            class="breadcrumb"
            style="background-color: rgb(245 245 245); border-radius: 5px"
            >
            <ol class="breadcrumb p-2 bg-body-tertiary rounded-3">
                <li class="breadcrumb-item">
                    <RouterLink to="/projects">
                        Projects
                    </RouterLink>
                </li>
                <li class="breadcrumb-item">
                    <RouterLink>
                        <slot name="project-name">Project Name</slot>
                    </RouterLink>
                </li>
                <li class="breadcrumb-item" style="text-decoration: none">
                    <RouterLink>
                        <b>Tasks</b>
                    </RouterLink>
                </li>
            </ol>
        </nav>
   </div>
</template>

<style scoped>
.breadcrumb-item a {
   text-decoration: none;
   font-weight: 400;
}
</style>
