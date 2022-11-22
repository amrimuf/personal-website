import Link from "next/link";
import { InferGetServerSidePropsType } from "next";

import FeaturedPost from "../components/FeaturedPost";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import Seo from "../components/Seo";
import { getAbout, getPosts } from '../../services';

export default function home({ posts, about }: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
    <Layout>
        <Seo/>
        <Hero {...about}/>
        <h1 className='text-2xl font-bold text-gray-900 lg:text-5xl dark:text-white lg:mt-12 pb-2 sm:pb-6 ' data-fade='0'>
            Featured Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-4 w-full">
            {posts.filter((posts: { featured: boolean; }) => posts.featured != false).map((post:any) => (
            <div key={post.id} className="w-full px-4 border-2 rounded-lg border-sky-500 pb-6 ">
                <FeaturedPost {...post} />
            </div>
            ))}
        </div>
        <Link href='/blog' className="inline-flex items-center w-full justify-center text-sm lg:text-lg font-semibold rounded px-4 py-2 mt-4 border border-2 border-gray-400 rounded dark:border-white-300 dark:hover:border-white hover:border-gray-600">View all posts</Link>
        
    </Layout>
    );
}

export async function getServerSideProps() {
    const posts = await getPosts() || [] 
    const abouts = await getAbout()

    return {
        props: { 
            posts,
            about: abouts.length > 0 ? abouts[0] : {}
        }
    }
}