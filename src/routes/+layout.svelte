<script>
    import "../app.css";
    import { dev } from '$app/environment';
    import { inject } from '@vercel/analytics';
    import { onMount } from "svelte";
    inject({ mode: dev ? 'development' : 'production' });

    onMount(()=>{
        const loggedIn = localStorage.getItem("loggedIn");

        if(window.location.pathname === "/post" && loggedIn != "Adminyessir"){
            window.location.href = "/login"
        }

        if(window.location.pathname === "/login" && loggedIn === "Adminyessir"){
            window.location.href = "/post"
        }
    })
</script>
  
<slot />