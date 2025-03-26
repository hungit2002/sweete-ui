import React, {useEffect, useState, useCallback, useRef} from 'react';
import Feed from "@/app/Modules/Home/Feeds/Feed";
import {getListPost} from "@/Services/postService";
import {toast} from "react-toastify";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {setPosts} from "@/lib/features/posts/postSlice";
import Loading from "@/app/components/Loading/Loading";

const ListPost = () => {
    const dispatch = useAppDispatch();
    const posts = useAppSelector(state => state.post.posts)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [noMorePosts, setNoMorePosts] = useState<boolean>(false);
    const observer = useRef<IntersectionObserver | null>(null)
    
    const lastPostRef = useCallback((node: HTMLDivElement) => {
        if (isLoading) return;
        if (observer.current) observer.current.disconnect()
        
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prevPage => prevPage + 1)
            }
        })
        
        if (node) observer.current.observe(node)
    }, [isLoading, hasMore])

    const getDataListPost = (pageNumber: number) => {
        setIsLoading(true)
        getListPost(pageNumber).then((res: any) => {
            if (res?.data?.meta?.code == 200) {
                const newPosts = res?.data?.result
                if (pageNumber === 1) {
                    dispatch(setPosts(newPosts))
                } else {
                    if (newPosts.posts.data.length === 0) {
                        setNoMorePosts(true);
                        setHasMore(false);
                    } else {
                        dispatch(setPosts({
                            ...posts,
                            posts: {
                                ...posts.posts,
                                data: [...posts.posts.data, ...newPosts.posts.data]
                            }
                        }))
                    }
                }
                setIsLoading(false)
            } else {
                toast.error(res?.data?.meta?.message)
            }
        }).catch((err) => {
            setIsLoading(false)
            console.log(err)
            toast.error("Error when get list post")
        })
    }

    useEffect(() => {
        getDataListPost(page)
    }, [page]);

    return (
        <>
            <div className={"mt-3 flex flex-col gap-3"}>
                {posts?.posts?.data?.map((post: Post, index: number) => {
                    if (posts.posts.data.length === index + 1) {
                        return (
                            <div ref={lastPostRef} key={index}>
                                <Feed maxLength={200} post={post} />
                            </div>
                        )
                    }
                    return <Feed maxLength={200} key={index} post={post} />
                })}
                {isLoading && (
                    <div className={"flex justify-center items-center"}>
                        <Loading/>
                    </div>
                )}
                {noMorePosts && (
                    <div className="text-center py-4 text-gray-500">
                        No more posts to load
                    </div>
                )}
            </div>
        </>
    );
};

export default ListPost;