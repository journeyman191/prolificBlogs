<script>
    import { page } from "$app/stores";
    import {db} from "$lib/firebase"
    import {
      collection,
      updateDoc,
      doc,
      arrayUnion,
      where,
      query,
      getDoc,
      getDocs,
      onSnapshot,
      orderBy,
      limit
    } from "firebase/firestore";


    let slug = $page.params.slug;
    let data = {
        content: "",
        hook: "",
        title: ""
    };


    let loading = false;
    let categories = [];
    let categoryData = {};
    let otherArticles = []


    if(slug){
        loading = true;
        const docRef = doc(db, "blogs", slug);
        getDoc(docRef).then(res=>{
            data = res.data();
            console.log(data)
        })
        
        loading = false;
    }

    const docRef = doc(db, "categories", "allCategories");
    getDoc(docRef).then(res=>{
        categoryData = res.data();
        console.log(categoryData)
        for(let property in categoryData){
            categories.push(property);
            categories = categories;
        }
    })

    let blogQuery = query(collection(db, "blogs"));
    blogQuery = query(
        blogQuery,
        orderBy("timestamp", "desc"),
        limit(4)
    );

    getDocs(blogQuery).then(res => {
        for(let article of res.docs){
            let articleItem = article.data();
            articleItem.id = article.id;
            otherArticles.push(articleItem);
            otherArticles = otherArticles;
        }
    })

    const shortenHook = (str) =>{
        const regex = /(?<=[.!?])/; 
        str.split(regex);
        const sentences = str.split(regex);
        const firstTwoSentences = sentences.slice(0, 2);
        return(firstTwoSentences);
    }

</script>

<nav class="w-full py-4 bg-blue-800 shadow">
    <div class="w-full container mx-auto flex flex-wrap items-center justify-between">

        <nav>
            <ul class="flex items-center justify-between font-bold text-sm text-white uppercase no-underline">
                <li><a class="hover:text-gray-200 hover:underline px-4" href="#">Shop</a></li>
                <li><a class="hover:text-gray-200 hover:underline px-4" href="#">About</a></li>
            </ul>
        </nav>

        <div class="flex items-center text-lg no-underline text-white pr-6">
            <a class="" href="#">
                <i class="fab fa-facebook"></i>
            </a>
            <a class="pl-6" href="#">
                <i class="fab fa-instagram"></i>
            </a>
            <a class="pl-6" href="#">
                <i class="fab fa-twitter"></i>
            </a>
            <a class="pl-6" href="#">
                <i class="fab fa-linkedin"></i>
            </a>
        </div>
    </div>

</nav>

<!-- Text Header -->
<header class="w-full container mx-auto">
    <div class="flex flex-col items-center py-12">
        <a class="font-bold text-gray-800 uppercase hover:text-gray-700 text-5xl" href="#">
            DKILLER'S BLOG
        </a>
        <p class="text-lg text-gray-600">
            "I'm out of town thuggin wit my rounds, my coochie pink..."🎶
        </p>
    </div>
</header>

