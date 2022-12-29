import Image from 'next/image';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React from 'react';
import { RichText } from '@graphcms/rich-text-react-renderer';

import Layout from '../../components/Layout';
import PostMetaTitle from '../../components/PostMetaTitle';
import Seo from '../../components/Seo';
import { getPost, getNextPrevPosts } from '../../../services';
import Link from 'next/link';
import { InferGetServerSidePropsType } from 'next';
import styles from '../../styles/styles.module.css'

export default function Detail({ post, prevSlug, prevTitle, nextSlug, nextTitle }:InferGetServerSidePropsType<typeof getServerSideProps>) {

    const prevUrl = post.isBlog != false ? 'blog' : 'projects'

    return (
        <Layout>
            <Seo
            templateTitle={post.title}
            description={post.headline}
            />

            <nav className="lg:w-10/12 mx-auto rounded-full hidden text-sm sm:block px-2 py-1 dark:text-neutral-100">
            <ol className="list-reset flex">
                <li><Link href="/" className="text-lime-500 hover:underline">Home</Link></li>
                <li><span className="text-gray-500 mx-2 ">/</span></li>
                <li><Link href={`/${prevUrl}`} className="text-lime-500 hover:underline capitalize">{prevUrl}</Link></li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-neutral-600 dark:text-neutral-400">{post.category}</li>
                <li><span className="text-gray-500 mx-2">/</span></li>
                <li className="text-neutral-600 dark:text-neutral-400">{post.title}</li>
            </ol>
            </nav>
            
            <div className="md:w-10/12 w-full mx-auto flex items-center flex-col">
                <div className="flex justify-center -mx-4 flex-wrap mt-6">
                    <PostMetaTitle
                    category={post.category}
                    date={post.createdAt}
                    title={post.title}
                    slug={post.slug}
                    featured={post.featured}
                    center
                    />
                </div>

                <Image 
                    src={post.thumbnail.url} 
                    alt={post.title} 
                    width={500} 
                    height={500} 
                    blurDataURL={`/_next/image?url=${post.thumbnail.url}&w=16&q=1`} 
                    placeholder='blur' 
                    className={`object-cover h-64 w-auto rounded mb-6 ${styles.handDrawnBorderImage}`} />
            </div>

            <div className="md:w-10/12 w-full mx-auto">
                <article className='content mx-auto bg-white/50 p-6 rounded-xl shadow-xl sm:shadow-2xl dark:bg-black/30 dark:shadow-lime-700' >
                <RichText
                    content={post.content.json.children}
                    references={post.content.references}
                    renderers={{
                    //     a: ({ children, href, openInNewTab }) => (
                    //         <a
                    //             href={href}
                    //             target={openInNewTab ? '_blank' : '_self'}
                    //             className='no-underline hover:underline text-lime-500 dark:text-lime-500'
                    //             rel="noreferrer"
                    //         >
                    //             {children}
                    //         </a>
                    //     ),
                    //     img: ({src, width, height}) => (
                    //         <img src={src} width={width} height={height} className='mx-auto'>
                    //         </img>
                    //     ),
                        Asset: {
                            // image: () => <div></div>,
                            'image/png': ({url, width, height}) => {
                            return <img src={url} width={width} height={height}></img>;
                        },
                        },
                    }}
                    />        
                </article>
                
                <div className='flex justify-between'>
                    <Link className='inline-flex items-center justify-between space-x-2 text-sm lg:text-lg font-semibold rounded py-2 mt-4 mt-12' href={`/blog/${prevSlug}`}>
                        <i className='bi bi-chevron-left hover:text-lime-500 bi-hover-bold' ></i>
                        <div className='w-[100px] sm:w-[300px]'>
                            <div className='text-lime-500'>PREVIOUS</div> 
                            <div className='truncate text-neutral-600 dark:text-neutral-400 '>{prevTitle}</div>
                        </div>
                    </Link>
                    <Link className='inline-flex items-center justify-between space-x-2 text-sm lg:text-lg font-semibold rounded py-2 mt-4 mt-12 text-right' href={`/blog/${nextSlug}`}>
                        <div className='w-[100px] sm:w-[270px]'>
                            <div className='text-lime-500'>NEXT</div>
                            <div className='truncate text-neutral-600 dark:text-neutral-400'>{nextTitle}</div>
                        </div>
                        <i className='bi bi-chevron-right hover:text-lime-500  bi-hover-bold'></i>
                    </Link>
                </div>
            </div>
        </Layout>
    );
}


export async function getServerSideProps({params}:any) {
    const post = await getPost(params.slug) || [] 
    const posts = await getNextPrevPosts()
    
    const index = posts.findIndex(function(post:any) {
        return post.slug === params.slug;
    });

    const len = posts.length
    let prevSlug = posts[(index+len-1)%len].slug;
    let prevTitle = posts[(index+len-1)%len].title;
    let nextSlug = posts[(index+1)%len].slug;    
    let nextTitle = posts[(index+1)%len].title;    

    return {
        props: { post, prevSlug, prevTitle, nextSlug, nextTitle }
    }
}