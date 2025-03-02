import React from 'react'
import ModalDefault from '../../modal/ModalDefault'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTag, faXmark } from '@fortawesome/free-solid-svg-icons'

export default function ModalEditImages(props: {
    images: any,
    setImages: any,
    showModalEditImages: boolean,
    setShowModalEditImages: any,
    setShowModalTagFriends: any,
    setShowModalCreateFeed: any,
    currentImage: any,
    setCurrentImage: any
}) {

    const { 
        images, 
        setImages, 
        showModalEditImages, 
        setShowModalEditImages, 
        setShowModalTagFriends, 
        setShowModalCreateFeed,
        setCurrentImage 
    } = props;

    const handleCloseModalEditImages = () => {
        setShowModalEditImages(false);
        setShowModalCreateFeed(true);
    };
    return (
        <>
            <ModalDefault
                size="xl"
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Edit Images</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <div className="grid grid-cols-3 gap-2">
                            {
                                images?.length > 0 ? <>
                                    {
                                        images?.map((image: any, index: number) => (
                                            <div key={index} className="relative flex flex-col gap-1 p-1 border rounded-md">
                                                <div className="absolute top-2 right-2 w-[30px] h-[30px] bg-gray-100 rounded-full flex items-center justify-center cursor-pointer z-[9999]"
                                                    onClick={() => {
                                                        setImages((prev: any) => prev.filter((img: any) => img.id !== image.id))
                                                    }}
                                                >
                                                    <FontAwesomeIcon icon={faXmark} size={"sm"} />
                                                </div>
                                                <div className="relative">
                                                    <img src={image?.url} alt={`Image ${index}`} className={"w-full h-[200px] object-contain border rounded-md"} />
                                                    <div
                                                        onClick={() => {
                                                            setShowModalEditImages(false)
                                                            setShowModalTagFriends(true)
                                                            setCurrentImage(image)
                                                        }}
                                                        className="absolute bottom-2 left-2 cursor-pointer bg-black bg-opacity-50 p-1 rounded-md flex items-center gap-2">
                                                        <FontAwesomeIcon icon={faTag} size={"lg"} className="" color="#ccc" />
                                                        <p className="text-white text-sm">Tag friends</p>
                                                    </div>
                                                </div>
                                                <textarea
                                                    id={`note-${index}`}
                                                    rows={2}
                                                    className={`custom-textarea block py-2.5 px-2 w-full border rounded-md outline-0 bg-transparent`}
                                                    placeholder="Note"
                                                    value={image?.note}
                                                    onChange={(e) => {
                                                        setImages((prev: any) => prev.map((img: any) => img.id === image.id ? { ...img, note: e.target.value } : img))
                                                    }}
                                                ></textarea>
                                            </div>
                                        ))
                                    }
                                </> : <div className={"flex items-center justify-center w-full h-[200px] bg-gray-100 rounded-md"}>
                                    <p>No image</p>
                                </div>
                            }
                        </div>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalEditImages}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none w-full"
                            >
                                Save changes
                            </button>
                        </div>
                    </div>
                }
                show={showModalEditImages}
                handleClose={handleCloseModalEditImages}
            />
        </>
    )
}
