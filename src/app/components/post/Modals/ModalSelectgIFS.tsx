import {fetchGifs} from '@/Services/mediaService';
import {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import ModalDefault from '../../modal/ModalDefault';
import Loading from "@/app/components/Loading/Loading";

export default function ModalSelectgIFS(props: {
    showModalSelectGifs: boolean,
    setShowModalSelectGifs: any,
    setshowModalCreateFeed: any,
    setGifsPost: any,
    gifsPost: any
}) {
    const {showModalSelectGifs, setShowModalSelectGifs, setshowModalCreateFeed, setGifsPost, gifsPost} = props;
    const [gifs, setGifs] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const handleCloseModalSelectGifs = () => {
        setShowModalSelectGifs(false);
        setshowModalCreateFeed(true);
    }
    const handleClickGif = (gif: any) => {
        setGifsPost([gif]);
        setShowModalSelectGifs(false);
        setshowModalCreateFeed(true);
    }
    const getGifs = () => {
        setLoading(true);
        fetchGifs()
            .then((res: any) => {
                    setLoading(false);
                    if (res?.data?.meta?.code === 200) {
                        setGifs(res?.data?.result);
                    }
                }
            ).catch((err: any) => {
                setLoading(false);
                console.log(err);
                toast.error("Error when get gifs")
            }
        )
    }
    useEffect(() => {
        getGifs()
    }, [])
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Gifs</h1>
                    </div>
                }
                body={
                    <div className={"p-3 m-2 flex flex-wrap gap-1 border rounded-lg max-h-[400px] overflow-y-auto"}>
                        {
                            loading ? <div>
                                <Loading/>
                            </div> : <>
                                {
                                    gifs?.resources?.map((gif: any, index: number) => (
                                        <div key={index} onClick={() => handleClickGif(gif)}
                                             className={"cursor-pointer"}>
                                            <img src={gif?.secure_url} alt={gif?.filename}/>
                                        </div>
                                    ))
                                }
                            </>
                        }
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalSelectGifs}
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
                show={showModalSelectGifs}
                handleClose={handleCloseModalSelectGifs}
            />
        </>
    )
}
