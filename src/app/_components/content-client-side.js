"use client";
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from "@tanstack/react-query";
import ErrorField from "@/components/ErrorField";
import Card from "@/components/Card";
import { Button } from "@/components/ui/button";
import useStore from "@/lib/store";

export default function ContentClientSide({ queryKey, queryFn }) {
  const { autoInfinite } = useStore((state) => state);
  const loadMoreRef = useRef(null);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    refetch,
  } = useInfiniteQuery({
    queryKey: queryKey,
    queryFn: queryFn,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => lastPage.page + 1,
  });

  // IntersectionObserver for loading more content on scroll if autoInfinite is true
  useEffect(() => {
    if (!hasNextPage) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some(entry => entry.isIntersecting) && autoInfinite && !isFetchingNextPage) {
          setTimeout(() => fetchNextPage(), 500);
        }
      },
      {
        root: null, // Default is the viewport
        rootMargin: '0px',
        threshold: 1.0, // Trigger when 100% of the element is visible
      }
    );
    const currentElement = loadMoreRef.current;
    if (currentElement) observer.observe(currentElement);

    return () => {
      if (currentElement) observer.unobserve(currentElement);
    };
  }, [hasNextPage, autoInfinite, fetchNextPage, isFetchingNextPage]);

  if (error) return <ErrorField action={refetch} />;

  return (
    <div className={"flex flex-wrap gap-5 w-4/5 pl-5"}>
      {status === "success" && data?.pages?.length > 0 ? (
        data.pages.map((page) =>
          page.results.map((item, i) => (
            <Card key={item.id} data={item} className={"grow h-[340px]"} />
          ))
        )
      ) : (
        [...Array(10)].map((_, i) => <Card key={i} data={"loading"} className={"grow h-[340px]"} />)
      )}
      {isFetchingNextPage && [...Array(10)].map((_, i) => <Card key={i} data={"loading"} className={"grow h-[340px]"} />)}

      <div ref={loadMoreRef} className={`w-full flex flex-col gap-2 pt-5 items-center justify-center ${!hasNextPage && "hidden"}`}>
        <Button variant={"outline"} className={"rounded-full"} disabled={isFetchingNextPage}
                onClick={() => fetchNextPage()}>{isFetchingNextPage ? "Loading....." : "Load More"}</Button>
      </div>
    </div>
  );
}