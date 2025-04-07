import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChevronLeft, faChevronRight, faPlusCircle} from "@fortawesome/free-solid-svg-icons";
import {UserInfoLS} from "@/models";
import NewItem from "@/app/Modules/Home/News/NewItem";
import { AvatarDefault } from '@/constant';
import AttendanceItem from "@/app/Modules/User/Attendance/AttendanceItem";

function Attendance(props: {
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
                {/* Các item danh sách */}
                {Array.from({length: 10}).map((_, index) => (
                    <AttendanceItem key={index}/>
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

export default Attendance;