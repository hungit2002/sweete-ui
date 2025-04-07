import React from 'react';

function AttendanceItem(props: {}) {
    return (
        <div>
            <div
                className="w-[150px] min-h-[300px] flex-shrink-0 flex flex-col justify-end rounded-2xl shadow-md relative p-2 font-bold text-white"
                style={{
                    backgroundImage: `url("https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                }}
            >
            </div>
            <p className={"flex justify-center my-1"}>
                <span className="text-md font-bold">John Doe</span>
            </p>
        </div>
    );
}

export default AttendanceItem;