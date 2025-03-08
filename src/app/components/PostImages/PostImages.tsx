import React from 'react';

const PostImages = (props: {
    images: any,
}) => {
    const { images } = props;
    if (!images || images.length === 0) return null; // Không hiển thị nếu không có ảnh

    return (
        <div className="bg-gray-300 rounded-lg shadow-lg w-full">
            <div className={`grid gap-1 ${images.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}>
                {images.length === 1 && (
                    <img className="w-full h-auto object-cover rounded-md" src={images[0]?.url} alt="Main" />
                )}

                {images.length === 2 && images.map((img: any, index: number) => (
                    <img key={index} className="w-full h-40 object-cover rounded-md" src={img?.url} alt={`Image ${index}`} />
                ))}

                {images.length === 3 && (
                    <>
                        <div className="row-span-2">
                            <img className="w-full h-full object-cover rounded-md" src={images[0]?.url} alt="Main" />
                        </div>
                        {images.slice(1).map((img: any, index: number) => (
                            <img key={index} className="w-full h-40 object-cover rounded-md" src={img?.url}
                                alt={`Thumbnail ${index}`} />
                        ))}
                    </>
                )}

                {images.length === 4 && images.map((img: any, index: number) => (
                    <img key={index} className="w-full h-40 object-cover rounded-md" src={img?.url}
                        alt={`Grid Image ${index}`} />
                ))}

                {images.length === 5 && (
                    <>
                        <div className="col-span-2">
                            <img className="w-full h-40 object-cover rounded-md" src={images[0]?.url} alt="Main" />
                        </div>
                        {images.slice(1).map((img: any, index: number) => (
                            <img key={index} className="w-full h-40 object-cover rounded-md" src={img?.url}
                                alt={`Grid Image ${index}`} />
                        ))}
                    </>
                )}

                {images.length > 5 && (
                    <>
                        <div className="col-span-2">
                            <img className="w-full h-40 object-cover rounded-md" src={images[0]} alt="Main" />
                        </div>
                        {images.slice(1, 4).map((img: any, index: number) => (
                            <img key={index} className="w-full h-40 object-cover rounded-md" src={img}
                                alt={`Grid Image ${index}`} />
                        ))}
                        <div className="relative">
                            <img className="w-full h-40 object-cover rounded-md" src={images[4]} alt="More" />
                            <div
                                className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center text-white text-lg font-bold">
                                +{images.length - 5}
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default PostImages;