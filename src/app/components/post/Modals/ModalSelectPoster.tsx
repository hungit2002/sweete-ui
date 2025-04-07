import React, { useState } from 'react';
import ModalCustom from '../../modal/ModalCustom';
import Loading from '../../Loading/Loading';
import ReactPaginate from 'react-paginate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface ModalSelectPosterProps {
    showModal: boolean;
    setShowModal: (show: boolean) => void;
    onSelectImage: (imageId: number) => void;
    images: any[];
    isLoading: boolean;
    totalPages: number;
    onPageChange: (page: number) => void;
    currentPage: number;
    isShareToNewBoard: boolean;
    setIsShareToNewBoard: (isShareToNewBoard: boolean) => void;
}

export default function ModalSelectPoster({
    showModal,
    setShowModal,
    onSelectImage,
    images,
    isLoading,
    totalPages,
    onPageChange,
    currentPage,
    isShareToNewBoard,
    setIsShareToNewBoard,
}: ModalSelectPosterProps) {
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const handleSelectImage = (imageId: number) => {
        setSelectedImage(imageId);
    };

    const handleSave = () => {
        if (selectedImage) {
            onSelectImage(selectedImage);
            setShowModal(false);
        }
    };

    return (
        <ModalCustom
            show={showModal}
            onHide={() => setShowModal(false)}
            title="Select Poster"
            size="lg"
        >
            <div className="p-4">
                {isLoading ? (
                    <div className="flex justify-center items-center h-[400px]">
                        <Loading />
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
                            {images.map((image, index) => (
                                <div
                                    key={index}
                                    className={`relative cursor-pointer rounded-lg overflow-hidden group ${
                                        selectedImage === image.id ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                    onClick={() => handleSelectImage(image.id)}
                                >
                                    <img
                                        src={image.path}
                                        alt={`Image ${index + 1}`}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className={`absolute inset-0 bg-black bg-opacity-20 transition-opacity ${
                                        selectedImage === image.id ? 'opacity-50' : 'opacity-0 group-hover:opacity-100'
                                    }`} />
                                </div>
                            ))}
                        </div>

                        {totalPages > 1 && (
                            <ReactPaginate
                                previousLabel={<FontAwesomeIcon icon={faChevronLeft} />}
                                nextLabel={<FontAwesomeIcon icon={faChevronRight} />}
                                breakLabel="..."
                                pageCount={totalPages}
                                forcePage={currentPage - 1}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={({ selected }) => onPageChange(selected + 1)}
                                containerClassName="flex justify-center items-center gap-2 mb-4"
                                pageClassName="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                                pageLinkClassName="w-full h-full flex items-center justify-center"
                                previousClassName="p-2 rounded hover:bg-gray-100"
                                nextClassName="p-2 rounded hover:bg-gray-100"
                                breakClassName="w-8 h-8 flex items-center justify-center"
                                activeClassName="!bg-blue-500 text-white"
                                disabledClassName="text-gray-400 hover:bg-transparent cursor-not-allowed"
                            />
                        )}
                        <div className={"my-2"}>
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={isShareToNewBoard}
                                    onChange={(e) => setIsShareToNewBoard(e.target.checked)}
                                />
                                <p className={"text-sm"}>Share to new board</p>
                            </label>
                        </div>

                        <div className="flex justify-end gap-2 border-t pt-4">
                            <button
                                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => setShowModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className={`px-4 py-2 rounded-md transition-colors ${
                                    selectedImage
                                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                                        : 'bg-gray-300 cursor-not-allowed'
                                }`}
                                onClick={handleSave}
                                disabled={!selectedImage}
                            >
                                Save
                            </button>
                        </div>
                    </>
                )}
            </div>
        </ModalCustom>
    );
}