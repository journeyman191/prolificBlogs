<script>
    import Editor from "@tinymce/tinymce-svelte";
    import { setDoc, doc, addDoc, collection, updateDoc, getDoc } from 'firebase/firestore';
    import { serverTimestamp } from 'firebase/firestore';
    import { db } from '$lib/firebase';

    let keywordsString = "";

    let value = `
            <h2>Getting started with Flowbite</h2>
            <p class="articleP">First of all you need to understand how Flowbite works. This library is not another framework.
                Rather, it is a set of components based on Tailwind CSS that you can just copy-paste from the
                documentation.</p>
            <p class="articleP">It also includes a JavaScript file that enables interactive components, such as modals, dropdowns,
                and datepickers which you can optionally include into your project via CDN or NPM.</p>
            <p class="articleP">You can check out the <a href="https://flowbite.com/docs/getting-started/quickstart/">quickstart
                    guide</a> to explore the elements by including the CDN files into your project. But if you want
                to build a project with Flowbite I recommend you to follow the build tools steps so that you can
                purge and minify the generated CSS.</p>
            <p class="articleP">You'll also receive a lot of useful application UI, marketing UI, and e-commerce pages that can help
                you get started with your projects even faster. You can check out this <a
                    href="https://flowbite.com/docs/components/tables/">comparison table</a> to better understand
                the differences between the open-source and pro version of Flowbite.</p>
            <h2>When does design come in handy?</h2>
            <p class="articleP">While it might seem like extra work at a first glance, here are some key moments in which prototyping
                will come in handy:</p>`;

    let blog = {
        title: "",
        category: "",
        hook: "",
        keywords: "daring",
        content: "", //Gets filled in on submit
        img: ""
    }

    let conf = {
        height: "100vh",
        content_style: "h2{             font-size: 1.8rem;             color: rgb(46, 46, 46);             font-weight: 700;             margin-top: 1rem;             margin-bottom: 0.5rem;         }          .articleP{             color: rgb(46, 46, 46);             font-size: 1.3rem;             font-weight: 350;         }",
    }

    const post = async ()=>{
        console.log(blog)
        if(!blog.title){
            alert("Please enter a title");
            return;
        }

        if(!blog.category){
            alert("Please enter a category");
            return;
        }

        if(!blog.hook){
            alert("Please enter a hook");
            return;
        }

        if(!blog.keywords){
            alert("Please add a few keywords");
            return;
        }

        if(!value){
            alert("Please create a blog");
            return;
        }
        try{
            blog.content =  value;
            await addDoc(collection(db, "blogs"), blog);
        }catch(err){
            alert("There was an unexpected error", err);
        }
    }
//ADD PLACE FOR THUMBNAIL
</script>


<div class="w-screen h-screen flex flex-wrap">
    <div class="w-full md:w-1/2">
        <div class="mt-16 md:mt-28 lg:mt-40 flex flex-col justify-center items-center mb-10">
            <h1 class="mb-1 md:mx-0 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">Create a Blog</h1>
            <p class="text-gray-600 text-center">Blogs posted today: 43</p>
        </div>
        <div class="flex flex-col justify-center items-center">
            <div class="w-2/3 mb-4">
                <label for="blogTitle" class="block text-sm font-medium leading-6 text-gray-900">What is the blog title?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input bind:value={blog.title} type="text" name="blogTitle" id="blogTitle" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="Jack jumped over the beanstalk">
                </div>
            </div>

            <div class="w-2/3 mb-4">
                <label for="category" class="block text-sm font-medium leading-6 text-gray-900">What category should this post be under?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input bind:value={blog.category} type="text" name="category" id="category" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="Sports Entertainment">
                </div>
            </div>

            <div class="w-2/3 mb-4">
                <label for="hook" class="block text-sm font-medium leading-6 text-gray-900">What is the irresistible hook?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input bind:value={blog.hook} type="text" name="hook" id="hook" class="text-sm block w-full rounded-md border-0 pt-2.5 pb-14 pl-3 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 placeholder:whitespace-normal" placeholder="John got paid $500 in one weekend after he changed one small thing about his lawncare business.">
                </div>
            </div>

            <div class="w-2/3 mb-4">
                <label for="img" class="block text-sm font-medium leading-6 text-gray-900">Add an Image link?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input bind:value={blog.img} type="text" name="img" id="img" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 pr-4 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6 placeholder:whitespace-normal" placeholder="">
                </div>
            </div>
        
            <div class="w-2/3 mb-6 flex flex-col">
                <label for="keywords" class="block text-sm font-medium leading-6 text-gray-900">What keywords would you like to add?</label>
                <div class="relative mt-2 rounded-md shadow-sm">
                    <input bind:value={keywordsString} type="text" name="keywords" id="keywords" class="text-sm block w-full rounded-md border-0 py-2.5 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:leading-6" placeholder="football,nfl,charlotte panthers,panthers">
                </div>
                <p class="pl-1 block text-xs font-medium leading-6 text-gray-900 mb-6">Please separate each keyword with comma and no space between comma and word. For example "basketball,nba,lebron".</p>
                <button on:click={post} class="justify-self-end bg-black text-white transform p-4 rounded-xl self-end font-semibold">Post</button>
            </div>
        </div>
    </div>

    <div class="w-full md:w-1/2 px-10 pt-10">
        <div class="rounded-md shadow-sm">
            <Editor apiKey="6bonds4k9gcv6r9duxe2mgtgf6zovqhix4qglxzkkppws98h" {conf} bind:value={value}/>
        </div>
    </div>
</div>

