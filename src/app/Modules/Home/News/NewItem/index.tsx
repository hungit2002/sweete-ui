import React from 'react';

function NewItem(props: {}) {
    return (
        <div
            className="w-[112px] min-h-[200px] flex-shrink-0 flex flex-col justify-end rounded-2xl shadow-md relative p-2 font-bold text-white"
            style={{
                backgroundImage: `url("https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <div
                className="w-[35px] h-[35px] rounded-full p-1 bg-default absolute top-4 left-4">
                <img
                    src="https://media.istockphoto.com/id/1399565382/photo/young-happy-mixed-race-businessman-standing-with-his-arms-crossed-working-alone-in-an-office.jpg?s=612x612&w=0&k=20&c=buXwOYjA_tjt2O3-kcSKqkTp2lxKWJJ_Ttx2PhYe3VM="
                    className="object-cover rounded-full w-full h-full"
                />
            </div>
            <p>
                <span className="text-xs">John Doe</span>
            </p>
        </div>
    );
}

export default NewItem;