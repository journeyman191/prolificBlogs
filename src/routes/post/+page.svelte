<script>
    import Editor from "@tinymce/tinymce-svelte";

    let conf = {
        content_style: ".p { color: red; } body { margin: 0; padding: 0; }",
        height: "100vh",
    }
</script>


<div class="w-screen h-screen flex flex-wrap">
    <div class="w-full lg:w-1/2">
        <div class="mt-16 md:mt-28 lg:mt-40 flex flex-col justify-center items-center mb-10">
            <h1 class="mb-1 md:mx-0 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Post Blog</h1>
            <p class="text-gray-600 text-center">Blogs posted today: 43</p>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div class="w-2/3 mb-4">
                <label for="blogTitle" class="block text-sm font-medium leading-6 text-gray-900">What is the blog title?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input type="text" name="blogTitle" id="blogTitle" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="Fun time with friends">
                </div>
            </div>
        
            <div class="w-2/3 mb-6 flex flex-col">
                <label for="keywords" class="block text-sm font-medium leading-6 text-gray-900">What keywords would you like to add?</label>
                <div class="relative mt-2 mb-6 rounded-md shadow-sm">
                    <input type="text" name="keywords" id="keywords" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="Fun time with friends">
                </div>
                <button class="justify-self-end bg-black text-white transform p-4 rounded-xl self-end font-semibold">Next</button>
            </div>
        </div>
    </div>

    <div class="w-full lg:w-1/2 px-10 pt-10">
        <div class="rounded-md shadow-sm">
            <Editor apiKey="6bonds4k9gcv6r9duxe2mgtgf6zovqhix4qglxzkkppws98h" {conf}/>
        </div>
    </div>
</div>
