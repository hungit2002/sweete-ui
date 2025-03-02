import { UserInfoLS } from '@/models';
import ModalDefault from '../../modal/ModalDefault';
import { Tab, Tabs } from 'react-bootstrap';
import { Feeling, FEELING_LIST } from '@/constant';
import { useState } from 'react';

export default function ModalFeeling(props: {
    userInfo: UserInfoLS,
    showModalFeeling: boolean,
    setShowModelFeeling: any,
    setShowModalCreateFeed: any,
    setFeeling: any
}) {
    const { userInfo, setShowModalCreateFeed, showModalFeeling, setShowModelFeeling, setFeeling } = props;
    const handleCloseModalFeeling = () => {
        setShowModelFeeling(false);
        setShowModalCreateFeed(true);
    }
    return (
        <>
            <ModalDefault
                header={
                    <div className={"flex"}>
                        <h1 className={"font-bold"}>Feeling</h1>
                    </div>
                }
                body={
                    <div className={"px-3"}>
                        <Tabs
                            defaultActiveKey="feeling"
                            id="felling-tab"
                            className="mb-3"
                            style={{ fontSize: "14px" }}
                        >
                            <Tab eventKey="feeling" title="Feeling">
                                <div className='grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto'>
                                    {
                                        FEELING_LIST.map((feeling: Feeling, index: number) => (
                                            <div key={index} className={"flex items-center justify-start gap-1 p-2 rounded-md cursor-pointer hover:bg-gray-100"}
                                                onClick={() => {
                                                    setFeeling(feeling)
                                                    handleCloseModalFeeling()
                                                }}
                                            >
                                                <p>{feeling.emoji}</p>
                                                <p className={"text-sm font-medium"}>{feeling.text}</p>
                                            </div>
                                        ))
                                    }
                                </div>
                            </Tab>
                            <Tab eventKey="activity" title="Activity">
                                
                            </Tab>
                        </Tabs>
                    </div>
                }
                footer={
                    <div>
                        <div className={"flex items-center gap-4"}>
                            <button
                                className={"text-blue-500 hover:underline"}
                                onClick={handleCloseModalFeeling}
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
                show={showModalFeeling}
                handleClose={handleCloseModalFeeling}
            />
        </>
    )
}
