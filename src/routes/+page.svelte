<script>
  import { onMount } from 'svelte';
  import { db } from '$lib/firebase';
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
      addDoc

  } from 'firebase/firestore';

  let blogs = []
  let loading = false;
  let categories = [];
  let categoryData = {};
  let email;

  onMount(() => {
    loading = true;
    const unsubscribe = onSnapshot(
      query(collection(db, "blogs"), orderBy("timestamp", "desc")),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const blog = doc.data();
          blog["id"] = doc.id;
          blogs.push(blog);
          loading = false;
        });
      }
    );

    const docRef = doc(db, "categories", "allCategories");
    getDoc(docRef).then(res=>{
        categoryData = res.data();
        console.log(categoryData)
        for(let property in categoryData){
            categories.push(property);
            categories = categories;
        }
    })

    return () => {
      unsubscribe();
    };
  });

  const subscribe = async () => {
    await addDoc(collection(db, "subscribers"), {
      email: email,
    });
  }
</script>



<nav class="border-gray-200 bg-gray-50">
    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      <a href="#" class="flex items-center">
          <span class="self-center text-2xl font-semibold whitespace-nowrap">"Learn, grow, explore, expand."  📚🌱 </span>
      </a>
      <button data-collapse-toggle="navbar-solid-bg" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="navbar-solid-bg" aria-expanded="false">
          <span class="sr-only">Open main menu</span>
          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-solid-bg">
        <!--
          <ul class="flex flex-col font-medium mt-4 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent">
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">About Us</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Contact</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Services</a>
            </li>
            <li>
              <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0">Item 4</a>
            </li>
          </ul>
        -->
      </div>
    </div>
  </nav>
  

<section class="text-gray-500 bg-gray-200">
    <div class="container flex flex-col items-center px-5 py-24 mx-auto md:flex-row lg:px-24">
      <div class="flex flex-col items-center mb-16 text-left lg:flex-grow lg:w-1/2 lg:pr-24 md:items-start md:mb-0">
        <div class="flex flex-col w-full mb-8 lg:flex-grow md:items-start">
          <span class="mb-4 text-sm font-semibold text-gray-600 uppercase">1600+ Subscribers</span>
          <h1
            class="mb-4 text-5xl font-bold leading-none tracking-tight text-black md:text-7xl 2xl:text-6xl lg:text-5xl title-font">
            Our articles are always concise and focus on delivering real value not recycled content. Join below to be on the cutting edge. <!--because our articles are always concise and focus on delivering real value not recycled content. Subscribe to stay up to date with the 1%.-->
          </h1>
        </div>
        <div class="w-full">
          <div class="emailoctopus-form-wrapper emailoctopus-form-unstyled null">
            <p class="text-gray-500 emailoctopus-success-message"></p>
            <p class="text-gray-500 emailoctopus-error-message"></p>
            <form action="#" method="post" data-message-success="Thanks for subscribing!"
              data-message-missing-email-address="Your email address is required."
              data-message-invalid-email-address="Your email address looks incorrect, please try again."
              data-message-bot-submission-error="This doesn't look like a human submission."
              data-message-consent-required="Please check the checkbox to indicate your consent."
              data-message-invalid-parameters-error="This form has missing or invalid fields."
              data-message-unknown-error="Sorry, an unknown error has occurred. Please try again later."
              class="items-center text-gray-500 emailoctopus-form" data-sitekey="#">
              <div class="emailoctopus-form-row"></div>
              <div aria-hidden="true" class="hidden emailoctopus-form-row-hp">
                <input type="text" name="#" tabindex="-1" autocomplete="nope" />
              </div>
              <div class="text-center emailoctopus-form-row-subscribe">
                <input
                  bind:value={email} class="w-full px-4 py-2 mb-4 text-base text-center text-gray-500 transition duration-500 ease-in-out transform bg-white border border-transparent border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2"
                  id="field_0" name="field_0" type="email" placeholder="chad.gardner@gmail.com" required="required" />
                <input type="hidden" name="successRedirectUrl" />
                <button on:click={subscribe}
                  class="sub w-full px-4 py-2 text-lg tracking-wide text-gray-100 transition duration-500 ease-in-out transform bg-black border-blue-600 rounded-md">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.6/form-recaptcha.js"></script>
          <script src="https://emailoctopus.com/bundles/emailoctopuslist/js/1.6/form-embed.js"></script>
        </div>
      </div>
      <div class="hidden w-5/6 lg:max-w-lg lg:w-full md:w-1/2 lg:block">
        <img class="object-cover object-center rounded-lg" alt="hero"
          src="https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41477-019-0374-3/MediaObjects/41477_2019_374_Figa_HTML.jpg" />
      </div>
    </div>
  </section>
  <section class="text-gray-500 bg-gray-100">\
    <!--
    <div class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
      <div class="w-full container mx-auto flex flex-col sm:flex-row items-center justify-center text-sm font-bold uppercase mt-0 px-6 py-8">
          {#each categories as category}
              <a href="{categoryData[category]}" class="hover:bg-gray-400 rounded py-2 px-4 mx-2">{category}</a>
          {/each}
      </div>
    </div>
    -->
    <div class="container items-center px-5 pb-12 mx-auto lg:px-24">
      <div class="w-full flex flex-wrap -m-4">
        {#if loading === false}
          {#each blogs as blog}
            <div class="w-full p-4 md:w-1/2 lg:w-1/3"> <!--Blog Start-->
              <div class="h-full overflow-hidden rounded-lg shadow-xl ">
                <img class="object-cover object-center w-full lg:h-48 md:h-36" src="{blog.img || ""}"
                  alt="unicornsfeed newsletter - Issue Nasd - asdf" />
                <div class="content-around p-6">
                  <h2 class="mb-1 font-mono text-xs font-medium tracking-widest text-gray-500 title-font">
                    {blog.category}
                  </h2>
                  <h3 class="mb-3 text-lg font-bold text-gray-900 title-font">
                    {blog.title}
                  </h3>
                  <p class="mb-3 leading-relaxed lg:line-clamp-2">{blog.hook}</p>
                  <div class="flex flex-wrap items-center">
                    <a href="/article/{blog.id}"
                      class="inline-flex items-center px-6 py-3 mt-4 text-lg font-semibold text-gray-600 transition duration-500 ease-in-out border rounded-lg hover:bg-gray-200 md:mb-2 lg:mb-0 hover:text-gray-900 dark:border-gray-600 dark:text-white dark:bg-gray-600">Read
                      more &nbsp; »
                    </a>
                  </div>
                </div>
              </div>
            </div> <!--Blog End-->
          {/each}
        {:else if loading === true}
          <h1>Loading</h1>
        {/if}
      </div>
    </div>
  </section>

  <style>
    .sub{
        background-color: black;
    }
  </style>