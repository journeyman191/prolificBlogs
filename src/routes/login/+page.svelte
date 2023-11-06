<script>
  import { onMount } from "svelte";
  

  let username;
  let password;

  const login = () =>{
    if(username === "Dillan782" && password === "lilDillyBoy"){
      localStorage.setItem("loggedIn", "Adminyessir");
      window.location.href = "/post";
    }else{
      alert("Incorrect Username/Password")
    }
  }
  
</script>

<div class="w-screen h-screen flex justify-center items-center">
        <div class="flex min-h-full w-full flex-col justify-center px-6 py-12 lg:px-8">
            <div class="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Login</h2>
            </div>
          
            <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form class="space-y-6" action="#" method="POST">
                <div>
                  <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                  <div class="mt-2">
                    <input bind:value={username} id="email" name="email" type="email" autocomplete="email" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
          
                <div>
                  <div class="flex items-center justify-between">
                    <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                  </div>
                  <div class="mt-2">
                    <input bind:value={password} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                  </div>
                </div>
          
                <div>
                  <button on:click={login} type="button" class="flex w-full justify-center rounded-md bg-blue-300 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm">Login</button>
                </div>
              </form>

            </div>
          </div>
</div>