<!-- Topic Nav -->
<nav class="w-full py-4 border-t border-b bg-gray-100" >
    <div class="block sm:hidden">
        <a
            href="#"
            class="block md:hidden text-base font-bold uppercase text-center flex justify-center items-center"
            
        >
            Topics <i class="fas ml-2"></i>
        </a>
    </div>
    <div class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
        <div class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-2">
            {#each categories as category}
                <a href="{categoryData[category]}" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">{category}</a>
            {/each}
        </div>
    </div>
</nav>


<div class="w-screen flex items-center justify-center py-6">

    <!-- Post Section -->
    <section class="w-full flex justify-center items-center flex-col">
        <article class="main w-full max-w-4xl">
            <header class="mb-4 lg:mb-6">
                <address class="flex items-center mb-6">
                    <div class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white">
                        <img class="w-16 h-16 rounded-full" src="https://flowbite.com/docs/images/people/profile-picture-2.jpg" alt="Jese Leos">
                        <div>
                            <a href="#" rel="author" class="text-xl font-bold text-gray-900 dark:text-white">Jese Leos</a>
                            <p class="text-base text-gray-500 dark:text-gray-400">Graphic Designer, educator & CEO Flowbite</p>
                            <p class="text-base text-gray-500 dark:text-gray-400"><time pubdate datetime="2022-02-08" title="February 8th, 2022">Feb. 8, 2022</time></p>
                        </div>
                    </div>
                </address>
                <h1 class="mb-4 text-3xl font-extrabold leading-tight text-gray-900 lg:mb-6 lg:text-4xl dark:text-white">{data.title}</h1>
            </header>
            <p class="text-2xl mb-6 font-medium">{data.hook}</p>
            {@html data.content}
           
        <!--
            <section class="not-format">
                <div class="flex justify-between items-center mb-6 mt-12">
                    <h2 class="text-lg lg:text-2xl font-bold text-gray-900">Discussion (20)</h2>
                </div>
                <form class="">
                    <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea id="comment" rows="6"
                            class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0"
                            placeholder="Write a comment..." required></textarea>
                    </div>
                    <button type="submit"
                        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                        Post comment
                    </button>
                </form>
                <article class="p-6 mb-6 text-base bg-white rounded-lg">
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900"><img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                                    alt="Michael Gough">Michael Gough</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-08"
                                    title="February 8th, 2022">Feb. 8, 2022</time></p>
                        </div>
                        <button id="dropdownComment1Button" data-dropdown-toggle="dropdownComment1"
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50"
                            type="button">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                              </svg>
                            <span class="sr-only">Comment settings</span>
                        </button>
                        
                        <div id="dropdownComment1"
                            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow">
                            <ul class="py-1 text-sm text-gray-700"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p>Very straight-to-point article. Really worth time reading. Thank you! But tools are just the
                        instruments for the UX designers. The knowledge of the design tools are as important as the
                        creation of the design strategy.</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                              <svg class="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                              </svg>
                            Reply
                        </button>
                    </div>
                </article>
                <article class="p-6 mb-6 ml-6 lg:ml-12 text-base bg-white rounded-lg dark:bg-gray-900">
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                    alt="Jese Leos">Jese Leos</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-02-12"
                                    title="February 12th, 2022">Feb. 12, 2022</time></p>
                        </div>
                        <button id="dropdownComment2Button" data-dropdown-toggle="dropdownComment2"
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                              </svg>
                            <span class="sr-only">Comment settings</span>
                        </button>
                        
                        <div id="dropdownComment2"
                            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p>Much appreciated! Glad you liked it ☺️</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                              <svg class="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                                  <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                              </svg>
                            Reply
                        </button>
                    </div>
                </article>
                <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                                    alt="Bonnie Green">Bonnie Green</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-03-12"
                                    title="March 12th, 2022">Mar. 12, 2022</time></p>
                        </div>
                        <button id="dropdownComment3Button" data-dropdown-toggle="dropdownComment3"
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                              </svg>
                            <span class="sr-only">Comment settings</span>
                        </button>
                        
                        <div id="dropdownComment3"
                            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p>The article covers the essentials, challenges, myths and stages the UX designer should consider while creating the design strategy.</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                            <svg class="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                            </svg>
                            Reply
                        </button>
                    </div>
                </article>
                <article class="p-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                    <footer class="flex justify-between items-center mb-2">
                        <div class="flex items-center">
                            <p class="inline-flex items-center mr-3 font-semibold text-sm text-gray-900 dark:text-white"><img
                                    class="mr-2 w-6 h-6 rounded-full"
                                    src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
                                    alt="Helene Engels">Helene Engels</p>
                            <p class="text-sm text-gray-600 dark:text-gray-400"><time pubdate datetime="2022-06-23"
                                    title="June 23rd, 2022">Jun. 23, 2022</time></p>
                        </div>
                        <button id="dropdownComment4Button" data-dropdown-toggle="dropdownComment4"
                            class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-500 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:text-gray-400 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            type="button">
                              <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                              </svg>
                        </button>
                        
                        <div id="dropdownComment4"
                            class="hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                            <ul class="py-1 text-sm text-gray-700 dark:text-gray-200"
                                aria-labelledby="dropdownMenuIconHorizontalButton">
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Edit</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Remove</a>
                                </li>
                                <li>
                                    <a href="#"
                                        class="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Report</a>
                                </li>
                            </ul>
                        </div>
                    </footer>
                    <p>Thanks for sharing this. I do came from the Backend development and explored some of the tools to design my Side Projects.</p>
                    <div class="flex items-center mt-4 space-x-4">
                        <button type="button"
                            class="flex items-center font-medium text-sm text-gray-500 hover:underline dark:text-gray-400">
                            <svg class="mr-1.5 w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                              <path d="M18 0H2a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h2v4a1 1 0 0 0 1.707.707L10.414 13H18a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5 4h2a1 1 0 1 1 0 2h-2a1 1 0 1 1 0-2ZM5 4h5a1 1 0 1 1 0 2H5a1 1 0 0 1 0-2Zm2 5H5a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Zm9 0h-6a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z"/>
                            </svg>
                            Reply
                        </button>
                    </div>
                </article>
            </section>
        -->
        </article>
    </div>



  
  <aside aria-label="Related articles" class="py-8 lg:py-24 bg-gray-50">
    <div class="px-4 mx-auto max-w-screen-xl">
        <h2 class="text-2xl font-bold text-gray-900">Other interesting articles</h2>
        <div class="mt-10 grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
            {#each otherArticles as article}
                <article class="max-w-xs">
                    <a href="#">
                        <img src={article.img} class="mb-5 rounded-lg" alt="Image 1">
                    </a>
                    <h2 class="mb-2 text-xl font-bold leading-tight text-gray-900 dark:text-white">
                        <a href="#">{article.title}</a>
                    </h2>
                    <p class="mb-4 text-gray-500 dark:text-gray-400">{shortenHook(article.hook)}</p>
                    <a href="/article/{article.id}" class="inline-flex items-center font-medium underline underline-offset-4 text-primary-600 hover:no-underline">
                        Read in {Math.floor(Math.random() * 8) + 2} minutes
                    </a>
                </article>
            {/each}
        </div>
    </aside>

    <style>
        h2{
            font-size: 1.8rem;
            color: rgb(46, 46, 46);
            font-weight: 700;
            margin-top: 1rem;
            margin-bottom: 0.5rem;
        }

        .articleP{
            color: rgb(46, 46, 46);
            font-size: 1.3rem;
            font-weight: 350;
        }
    </style>


