import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {UserInfoLS} from "@/models";
import NewItem from "@/app/Modules/Home/News/NewItem";

function News(props: {
    userInfo: UserInfoLS;
}) {

    const {userInfo} = props;

    const scrollRef = useRef<any>(null);
    const [canScrollLeft, setCanScrollLeft] = useState<boolean>(false);
    const [canScrollRight, setCanScrollRight] = useState<boolean>(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const {scrollLeft, scrollWidth, clientWidth} = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0); // Nếu scrollLeft > 0 thì có thể cuộn trái
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth); // Nếu chưa cuộn hết phải thì có thể cuộn phải
        }
    };
    // Hàm cuộn danh sách sang trái/phải
    const scroll = (direction: any) => {
        if (scrollRef.current) {
            const scrollAmount = 600; // Khoảng cách cuộn mỗi lần
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth", // Hiệu ứng cuộn mượt
            });
        }
    };
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener("scroll", checkScroll);
            checkScroll(); // Kiểm tra lần đầu
            return () => scrollContainer.removeEventListener("scroll", checkScroll);
        }
    }, []);

    return (
        <div className="relative w-full">
            {/* Nút Previous */}
            {
                canScrollLeft && (
                    <button
                        className="absolute left-6 top-1/2 -translate-y-1/2 z-10 p-2 w-[50px] h-[50px] bg-white rounded-full shadow-lg"
                        onClick={() => scroll("left")}
                    >
                        <FontAwesomeIcon icon={faChevronLeft} size="lg"/>
                    </button>
                )
            }

            {/* Danh sách cuộn */}
            <div ref={scrollRef} className="news mt-3 flex gap-2 overflow-x-auto scrollbar-hide w-full">
                {/* Item đầu tiên (Tạo mới) */}
                <div
                    className="w-[112px] min-h-[200px] flex-shrink-0 flex flex-col rounded-2xl border">
                    <div
                        className="w-100 h-[150px] rounded-t-2xl"
                        style={{
                            backgroundImage: `url("${userInfo?.avatar || "https://www.svgrepo.com/show/452030/avatar-default.svg"}")`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                        }}
                    ></div>
                    <div className="h-[50px] relative">
                        <div
                            className="p-1 rounded-full absolute top-[-40%] left-1/2 bg-white transform -translate-x-1/2">
                            <FontAwesomeIcon icon={faPlusCircle} size="2x" color="#F06060"/>
                        </div>
                        <p className="mt-[22px] text-sm text-center">Create</p>
                    </div>
                </div>

                {/* Các item danh sách */}
                {Array.from({length: 10}).map((_, index) => (
                    <NewItem key={index}/>
                ))}
            </div>

            {/* Nút Next */}
            {
                canScrollRight && (
                    <button
                        className="absolute right-6 top-1/2 -translate-y-1/2 z-10 p-2  w-[50px] h-[50px] bg-white rounded-full shadow-lg"
                        onClick={() => scroll("right")}
                    >
                        <FontAwesomeIcon icon={faChevronRight} size="lg"/>
                    </button>
                )
            }
        </div>
    );
}

export default News;